export function extractLightColor(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const sampleWidth = Math.min(img.naturalWidth, 300);
      const sampleHeight = Math.min(Math.floor(img.naturalHeight * 0.3), 150);
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
        totalR += data[i];
        totalG += data[i + 1];
        totalB += data[i + 2];
        count++;
      }

      if (count === 0) {
        resolve('242, 232, 218');
        return;
      }

      const avgR = totalR / count;
      const avgG = totalG / count;
      const avgB = totalB / count;

      const lighten = (c) => Math.round(c + (255 - c) * 0.3);
      const r = lighten(avgR);
      const g = lighten(avgG);
      const b = lighten(avgB);

      resolve(`${r}, ${g}, ${b}`);
    };
    img.onerror = () => resolve('242, 232, 218');
    img.src = imageUrl;
  });
}
