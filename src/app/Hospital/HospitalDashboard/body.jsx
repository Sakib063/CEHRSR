"use client";
import React, { FunctionComponent } from "react";
import Image from "next/image";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function WelcomeDoctor() {
  const { data: session } = useSession();

  const type = session?.user?.type;
  console.log("type", type);

  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/Hospital/DoctorRegistration");
  };
  return !session?.user ? (
    <Loading />
  ) : (
    <>
      <main className="flex flex-col justify-center items-center mt-8 mb-60">
        <h1 className="text-3xl font-bold text-center border-b-4 border-cyan-800 mt-20 mb-5">
          Welcome Hospital : {session?.user?.name}
        </h1>
        <div className="flex items-center justify-center">
          <button className="flex flex-col items-center justify-center w-400 h-400 border border-cyan-600 text-cyan font-bold px-20 py-10 m-10 rounded-md hover:bg-cyan-200">
            <Image
              src="/consulting.png"
              alt="consulting"
              id="consulting"
              height={200}
              width={130}
            />
            Doctor Appointment
          </button>
          <button className="flex flex-col items-center justify-center w-400 h-400 border border-cyan-600 text-cyan font-bold px-20 py-10 m-10 rounded-md hover:bg-cyan-200">
            <Image
              src={"/doctor.png"}
              alt="affilieddoc"
              id="affilieddoc"
              height={200}
              width={130}
            />
            Doctor List
          </button>

          <button
            className="flex flex-col items-center justify-center w-400 h-400 border border-cyan-600 text-cyan font-bold px-20 py-7 m-10 rounded-md hover:bg-cyan-200"
            onClick={handleButtonClick}
          >
            <Image
              src={`/DoctorUserImageMale.png`}
              alt="report"
              id="report"
              height={100}
              width={130}
            />
            Register New Doctor
          </button>
        </div>
      </main>
    </>
  );
}
