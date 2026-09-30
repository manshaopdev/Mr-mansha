/**
 * Utility to safely detect WebGL support without throwing unhandled exceptions.
 */
export function isWebGLAvailable(): boolean {
  try {
    if (!window.WebGLRenderingContext) {
      return false;
    }
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl') ||
      canvas.getContext('webgl2');

    return !!(gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
}
