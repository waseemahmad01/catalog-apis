import dotenv from 'dotenv';
dotenv.config();

export const {
    PORT,
    DB_URL,
    APP_URL,
    DEBUG_MODE,
    JWT_SECRET,
    REFRESH_SECRET,
    CLIENT_ID_FB,
    CLIENT_SECRET_ID_FB,
    CLIENT_ID_GO,
    CLIENT_SECRET_ID_GO,
    SERVICEID,
    ACCOUNTSID,
    AUTHTOKEN,
    FCM_SERVER_TOKEN
} = process.env;