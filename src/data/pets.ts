import { Pet } from '../types/game';

export const PETS: Pet[] = [
  {
    id: 'mr_waggor',
    name: 'Mr. Waggor',
    species: 'Penguin',
    skillName: 'Smooth Gloo',
    skillDescription: 'When the player has less than 2 Gloo Walls, Mr. Waggor produces 1 Gloo Wall grenade every 35 seconds.',
    icon: '🐧',
    cooldown: 35,
  },
  {
    id: 'falco',
    name: 'Falco',
    species: 'Falcon',
    skillName: 'Skyline Spree',
    skillDescription: 'Increases gliding speed by 25% upon jumping from the plane and parachute opening descent speed by 35%.',
    icon: '🦅',
    cooldown: 0,
  },
  {
    id: 'ottero',
    name: 'Ottero',
    species: 'Otter',
    skillName: 'Double Blubber',
    skillDescription: 'When using a Medkit or Inhaler, restores bonus EP equal to 65% of the HP recovered.',
    icon: '🦦',
    cooldown: 0,
  },
];
