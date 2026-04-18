import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { toast } from 'sonner';

export const initializePushNotifications = async () => {
  if (Capacitor.getPlatform() === 'web') {
    return;
  }

  // Check and request permissions
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    console.warn('User denied push notification permissions');
    return;
  }

  // On success, we should be able to receive notifications
  await PushNotifications.addListener('registration', (token) => {
    console.log('Push registration success, token: ' + token.value);
    // TODO: Send token to backend
  });

  // Register with Apple / Google
  await PushNotifications.register();

  // Some registration error occurred
  await PushNotifications.addListener('registrationError', (error) => {
    console.error('Error on registration: ' + JSON.stringify(error));
  });

  // Show the notification alert if the app is in foreground
  await PushNotifications.addListener(
    'pushNotificationReceived',
    (notification) => {
      toast.info(notification.title || 'إشعار جديد', {
        description: notification.body,
        duration: 5000,
      });
    }
  );

  // Method called when a tapping on a notification
  await PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (notification) => {
      console.log('Push action performed: ' + JSON.stringify(notification));
      // Handle navigation here if needed
    }
  );
};
