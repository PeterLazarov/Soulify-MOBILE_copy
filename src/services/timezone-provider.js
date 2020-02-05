import momentTimezon from "moment-timezone";
import http from './http';
import settingsProvider from './settings-provider';
import settings from '../config/settings';
import constants from '../config/constants';

export default {
    async setUserTimezone() {
        const code = await settingsProvider.get(settings.CODE);
        const timezone = momentTimezon.tz.guess();
        if (code && timezone) {
            await http.request(
                `${constants.API_ADDRESS}${constants.API_USERS_TIMEZONE_ENDPOINT}`,
                'POST', {
                    code,
                    timezone
                });
        }
    }
};