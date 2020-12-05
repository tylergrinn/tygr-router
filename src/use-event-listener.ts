import { useEffect } from 'react';

export default function useEventListener<K extends keyof WindowEventMap>(
  el: Window | HTMLElement,
  event: K,
  listener: (ev?: any) => any
) {
  useEffect(() => {
    el.addEventListener(event, listener);
    return () => el.removeEventListener(event, listener);
  }, [el, event, listener]);
}
