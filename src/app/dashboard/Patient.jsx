'use client';

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NotificationBell from "../component/notificationBell";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import Loading from "../loading";

export default function WelcomePatient() {
  const { data: session } = useSession();
  const router = useRouter();
  const id =  session?.user?.id;

  const [shuffledMessages, setShuffledMessages] = useState([]);
  const [shuffled, setShuffled] = useState(false);

  const messages = [
    '💧 Remember to stay hydrated!',
    '🚶‍♂️ Take a break and stretch every hour.',
    '🥗 A balanced diet is key to good health.',
    '😴 Get 7-9 hours of quality sleep each night.',
    '🍎 Eat a variety of fruits and vegetables daily.',
    '🏋️‍♀️ Include regular exercise in your routine.',
    '😌 Practice mindfulness and stress reduction.',
    '🍵 Limit your caffeine intake, especially in the evening.',
    '🚭 Avoid smoking and limit alcohol consumption.',
    '🧘‍♀️ Take time to relax and do something you enjoy.',];
  

  const shuffleArray = (array) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  const [sumdata, setSumData] = useState([]);

  const [consultations, setConsultations] = useState([]);
  
  const summary=async(e)=>{
    try{
      const response = await fetch('/api/SummaryApi',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sumdata),
      });  
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('summary::',data.summary);
        router.push(`/Summary?id=${id}&summary=${data.summary}`);
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

  useEffect(() => {
    if (!shuffled) {
      setShuffledMessages(shuffleArray(messages));
      setShuffled(true);
    }
  }, [shuffled]);

  // Check if session or shuffledMessages are not available, show Loading component
  if (!session || shuffledMessages.length === 0) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center border-b-4 border-blue-800 mt-10 mb-5">
        Welcome {(session?.user?.name)}
      </h1>
      <div className="flex items-center justify-center">
        <Link href="/PatientHistory">
          <button className="flex flex-col items-center justify-center w-500 h-500 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200">
            <Image
              src="/consulting.png"
              alt="consulting"
              id="consulting"
              height={200}
              width={130}
            />
            Consultation History{" "}
          </button>
        </Link>
        <button onClick={summary} className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200">
          <Image
            src="/diagnostic.png"
            alt="diagnosis"
            id="diagnosis"
            height={200}
            width={130}
          />
          Summary Reports
        </button>
        <Link href="/Notifications">
          <button className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200">
            <Image
              src="/book.png"
              alt="Logs and Notifications"
              id="book"
              height={200}
              width={130}
            />
            Logs & Notifications
          </button>
        </Link>
      </div>
      <div className="flex justify-center mt-12 items-center">
        <div className="health-suggestion text-center bg-brown-100  text-xl font-semibold animate-bounce ">
          <p>"{shuffledMessages[0]} "</p>
        </div>
      </div>
    </main>
  );
}
