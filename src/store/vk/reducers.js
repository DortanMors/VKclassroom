import Immutable from 'seamless-immutable';

const initialState = Immutable({
    vk: undefined,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case 'VK_GET_ACCESS_TOKEN_FETCHED':
            return state.merge({
                accessToken: action.accessToken
            });
        case 'VK_NOTIFICATION_STATUS_FETCHED':
            return state.merge({
                notificationStatus: action.notificationStatus
            });
        case 'VK_INSETS_FETCHED':
            return state.merge({
                insets: action.insets
            });
        case 'VK_GET_ACCESS_TOKEN_FAILED':
            return state.merge({
                logs: action.error
            });
        case 'VK_NOTIFICATION_STATUS_FAILED':
            return state.merge({
                logs: action.error
            });
        default:
            return state;
    }
}

export function getAccessToken(state) {
    return state.vk.accessToken;
}

export function getNotificationStatus(state) {
    return state.vk.notificationStatus;
}

export function getInsets(state) {
    return state.vk.insets;
}

export function getLogs(state) {
    return JSON.stringify(state.vk.logs);
}