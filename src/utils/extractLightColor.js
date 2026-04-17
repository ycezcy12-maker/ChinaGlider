export function extractLightColor(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const sampleWidth = Math.min(img.naturalWidth, 400);
      const sampleHeight = Math.min(Math.floor(img.naturalHeight * 0.35), 200);
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

      let lightestBrightness = -1;
      let lightestR = 242, lightestG = 232, lightestB = 218;
      const step = 4 * 8;

      for (let i = 0; i < data.length; i += step) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        if (brightness > lightestBrightness) {
          lightestBrightness = brightness;
          lightestR = r;
          lightestG = g;
          lightestB = b;
        }
      }

      resolve(`${lightestR}, ${lightestG}, ${lightestB}`);
    };
    img.onerror = () => resolve('242, 232, 218');
    img.src = imageUrl;
  });
}
