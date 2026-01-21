importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDvX9x_1pFun76i2TCK9x5sysGE1iGInM8",
    authDomain: "notification-firebase-39a4a.firebaseapp.com",
    projectId: "notification-firebase-39a4a",
    messagingSenderId: "948413404534",
    appId: "1:948413404534:web:18e637f59f84e627559657"
});

const messaging = firebase.messaging();

// Optional: background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = payload?.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload?.notification?.body || "",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
