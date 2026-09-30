import React from 'react';
import { Pet } from '../../types/game';
import { PETS } from '../../data/pets';
import { X, Check } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

interface PetModalProps {
  selectedPet: Pet;
  onSelectPet: (pet: Pet) => void;
  onClose: () => void;
}

export const PetModal: React.FC<PetModalProps> = ({
  selectedPet,
  onSelectPet,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-rajdhani select-none animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#12141a] border-2 border-amber-500/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-neutral-900 to-amber-950/40">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐧</span>
            <h2 className="text-2xl font-russo text-ff-gold tracking-wider">COMPANION PETS</h2>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {PETS.map((pet) => {
            const isSelected = selectedPet.id === pet.id;
            return (
              <div
                key={pet.id}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectPet(pet);
                }}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-950/50 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-102'
                    : 'bg-neutral-900/80 border-white/10 hover:border-amber-400/50'
                }`}
              >
                <div>
                  <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-400/50 flex items-center justify-center text-5xl mb-4 shadow">
                    {pet.icon}
                  </div>
                  <h3 className="font-russo text-xl text-white text-center mb-1">{pet.name}</h3>
                  <p className="text-xs font-chakra font-bold text-amber-400 text-center uppercase mb-3">
                    {pet.skillName}
                  </p>
                  <p className="text-xs font-rajdhani text-white/70 text-center leading-relaxed">
                    {pet.skillDescription}
                  </p>
                </div>

                <button
                  className={`mt-4 w-full py-2 rounded-lg font-russo text-xs uppercase transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-black shadow'
                      : 'bg-neutral-800 text-white/70 hover:bg-neutral-700'
                  }`}
                >
                  {isSelected ? 'EQUIPPED' : 'EQUIP PET'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
