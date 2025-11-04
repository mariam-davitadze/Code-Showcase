import { showNotification } from "../store/slices/notificationSlice";
import { PopUpType } from "../store/slices/notificationSlice/types";
import { logOut } from "../store/slices/userSlice";

export const getAuthData = () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Send token as Bearer in the header
    },
  };
};

export const apiErrorHandler = async (error: any) => {
  if (error.response?.status === 401) {
    const { store } = await import("../store"); // Dynamically import store
    if (window.location.href.includes("/sign_in")) {
      store.dispatch(
        showNotification({
          message:
            "Your username or password is incorrect. Please try logging in again!",
          type: PopUpType.ERROR,
        })
      );
    } else {
      store.dispatch(
        showNotification({
          message: "Your session has expired. Please log in again!",
          type: PopUpType.ERROR,
        })
      );

      // Wait briefly to ensure the user sees the message before redirecting
      setTimeout(() => {
        store.dispatch(logOut()); // Dispatch logout action
        window.location.href = "/sign_in"; // Redirect to sign-in page
      }, 1500);
    }
  }
  return Promise.reject(error);
};
