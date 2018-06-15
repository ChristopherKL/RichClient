export const ACTION_LOGIN = 'action_login';
export const ACTION_LOGOUT = 'action_logout';


export function loginActionCreator(userData) {
    return {
      type: ACTION_LOGIN,
      userData
    }
  }
export function logoutActionCreator() {
    return {
      type: ACTION_LOGOUT
    }
  }
