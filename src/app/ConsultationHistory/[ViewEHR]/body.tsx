'use client';
import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";


import { doc } from 'firebase/firestore';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function EHRData(){
    const router = useRouter();
    let { data: session } = useSession();
    const docName=session?.user?.name;
    
   
    const params = useSearchParams();
    const id = params.get('id');
    const key = params.get('key');

    const sendNotification = async (doc, nid) => {
        try {
          const otpCollectionRef = collection(db, nid);
      
          const data = {
            notification: `EHR permission revoked from Dr. ${doc}`,
            timestamp: serverTimestamp(),
          };
      
          await addDoc(otpCollectionRef, data);
        } catch (error) {
          console.error("Error adding notification: ", error.message);
        }
      };
    const exit = async (e) => {
        console.log("Exit");
        console.log(id);
        try {
          const response = await fetch('/api/RemoveAccess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id}),
          });  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          session.user.auth = false
          sendNotification(docName, id);

          router.replace('/dashboard');
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    if(session?.user?.auth==false){
        exit();
        
    }
    
    
    
    const pdf=useRef();
    // const [loading,setLoading]=useState(false);
    const [date, setDate] = useState('');
    const [age, setAge] = useState('');
    const [patient_name, setPatientName] = useState('Musarrat Zeba');
    const [doctor_name, setDoctorName] = useState('');
    const [hospital_name, setHospitalName] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [subdiagnosis, setSubDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    const [subtreatment, setSubTreatment] = useState('');
    const [determination, setDetermination] = useState('');
    const [type, setType] = useState('');
    const [findings, setFindings] = useState('');
    const [comments, setComments] = useState('');

    

    const view_ehr=async(e:any)=>{
        const request={id,key};
        try {
            const response = await fetch('/api/EHRDetailsDoc',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
            });  
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            var data = await response.json();
            // console.log(data?.chain_response);
            // setLoading(true);
            setDate(data?.chain_response?.date);
            setDoctorName(data?.chain_response?.doctorName);
            setPatientName(data?.chain_response?.patient_name);
            setHospitalName(data?.chain_response?.hospital);
            setDiagnosis(data?.chain_response?.diagnosis);
            setSubDiagnosis(data?.chain_response?.subdiagnosis);
            setTreatment(data?.chain_response?.treatment);
            setSubTreatment(data?.chain_response?.subtreatment);
            setSymptoms(data?.chain_response?.symptoms);
            setDetermination(data?.chain_response?.determination);
            setType(data?.chain_response?.type);
            setAge(data?.chain_response?.age);
            setComments(data?.chain_response?.comments);
            setFindings(data?.chain_response?.findings);
            // setLoading(false);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    const downloadPDF = () => {
        const ehr = pdf.current;
        // html2canvas(ehr).then((canvas)=>{
        //     const pdf=new jsPDF('p','mm','a4',true);
        //     const width=pdf.internal.pageSize.getWidth();
        //     const height=pdf.internal.pageSize.getHeight();
        //     pdf.save('Patientcopy.pdf');
        // })
      };

    useEffect(()=>{
        view_ehr();
    },[])

        return(
            <section>
                <div ref={pdf} className="py-1 bg-blueGray-50 mt-10">
                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">
                                    EHR History
                                </h6>
                                <button onClick={downloadPDF} className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                    Download EHR
                                </button>
                            </div>
                        </div>
                        {/* User Info */}
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form action="">
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                User Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Record No <br /> <p className="font-extrabold"> </p>                      </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Date <br /> <p className="font-extrabold"> {date} </p>                                </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Patient's Name <br /> <p className="font-extrabold"> {patient_name}</p>                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300"></hr>
                            </form>
                        </div>  
                        {/* Doctor Info */}
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form action="">
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Doctor's Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Doctor's Name <br /> <p className="font-extrabold"> {doctor_name} </p>                                   </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Hospital <br /> <p className="font-extrabold"> {hospital_name} </p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300"></hr>
                            </form>
                        </div>  
                        {/* EHR Info */}
                        <div className=" px-4 lg:px-10 py-10 pt-0">
                            <form action="">
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Electronic Health Record
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Symptomps <br /> <p className="font-extrabold"> {symptoms} </p>
                                    </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Findings <br /> <p className="font-extrabold"> {findings} </p>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Diagnosis <br /> <p className="font-extrabold"> {diagnosis} </p>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Sub Diagnosis <br /> <p className="font-extrabold"> {subdiagnosis} </p>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Treatment <br /> <p className="font-extrabold"> {treatment} </p>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Sub Treatment <br /> <p className="font-extrabold"> {subtreatment} </p>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Type <br /> <p className="font-extrabold"> {type} </p>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Determination <br /> <p className="font-extrabold"> {determination} </p>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Additional Comments <br /> <p className="font-extrabold"> {comments} </p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300"></hr>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
}