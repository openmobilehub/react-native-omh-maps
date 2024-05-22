export default function useLogger(logTag: string) {
  return {
    log: (...args: any[]) => {
      console.log(`[${logTag}]`, ...args);
    },
    error: (...args: any[]) => {
      console.error(`[${logTag}]`, ...args);
    },
  };
}
