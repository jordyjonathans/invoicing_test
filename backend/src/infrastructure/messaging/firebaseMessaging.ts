import { eq } from "drizzle-orm";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";
import admin from "@infrastructure/config/firebase";

interface NotificationPayload {
  title: string;
  body: string;
}

const sendMultiplePushNotification = async (
  tokens: string[],
  title: string,
  body: string
) => {};

export const sendPushNotificationToAdmins = async (
  body: string,
  data?: Record<string, string>
) => {
  try {
  } catch (e) {
    console.error("Failure push notif:", e);
  }
};
