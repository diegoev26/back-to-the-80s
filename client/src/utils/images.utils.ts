import type { GoogleDriveImage } from "@project/shared";

export const validateDriveImage = (
  file: GoogleDriveImage,
  getUrlCandidates: (file: GoogleDriveImage) => string[],
): Promise<string | null> => {
  const cacheKey = `drive_url_valid:${file.id}`;

  return new Promise((resolve) => {
    if (typeof window !== "undefined") {
      const cachedUrl = sessionStorage.getItem(cacheKey);
      if (cachedUrl) {
        if (cachedUrl === "FAILED") resolve(null);
        else resolve(cachedUrl);
        return;
      }
    }

    const candidates = getUrlCandidates(file);
    let index = 0;

    const tryNext = () => {
      if (index >= candidates.length) {
        if (typeof window !== "undefined")
          sessionStorage.setItem(cacheKey, "FAILED");

        resolve(null);
        return;
      }

      const currentCandidate: string = candidates[index] ?? "";
      if (!currentCandidate) {
        index++;
        tryNext();
        return;
      }

      const img = new Image();
      let isSettled = false;

      const timeoutId = setTimeout(() => {
        if (!isSettled) {
          isSettled = true;
          img.src = "";
          index++;
          tryNext();
        }
      }, 1500);

      img.onload = () => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(timeoutId);

          if (typeof window !== "undefined")
            sessionStorage.setItem(cacheKey, currentCandidate);

          resolve(currentCandidate);
        }
      };

      img.onerror = () => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(timeoutId);
          index++;
          tryNext();
        }
      };

      img.src = currentCandidate;
    };

    tryNext();
  });
};
