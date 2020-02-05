import { PushNotificationIOS, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import http from './http';
import settingsProvider from './settings-provider';
import settings from '../config/settings';
import constants from '../config/constants';
import notificationType from './notification-type';

async function registerDeviceToken(device) {
    const code = await settingsProvider.get(settings.CODE);
    const pushToken = await settingsProvider.get(settings.PUSH_TOKEN);
    if (code && !pushToken) {
        const result = await http.request(
            `${constants.API_ADDRESS}${constants.API_USERS_DEVICE_ENDPOINT}`,
            'POST', {
                code,
                deviceType: (device.os === 'ios' ? 'IOS' : 'ANDROID'),
                deviceToken: device.token
            });

        if (result && result.isOkay) {
            settingsProvider.set(settings.PUSH_TOKEN, device.token);
        }
    }
}

export default {
    configure(configuration) {
        PushNotification.configure({
            senderID: Platform.OS === 'android' ? constants.PUSH_GCM_SENDER : null,

            onRegister: async d => {
                await registerDeviceToken(d);
            },

            onNotification: notification => {
                if (Platform.OS === 'ios') {
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }

                if (notification.data && (notification.userInteraction || notification.foreground)) {
                    if (notification.data.type === notificationType.medicineReminder) {
                        configuration.onMedicineReminder(notification.data.therapyHistoryId);
                    }
                }
            },
        });
    }
};