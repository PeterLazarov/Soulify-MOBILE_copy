import envConfig from "./env-config";

export default {
    NOTE_TITLE_LENGTH: 50,
    NOTE_CONTENT_LENGTH: 5000,
    MEDICINE_FEEDBACK_LENGTH: 5000,

    PUSH_GCM_SENDER: envConfig.push.gcm.sender,

    API_ADDRESS: `${envConfig.api.address}:${envConfig.api.port}`,
    API_PATIENTS_ENDPOINT: '/patients',
    API_PATIENT_BY_CODE_ENDPOINT: '/users/patient',
    API_USERS_ENDPOINT: '/users',
    API_USERS_LOGIN_ENDPOINT: '/users/login',
    API_USERS_TIMEZONE_ENDPOINT: '/users/timezone',
    API_USERS_DEVICE_ENDPOINT: '/users/device',
    API_NOTES_ENDPOINT: '/notes',
    API_NOTES_BY_PATIENT_ENDPOINT: '/notes/patient',
    API_QUESTIONNAIRES_ENDPOINT: '/questionnaires',
    API_QUESTIONNAIRE_REQUIRED_ENDPOINT: '/questionnaires/required',
    API_QUESTIONNAIRE_LOAD_ENDPOINT: '/questionnaires/load',
    API_THERAPIES_ENDPOINT: '/therapies',
    API_THERAPY_BEGIN_ENDPOINT: '/therapies/begin',
    API_THERAPY_HISTORY_ENDPOINT: '/therapies/history',
    API_THERAPY_BY_PATIENT_ENDPOINT: '/therapies/patient',
    API_THERAPY_HISTORIES_ENDPOINT: '/therapyHistories',
    API_MEDICINES_ENDPOINT: '/medicines',
}