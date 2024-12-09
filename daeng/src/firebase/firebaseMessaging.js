import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (token) {
        return token;
      } else {
        console.error("토큰 가져오기 실패");
      }
    } else {
      console.error("알림 권한 거부됨");
    }
  } catch (error) {
    console.error("알림 권한 요청 실패:", error);
  }
};

export const setupOnMessageHandler = () => {
  onMessage(messaging, (payload) => {
    if (!document.hidden) {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        image: payload.notification.image,
        icon: payload.notification.icon || '/alarm-logo.png',
      };

      const notification = new Notification(notificationTitle, notificationOptions);

      notification.onclick = function (event) {
        event.preventDefault();
        notification.close();
      };
    } else {
      console.log("페이지가 백그라운드 상태입니다. 포그라운드 상태에서만 알림을 표시합니다.");
    }
  });
};

setupOnMessageHandler();
