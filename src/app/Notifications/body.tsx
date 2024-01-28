"use client";
import { Suspense, useEffect, useState } from 'react';

import { fetchOtpData, fetchNotificationData } from './fetchOtpData';
import Loading from '../loading';


const Notifications = () => {
  const [otpData, setOtpData] = useState([]);
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatDate(timestampInSeconds) {
    const date = new Date(timestampInSeconds * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleString(); // Adjust the arguments to get the desired format
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const otpValues = await fetchOtpData();
        const notificationValues = await fetchNotificationData();

        setOtpData(otpValues);
        setNotificationData(notificationValues);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold border-b-4 border-blue-500 mt-10 mb-5">Notifications</h1>

      {/* OTP Table */}
      {loading ? (
        <Loading />
      ) : ( <>
        <div className="overflow-auto rounded-lg flex-col shadow mb-10">
          <table className="w-auto border">
            <thead className="bg-orange-300 border-b-2 border-black">
              <tr className="border border-solid border-l-0 border-r-0">
                <th className="text-md px-10 py-5 border">Permission OTP</th>
              </tr>
            </thead>
            <tbody>
              {otpData.map((otp, index) => (
                <tr key={index} className="bg-green-100">
                  <th className="text-xl px-8 py-4 border">{otp.otp}  <p className=' pt-4 text-sm font-thin'> {otp.timestamp}</p></th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       <div className="overflow-auto rounded-lg shadow mb-10">
  <table className="w-auto border">
    <thead className="bg-blue-200 border-b-2 border-blue-300">
      <tr className="border border-solid border-l-0 border-r-0">
        <th className="text-md px-10 py-5 border">Logs & History</th>
        <th className="text-md px-10 py-5 border">Date & Time</th>
      </tr>
    </thead>
    <tbody>
      {notificationData.map((notification, index) => (
        <tr key={index} className="hover:bg-orange-50 ">
          <td className="text-md px-8 py-4 border">{notification.notification}</td>
          <td className="text-md px-8 py-4 border">{formatDate(notification.timestamp)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</>
)}

    </main>
  );
};

export default Notifications;
