export const ACTION_SERVERKEY = 'action_serverkey';


export function serverKeyActionCreator(serverPublicKey) {
    return {
      type: ACTION_SERVERKEY,
      serverPublicKey
    }
  }

