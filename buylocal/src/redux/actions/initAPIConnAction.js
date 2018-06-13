export const ACTION_INITAPICONN = 'action_initapiconn';


export function initAPIConnActionCreator(APIConn) {
    return {
      type: ACTION_INITAPICONN,
      APIConn
    }
  }

