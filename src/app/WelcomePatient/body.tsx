import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function WelcomePatient() {
 
  const session = await getServerSession(authOptions) || null;
  if (!session) {
    return(<h1>Please Login</h1>);
  }
  
  else {

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center border-b-4 border-blue-800 mt-10 mb-5">
        Welcome {(session?.user?.name)}
      </h1>
      <div className="flex items-center justify-center">
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
        <button className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200">
          <Image
            src="/diagnostic.png"
            alt="diagnosis"
            id="diagnosis"
            height={200}
            width={130}
          />
          Diagnosis Reports
        </button>

        <button className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200">
          <Image
            src="/shield.png"
            alt="shield"
            id="shield"
            height={200}
            width={130}
          />
          Permissions
        </button>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Summarized Report
        </button>
      </div>
    </main>
  );
}}
