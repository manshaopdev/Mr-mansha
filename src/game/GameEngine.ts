import * as THREE from 'three';
import { Weapon, BotEnemy, GlooWallObject, LootItem, ZoneState, MatchStats, GameMode, Character } from '../types/game';
import { soundEngine } from '../audio/SoundEngine';
import { ALL_WEAPONS } from '../data/weapons';
import { isWebGLAvailable } from '../utils/webgl';

export interface GameEngineCallbacks {
  onHealthChange: (hp: number, maxHp: number) => void;
  onEpChange: (ep: number, maxEp: number) => void;
  onArmorChange: (vest: number, helmet: number) => void;
  onGlooWallCountChange: (count: number) => void;
  onMedkitCountChange: (count: number) => void;
  onAliveCountChange: (alive: number) => void;
  onKillsChange: (kills: number) => void;
  onDamageNumber: (amount: number, isHeadshot: boolean, screenX: number, screenY: number) => void;
  onKillFeed: (killer: string, victim: string, weapon: string, isHeadshot: boolean, isPlayerKiller: boolean, isPlayerVictim: boolean) => void;
  onAmmoChange: (current: number, reserve: number) => void;
  onCrosshairTarget: (isEnemy: boolean, isHeadshotArea: boolean) => void;
  onZoneUpdate: (zone: ZoneState) => void;
  onMatchEnd: (stats: MatchStats) => void;
  onAltitudeChange: (altitude: number, isSkydiving: boolean) => void;
}

export class GameEngine {
  private container: HTMLElement;
  private callbacks: GameEngineCallbacks;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer | null = null;
  public is2DFallback = false;
  private canvas2d: HTMLCanvasElement | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private clock: THREE.Clock;
  private animationFrameId: number | null = null;

  // Player State
  public hp = 200;
  public maxHp = 200;
  public ep = 100;
  public maxEp = 200;
  public vestLevel = 2; // 0-4
  public helmetLevel = 2; // 0-4
  public glooWalls = 3;
  public medkits = 3;
  public kills = 0;
  public headshots = 0;
  public damageDealt = 0;
  public matchStartTime = 0;
  public isDead = false;
  public isVictory = false;

  // Parachute / Skydiving
  public isSkydiving = true;
  public altitude = 350;
  public parachuteOpened = false;

  // Character buff
  public activeBuff = {
    healRate: 0,
    speedMultiplier: 1.0,
    shieldProtection: 0,
    recoilMultiplier: 1.0,
  };
  private skillTimer = 0;
  // Limbs for running animation
  private leftLegMesh!: THREE.Mesh;
  private rightLegMesh!: THREE.Mesh;
  private leftArmMesh!: THREE.Mesh;
  private rightArmMesh!: THREE.Mesh;
  private runCycle = 0;

  // Camera View Mode: 'tpp_wide' (full person), 'tpp_normal', 'tpp_close', 'fpp'
  public cameraViewMode: 'tpp_wide' | 'tpp_normal' | 'tpp_close' = 'tpp_wide';

  // Game Mode
  public gameMode: GameMode = 'battle_royale';
  public characterData?: Character;

  // Equipment & Weapons
  public weapons: Weapon[] = [];
  public currentWeaponIndex = 0;
  private isReloading = false;
  private lastShootTime = 0;

  // 3D Objects & Meshes
  private playerMesh!: THREE.Group;
  private playerWeaponMesh!: THREE.Mesh;
  private glooWallsList: { obj: GlooWallObject; mesh: THREE.Mesh }[] = [];
  private bots: { data: BotEnemy; mesh: THREE.Group }[] = [];
  private lootItems: { data: LootItem; mesh: THREE.Group }[] = [];
  private bullets: { mesh: THREE.Mesh; vel: THREE.Vector3; life: number; isEnemy: boolean; damage: number }[] = [];
  private bloodParticles: { mesh: THREE.Points; life: number }[] = [];
  private airdropBox: THREE.Group | null = null;
  private airdropBeacon: THREE.Mesh | null = null;

  // Safe Zone
  private zoneMesh!: THREE.Mesh;
  private zone: ZoneState = {
    centerX: 0,
    centerZ: 0,
    currentRadius: 280,
    targetRadius: 180,
    nextCenterX: 20,
    nextCenterZ: -15,
    phase: 1,
    maxPhases: 4,
    timeRemaining: 90,
    isShrinking: false,
    dps: 5,
  };

  // Movement & Camera Controls
  private keys: { [key: string]: boolean } = {};
  private mouseSensitivity = 0.0022;
  private yaw = 0;
  private pitch = 0;
  private isAiming = false;
  private isCrouching = false;
  private isSprinting = false;
  private playerVelocityY = 0;
  private isGrounded = true;

  // Red auto-aim assist state
  private aimingAtEnemy = false;
  private aimingAtHead = false;

  constructor(
    container: HTMLElement,
    callbacks: GameEngineCallbacks,
    initialWeapon: Weapon,
    gameMode: GameMode = 'battle_royale',
    characterData?: Character
  ) {
    this.container = container;
    this.callbacks = callbacks;
    this.gameMode = gameMode;
    this.characterData = characterData;
    this.weapons = [
      { ...initialWeapon },
      { ...ALL_WEAPONS[1] }, // AK47
      { ...ALL_WEAPONS[7] }, // Pan
    ];

    // Setup mode specific settings
    if (gameMode === 'battle_royale') {
      this.isSkydiving = true;
      this.altitude = 350;
    } else {
      this.isSkydiving = false;
      this.altitude = 0;
    }

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x76b6e8);
    this.scene.fog = new THREE.FogExp2(0x87ceeb, 0.0018);

    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 1000);

    if (isWebGLAvailable()) {
      try {
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
        });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);
      } catch (e) {
        console.warn('WebGL context failed, fallback to 2D tactical combat arena:', e);
        this.init2DCanvas(container);
      }
    } else {
      console.warn('WebGL not supported, fallback to 2D tactical combat arena');
      this.init2DCanvas(container);
    }

    this.clock = new THREE.Clock();
    this.matchStartTime = Date.now();

    this.setupLighting();
    this.buildMap();
    this.createPlayer();
    this.createZone();
    this.spawnLoot();

    // Spawn bot count depending on mode
    let botCount = 49;
    if (gameMode === 'clash_squad') botCount = 7;
    else if (gameMode === 'lone_wolf') botCount = 1;
    else if (gameMode === 'training') botCount = 6;

    this.spawnBots(botCount);
    this.spawnAirdrop();
    this.bindEvents();

    const totalAlive = botCount + 1;
    this.callbacks.onAmmoChange(this.weapons[0].currentAmmo, this.weapons[0].reserveAmmo);
    this.callbacks.onGlooWallCountChange(this.glooWalls);
    this.callbacks.onMedkitCountChange(this.medkits);
    this.callbacks.onHealthChange(this.hp, this.maxHp);
    this.callbacks.onEpChange(this.ep, this.maxEp);
    this.callbacks.onArmorChange(this.vestLevel, this.helmetLevel);
    this.callbacks.onAliveCountChange(totalAlive);
  }

  private setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.2);
    dirLight.position.set(120, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 500;
    dirLight.shadow.camera.left = -180;
    dirLight.shadow.camera.right = 180;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = -180;
    this.scene.add(dirLight);

    // Warm Sun glow
    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x3d6628, 0.4);
    this.scene.add(hemiLight);
  }

  // Island Environment (Bermuda themed: Factory, Clock Tower, Peak, Pochinok, Mill)
  private buildMap() {
    // Terrain
    const groundGeo = new THREE.PlaneGeometry(600, 600, 64, 64);
    groundGeo.rotateX(-Math.PI / 2);

    // Subtle natural hill variation
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const distFromCenter = Math.sqrt(x * x + z * z);
      const hill = Math.sin(x * 0.02) * Math.cos(z * 0.02) * 4 + (distFromCenter < 80 ? 6 : 0);
      pos.setY(i, Math.max(0, hill));
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshLambertMaterial({ color: 0x4f772d });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Roads (Asphalt cross)
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.9 });
    const road1 = new THREE.Mesh(new THREE.PlaneGeometry(16, 500), roadMat);
    road1.rotation.x = -Math.PI / 2;
    road1.position.y = 0.05;
    road1.receiveShadow = true;
    this.scene.add(road1);

    const road2 = new THREE.Mesh(new THREE.PlaneGeometry(500, 16), roadMat);
    road2.rotation.x = -Math.PI / 2;
    road2.position.y = 0.05;
    road2.receiveShadow = true;
    this.scene.add(road2);

    // 1. FACTORY ZONE (-80, 0, -60)
    this.createFactory(-80, -60);

    // 2. CLOCK TOWER ZONE (70, 0, 70)
    this.createClockTower(70, 70);

    // 3. PEAK COMPOUND (0, 0, 0)
    this.createPeakCompound(0, 0);

    // 4. POCHINOK HOUSES (-70, 0, 80)
    this.createVillage(-70, 80);

    // 5. MILL / CONTAINERS (80, 0, -80)
    this.createMill(80, -80);

    // Rocks and Trees scattered
    this.scatterFoliageAndCover();
  }

  private createFactory(x: number, z: number) {
    const factoryGroup = new THREE.Group();
    factoryGroup.position.set(x, 0, z);

    // Main hangar
    const hangarGeo = new THREE.BoxGeometry(45, 18, 30);
    const hangarMat = new THREE.MeshStandardMaterial({ color: 0x5a6577, roughness: 0.6, metalness: 0.4 });
    const hangar = new THREE.Mesh(hangarGeo, hangarMat);
    hangar.position.y = 9;
    hangar.castShadow = true;
    hangar.receiveShadow = true;
    factoryGroup.add(hangar);

    // Roof vents & Silos
    const siloGeo = new THREE.CylinderGeometry(4, 4, 24, 16);
    const siloMat = new THREE.MeshStandardMaterial({ color: 0xc4c7cc, metalness: 0.7 });
    const silo1 = new THREE.Mesh(siloGeo, siloMat);
    silo1.position.set(28, 12, 0);
    silo1.castShadow = true;
    factoryGroup.add(silo1);

    const silo2 = silo1.clone();
    silo2.position.set(28, 12, 10);
    factoryGroup.add(silo2);

    // Scaffolding & ramp
    const rampGeo = new THREE.BoxGeometry(10, 1, 20);
    const rampMat = new THREE.MeshStandardMaterial({ color: 0x827717 });
    const ramp = new THREE.Mesh(rampGeo, rampMat);
    ramp.rotation.x = 0.4;
    ramp.position.set(-25, 4, 0);
    ramp.castShadow = true;
    factoryGroup.add(ramp);

    this.scene.add(factoryGroup);
  }

  private createClockTower(x: number, z: number) {
    const towerGroup = new THREE.Group();
    towerGroup.position.set(x, 0, z);

    // Base building
    const base = new THREE.Mesh(new THREE.BoxGeometry(26, 8, 26), new THREE.MeshStandardMaterial({ color: 0x9e8975 }));
    base.position.y = 4;
    base.castShadow = true;
    base.receiveShadow = true;
    towerGroup.add(base);

    // Tall Tower
    const tower = new THREE.Mesh(new THREE.BoxGeometry(10, 36, 10), new THREE.MeshStandardMaterial({ color: 0xb59e84 }));
    tower.position.y = 22;
    tower.castShadow = true;
    tower.receiveShadow = true;
    towerGroup.add(tower);

    // Clock Face (Golden circle)
    const clockFace = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 0.4, 16), new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.3 }));
    clockFace.rotation.x = Math.PI / 2;
    clockFace.position.set(0, 32, 5.2);
    towerGroup.add(clockFace);

    // Roof spire
    const spire = new THREE.Mesh(new THREE.ConeGeometry(7, 10, 4), new THREE.MeshStandardMaterial({ color: 0x5c4033 }));
    spire.position.y = 45;
    spire.rotation.y = Math.PI / 4;
    towerGroup.add(spire);

    this.scene.add(towerGroup);
  }

  private createPeakCompound(x: number, z: number) {
    const peak = new THREE.Group();
    peak.position.set(x, 0, z);

    // Central Mansion
    const mansion = new THREE.Mesh(new THREE.BoxGeometry(32, 12, 24), new THREE.MeshStandardMaterial({ color: 0xdfd3c3 }));
    mansion.position.y = 6;
    mansion.castShadow = true;
    mansion.receiveShadow = true;
    peak.add(mansion);

    // Red tile roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(24, 6, 4), new THREE.MeshStandardMaterial({ color: 0xa03c26 }));
    roof.position.y = 15;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    peak.add(roof);

    // Watchtower
    const watchTower = new THREE.Mesh(new THREE.BoxGeometry(6, 16, 6), new THREE.MeshStandardMaterial({ color: 0x6e7b8b }));
    watchTower.position.set(24, 8, 20);
    watchTower.castShadow = true;
    peak.add(watchTower);

    this.scene.add(peak);
  }

  private createVillage(x: number, z: number) {
    const village = new THREE.Group();
    village.position.set(x, 0, z);

    const housePositions = [
      { x: -18, z: -18, c: 0xe07a5f },
      { x: 18, z: -18, c: 0xf4f1de },
      { x: -18, z: 18, c: 0x81b29a },
      { x: 18, z: 18, c: 0xf2cc8f },
    ];

    housePositions.forEach(p => {
      const house = new THREE.Mesh(new THREE.BoxGeometry(14, 8, 12), new THREE.MeshStandardMaterial({ color: p.c }));
      house.position.set(p.x, 4, p.z);
      house.castShadow = true;
      house.receiveShadow = true;
      village.add(house);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(11, 4, 4), new THREE.MeshStandardMaterial({ color: 0x8d3b2a }));
      roof.position.set(p.x, 10, p.z);
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      village.add(roof);
    });

    this.scene.add(village);
  }

  private createMill(x: number, z: number) {
    const mill = new THREE.Group();
    mill.position.set(x, 0, z);

    // Metal shipping containers
    const colors = [0xd62828, 0x0077b6, 0xf77f00, 0x2b9348];
    for (let i = 0; i < 6; i++) {
      const container = new THREE.Mesh(
        new THREE.BoxGeometry(16, 6, 6),
        new THREE.MeshStandardMaterial({ color: colors[i % colors.length], metalness: 0.6, roughness: 0.5 })
      );
      container.position.set((i % 3) * 18 - 18, 3 + (i >= 3 ? 6 : 0), Math.floor(i / 3) * 8 - 4);
      container.castShadow = true;
      container.receiveShadow = true;
      mill.add(container);
    }

    this.scene.add(mill);
  }

  private scatterFoliageAndCover() {
    const treeGeo = new THREE.ConeGeometry(3.5, 9, 7);
    const treeMat = new THREE.MeshLambertMaterial({ color: 0x2d6a4f });
    const trunkGeo = new THREE.CylinderGeometry(0.7, 0.9, 4, 6);
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5c4033 });

    const rockGeo = new THREE.DodecahedronGeometry(2.5);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.9 });

    // Generate 60 trees & 40 rocks across map
    for (let i = 0; i < 70; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 25 + Math.random() * 200;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Tree
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 2;
      trunk.castShadow = true;
      tree.add(trunk);

      const foliage = new THREE.Mesh(treeGeo, treeMat);
      foliage.position.y = 7;
      foliage.castShadow = true;
      tree.add(foliage);
      this.scene.add(tree);

      // Rock
      if (i % 2 === 0) {
        const rock = new THREE.Mesh(rockGeo, rockMat);
        rock.position.set(x + 5, 1.2, z - 4);
        rock.rotation.set(Math.random(), Math.random(), Math.random());
        rock.scale.set(1 + Math.random() * 0.8, 0.8 + Math.random() * 0.6, 1 + Math.random() * 0.8);
        rock.castShadow = true;
        this.scene.add(rock);
      }
    }
  }

  // Free Fire Player Character Model with Fully Animatable Limbs
  private createPlayer() {
    this.playerMesh = new THREE.Group();

    const charColor = this.characterData?.avatarColor
      ? new THREE.Color(this.characterData.avatarColor)
      : new THREE.Color(0xffb800);

    // Torso / Combat Battle Vest
    const torsoGeo = new THREE.BoxGeometry(0.95, 1.35, 0.55);
    const torsoMat = new THREE.MeshStandardMaterial({ color: charColor, roughness: 0.35, metalness: 0.2 });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 1.75;
    torso.castShadow = true;
    this.playerMesh.add(torso);

    // Military Tactical Backpack Level 3
    const packGeo = new THREE.BoxGeometry(0.7, 0.85, 0.35);
    const packMat = new THREE.MeshStandardMaterial({ color: 0x1f2421, roughness: 0.8 });
    const backpack = new THREE.Mesh(packGeo, packMat);
    backpack.position.set(0, 1.8, -0.42);
    backpack.castShadow = true;
    this.playerMesh.add(backpack);

    // Head
    const headGeo = new THREE.BoxGeometry(0.65, 0.7, 0.65);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xf5c396, roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 2.75;
    head.castShadow = true;
    this.playerMesh.add(head);

    // Helmet / Crown (MK King Crown or Alok Headphones)
    if (!this.characterData || this.characterData.id === 'mk_king') {
      const crownGeo = new THREE.ConeGeometry(0.48, 0.38, 6);
      const crownMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
      const crown = new THREE.Mesh(crownGeo, crownMat);
      crown.position.y = 3.25;
      this.playerMesh.add(crown);
    } else {
      const hpGeo = new THREE.TorusGeometry(0.38, 0.08, 8, 24, Math.PI);
      const hpMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.8 });
      const hp = new THREE.Mesh(hpGeo, hpMat);
      hp.rotation.z = Math.PI;
      hp.position.set(0, 2.9, 0);
      this.playerMesh.add(hp);
    }

    // Left Arm (Pivoted at shoulder)
    const armGeo = new THREE.BoxGeometry(0.24, 0.9, 0.24);
    this.leftArmMesh = new THREE.Mesh(armGeo, skinMat);
    this.leftArmMesh.position.set(-0.62, 1.8, 0.1);
    this.leftArmMesh.castShadow = true;
    this.playerMesh.add(this.leftArmMesh);

    // Right Arm (Holding gun)
    this.rightArmMesh = new THREE.Mesh(armGeo, skinMat);
    this.rightArmMesh.position.set(0.62, 1.8, 0.2);
    this.rightArmMesh.rotation.x = -0.5;
    this.rightArmMesh.castShadow = true;
    this.playerMesh.add(this.rightArmMesh);

    // Left Leg (Pivoted at hip)
    const legGeo = new THREE.BoxGeometry(0.34, 1.05, 0.34);
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.7 });

    this.leftLegMesh = new THREE.Mesh(legGeo, pantsMat);
    this.leftLegMesh.position.set(-0.25, 0.55, 0);
    this.leftLegMesh.castShadow = true;
    this.playerMesh.add(this.leftLegMesh);

    // Right Leg (Pivoted at hip)
    this.rightLegMesh = new THREE.Mesh(legGeo, pantsMat);
    this.rightLegMesh.position.set(0.25, 0.55, 0);
    this.rightLegMesh.castShadow = true;
    this.playerMesh.add(this.rightLegMesh);

    // Combat Boots
    const bootGeo = new THREE.BoxGeometry(0.36, 0.25, 0.45);
    const bootMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 });
    const leftBoot = new THREE.Mesh(bootGeo, bootMat);
    leftBoot.position.set(0, -0.45, 0.05);
    this.leftLegMesh.add(leftBoot);

    const rightBoot = new THREE.Mesh(bootGeo, bootMat);
    rightBoot.position.set(0, -0.45, 0.05);
    this.rightLegMesh.add(rightBoot);

    // Signature Free Fire Pan on back (deflects rear shots!)
    const panGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.09, 16);
    const panMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.2 });
    const pan = new THREE.Mesh(panGeo, panMat);
    pan.rotation.x = Math.PI / 2;
    pan.position.set(0, 1.65, -0.62);
    this.playerMesh.add(pan);

    // Gun in hands
    const currentWeapon = this.weapons[this.currentWeaponIndex] || ALL_WEAPONS[0];
    const gunColor = currentWeapon.color ? new THREE.Color(currentWeapon.color) : new THREE.Color(0xff2222);
    const gunGeo = new THREE.BoxGeometry(0.14, 0.24, 1.15);
    const gunMat = new THREE.MeshStandardMaterial({ color: gunColor, metalness: 0.7, roughness: 0.3 });
    this.playerWeaponMesh = new THREE.Mesh(gunGeo, gunMat);
    this.playerWeaponMesh.position.set(0.35, 1.6, 0.7);
    this.playerWeaponMesh.castShadow = true;
    this.playerMesh.add(this.playerWeaponMesh);

    // Spawn Position according to Game Mode
    if (this.gameMode === 'battle_royale') {
      this.playerMesh.position.set(0, this.altitude, 0);
    } else if (this.gameMode === 'clash_squad') {
      this.playerMesh.position.set(70, 0, 70); // Clock Tower courtyard
    } else if (this.gameMode === 'lone_wolf') {
      this.playerMesh.position.set(0, 0, -10); // Peak Arena
    } else {
      this.playerMesh.position.set(-80, 0, -60); // Factory
    }

    this.scene.add(this.playerMesh);
  }

  // Safe Zone & Blue Electric Storm Circle
  private createZone() {
    const ringGeo = new THREE.CylinderGeometry(this.zone.currentRadius, this.zone.currentRadius, 80, 48, 1, true);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      wireframe: false,
    });
    this.zoneMesh = new THREE.Mesh(ringGeo, ringMat);
    this.zoneMesh.position.set(this.zone.centerX, 40, this.zone.centerZ);
    this.scene.add(this.zoneMesh);
  }

  // Loot spawning (Weapons, Medkits, Gloo Walls, Vests)
  private spawnLoot() {
    const lootConfigs = [
      { type: 'weapon' as const, name: 'MP40 Cobra', weaponData: ALL_WEAPONS[0], color: 0xff2222 },
      { type: 'weapon' as const, name: 'AK-47 Draco', weaponData: ALL_WEAPONS[1], color: 0x00f0ff },
      { type: 'weapon' as const, name: 'AWM Sniper', weaponData: ALL_WEAPONS[2], color: 0x9333ea },
      { type: 'weapon' as const, name: 'M1887 Shotgun', weaponData: ALL_WEAPONS[3], color: 0x10b981 },
      { type: 'medkit' as const, name: 'Medkit (+75 HP)', color: 0x22c55e },
      { type: 'gloo_wall' as const, name: 'Gloo Wall Grenade', color: 0x38bdf8 },
      { type: 'armor' as const, name: 'Level 3 Military Vest', color: 0xeab308 },
    ];

    for (let i = 0; i < 45; i++) {
      const cfg = lootConfigs[i % lootConfigs.length];
      const angle = Math.random() * Math.PI * 2;
      const dist = 15 + Math.random() * 180;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      const lootGroup = new THREE.Group();
      lootGroup.position.set(x, 0.4, z);

      // Rotating crate or item
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.8, 0.8),
        new THREE.MeshStandardMaterial({ color: cfg.color, emissive: cfg.color, emissiveIntensity: 0.3 })
      );
      box.castShadow = true;
      lootGroup.add(box);

      // Glow column / beacon
      const beamGeo = new THREE.CylinderGeometry(0.1, 0.1, 8, 8);
      const beamMat = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.4 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.y = 4;
      lootGroup.add(beam);

      this.scene.add(lootGroup);
      this.lootItems.push({
        data: {
          id: `loot_${i}`,
          type: cfg.type,
          name: cfg.name,
          amount: 1,
          weaponData: cfg.weaponData,
          x,
          y: 0.4,
          z,
        },
        mesh: lootGroup,
      });
    }
  }

  // Bot Enemies with realistic Free Fire combat AI tailored to Game Mode
  private spawnBots(count: number) {
    const botNames = [
      'Alok_Legend', 'Raistar_OP', 'Total_Gamer', 'Badge_99', 'Nobita_FF',
      'AjjuBhai', 'King_Shadow', 'Viper_Kill', 'Sniper_God', 'Toxic_Boy',
      'Dragon_Flame', 'Black_Ghost', 'Pro_Ninja', 'Solo_King', 'Headshot_Master',
      'Ghost_Rider', 'M1887_OneTap', 'Gloo_Master', 'Bermuda_Boss', 'Thunder_Bolt',
      'Falcon_Eye', 'Cobra_Strike', 'Titan_Slayer', 'Zero_Death', 'Apex_Predator',
      'Frost_Bite', 'Skull_Crusher', 'Bullet_Storm', 'Dark_Angel', 'Fire_Storm',
      'Rogue_One', 'Iron_Claw', 'Phantom_X', 'Striker_99', 'Night_Stalker',
      'Blaze_Fury', 'Doom_Bringer', 'Hyper_Sonic', 'Alpha_Wolf', 'Silent_Reaper',
      'Neon_Knight', 'Valkyrie_FF', 'Kevlar_King', 'Storm_Rider', 'Crimson_Tide',
      'Shadow_Fox', 'Echo_One', 'Savage_Beast', 'Omega_Strike'
    ];

    for (let i = 0; i < count; i++) {
      let x = 0;
      let z = 0;
      let botColor = 0x991b1b;
      let botName = botNames[i] || `Player_${i + 1}`;

      if (this.gameMode === 'clash_squad') {
        // 4v4 Clock Tower: 3 squadmates (Blue) + 4 opponents (Red)
        if (i < 3) {
          botColor = 0x2563eb; // Blue friendly squadmate
          botName = `Squadmate_${i + 1}_MK`;
          x = 65 + (i - 1) * 6;
          z = 65 + (i * 3);
        } else {
          botColor = 0xdc2626; // Red enemy squad
          botName = `Cobra_Rival_${i - 2}`;
          x = 85 + (i - 4) * 8;
          z = 85 + (i * 2);
        }
      } else if (this.gameMode === 'lone_wolf') {
        // 1v1 Iron Cage duel
        botColor = 0xef4444;
        botName = 'COBRA_ELITE_DUELIST';
        x = 0;
        z = 25;
      } else if (this.gameMode === 'training') {
        // Target Practice bots lined up
        botColor = 0xf59e0b;
        botName = `Practice_Dummy_${i + 1}`;
        x = -80 + (i - 2.5) * 8;
        z = -35;
      } else {
        // 50 Players Bermuda Battle Royale
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const dist = 30 + Math.random() * 180;
        x = Math.cos(angle) * dist;
        z = Math.sin(angle) * dist;
      }

      const botGroup = new THREE.Group();
      botGroup.position.set(x, 0, z);

      // Bot Body (Red/Blue/Gold tactical vest)
      const bodyMat = new THREE.MeshStandardMaterial({ color: botColor });
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.55), bodyMat);
      body.position.y = 1.7;
      body.castShadow = true;
      botGroup.add(body);

      // Bot Head
      const headMat = new THREE.MeshStandardMaterial({ color: 0xffdbac });
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.65, 0.6), headMat);
      head.position.y = 2.7;
      head.castShadow = true;
      botGroup.add(head);

      // Bot Gun
      const gun = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 1.0), new THREE.MeshStandardMaterial({ color: 0x222222 }));
      gun.position.set(0.35, 1.6, 0.6);
      botGroup.add(gun);

      this.scene.add(botGroup);

      const botWeapon = ALL_WEAPONS[i % 4];
      this.bots.push({
        data: {
          id: `bot_${i}`,
          name: botName,
          x,
          z,
          y: 0,
          hp: 200,
          maxHp: 200,
          weapon: { ...botWeapon },
          state: 'wandering',
          targetX: x + (Math.random() - 0.5) * 30,
          targetZ: z + (Math.random() - 0.5) * 30,
          lastShotTime: 0,
          glooWallCount: 2,
          directionAngle: Math.random() * Math.PI * 2,
        },
        mesh: botGroup,
      });
    }
  }

  // Legendary Free Fire Airdrop
  private spawnAirdrop() {
    this.airdropBox = new THREE.Group();
    this.airdropBox.position.set(25, 0.6, -30);

    // Red & Yellow Crate
    const crate = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 2.0, 2.4),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4, metalness: 0.3 })
    );
    crate.castShadow = true;
    this.airdropBox.add(crate);

    // Vertical Golden Beacon light column (Visible across map!)
    const beaconGeo = new THREE.CylinderGeometry(0.4, 0.4, 180, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.5 });
    this.airdropBeacon = new THREE.Mesh(beaconGeo, beaconMat);
    this.airdropBeacon.position.y = 90;
    this.airdropBox.add(this.airdropBeacon);

    this.scene.add(this.airdropBox);
  }

  // Free Fire Gloo Wall Deployment (Ice barrier!)
  public deployGlooWall(): boolean {
    if (this.glooWalls <= 0 || this.isDead || this.isSkydiving) return false;

    this.glooWalls--;
    this.callbacks.onGlooWallCountChange(this.glooWalls);
    soundEngine.playGlooWallDeploy();

    // Position wall 3.5 units directly in front of the player
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
    const wallX = this.playerMesh.position.x + forward.x * 3.2;
    const wallZ = this.playerMesh.position.z + forward.z * 3.2;

    // Curved Ice Shield Mesh
    const wallGeo = new THREE.BoxGeometry(4.8, 3.2, 0.4);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
    });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.set(wallX, 1.6, wallZ);
    wallMesh.rotation.y = this.yaw;
    wallMesh.castShadow = true;
    wallMesh.receiveShadow = true;
    this.scene.add(wallMesh);

    const glooObj: GlooWallObject = {
      id: `gloo_${Date.now()}`,
      x: wallX,
      y: 1.6,
      z: wallZ,
      rotationY: this.yaw,
      hp: 750,
      maxHp: 750,
      isPlayerWall: true,
    };

    this.glooWallsList.push({ obj: glooObj, mesh: wallMesh });
    return true;
  }

  // Activate Character Skill
  public activateSkill(characterId: string): boolean {
    if (this.skillTimer > 0 || this.isDead) return false;

    soundEngine.playSkillActivate();

    if (characterId === 'dj_alok') {
      this.activeBuff = {
        healRate: 6,
        speedMultiplier: 1.2,
        shieldProtection: 0,
        recoilMultiplier: 1.0,
      };
      this.skillTimer = 10;
    } else if (characterId === 'chrono') {
      this.activeBuff = {
        healRate: 0,
        speedMultiplier: 1.0,
        shieldProtection: 800,
        recoilMultiplier: 1.0,
      };
      this.skillTimer = 7;
    } else if (characterId === 'mk_king') {
      this.activeBuff = {
        healRate: 3,
        speedMultiplier: 1.25,
        shieldProtection: 200,
        recoilMultiplier: 0.6,
      };
      this.skillTimer = 8;
      this.ep = Math.min(this.maxEp, this.ep + 50);
      this.callbacks.onEpChange(this.ep, this.maxEp);
    }

    return true;
  }

  // Use Medkit
  public useMedkit(): boolean {
    if (this.medkits <= 0 || this.hp >= this.maxHp || this.isDead) return false;
    this.medkits--;
    this.callbacks.onMedkitCountChange(this.medkits);
    soundEngine.playMedkit();
    this.hp = Math.min(this.maxHp, this.hp + 75);
    this.ep = Math.min(this.maxEp, this.ep + 35);
    this.callbacks.onHealthChange(this.hp, this.maxHp);
    this.callbacks.onEpChange(this.ep, this.maxEp);
    return true;
  }

  // Switch Weapon slot
  public selectWeapon(index: number) {
    if (index >= 0 && index < this.weapons.length) {
      this.currentWeaponIndex = index;
      const w = this.weapons[index];
      this.callbacks.onAmmoChange(w.currentAmmo, w.reserveAmmo);
      soundEngine.playClick();
    }
  }

  // Reload current weapon
  public reloadCurrentWeapon() {
    const w = this.weapons[this.currentWeaponIndex];
    if (this.isReloading || w.currentAmmo >= w.magazineSize || w.reserveAmmo <= 0) return;

    this.isReloading = true;
    soundEngine.playReload();

    setTimeout(() => {
      const needed = w.magazineSize - w.currentAmmo;
      const fill = Math.min(needed, w.reserveAmmo);
      w.currentAmmo += fill;
      w.reserveAmmo -= fill;
      this.isReloading = false;
      this.callbacks.onAmmoChange(w.currentAmmo, w.reserveAmmo);
    }, w.reloadTime * 1000);
  }

  // Fire Weapon (Authentic Free Fire Drag Headshot mechanic!)
  public fireWeapon(isDragUpward = false): boolean {
    if (this.isDead || this.isSkydiving || this.isReloading) return false;

    const w = this.weapons[this.currentWeaponIndex];
    const now = Date.now();
    const fireInterval = (1000 / w.fireRate);

    if (now - this.lastShootTime < fireInterval) return false;
    if (w.currentAmmo <= 0) {
      this.reloadCurrentWeapon();
      return false;
    }

    this.lastShootTime = now;
    w.currentAmmo--;
    this.callbacks.onAmmoChange(w.currentAmmo, w.reserveAmmo);

    // Play synthesized weapon gunshot
    soundEngine.playGunshot(w.category);

    // Camera Recoil
    const recoilAmount = w.recoil * this.activeBuff.recoilMultiplier;
    this.pitch = Math.min(Math.PI / 3, this.pitch + recoilAmount);

    // Raycast hit check against bots
    const raycaster = new THREE.Raycaster();
    const centerPoint = new THREE.Vector2(0, 0); // screen center
    raycaster.setFromCamera(centerPoint, this.camera);

    let hitRegistered = false;
    let targetBotIndex = -1;
    let isHeadshotHit = false;

    // Check hit against each alive bot
    for (let i = 0; i < this.bots.length; i++) {
      const bot = this.bots[i];
      if (bot.data.hp <= 0) continue;

      const botPos = bot.mesh.position;
      const dist = this.playerMesh.position.distanceTo(botPos);
      if (dist > w.range) continue;

      // Check distance from ray to bot center
      const ray = raycaster.ray;
      const botCenter = new THREE.Vector3(botPos.x, 1.7, botPos.z);
      const botHead = new THREE.Vector3(botPos.x, 2.7, botPos.z);

      const headDistToRay = ray.distanceToPoint(botHead);
      const bodyDistToRay = ray.distanceToPoint(botCenter);

      // Drag up boost: dragging the fire button makes headshots 3x easier, just like Free Fire!
      const headshotThreshold = isDragUpward ? 1.4 : 0.8;

      if (headDistToRay < headshotThreshold) {
        hitRegistered = true;
        targetBotIndex = i;
        isHeadshotHit = true;
        break;
      } else if (bodyDistToRay < 1.3) {
        hitRegistered = true;
        targetBotIndex = i;
        isHeadshotHit = false;
        break;
      }
    }

    if (hitRegistered && targetBotIndex >= 0) {
      const bot = this.bots[targetBotIndex];
      let dmg = w.damage;
      if (isHeadshotHit) {
        dmg = Math.round(dmg * w.headshotMultiplier);
        soundEngine.playHeadshot();
      } else {
        soundEngine.playHitMarker();
      }

      bot.data.hp -= dmg;
      this.damageDealt += dmg;

      // Project bot position to screen coordinates for floating damage numbers
      const screenPos = bot.mesh.position.clone().add(new THREE.Vector3(0, 2.5, 0));
      screenPos.project(this.camera);
      const screenX = ((screenPos.x + 1) * this.container.clientWidth) / 2;
      const screenY = ((-screenPos.y + 1) * this.container.clientHeight) / 2;

      this.callbacks.onDamageNumber(dmg, isHeadshotHit, screenX, screenY);

      // Bot death
      if (bot.data.hp <= 0) {
        bot.data.hp = 0;
        this.kills++;
        if (isHeadshotHit) this.headshots++;
        this.callbacks.onKillsChange(this.kills);
        soundEngine.playKillSound();

        // Spawn death loot crate
        this.spawnDeathCrate(bot.mesh.position.x, bot.mesh.position.z);
        this.scene.remove(bot.mesh);

        // Killfeed
        this.callbacks.onKillFeed(
          'MK_KING_OP',
          bot.data.name,
          w.name,
          isHeadshotHit,
          true,
          false
        );

        // Update alive count
        const aliveCount = this.getAliveCount();
        this.callbacks.onAliveCountChange(aliveCount);

        // Check Victory BOOYAH!
        if (aliveCount <= 1) {
          this.triggerBooyah();
        }
      } else {
        // Bot responds: deploys Gloo Wall if critically hit!
        if (bot.data.hp < 80 && bot.data.glooWallCount > 0 && Math.random() < 0.6) {
          bot.data.glooWallCount--;
          this.spawnBotGlooWall(bot.mesh.position);
        }
      }
    }

    return true;
  }

  // Bot deploys emergency Gloo Wall
  private spawnBotGlooWall(pos: THREE.Vector3) {
    soundEngine.playGlooWallDeploy();
    const wallMesh = new THREE.Mesh(
      new THREE.BoxGeometry(4.5, 3.0, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.35, transparent: true, opacity: 0.85 })
    );
    wallMesh.position.set(pos.x, 1.5, pos.z - 2);
    this.scene.add(wallMesh);
    this.glooWallsList.push({
      obj: { id: `bot_gloo_${Date.now()}`, x: pos.x, y: 1.5, z: pos.z - 2, rotationY: 0, hp: 500, maxHp: 500, isPlayerWall: false },
      mesh: wallMesh,
    });
  }

  private spawnDeathCrate(x: number, z: number) {
    const crate = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.8, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x16a34a, emissive: 0x15803d, emissiveIntensity: 0.4 })
    );
    crate.position.set(x, 0.4, z);
    this.scene.add(crate);

    // Add high tier loot drop
    this.lootItems.push({
      data: {
        id: `crate_${Date.now()}`,
        type: 'weapon',
        name: 'Death Loot Crate (Ammo + Meds)',
        amount: 2,
        x,
        y: 0.4,
        z,
      },
      mesh: crate as unknown as THREE.Group,
    });
  }

  public getAliveCount(): number {
    let alive = this.isDead ? 0 : 1;
    for (const b of this.bots) {
      if (b.data.hp > 0) alive++;
    }
    return alive;
  }

  // Trigger iconic BOOYAH!
  private triggerBooyah() {
    this.isVictory = true;
    soundEngine.playBooyah();
    const survivalSeconds = Math.round((Date.now() - this.matchStartTime) / 1000);
    this.callbacks.onMatchEnd({
      rank: 1,
      totalPlayers: 50,
      kills: this.kills,
      headshots: this.headshots,
      damage: this.damageDealt,
      survivalTimeSeconds: survivalSeconds,
      rankPointsGained: 68 + this.kills * 12,
      isBooyah: true,
    });
  }

  // Player Defeat
  private triggerDefeat(killerName: string) {
    this.isDead = true;
    const aliveRemaining = this.getAliveCount();
    const survivalSeconds = Math.round((Date.now() - this.matchStartTime) / 1000);
    this.callbacks.onMatchEnd({
      rank: aliveRemaining + 1,
      totalPlayers: 50,
      kills: this.kills,
      headshots: this.headshots,
      damage: this.damageDealt,
      survivalTimeSeconds: survivalSeconds,
      rankPointsGained: Math.max(-15, 25 - aliveRemaining * 2 + this.kills * 8),
      isBooyah: false,
    });
  }

  // Deploy Parachute button action
  public openParachute() {
    if (!this.parachuteOpened && this.isSkydiving) {
      this.parachuteOpened = true;
      soundEngine.playParachuteOpen();
    }
  }

  // Aim Down Sights (ADS)
  public toggleScope(enable?: boolean) {
    this.isAiming = enable !== undefined ? enable : !this.isAiming;
    const targetFov = this.isAiming ? 32 : 65;
    this.camera.fov = targetFov;
    this.camera.updateProjectionMatrix();
  }

  public setSprinting(sprint: boolean) {
    this.isSprinting = sprint;
  }

  public setCrouching(crouch: boolean) {
    this.isCrouching = crouch;
  }

  public jump() {
    if (this.isGrounded && !this.isSkydiving) {
      this.playerVelocityY = 9.5;
      this.isGrounded = false;
    }
  }

  // Event Listeners for Keyboard & Mouse Look
  private bindEvents() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('resize', this.handleResize);

    this.container.addEventListener('mousedown', () => {
      this.container.requestPointerLock?.();
    });

    document.addEventListener('mousemove', this.handleMouseMove);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    this.keys[e.code] = true;

    if (e.code === 'KeyR') {
      this.reloadCurrentWeapon();
    } else if (e.code === 'Digit1') {
      this.selectWeapon(0);
    } else if (e.code === 'Digit2') {
      this.selectWeapon(1);
    } else if (e.code === 'Digit3') {
      this.selectWeapon(2);
    } else if (e.code === 'KeyG') {
      this.deployGlooWall();
    } else if (e.code === 'KeyF') {
      this.useMedkit();
    } else if (e.code === 'KeyE') {
      this.activateSkill('mk_king');
    } else if (e.code === 'Space') {
      if (this.isSkydiving) {
        this.openParachute();
      } else {
        this.jump();
      }
    } else if (e.code === 'ShiftLeft') {
      this.setSprinting(true);
    } else if (e.code === 'KeyC') {
      this.setCrouching(!this.isCrouching);
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
    if (e.code === 'ShiftLeft') {
      this.setSprinting(false);
    }
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (document.pointerLockElement === this.container || !document.pointerLockElement) {
      this.rotateCamera(e.movementX, e.movementY);
    }
  };

  // Touch / Virtual Joystick Camera Drag
  public rotateCamera(deltaX: number, deltaY: number) {
    this.yaw -= deltaX * this.mouseSensitivity;
    this.pitch -= deltaY * this.mouseSensitivity;
    this.pitch = Math.max(-Math.PI / 2.8, Math.min(Math.PI / 2.8, this.pitch));
  }

  private init2DCanvas(container: HTMLElement) {
    this.is2DFallback = true;
    this.canvas2d = document.createElement('canvas');
    this.canvas2d.width = container.clientWidth || window.innerWidth;
    this.canvas2d.height = container.clientHeight || window.innerHeight;
    this.canvas2d.style.width = '100%';
    this.canvas2d.style.height = '100%';
    this.canvas2d.style.display = 'block';
    container.appendChild(this.canvas2d);
    this.ctx2d = this.canvas2d.getContext('2d');
  }

  private handleResize = () => {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (!this.is2DFallback && this.renderer) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    } else if (this.canvas2d) {
      this.canvas2d.width = width;
      this.canvas2d.height = height;
    }
  };

  // Game Loop
  public start() {
    this.clock.start();
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(this.clock.getDelta(), 0.1);
      this.update(delta);
      if (!this.is2DFallback && this.renderer) {
        this.renderer.render(this.scene, this.camera);
      } else {
        this.render2D();
      }
    };
    animate();
  }

  public stop() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('mousemove', this.handleMouseMove);
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
    if (this.canvas2d && this.canvas2d.parentNode) {
      this.canvas2d.parentNode.removeChild(this.canvas2d);
    }
  }

  // 2D Tactical Battlefield Renderer (Hardware-Acceleration Fallback)
  private render2D() {
    if (!this.ctx2d || !this.canvas2d) return;
    const ctx = this.ctx2d;
    const w = this.canvas2d.width;
    const h = this.canvas2d.height;

    // Clear background: Bermuda battlefield terrain
    ctx.fillStyle = '#264e22';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    // Center camera on player position
    ctx.translate(w / 2, h / 2);

    const scale = 2.6;
    const px = this.playerMesh.position.x;
    const pz = this.playerMesh.position.z;

    ctx.translate(-px * scale, -pz * scale);

    // Tactical Terrain Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 35 * scale;
    const startX = Math.floor((px * scale - w) / gridSize) * gridSize;
    const endX = Math.ceil((px * scale + w) / gridSize) * gridSize;
    const startZ = Math.floor((pz * scale - h) / gridSize) * gridSize;
    const endZ = Math.ceil((pz * scale + h) / gridSize) * gridSize;

    for (let x = startX; x <= endX; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, startZ);
      ctx.lineTo(x, endZ);
      ctx.stroke();
    }
    for (let z = startZ; z <= endZ; z += gridSize) {
      ctx.beginPath();
      ctx.moveTo(startX, z);
      ctx.lineTo(endX, z);
      ctx.stroke();
    }

    // River / Water Stream
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(-220 * scale, 30 * scale, 440 * scale, 16 * scale);

    // Clock Tower (70, 70)
    ctx.fillStyle = '#475569';
    ctx.fillRect(52 * scale, 52 * scale, 36 * scale, 36 * scale);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(66 * scale, 66 * scale, 8 * scale, 8 * scale);
    ctx.font = 'bold 11px Rajdhani, sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.fillText('CLOCK TOWER', 54 * scale, 48 * scale);

    // Factory (-80, -60)
    ctx.fillStyle = '#334155';
    ctx.fillRect(-105 * scale, -85 * scale, 50 * scale, 45 * scale);
    ctx.fillStyle = '#fef08a';
    ctx.fillText('FACTORY', -95 * scale, -88 * scale);

    // Peak (0, 0)
    ctx.fillStyle = '#3f3f46';
    ctx.fillRect(-25 * scale, -25 * scale, 50 * scale, 50 * scale);
    ctx.fillStyle = '#fef08a';
    ctx.fillText('PEAK', -15 * scale, -28 * scale);

    // Safe Zone Electric Circle
    const zx = this.zone.centerX * scale;
    const zz = this.zone.centerZ * scale;
    const zr = this.zone.currentRadius * scale;

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(zx, zz, zr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Loot Items
    for (const loot of this.lootItems) {
      const lx = loot.mesh.position.x * scale;
      const lz = loot.mesh.position.z * scale;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(lx, lz, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '9px Rajdhani, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(loot.data.name, lx + 7, lz + 3);
    }

    // Airdrop Crate
    if (this.airdropBox) {
      const ax = this.airdropBox.position.x * scale;
      const az = this.airdropBox.position.z * scale;
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(ax - 10, az - 10, 20, 20);
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 9px Russo One, sans-serif';
      ctx.fillText('AIRDROP', ax - 16, az - 13);
    }

    // Gloo Walls (Ice barriers)
    for (const gw of this.glooWallsList) {
      if (gw.obj.hp <= 0) continue;
      const gx = gw.mesh.position.x * scale;
      const gz = gw.mesh.position.z * scale;
      ctx.save();
      ctx.translate(gx, gz);
      ctx.rotate(gw.mesh.rotation.y);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fillRect(-15, -4, 30, 8);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // Bots Enemies
    for (const b of this.bots) {
      if (b.data.hp <= 0) continue;
      const bx = b.mesh.position.x * scale;
      const bz = b.mesh.position.z * scale;

      ctx.save();
      ctx.translate(bx, bz);
      ctx.rotate(b.data.directionAngle || 0);

      const isSquadmate = b.data.name.includes('Squadmate');
      ctx.fillStyle = isSquadmate ? '#3b82f6' : '#ef4444';
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();

      // Gun
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(3, 0);
      ctx.lineTo(14, 0);
      ctx.stroke();

      ctx.restore();

      // Health bar above bot
      const hpPct = Math.max(0, b.data.hp / b.data.maxHp);
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(bx - 16, bz - 17, 32, 4);
      ctx.fillStyle = hpPct > 0.4 ? '#22c55e' : '#ef4444';
      ctx.fillRect(bx - 15, bz - 16, 30 * hpPct, 2);

      // Bot Name
      ctx.font = 'bold 9px Rajdhani, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(b.data.name, bx, bz - 20);
      ctx.textAlign = 'left';
    }

    // Player
    const plx = px * scale;
    const plz = pz * scale;

    ctx.save();
    ctx.translate(plx, plz);
    ctx.rotate(this.yaw);

    // Player body
    ctx.fillStyle = '#ffd700';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Signature Free Fire Pan on back
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-7, 7, 14, 4);

    // Gun in hands
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(4, 0);
    ctx.lineTo(18, 0);
    ctx.stroke();

    // Muzzle flash when shooting
    if (Date.now() - this.lastShootTime < 60) {
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(20, 0, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    ctx.restore(); // Restore centered world

    // Top Skydiving HUD in 2D Mode
    if (this.isSkydiving) {
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(w / 2 - 130, 55, 260, 36);
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 14px Russo One, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`PARACHUTE DESCENT: ${Math.round(this.altitude)}m`, w / 2, 78);
      ctx.textAlign = 'left';
    }

    // Aim Assist Crosshair on Canvas
    if (this.aimingAtEnemy) {
      ctx.strokeStyle = this.aimingAtHead ? '#ef4444' : '#f97316';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 16, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Update Game Physics & States
  private update(delta: number) {
    if (this.isDead || this.isVictory) return;

    // 1. Skydiving / Parachute Phase
    if (this.isSkydiving) {
      const descentSpeed = this.parachuteOpened ? 18 : 65;
      this.altitude -= descentSpeed * delta;
      this.playerMesh.position.y = Math.max(0, this.altitude);
      this.callbacks.onAltitudeChange(Math.round(this.altitude), true);

      // Auto-deploy parachute at 60m
      if (this.altitude < 70 && !this.parachuteOpened) {
        this.openParachute();
      }

      // Touchdown!
      if (this.altitude <= 0) {
        this.isSkydiving = false;
        this.playerMesh.position.y = 0;
        this.callbacks.onAltitudeChange(0, false);
      }
    } else {
      // 2. Normal Ground Movement
      let moveX = 0;
      let moveZ = 0;

      if (this.keys['KeyW']) moveZ -= 1;
      if (this.keys['KeyS']) moveZ += 1;
      if (this.keys['KeyA']) moveX -= 1;
      if (this.keys['KeyD']) moveX += 1;

      const baseSpeed = this.isSprinting ? 12 : this.isCrouching ? 4 : 7.5;
      const speed = baseSpeed * this.activeBuff.speedMultiplier;

      if (moveX !== 0 || moveZ !== 0) {
        const moveVector = new THREE.Vector3(moveX, 0, moveZ).normalize();
        moveVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
        this.playerMesh.position.x += moveVector.x * speed * delta;
        this.playerMesh.position.z += moveVector.z * speed * delta;

        // Limb Running Animation (Swinging legs and arms)
        this.runCycle += delta * (this.isSprinting ? 14 : 9);
        if (this.leftLegMesh && this.rightLegMesh) {
          this.leftLegMesh.rotation.x = Math.sin(this.runCycle) * 0.7;
          this.rightLegMesh.rotation.x = -Math.sin(this.runCycle) * 0.7;
        }
        if (this.leftArmMesh) {
          this.leftArmMesh.rotation.x = -Math.sin(this.runCycle) * 0.5;
        }
      } else {
        // Idle: Return limbs to neutral position
        if (this.leftLegMesh && this.rightLegMesh) {
          this.leftLegMesh.rotation.x *= 0.82;
          this.rightLegMesh.rotation.x *= 0.82;
        }
        if (this.leftArmMesh) {
          this.leftArmMesh.rotation.x *= 0.82;
        }
      }

      // Gravity and jumping
      if (!this.isGrounded) {
        this.playerVelocityY -= 22 * delta; // Gravity
        this.playerMesh.position.y += this.playerVelocityY * delta;
        if (this.playerMesh.position.y <= 0) {
          this.playerMesh.position.y = 0;
          this.playerVelocityY = 0;
          this.isGrounded = true;
        }
      }
    }

    // 3. Update Camera Position (TPP Free Fire camera showcasing full character person)
    this.playerMesh.rotation.y = this.yaw;

    let baseDist = 4.2; // TPP Wide (Full person visible)
    if (this.cameraViewMode === 'tpp_normal') baseDist = 3.4;
    else if (this.cameraViewMode === 'tpp_close') baseDist = 2.2;

    const shoulderOffset = this.isAiming ? 0.45 : (this.cameraViewMode === 'tpp_wide' ? 0.8 : 1.1);
    const cameraDistance = this.isAiming ? 1.5 : baseDist;
    const cameraHeight = this.isCrouching ? 1.4 : 2.1;

    const backward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);

    const cameraPos = this.playerMesh.position.clone()
      .add(new THREE.Vector3(0, cameraHeight, 0))
      .add(backward.clone().multiplyScalar(cameraDistance))
      .add(right.clone().multiplyScalar(shoulderOffset));

    cameraPos.y += Math.sin(this.pitch) * cameraDistance * 0.7;

    this.camera.position.copy(cameraPos);

    const lookTarget = this.playerMesh.position.clone()
      .add(new THREE.Vector3(0, cameraHeight, 0))
      .add(new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw).multiplyScalar(20));
    lookTarget.y -= Math.sin(this.pitch) * 20;

    this.camera.lookAt(lookTarget);

    // 4. Free Fire Red Auto-Aim Assist Detection
    this.updateAimAssist();

    // 5. Safe Zone & Storm Update
    this.updateZone(delta);

    // 6. Bots AI update
    this.updateBots(delta);

    // 7. Loot Pickup Check
    this.checkLootPickup();

    // 8. EP to HP conversion system (100% Free Fire mechanic: EP converts to HP when hurt!)
    if (this.ep > 0 && this.hp < this.maxHp) {
      const epUsed = Math.min(this.ep, 2 * delta);
      this.ep -= epUsed;
      this.hp = Math.min(this.maxHp, this.hp + epUsed);
      this.callbacks.onHealthChange(Math.round(this.hp), this.maxHp);
      this.callbacks.onEpChange(Math.round(this.ep), this.maxEp);
    }

    // Active skill cooldown timer
    if (this.skillTimer > 0) {
      this.skillTimer -= delta;
      if (this.activeBuff.healRate > 0 && this.hp < this.maxHp) {
        this.hp = Math.min(this.maxHp, this.hp + this.activeBuff.healRate * delta);
        this.callbacks.onHealthChange(Math.round(this.hp), this.maxHp);
      }
      if (this.skillTimer <= 0) {
        this.activeBuff = {
          healRate: 0,
          speedMultiplier: 1.0,
          shieldProtection: 0,
          recoilMultiplier: 1.0,
        };
      }
    }
  }

  // Toggle Camera View Mode between TPP Wide (Full character), Normal, and Close
  public cycleCameraView(): 'tpp_wide' | 'tpp_normal' | 'tpp_close' {
    if (this.cameraViewMode === 'tpp_wide') {
      this.cameraViewMode = 'tpp_normal';
    } else if (this.cameraViewMode === 'tpp_normal') {
      this.cameraViewMode = 'tpp_close';
    } else {
      this.cameraViewMode = 'tpp_wide';
    }
    return this.cameraViewMode;
  }

  // Free Fire signature Red Aim Assist: Crosshair turns RED when targeting enemy!
  private updateAimAssist() {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    const ray = raycaster.ray;

    let onEnemy = false;
    let onHead = false;

    for (const b of this.bots) {
      if (b.data.hp <= 0) continue;
      const headPos = new THREE.Vector3(b.mesh.position.x, 2.7, b.mesh.position.z);
      const bodyPos = new THREE.Vector3(b.mesh.position.x, 1.7, b.mesh.position.z);

      if (ray.distanceToPoint(headPos) < 1.0) {
        onEnemy = true;
        onHead = true;
        break;
      } else if (ray.distanceToPoint(bodyPos) < 1.6) {
        onEnemy = true;
        break;
      }
    }

    if (this.aimingAtEnemy !== onEnemy || this.aimingAtHead !== onHead) {
      this.aimingAtEnemy = onEnemy;
      this.aimingAtHead = onHead;
      this.callbacks.onCrosshairTarget(onEnemy, onHead);
    }
  }

  // Safe Zone Collapse & Electric Storm Damage
  private updateZone(delta: number) {
    this.zone.timeRemaining -= delta;

    if (this.zone.timeRemaining <= 0) {
      if (!this.zone.isShrinking) {
        this.zone.isShrinking = true;
        this.zone.timeRemaining = 45; // shrink duration
        soundEngine.playZoneWarning();
      } else {
        // Next phase
        this.zone.isShrinking = false;
        this.zone.phase++;
        this.zone.currentRadius = this.zone.targetRadius;
        this.zone.targetRadius = Math.max(25, this.zone.targetRadius * 0.55);
        this.zone.timeRemaining = 60; // wait duration
        this.zone.dps += 3;
      }
    }

    if (this.zone.isShrinking) {
      const shrinkSpeed = (this.zone.currentRadius - this.zone.targetRadius) / 45;
      this.zone.currentRadius = Math.max(this.zone.targetRadius, this.zone.currentRadius - shrinkSpeed * delta);
    }

    // Scale 3D zone mesh
    const scale = this.zone.currentRadius / 280;
    this.zoneMesh.scale.set(scale, 1, scale);

    this.callbacks.onZoneUpdate({ ...this.zone });

    // Check if player is outside safe zone
    const distToCenter = Math.sqrt(
      Math.pow(this.playerMesh.position.x - this.zone.centerX, 2) +
      Math.pow(this.playerMesh.position.z - this.zone.centerZ, 2)
    );

    if (distToCenter > this.zone.currentRadius && !this.isSkydiving) {
      const stormDmg = this.zone.dps * delta;
      // Storm damages EP first, then HP
      if (this.ep > 0) {
        this.ep = Math.max(0, this.ep - stormDmg * 1.5);
        this.callbacks.onEpChange(Math.round(this.ep), this.maxEp);
      } else {
        this.hp = Math.max(0, this.hp - stormDmg);
        this.callbacks.onHealthChange(Math.round(this.hp), this.maxHp);
        if (this.hp <= 0) {
          this.triggerDefeat('Safe Zone Play Zone');
        }
      }
    }
  }

  // Dynamic Bot AI combat, roaming, shooting & battles
  private updateBots(delta: number) {
    const now = Date.now();

    for (let i = 0; i < this.bots.length; i++) {
      const bot = this.bots[i];
      if (bot.data.hp <= 0) continue;

      const botPos = bot.mesh.position;
      const distToPlayer = botPos.distanceTo(this.playerMesh.position);

      // Bot faces movement / player
      if (distToPlayer < 45 && !this.isDead && !this.isSkydiving) {
        // Attack player!
        bot.data.state = 'attacking';
        bot.mesh.lookAt(this.playerMesh.position.x, botPos.y, this.playerMesh.position.z);

        // Fire at player periodically
        if (now - bot.data.lastShotTime > 1100 + Math.random() * 800) {
          bot.data.lastShotTime = now;
          soundEngine.playGunshot(bot.data.weapon.category, true);

          // Hit chance depends on distance and player crouching/sprinting
          const hitChance = distToPlayer < 20 ? 0.35 : 0.18;
          if (Math.random() < hitChance) {
            let dmg = Math.round(bot.data.weapon.damage * (0.6 + Math.random() * 0.4));
            // Apply vest armor reduction
            if (this.vestLevel > 0) {
              const reduction = this.vestLevel * 0.12;
              dmg = Math.round(dmg * (1 - reduction));
            }

            this.hp = Math.max(0, this.hp - dmg);
            this.callbacks.onHealthChange(Math.round(this.hp), this.maxHp);

            if (this.hp <= 0) {
              this.triggerDefeat(bot.data.name);
              return;
            }
          }
        }
      } else {
        // Roam around island
        bot.data.state = 'wandering';
        const targetVector = new THREE.Vector3(bot.data.targetX - botPos.x, 0, bot.data.targetZ - botPos.z);
        if (targetVector.length() < 3) {
          bot.data.targetX = botPos.x + (Math.random() - 0.5) * 60;
          bot.data.targetZ = botPos.z + (Math.random() - 0.5) * 60;
        } else {
          targetVector.normalize();
          botPos.x += targetVector.x * 4.5 * delta;
          botPos.z += targetVector.z * 4.5 * delta;
          bot.mesh.lookAt(bot.data.targetX, botPos.y, bot.data.targetZ);
        }

        // Random bot-vs-bot skirmishes to populate the killfeed!
        if (Math.random() < 0.003 && this.getAliveCount() > 5) {
          const victimIndex = (i + 1) % this.bots.length;
          const victim = this.bots[victimIndex];
          if (victim && victim.data.hp > 0 && victim.data.id !== bot.data.id) {
            victim.data.hp = 0;
            this.scene.remove(victim.mesh);
            const isHeadshot = Math.random() < 0.3;
            this.callbacks.onKillFeed(
              bot.data.name,
              victim.data.name,
              bot.data.weapon.name,
              isHeadshot,
              false,
              false
            );
            this.callbacks.onAliveCountChange(this.getAliveCount());
          }
        }
      }
    }
  }

  // Automatic Loot Pickup when walking near items
  private checkLootPickup() {
    if (this.isSkydiving) return;

    for (let i = this.lootItems.length - 1; i >= 0; i--) {
      const item = this.lootItems[i];
      const dist = this.playerMesh.position.distanceTo(new THREE.Vector3(item.data.x, 0, item.data.z));

      if (dist < 2.5) {
        soundEngine.playClick();

        if (item.data.type === 'gloo_wall') {
          this.glooWalls += 2;
          this.callbacks.onGlooWallCountChange(this.glooWalls);
        } else if (item.data.type === 'medkit') {
          this.medkits += 2;
          this.callbacks.onMedkitCountChange(this.medkits);
        } else if (item.data.type === 'armor') {
          this.vestLevel = Math.min(4, this.vestLevel + 1);
          this.helmetLevel = Math.min(4, this.helmetLevel + 1);
          this.callbacks.onArmorChange(this.vestLevel, this.helmetLevel);
        } else if (item.data.type === 'weapon' && item.data.weaponData) {
          // Replace secondary slot or fill ammo
          this.weapons[1] = { ...item.data.weaponData };
          this.callbacks.onAmmoChange(this.weapons[this.currentWeaponIndex].currentAmmo, this.weapons[this.currentWeaponIndex].reserveAmmo);
        }

        // Remove item from scene
        this.scene.remove(item.mesh);
        this.lootItems.splice(i, 1);
      } else {
        // Rotate loot item
        item.mesh.rotation.y += 0.02;
      }
    }
  }

  public getPlayerPosition() {
    return {
      x: this.playerMesh ? this.playerMesh.position.x : 0,
      z: this.playerMesh ? this.playerMesh.position.z : 0,
      yaw: this.yaw,
    };
  }
}
