/* Image conversion worker
   Receives: { type: 'convert', fileBuffer: ArrayBuffer, fileType: string, targetType: string, quality: number }
   Posts progress events: { type: 'progress', progress: number, message?: string }
   Posts result: { type: 'result', buffer: ArrayBuffer, mime: string }
   Posts error: { type: 'error', message: string }
*/

self.onmessage = async (e) => {
  const data = e.data || {};
  if (data.type !== 'convert') return;
  try {
    postMessage({ type: 'progress', progress: 5, message: 'Starting...' });
    const { fileBuffer, fileType, targetType, quality } = data;
    const blob = new Blob([fileBuffer], { type: fileType });

    // decode / create bitmap
    let bitmap;
    try {
      bitmap = await createImageBitmap(blob);
    } catch (err) {
      // Some environments may not support createImageBitmap for certain blobs
      postMessage({ type: 'error', message: 'Decoding failed in worker.' });
      return;
    }
    postMessage({ type: 'progress', progress: 30, message: 'Image decoded' });

    // Create offscreen canvas
    if (typeof OffscreenCanvas === 'undefined') {
      postMessage({ type: 'error', message: 'OffscreenCanvas not supported in this browser.' });
      return;
    }
    const width = bitmap.width;
    const height = bitmap.height;
    const off = new OffscreenCanvas(width, height);
    const ctx = off.getContext('2d');
    if (!ctx) {
      postMessage({ type: 'error', message: 'Could not get rendering context in worker.' });
      return;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    postMessage({ type: 'progress', progress: 60, message: 'Drawing complete' });

        // Special case: export to SVG by embedding the original bitmap as base64
        if (targetType === 'svg') {
          // convert the original fileBuffer to base64 safely in chunks
          function arrayBufferToBase64(buffer) {
            const bytes = new Uint8Array(buffer);
            const chunkSize = 0x8000;
            let binary = '';
            for (let i = 0; i < bytes.length; i += chunkSize) {
              binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
            }
            return btoa(binary);
          }
          const base64 = arrayBufferToBase64(fileBuffer);
          const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${bitmap.width}" height="${bitmap.height}"><image href="data:${fileType};base64,${base64}" width="${bitmap.width}" height="${bitmap.height}" preserveAspectRatio="none" /></svg>`;
          const outBlob = new Blob([svg], { type: 'image/svg+xml' });
          postMessage({ type: 'progress', progress: 95, message: 'Creating SVG' });
          const buffer = await outBlob.arrayBuffer();
          postMessage({ type: 'result', buffer, mime: 'image/svg+xml' }, [buffer]);
          return;
        }

        let mime = 'image/jpeg';
        if (targetType === 'webp') mime = 'image/webp';
        else if (targetType === 'png') mime = 'image/png';
        // convert to blob (encoding step)
        const outBlob = await off.convertToBlob({ type: mime, quality });
        postMessage({ type: 'progress', progress: 95, message: 'Encoding' });

        const buffer = await outBlob.arrayBuffer();
        // Transfer the buffer back to main thread for minimal copy
        postMessage({ type: 'result', buffer, mime }, [buffer]);
  } catch (err) {
    postMessage({ type: 'error', message: String(err) });
  }
};
