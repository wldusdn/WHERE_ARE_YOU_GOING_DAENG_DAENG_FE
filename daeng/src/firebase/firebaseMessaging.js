import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한 허용");
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (token) {
        console.log("FCM 토큰:", token);
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

// 포그라운드에서 푸시 알림을 수신하고 처리하는 핸들러
export const setupOnMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log("알림 내용: ", payload);

    const notificationData = {
      title: payload.notification?.title || "알림 제목 없음",
      body: payload.notification?.body || "알림 내용 없음",
      icon: payload.notification?.icon || "/default-icon.png",
      image: payload.notification?.image || "",
    };

    const notification = new Notification(notificationTitle, notificationOptions);

    notification.onclick = function (event) {
      event.preventDefault(); 
      console.log("notification clicked!");
      notification.close(); 
    };
  });
};

setupOnMessageHandler();
