export class ApiUtils {
    static getAuthorizationHeader(auth) {
        return {
            headers: {
                Authorization: auth.token
            }
        };
    };

    static getHttpConfigForBlob(auth) {
        return ApiUtils.getHttpConfigWithResponseType(auth, 'blob');
    }

    static getHttpConfigWithResponseType(auth, responseMimeType) {
        return {...ApiUtils.getAuthorizationHeader(auth), responseType: responseMimeType};
    }

    static getBackendServicesURL() {
        return process.env.BACKEND_URL;
    }

    static getWebsocketURL() {
        return process.env.WEBSOCKET_URL;
    }
}