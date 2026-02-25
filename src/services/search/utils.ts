export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getWaitMs = (waitUntil: string): number => {
  return Math.max(0, new Date(waitUntil).getTime() - Date.now());
};
