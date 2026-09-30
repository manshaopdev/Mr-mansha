// @ts-ignore
import lamejs from 'lamejs';

/**
 * Parses WAV file buffer and encodes PCM samples into high quality MP3 format
 */
export function convertWavToMp3(wavBuffer: ArrayBuffer | Uint8Array): {
  mp3Blob: Blob;
  mp3DataUrl: string;
} {
  const uint8Array = wavBuffer instanceof Uint8Array ? wavBuffer : new Uint8Array(wavBuffer);
  const dataView = new DataView(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength);

  // Parse standard WAV header
  // RIFF at 0..3, WAVE at 8..11, fmt at 12..15
  let numChannels = 1;
  let sampleRate = 24000;
  let bitsPerSample = 16;
  let dataOffset = 44;

  try {
    numChannels = dataView.getUint16(22, true);
    sampleRate = dataView.getUint32(24, true);
    bitsPerSample = dataView.getUint16(34, true);

    // Find the 'data' chunk
    let offset = 12;
    while (offset < uint8Array.length - 8) {
      const chunkId = String.fromCharCode(
        uint8Array[offset],
        uint8Array[offset + 1],
        uint8Array[offset + 2],
        uint8Array[offset + 3]
      );
      const chunkSize = dataView.getUint32(offset + 4, true);
      if (chunkId === 'data') {
        dataOffset = offset + 8;
        break;
      }
      offset += 8 + chunkSize;
    }
  } catch (err) {
    console.warn('[AudioEncoder] Fallback to default WAV header offset (44):', err);
    dataOffset = 44;
  }

  // Extract Int16 PCM samples
  const pcmBytes = uint8Array.subarray(dataOffset);
  const numSamples = Math.floor(pcmBytes.length / (bitsPerSample / 8));
  const samples = new Int16Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const byteIdx = i * 2;
    if (byteIdx + 1 < pcmBytes.length) {
      // 16-bit little endian
      samples[i] = pcmBytes[byteIdx] | (pcmBytes[byteIdx + 1] << 8);
    }
  }

  // Encode with lamejs
  const channels = Math.min(Math.max(numChannels, 1), 2);
  const kbps = 128; // High quality MP3 bitrate
  // @ts-ignore
  const mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);

  const mp3Chunks: Uint8Array[] = [];
  const sampleBlockSize = 1152; // LAME standard frame size

  for (let i = 0; i < samples.length; i += sampleBlockSize) {
    const sampleChunk = samples.subarray(i, i + sampleBlockSize);
    let mp3buf: Int8Array;
    if (channels === 2) {
      // De-interleave if stereo
      const left = new Int16Array(sampleChunk.length / 2);
      const right = new Int16Array(sampleChunk.length / 2);
      for (let j = 0; j < sampleChunk.length / 2; j++) {
        left[j] = sampleChunk[j * 2];
        right[j] = sampleChunk[j * 2 + 1];
      }
      mp3buf = mp3encoder.encodeBuffer(left, right);
    } else {
      mp3buf = mp3encoder.encodeBuffer(sampleChunk);
    }

    if (mp3buf.length > 0) {
      mp3Chunks.push(new Uint8Array(mp3buf.buffer, mp3buf.byteOffset, mp3buf.length));
    }
  }

  const endBuf: Int8Array = mp3encoder.flush();
  if (endBuf.length > 0) {
    mp3Chunks.push(new Uint8Array(endBuf.buffer, endBuf.byteOffset, endBuf.length));
  }

  const mp3Blob = new Blob(mp3Chunks as any, { type: 'audio/mp3' });
  const mp3DataUrl = URL.createObjectURL(mp3Blob);

  return { mp3Blob, mp3DataUrl };
}

/**
 * Triggers a direct MP3 download in browser reliably across all browsers and devices
 */
export function downloadMp3File(blobOrUrl: Blob | string, filename: string) {
  let objectUrl: string;
  let shouldRevoke = false;

  if (blobOrUrl instanceof Blob) {
    objectUrl = URL.createObjectURL(blobOrUrl);
    shouldRevoke = true;
  } else if (typeof blobOrUrl === 'string' && blobOrUrl.startsWith('data:')) {
    // Convert base64 data URL to Blob for reliable large file download in all browsers/iframes
    try {
      const parts = blobOrUrl.split(',');
      const mime = parts[0].match(/:(.*?);/)?.[1] || 'audio/mp3';
      const binaryStr = atob(parts[1]);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      
      // If input was WAV, quickly encode to genuine MP3
      if (mime.includes('wav')) {
        try {
          const { mp3Blob } = convertWavToMp3(bytes);
          objectUrl = URL.createObjectURL(mp3Blob);
          shouldRevoke = true;
        } catch {
          const blob = new Blob([bytes], { type: 'audio/mp3' });
          objectUrl = URL.createObjectURL(blob);
          shouldRevoke = true;
        }
      } else {
        const blob = new Blob([bytes], { type: 'audio/mp3' });
        objectUrl = URL.createObjectURL(blob);
        shouldRevoke = true;
      }
    } catch {
      objectUrl = blobOrUrl;
    }
  } else {
    objectUrl = blobOrUrl;
  }

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename.endsWith('.mp3') ? filename : `${filename}.mp3`;
  link.target = '_self';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (shouldRevoke) {
    setTimeout(() => {
      try {
        URL.revokeObjectURL(objectUrl);
      } catch {}
    }, 15000);
  }
}
