'use client';

import { useEffect, useState } from 'react';

// WKWebView bridge types for iOS native communication
declare global {
  interface Window {
    webkit?: {
      messageHandlers?: Record<string, { postMessage: (body: unknown) => void }>;
    };
  }
}

const STORAGE_KEY = 'flow_app_mode';

/**
 * Detects iOS app mode (?app=1) and persists via sessionStorage.
 * On first load, ?app=1 is present in the URL. On subsequent
 * client-side navigations the param may be lost, so we persist
 * to sessionStorage for the duration of the browsing session.
 */
export function useAppMode(): boolean {
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromURL = params.get('app') === '1';
    const fromStorage = sessionStorage.getItem(STORAGE_KEY) === '1';

    if (fromURL) {
      sessionStorage.setItem(STORAGE_KEY, '1');
    }

    if (fromURL || fromStorage) {
      setIsApp(true);
    }
  }, []);

  return isApp;
}

/** Trigger the native iOS paywall via the WKWebView JS bridge */
export function triggerNativePaywall() {
  window.webkit?.messageHandlers?.showPaywall?.postMessage(null);
}

/** Notify iOS native layer of the current auth state */
export function sendAuthState(loggedIn: boolean) {
  window.webkit?.messageHandlers?.authState?.postMessage({ isAuthed: loggedIn });
}
