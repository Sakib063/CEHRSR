"use server";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

const fetchOtpData = async () => {
  const session = await getServerSession(authOptions);
  const { user } = session;
  const { id } = user;

  try {
    const otpCollectionRef = collection(db, id);

    const q = query(otpCollectionRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    const latestOtpDoc = querySnapshot.docs.find((doc) => doc.data().otp !== undefined);

    const otpValues = latestOtpDoc
      ? [{ id: latestOtpDoc.id, otp: latestOtpDoc.data().otp, timestamp: new Date(latestOtpDoc.data().timestamp.seconds * 1000).toLocaleString(),
      }]
      : [];

    return otpValues;
  } catch (error) {
    console.error('Error fetching OTP data: ', error.message);
    return [];
  }
};
const fetchNotificationData = async () => {
  const session = await getServerSession(authOptions);
  const { user } = session;
  const { id } = user;

  try {
    // Access the 'notifications' collection in Firestore
    const notificationCollectionRef = collection(db, id);

    // Retrieve all documents in the collection
    const querySnapshot = await getDocs(notificationCollectionRef);

    // Filter out documents without the 'notification' field
    const notificationValues = querySnapshot.docs
      .filter((doc) => doc.data().notification !== undefined)
      .map((doc) => {
        const { notification, timestamp } = doc.data();

        // Convert timestamp object to a simple value (Unix timestamp in seconds)
        const timestampInSeconds = timestamp.seconds;

        return {
          id: doc.id,
          notification,
          timestamp: timestampInSeconds,
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp in descending order

    return notificationValues;
  } catch (error) {
    console.error('Error fetching notification data: ', error.message);
    return [];
  }
};

  
  export { fetchOtpData,fetchNotificationData };