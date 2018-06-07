export const ACTION_LOGIN = 'action_login';


export function loginActionCreator(userData) {
    return {
      type: ACTION_LOGIN,
      userData
    }
  }