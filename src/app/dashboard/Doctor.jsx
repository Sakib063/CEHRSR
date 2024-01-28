"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Image from "next/image";
import Link from "next/link";
import updateSession from "../updateSession";
import Loading from "../componentLoading";
import { serverTimestamp } from 'firebase/firestore';


const WelcomeDoctor = () => {
  const [data, setData] = useState(false);
  const [NID, setNID] = useState("");
  const [OTP, setOTP] = useState("");
  const [nid, setNid] = useState("");
  const [shuffledMessages, setShuffledMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");

  const doctorMessages = [
    '👩‍⚕️ Welcome, Doctor! Your dedication makes a difference.',
    '🌟 Your care and compassion impact patients positively.',
    '💻 Stay updated with the latest medical research and advancements.',
    '👥 Effective communication builds trust with your patients.',
    '📚 Continuously expand your medical knowledge for excellence.',
    '🤝 Collaborate with your healthcare team for optimal patient care.',
    '⏰ Prioritize self-care to ensure a healthy work-life balance.',
    '💡 Embrace innovation to enhance the quality of healthcare services.',
    '🌈 Your commitment to healing is appreciated every day!',
  ];
  const router = useRouter();
  const { data: session, update } = useSession();

  useEffect(() => {
    console.log("Client Session", session?.user?.auth);
    setData(session?.user?.auth);

    setShuffledMessages(shuffleArray(doctorMessages));

    if (typeof window !== "undefined") {
      const storedNid = localStorage.getItem("nid");
      if (storedNid) {
        setNid(storedNid);
      }
    }
  }, [session]);

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    console.log("OTP", otp);
    return otp;
  };

  const verifyOTP = () => {
    return OTP === generatedOTP;
  };

  const sendNotification = async (doc, nid) => {
    try {
      const otpCollectionRef = collection(db, nid);
  
      const data = {
        notification: `Dr. ${doc} is permitted to your EHR`,
        timestamp: serverTimestamp(),
      };
  
      await addDoc(otpCollectionRef, data);
    } catch (error) {
      console.error("Error adding notification: ", error.message);
    }
  };
  const shuffleArray = (array) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };


const sendOtpToFirestore = async (otp, nid) => {
  try {
    const otpCollectionRef = collection(db, nid);

    const data = {
      otp: otp,
      timestamp: serverTimestamp(),
    };

    await addDoc(otpCollectionRef, data);
  } catch (error) {
    console.error("Error adding OTP: ", error.message);
  }
};


  async function MedicalHistory() {

    try {
      setLoading(true);
      const otp = generateOTP();
      await sendOtpToFirestore(otp, NID);
      setLoading(false);
      setId(true);

      
    } catch (error) {
      console.error("Fetch error:", error);
    }

    
  }

  const handleVerifyOTP = async() => {
    const request=nid;
    if (verifyOTP()) {
      setLoading(true);
      try{
        const response = await fetch('/api/AllowAccess',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });  
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        session.user.auth = true
        setId(false);
        setLoading(false);
        setNID("");
        setOTP("");
        sendNotification(session.user.name, nid);
        let d = updateSession();
        setData(d);
        console.log("Client Session", session?.user?.auth);
      }
      catch (error) {
          console.error('Error:', error);
      }
    } else {
      console.log("Invalid OTP");
    }
  };

  return (
    <div className="">
     {!session ? (<Loading/>) :
      ( <>
      <header className="my-10">
      
        <h1 className="text-center font-bold text-green-500    text-6xl">
        Welcome Dr. {(session?.user?.name)}
        </h1>
        
      </header>
      <div className="bg-white flex justify-center items-center h-auto border-m mt-10">
        <table>
          <tbody className="">
            <tr className="">
              <td className="text-md px-10 py-5 ">
                <label
                  className="block  text-blueGray-600 text-xl font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Enter Patient's NID
                </label>
              </td>
              
              <td className="text-md px-10 py-5 ">
                <input
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5  w-80 ease-linear transition-all duration-150"
                  onChange={(e) => {
                    setNid(e.target.value)
                    setNID(e.target.value)
                  }}
                  type="text"
                  placeholder="NID no."
                  value={NID}
                />
              </td>
              <td className="text-md px-10 py-5 ">
                <button
                  className=" inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal bg-blue-500 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 "
                  onClick={MedicalHistory}
                >
                  Search
                </button>
              </td>
            </tr>
             {id ? ( 
              <tr className="">
                <td className="text-md px-10 py-5 ">
                  
                  <label
                    className="block  text-blueGray-600 text-xl font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Enter OTP
                  </label>
                </td>
                <td className="text-md px-10 py-5 ">
                  <input
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5  w-80 ease-linear transition-all duration-150"
                    onChange={(e) => {
                      setOTP(e.target.value);
                    }}
                    type="text"
                    placeholder="OTP"
                    value={OTP}
                  />
                </td>
                <td className="text-md px-10 py-5 ">
                  <button
                    className="inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal bg-blue-500 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600"
                    onClick={handleVerifyOTP}
                  >
                    Verify OTP
                  </button>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      </>)}

      {loading ?  <Loading /> : null}

      {  data ? ( 
       <div className="flex items-center justify-center">
       {/* <Link href={`/ConsultationHistory?${nid}`}> */}
       <button onClick={() => router.push(`/ConsultationHistory?nid=${nid}`)}
           className="flex flex-col items-center justify-center w-500 h-500 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200"
       >
           <Image src={"/consulting.png"} alt="consulting" id="consulting" height={200} width={130} />

            Patient's Previous Record
       </button>
       {/* </Link> */}
       <Link href={`/MedicalRecordEntry?nid=${nid}`}>
       <button
           className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200"
       >
           <Image src={"/diagnostic.png"} alt="diagnosis" id="diagnosis" height={200} width={130} />

           New Diagnosis Reports 
       </button>
       </Link>
      
   </div>

  




     ) : <div className="flex justify-center  items-center md:mt-64 ">
     <div className="health-suggestion text-center text-color:gray-400 font-style:italic text-xl font-semibold  ">
       <p className="font-style:italic">{shuffledMessages[0]} </p>
     </div>
   </div>}
   {data ? ( <div className="flex justify-center md:mt-26 items-center">
        <div className="health-suggestion text-center   text-xl font-semibold animate-bounce ">
          <p>{shuffledMessages[0]}</p>
        </div>
      </div>) : null}

    </div>
  );
};

export default WelcomeDoctor;
