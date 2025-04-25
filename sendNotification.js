const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function sendNotificationFCMV1(targetToken, title, body) {
  const message = {
    token: targetToken,
    notification: {
      title: title,
      body: body,
    },
    android: {
      priority: "high",
    },
    apns: {
      payload: {
        aps: {
          sound: "default",
        },
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Notification sent:", response);
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
}

// Example
const userDeviceToken = "cutXsP8XTH2UnEZ-ysOWX5:APA91bGVWleWM3KE_fgXfsCeDaqGFJqvaPJNuGK2Nq7SkcCLAZErb91t0CZ2iLZCzPfmT4_gHUN6O-1TCxysvZXM1m-uMsSX1r2AxHLtkJhaxGGJP6TEK8s";
sendNotificationFCMV1(userDeviceToken, "Challenge Accepted!", "Someone accepted your challenge!");
