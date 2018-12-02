import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";

export function findNotifications(params, onSuccess) {
  return dispatch => {
    new Api(dispatch).getWithParams("/notifications", params, all => {
      dispatch({type: ActionTypes.LIST_NOTIFICATIONS, all});
      if (onSuccess) onSuccess(all);
    });
  }
}

export function readNotification(params, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/notifications/read`, {notifications: params}, () => {
      // dispatch({type:ActionTypes.READ_NOTIFICATION});
      onSuccess();
    });
  }
}

export function deleteNotification(params, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/notifications/delete`, {notifications: params}, (all) => {
      // dispatch({type:ActionTypes.DELETE_NOTIFICATION,all});
      onSuccess();
    });
  }
}

export function markAll(onSuccess) {
  return dispatch => {
    new Api(dispatch).post("/notifications/mark-all", {}, () => {
      dispatch({type: ActionTypes.MARK_ALL});
      onSuccess();
    });
  }
}

export function getUnreadNotifications() {
  return dispatch => {
    new Api(dispatch).get("/notifications/unread", count => {
      dispatch({type: ActionTypes.UNREAD, count});
    });
  }
}
