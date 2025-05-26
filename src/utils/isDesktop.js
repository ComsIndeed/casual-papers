// src/utils/isDesktop.js
export function isDesktop() {
    // Define your desktop breakpoint. Common is 1024px or 1280px.
    // This value should match your CSS media queries.
    const DESKTOP_BREAKPOINT = 1024;
    if (typeof window !== 'undefined') {
      return window.innerWidth >= DESKTOP_BREAKPOINT;
    }
    // For server-side rendering, we might assume mobile or return false
    // as window is not available. For dynamic UI, use the React hook.
    return false;
  }