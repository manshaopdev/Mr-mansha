import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Character, Weapon, Pet } from '../../types/game';
import { isWebGLAvailable } from '../../utils/webgl';
import { Shield, Zap, Sparkles } from 'lucide-react';

interface Lobby3DCharacterProps {
  character: Character;
  weapon: Weapon;
  pet: Pet;
}

export const Lobby3DCharacter: React.FC<Lobby3DCharacterProps> = ({
  character,
  weapon,
  pet,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 1. Initial check
    if (!isWebGLAvailable()) {
      setWebglSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number = 0;

    try {
      const width = container.clientWidth || 360;
      const height = container.clientHeight || 520;

      // Scene & Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 1.8, 5.0);
      camera.lookAt(0, 1.4, 0);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambientLight);

      const spotLight = new THREE.SpotLight(0xffd700, 3.5);
      spotLight.position.set(2, 6, 4);
      spotLight.angle = 0.6;
      spotLight.penumbra = 0.5;
      spotLight.castShadow = true;
      scene.add(spotLight);

      const rimLight = new THREE.DirectionalLight(0x00f0ff, 2.0);
      rimLight.position.set(-3, 3, -3);
      scene.add(rimLight);

      // Platform / Battle Podium
      const podiumGroup = new THREE.Group();
      const diskGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.25, 32);
      const diskMat = new THREE.MeshStandardMaterial({
        color: 0x1f232b,
        metalness: 0.8,
        roughness: 0.2,
      });
      const disk = new THREE.Mesh(diskGeo, diskMat);
      disk.position.y = -0.12;
      disk.receiveShadow = true;
      podiumGroup.add(disk);

      // Glowing Neon Ring on Podium
      const ringGeo = new THREE.RingGeometry(1.4, 1.55, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.01;
      podiumGroup.add(ring);
      scene.add(podiumGroup);

      // Character Group
      const charGroup = new THREE.Group();
      charGroup.position.y = 0;

      // Head
      const headGeo = new THREE.BoxGeometry(0.55, 0.65, 0.55);
      const skinColor = 0xf5c396;
      const headMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.6 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 2.55;
      head.castShadow = true;
      charGroup.add(head);

      // Hair / Crown
      if (character.id === 'mk_king') {
        const crownGeo = new THREE.ConeGeometry(0.45, 0.35, 6);
        const crownMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
        const crown = new THREE.Mesh(crownGeo, crownMat);
        crown.position.y = 2.95;
        crown.castShadow = true;
        charGroup.add(crown);
      } else if (character.id === 'dj_alok') {
        const hpGeo = new THREE.TorusGeometry(0.35, 0.08, 8, 24, Math.PI);
        const hpMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2 });
        const headphones = new THREE.Mesh(hpGeo, hpMat);
        headphones.rotation.z = Math.PI;
        headphones.position.y = 2.65;
        charGroup.add(headphones);
      } else if (character.id === 'hayato') {
        const bandGeo = new THREE.TorusGeometry(0.32, 0.05, 6, 16);
        const bandMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
        const headband = new THREE.Mesh(bandGeo, bandMat);
        headband.rotation.x = Math.PI / 2;
        headband.position.y = 2.65;
        charGroup.add(headband);
      }

      // Torso / Tactical Jacket
      const torsoGeo = new THREE.BoxGeometry(0.95, 1.25, 0.55);
      const hexColor = parseInt(character.avatarColor.replace('#', '0x')) || 0xd97706;
      const torsoMat = new THREE.MeshStandardMaterial({ color: hexColor, roughness: 0.5 });
      const torso = new THREE.Mesh(torsoGeo, torsoMat);
      torso.position.y = 1.65;
      torso.castShadow = true;
      charGroup.add(torso);

      // Tactical Backpack
      const packGeo = new THREE.BoxGeometry(0.65, 0.8, 0.35);
      const packMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.8 });
      const pack = new THREE.Mesh(packGeo, packMat);
      pack.position.set(0, 1.65, -0.42);
      charGroup.add(pack);

      // Signature Free Fire Pan on back!
      const panGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.08, 16);
      const panMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.8, roughness: 0.2 });
      const pan = new THREE.Mesh(panGeo, panMat);
      pan.rotation.x = Math.PI / 2;
      pan.position.set(0, 1.7, -0.62);
      charGroup.add(pan);

      // Legs
      const legGeo = new THREE.BoxGeometry(0.36, 1.1, 0.38);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.7 });

      const leftLeg = new THREE.Mesh(legGeo, legMat);
      leftLeg.position.set(-0.25, 0.55, 0);
      leftLeg.castShadow = true;
      charGroup.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, legMat);
      rightLeg.position.set(0.25, 0.55, 0);
      rightLeg.castShadow = true;
      charGroup.add(rightLeg);

      // Boots
      const bootGeo = new THREE.BoxGeometry(0.38, 0.25, 0.45);
      const bootMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 });
      const leftBoot = new THREE.Mesh(bootGeo, bootMat);
      leftBoot.position.set(-0.25, 0.1, 0.05);
      charGroup.add(leftBoot);

      const rightBoot = new THREE.Mesh(bootGeo, bootMat);
      rightBoot.position.set(0.25, 0.1, 0.05);
      charGroup.add(rightBoot);

      // Arms
      const armGeo = new THREE.BoxGeometry(0.28, 1.1, 0.3);
      const armMat = new THREE.MeshStandardMaterial({ color: hexColor, roughness: 0.5 });

      const leftArm = new THREE.Mesh(armGeo, armMat);
      leftArm.position.set(-0.68, 1.6, 0);
      leftArm.castShadow = true;
      charGroup.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, armMat);
      rightArm.position.set(0.68, 1.6, 0.15);
      rightArm.rotation.x = -Math.PI / 6;
      rightArm.castShadow = true;
      charGroup.add(rightArm);

      // Weapon in right hand
      const gunColor = weapon.color ? parseInt(weapon.color.replace('#', '0x')) : 0xff2222;
      const gunGeo = new THREE.BoxGeometry(0.14, 0.22, 1.2);
      const gunMat = new THREE.MeshStandardMaterial({ color: gunColor, metalness: 0.8, roughness: 0.2 });
      const gun = new THREE.Mesh(gunGeo, gunMat);
      gun.position.set(0.68, 1.45, 0.6);
      gun.castShadow = true;
      charGroup.add(gun);

      scene.add(charGroup);

      // Pet Companion floating beside player
      const petGroup = new THREE.Group();
      petGroup.position.set(-1.4, 0.6, 0.4);

      const petBodyGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const petMat = new THREE.MeshStandardMaterial({
        color: pet.id === 'mr_waggor' ? 0x0284c7 : pet.id === 'falco' ? 0xeab308 : 0xec4899,
        roughness: 0.3,
      });
      const petBody = new THREE.Mesh(petBodyGeo, petMat);
      petBody.castShadow = true;
      petGroup.add(petBody);
      scene.add(petGroup);

      // Interactive Drag rotation
      let isDragging = false;
      let prevMouseX = 0;

      const onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        prevMouseX = e.clientX;
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouseX;
        charGroup.rotation.y += deltaX * 0.015;
        podiumGroup.rotation.y += deltaX * 0.015;
        prevMouseX = e.clientX;
      };

      const onPointerUp = () => {
        isDragging = false;
      };

      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);

      // Render Loop
      const clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        torso.position.y = 1.65 + Math.sin(t * 2) * 0.015;
        head.position.y = 2.55 + Math.sin(t * 2) * 0.015;
        gun.position.y = 1.45 + Math.sin(t * 2) * 0.02;
        petGroup.position.y = 0.4 + Math.sin(t * 3) * 0.08;

        if (!isDragging) {
          charGroup.rotation.y += 0.003;
          podiumGroup.rotation.y += 0.003;
        }

        if (renderer) {
          renderer.render(scene, camera);
        }
      };
      animate();

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 360;
        const h = container.clientHeight || 520;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animId);
        container.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('WebGL context creation failed in Lobby3DCharacter, switching to 2.5D Hero Standee:', err);
      setWebglSupported(false);
      if (renderer) {
        try {
          renderer.dispose();
        } catch (_) {}
      }
    }
  }, [character, weapon, pet]);

  // Handle pointer tilt for 2.5D fallback
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // If WebGL is not available, render the vibrant 2.5D Free Fire Character Standee
  if (!webglSupported) {
    return (
      <div
        className="relative w-full h-full flex flex-col items-center justify-center p-4 select-none cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Pet Companion */}
        <div className="absolute top-8 left-8 z-30 bg-black/80 border border-amber-500/50 p-2.5 rounded-2xl flex items-center gap-2 shadow-2xl backdrop-blur-md animate-bounce">
          <span className="text-3xl">{pet.icon}</span>
          <div>
            <span className="text-xs font-russo text-white block">{pet.name}</span>
            <span className="text-[10px] font-chakra text-amber-300 font-bold">{pet.skillName}</span>
          </div>
        </div>

        {/* 2.5D Perspective Hero Card */}
        <div
          className="relative w-72 h-[420px] rounded-3xl p-6 flex flex-col items-center justify-between border-2 transition-transform duration-150 ease-out shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          style={{
            transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${isHovered ? 1.03 : 1.0})`,
            borderColor: character.avatarColor,
            background: `radial-gradient(circle at 50% 20%, ${character.avatarColor}33 0%, rgba(10,12,18,0.95) 75%)`,
            boxShadow: `0 0 40px ${character.avatarColor}40`,
          }}
        >
          {/* Top Badge: Hero Tier */}
          <div className="flex items-center justify-between w-full">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-chakra font-extrabold uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              ELITE HERO
            </span>
            <span className="text-[10px] font-chakra text-white/50 uppercase tracking-wider">
              LEVEL 60
            </span>
          </div>

          {/* Hero Avatar Centerpiece */}
          <div className="relative flex flex-col items-center my-auto">
            {/* Glowing Aura Rings */}
            <div
              className="absolute w-44 h-44 rounded-full animate-ping opacity-25"
              style={{ backgroundColor: character.avatarColor }}
            />
            <div
              className="w-36 h-36 rounded-full border-4 flex items-center justify-center text-7xl shadow-2xl relative z-10 transition-transform duration-300"
              style={{
                borderColor: character.avatarColor,
                backgroundColor: `${character.avatarColor}30`,
                boxShadow: `0 0 35px ${character.avatarColor}80`,
              }}
            >
              {character.icon}
            </div>

            {/* Equipped Weapon Overlay */}
            <div className="mt-3 flex items-center gap-2 bg-black/80 border border-white/20 px-3 py-1 rounded-xl shadow-lg backdrop-blur-md">
              <span className="text-base">🔫</span>
              <span className="text-xs font-russo text-white">{weapon.name}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-chakra font-bold">
                {weapon.skinTier}
              </span>
            </div>
          </div>

          {/* Bottom Hero Info */}
          <div className="w-full text-center bg-black/60 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
            <div className="flex items-center justify-center gap-1 text-xs font-chakra font-bold text-amber-400">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>SKILL: {character.skillName}</span>
            </div>
            <p className="text-[11px] font-chakra text-white/70 mt-1 line-clamp-2">
              {character.skillDesc}
            </p>
          </div>
        </div>

        {/* Golden Glowing Podium Stand */}
        <div className="relative w-72 h-10 mt-2 flex items-center justify-center">
          <div
            className="w-64 h-7 rounded-[50%] border-2 shadow-[0_0_30px_rgba(245,158,11,0.5)] bg-gradient-to-b from-amber-500/20 to-black/80"
            style={{ borderColor: character.avatarColor }}
          />
        </div>

        <div className="text-[10px] font-chakra text-amber-400/80 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-amber-500/30 mt-1">
          ✦ HERO SHOWCASE • INTERACTIVE 2.5D
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 text-center pointer-events-none">
        <span className="text-[11px] font-chakra text-amber-400/80 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-amber-500/30">
          ↻ DRAG TO ROTATE 3D CHARACTER
        </span>
      </div>
    </div>
  );
};
