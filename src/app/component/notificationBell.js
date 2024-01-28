"use client";
import { useEffect, useState, useRef } from 'react';
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {useRouter} from 'next/navigation';
import { onSnapshot } from "firebase/firestore";
import Image from 'next/image';


const NotificationBell = ({ userId }) => {
  
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  

  useEffect(() => {
    const userNotificationsRef = collection(db, userId);

    const unsubscribe = onSnapshot(userNotificationsRef, (snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return { id: doc.id, otp: docData.otp, clicked: docData.clicked || false };
      });

      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, [userId]);

  const unreadNotifications = notifications.filter((notification) => !notification.clicked);
  const newNotificationCount = unreadNotifications.length;

  const handleBellClick = async () => {
    // Mark all unread notifications as clicked
    const updatePromises = unreadNotifications.map((notification) => {
      const notificationRef = doc(db, userId, notification.id);

      return updateDoc(notificationRef, { clicked: true });
    });

    await Promise.all(updatePromises);
    router.replace('/Notifications');
  };

  return (
    <div className="flex items-center w-18" onClick={handleBellClick}>
  <Image src="/bell.png" alt="bell" width={34} height={34} /> 
  
  {newNotificationCount > 0 && (
    <h1 className="notification-count bg-green-400 rounded-full px-2 mb-6 h-6 ">
      {newNotificationCount}
    </h1>
  )}
</div>

  );
};

export default NotificationBell;
