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
