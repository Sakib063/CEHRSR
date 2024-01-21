"use client";
import { Suspense, useEffect, useState } from 'react';

import { fetchOtpData } from './fetchOtpData'; 
import Loading from '../loading';

const Notifications = () => {
    const [otpData, setOtpData] = useState([]);

   
    useEffect(() => {
      const fetchData = async () => {
        const otpValues = await fetchOtpData();
        setOtpData(otpValues);
      };
  
      fetchData();
    }, []); 
  
    return (
       
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold border-b-4 border-blue-500 mt-20 mb-5">Notifications</h1>
        <div className="overflow-auto rounded-lg shadow mb-10">
          <table className="w-auto border">
            <thead className="bg-blue-200 border-b-2 border-blue-300">
              <tr className="border border-solid border-l-0 border-r-0">
                <th className="text-md px-10 py-5 border">OTP</th>
              </tr>
            </thead>
            <Suspense fallback={<Loading/>}>
            <tbody>
              {otpData.map((otp, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="text-md px-8 py-4 border">{otp.otp}</td>
                </tr>
              ))}
            </tbody>
            </Suspense>

          </table>
        </div>
        
      </main>
    );
};

export default Notifications;
