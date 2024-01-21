import React, { FunctionComponent } from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";


export default async function WelcomeDoctor() {

    const session = await getServerSession(authOptions) || null;
    
   

    return (
        <main className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center border-b-4 border-blue-800 mt-20 mb-5">Welcome Dr.{(session?.user?.name)}
            </h1>
            <div className="flex items-center justify-center">
                <button
                    className="flex flex-col items-center justify-center w-500 h-500 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200"
                >
                    <Image src={"/consulting.png"} alt="consulting" id="consulting" height={200} width={130} />

                    <Link href={'/ViewEHR'}> Patient's Previous Record</Link>
                </button>
                <Link href={`/MedicalRecordEntry`}>
                <button
                    className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200"
                >
                    <Image src={"/diagnostic.png"} alt="diagnosis" id="diagnosis" height={200} width={130} />

                    New Diagnosis Reports 
                </button>
                </Link>
            </div>
        </main>
    )
}
