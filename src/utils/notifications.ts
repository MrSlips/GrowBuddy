export type AppNotificationPermission = NotificationPermission | 'unsupported';

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): AppNotificationPermission {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<AppNotificationPermission> {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    const result = await Notification.requestPermission();
    return result;
  } catch {
    return Notification.permission;
  }
}

export function sendLowHealthNotification(): boolean {
  if (!isNotificationSupported()) return false;
  if (Notification.permission !== 'granted') return false;
  if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
    return false;
  }

  try {
    const notification = new Notification('GrowBuddy - Dunia Pokok Maya', {
      body: 'Pokok anda perlukan perhatian',
      tag: 'growbuddy-low-health',
    });

    notification.onclick = () => {
      try {
        window.focus();
      } catch {
        // Ignore focus errors in restricted frames
      }
      notification.close();
    };

    return true;
  } catch {
    return false;
  }
}
