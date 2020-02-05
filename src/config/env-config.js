import { API_ADDRESS, API_PORT, PUSH_GCM_SENDER } from 'react-native-dotenv';

const config = {
    environment: process.env.NODE_ENV,
    api: {
        address: process.env.API_ADDRESS || API_ADDRESS,
        port: process.env.API_PORT || API_PORT
    },
    push: {
        gcm: {
            sender: process.env.PUSH_GCM_SENDER || PUSH_GCM_SENDER
        }
    }
};

config.isDevelopment = () => config.environment === "development";

export default config;