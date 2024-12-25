import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    newAlert() {
      const resetState = null;
      return resetState;
    },
    createNewAlert(state, action) {
      return action.payload;
    },
  },
});

export const { newAlert, createNewAlert } = notificationSlice.actions;

export const setNotification = (ntfnObject) => {
  return (dispatch) => {
    dispatch(createNewAlert(ntfnObject));
    setTimeout(() => {
      dispatch(newAlert());
    }, ntfnObject.time * 1000);
  };
};

export default notificationSlice.reducer;
