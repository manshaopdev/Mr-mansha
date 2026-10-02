// Polyfill lamejs internal global requirements in browser and Node environments
function MPEGModePolyfill(this: any, ordinal: number) {
  this.ordinal = function() { return ordinal; };
}
(MPEGModePolyfill as any).STEREO = new (MPEGModePolyfill as any)(0);
(MPEGModePolyfill as any).JOINT_STEREO = new (MPEGModePolyfill as any)(1);
(MPEGModePolyfill as any).DUAL_CHANNEL = new (MPEGModePolyfill as any)(2);
(MPEGModePolyfill as any).MONO = new (MPEGModePolyfill as any)(3);
(MPEGModePolyfill as any).NOT_SET = new (MPEGModePolyfill as any)(4);

const LamePolyfill: any = function() {};
LamePolyfill.LAME_MAXMP3BUFFER = 16384;

if (typeof window !== 'undefined') {
  (window as any).MPEGMode = (window as any).MPEGMode || MPEGModePolyfill;
  (window as any).Lame = (window as any).Lame || LamePolyfill;
  (window as any).Lame.LAME_MAXMP3BUFFER = 16384;
}
if (typeof globalThis !== 'undefined') {
  (globalThis as any).MPEGMode = (globalThis as any).MPEGMode || MPEGModePolyfill;
  (globalThis as any).Lame = (globalThis as any).Lame || LamePolyfill;
  (globalThis as any).Lame.LAME_MAXMP3BUFFER = 16384;
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
