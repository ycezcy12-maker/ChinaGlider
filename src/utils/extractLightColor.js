export function extractLightColor(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const sampleWidth = Math.min(img.naturalWidth, 400);
      const sampleHeight = Math.min(Math.floor(img.naturalHeight * 0.4), 220);
      canvas.width = sampleWidth;
      canvas.height = sampleHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);

      let data;
      try {
        data = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
      } catch {
        resolve('242, 232, 218');
        return;
      }

      let totalR = 0, totalG = 0, totalB = 0, count = 0;
      const step = 4 * 6;

      for (let i = 0; i < data.length; i += step) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        if (brightness > 30) {
          totalR += r;
          totalG += g;
          totalB += b;
          count++;
        }
      }

      if (count === 0) {
        resolve('242, 232, 218');
        return;
      }

      const avgR = totalR / count;
      const avgG = totalG / count;
      const avgB = totalB / count;

      const lightenFactor = 0.78;
      const lightR = Math.round(avgR + (255 - avgR) * lightenFactor);
      const lightG = Math.round(avgG + (255 - avgG) * lightenFactor);
      const lightB = Math.round(avgB + (255 - avgB) * lightenFactor);

      resolve(`${lightR}, ${lightG}, ${lightB}`);
    };
    img.onerror = () => resolve('242, 232, 218');
    img.src = imageUrl;
  });
}
