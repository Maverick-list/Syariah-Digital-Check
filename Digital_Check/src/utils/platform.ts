import { Alert, Linking, Platform } from 'react-native';

/** Dialog konfirmasi lintas platform (Alert di native, window.confirm di web). */
export function confirmAction(opts: {
  title: string;
  message: string;
  confirmText: string;
  destructive?: boolean;
  onConfirm: () => void;
}) {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert
    if (typeof window !== 'undefined' && window.confirm(`${opts.title}\n\n${opts.message}`)) {
      opts.onConfirm();
    }
    return;
  }
  Alert.alert(opts.title, opts.message, [
    { text: 'Batal', style: 'cancel' },
    {
      text: opts.confirmText,
      style: opts.destructive ? 'destructive' : 'default',
      onPress: opts.onConfirm,
    },
  ]);
}

export function notify(title: string, message?: string) {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert
    if (typeof window !== 'undefined') window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }
  Alert.alert(title, message);
}

export async function openExternal(url: string) {
  try {
    await Linking.openURL(url);
  } catch {
    notify('Tautan tidak dapat dibuka', url);
  }
}
