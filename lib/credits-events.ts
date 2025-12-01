/**
 * Utility functions for credits update events
 * Use this to trigger UI updates when credits change
 */

/**
 * Dispatch a credits update event to notify all listeners
 * Call this after any action that changes user credits (generation, purchase, etc.)
 */
export function triggerCreditsUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("credits-updated"));
  }
}

/**
 * Listen for credits update events
 * @param callback Function to call when credits are updated
 * @returns Cleanup function to remove the listener
 */
export function onCreditsUpdate(callback: () => void) {
  if (typeof window !== "undefined") {
    window.addEventListener("credits-updated", callback);

    return () => {
      window.removeEventListener("credits-updated", callback);
    };
  }

  return () => {};
}
