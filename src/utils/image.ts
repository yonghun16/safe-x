const MAX_FILE_SIZE_MB = 5;

export const compressImageToBase64 = (
  file: File,
  maxWidth = 800,
  quality = 0.7
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('이미지 파일만 업로드할 수 있습니다.'));
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      reject(new Error(`이미지는 ${MAX_FILE_SIZE_MB}MB 이하만 업로드할 수 있습니다.`));
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = Math.min(1, maxWidth / img.width);

      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const context = canvas.getContext('2d');
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('이미지 처리에 실패했습니다.'));
        return;
      }

      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);

      const base64 = canvas.toDataURL('image/jpeg', quality);
      resolve(base64);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('이미지를 불러올 수 없습니다.'));
    };

    img.src = objectUrl;
  });
};

export const estimateBase64SizeKB = (base64: string): number => {
  const base64Length = base64.split(',')[1]?.length ?? base64.length;
  return Math.round((base64Length * 3) / 4 / 1024);
};
