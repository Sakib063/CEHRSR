
import React, { FunctionComponent } from "react";
import Image from "next/image";
import consulting from "C:/Users/Hp/Desktop/nextjs/app/Assets/consulting.png";
import affilieddoc from "C:/Users/Hp/Desktop/nextjs/app/Assets/doctor.png";
import report from "C:/Users/Hp/Desktop/nextjs/app/Assets/report.png";

export default function WelcomeDoctor() {
    return (
        <main className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center border-b-4 border-blue-800 mt-20 mb-5">Welcome Hospital X
            </h1>
            <div className="flex items-center justify-center">
                <button
                    className="flex flex-col items-center justify-center w-500 h-500 border border-blue-600 text-blue font-bold px-10 py-10 m-10 rounded-md hover:bg-blue-200"
                >
                    <Image src={consulting} alt="consulting" id="consulting" height={200} width={130} />

                    Patient EHR Access Authorization
                </button>
                <button
                    className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200"
                >
                    <Image src={affilieddoc} alt="affilieddoc" id="affilieddoc" height={200} width={130} />

                    Affiliated Doctors
                </button>

                <button
                    className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200"
                >
                    <Image src={report} alt="report" id="report" height={200} width={130} />

                    EHR
                </button>
            </div>
        </main>
    )
}

// import React, { FunctionComponent } from "react";

// interface ButtonProps {
//     icon: string;
//     text: string;
// }

// const BigSquareButton: React.FunctionComponent<ButtonProps> = ({ icon, text }) => (
//     <button
//         className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-10 py-5 m-5 rounded-md hover:bg-blue-600"
//     >
//         <img src={icon} alt="" className="w-40 h-40 mb-2" />
//         <span className="text-sm">{text}</span>
//     </button>
// );

// const WelcomeHospital: React.FunctionComponent = () => (

//     <><div className="flex justify-center items-center">
//         <h1 className="text-3xl font-bold text-center border-b-4 border-blue-500 mt-20 mb-5">Welcome Hospital X
//         </h1>
//     </div>
//     <div className="flex justify-center items-center">
//             <BigSquareButton icon="" text="Patient EHR Access Authorization" />
//             <BigSquareButton icon="" text="Affiliated Doctors" />
//             <BigSquareButton icon="" text="EHR" />
//         </div>
//     </>
// );

// export default WelcomeHospital;

