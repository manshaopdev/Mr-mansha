import React, { useState } from 'react';
import { X, Volume2, VolumeX, Sliders, Smartphone, Crosshair } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [generalSens, setGeneralSens] = useState(75);
  const [redDotSens, setRedDotSens] = useState(85);
  const [scope4xSens, setScope4xSens] = useState(65);
  const [awmSens, setAwmSens] = useState(50);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-rajdhani select-none animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#14161f] border-2 border-amber-500/70 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/30 bg-neutral-900">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-russo text-white tracking-wider">SETTINGS & SENSITIVITY</h2>
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
        <div className="p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
          {/* Audio Setting */}
          <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMuted ? <VolumeX className="w-6 h-6 text-red-400" /> : <Volume2 className="w-6 h-6 text-emerald-400" />}
              <div>
                <h4 className="font-russo text-white text-base">GAME AUDIO & SFX</h4>
                <p className="text-xs font-chakra text-white/50">Gunshots, Booyah fanfare, Gloo Wall & steps</p>
              </div>
            </div>
            <button
              onClick={handleToggleMute}
              className={`px-4 py-2 rounded-lg font-russo text-xs transition-all cursor-pointer ${
                isMuted ? 'bg-red-900/80 text-red-200 border border-red-500' : 'bg-emerald-600 text-white shadow-lg'
              }`}
            >
              {isMuted ? 'MUTED' : 'ENABLED'}
            </button>
          </div>

          {/* Sensitivity Sliders */}
          <div className="flex flex-col gap-4 bg-black/50 border border-white/10 rounded-xl p-4">
            <h4 className="font-russo text-amber-400 text-sm tracking-wider flex items-center gap-2">
              <Crosshair className="w-4 h-4" /> BATTLE ROYALE SENSITIVITY (DRAG HEADSHOT)
            </h4>

            {/* General */}
            <div>
              <div className="flex justify-between text-xs font-chakra font-bold text-white/80 mb-1">
                <span>GENERAL CAMERA</span>
                <span className="text-amber-400">{generalSens}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={generalSens}
                onChange={(e) => setGeneralSens(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Red Dot Aim Assist */}
            <div>
              <div className="flex justify-between text-xs font-chakra font-bold text-white/80 mb-1">
                <span>RED DOT AIM ASSIST</span>
                <span className="text-red-400">{redDotSens}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={redDotSens}
                onChange={(e) => setRedDotSens(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
            </div>

            {/* 4x Scope */}
            <div>
              <div className="flex justify-between text-xs font-chakra font-bold text-white/80 mb-1">
                <span>4x SCOPE OPTIC</span>
                <span className="text-sky-400">{scope4xSens}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={scope4xSens}
                onChange={(e) => setScope4xSens(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* AWM Sniper */}
            <div>
              <div className="flex justify-between text-xs font-chakra font-bold text-white/80 mb-1">
                <span>AWM SNIPER SCOPE</span>
                <span className="text-purple-400">{awmSens}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={awmSens}
                onChange={(e) => setAwmSens(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="clip-ff-btn bg-amber-500 hover:bg-amber-400 text-black font-russo text-sm py-3 cursor-pointer transition-all active:scale-98"
          >
            SAVE PREFERENCES
          </button>
        </div>
      </div>
    </div>
  );
};
