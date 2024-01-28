'use client';
import React from 'react';
import { useState } from 'react';
import { doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';


const MedicalRecordEntry = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("Session", session?.user?.auth);
  

  const params = useSearchParams();
  const id = { nid: params.get('nid') };
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
      sendNotification(docName, nid);
      router.replace('/dashboard');

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
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

  if (session?.user?.auth == false || id==null) {
    exit();
    router.push('/dashboard');
}

  const [patient_name, setPatientName] = useState('');
  const [patient_birthyear, setPatientBirthyear] = useState('');
  const [patient_gender, setPatientGender] = useState('');
  const [patient_blood, setPatientBlood] = useState('');
  const nid = id.nid;
  console.log(id);
  const [patientAge, setPatientAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [subdiagnosis, setSubDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [subtreatment, setSubTreatment] = useState('');
  const [determination, setDetermination] = useState('');
  const [type, setType] = useState('');
  const [findings, setFindings] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const docName = session?.user?.name;
 
  const getNid = async () => {
    try {
      const response = await fetch('/api/PatientInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nid }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      const name = data?.chain_response?.firstName + " " + data?.chain_response?.lastName;
  
      setLoading(true);
      setPatientName(name);
      setPatientBirthyear('12/12/2000');
      setPatientBlood('O+');
      setPatientGender('Female');
      console.log(data?.chain_response?.firstName);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const ehr_submit = async (e) => {
    e.preventDefault();
    const data = {
      patient_id: nid,
      doctorName: docName,
      patient_name,
      patientAge,
      symptoms,
      diagnosis,
      subdiagnosis,
      treatment,
      subtreatment,
      determination,
      type,
      findings,
      comments,
    };
    console.log(data);
    try{
      const result = await fetch('/api/EHREntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if(result.ok){
        setSuccess(true);
        setPatientAge('');
        setSymptoms('');
        setDiagnosis('');
        setSubDiagnosis('');
        setDetermination('');
        setTreatment('');
        setSubTreatment('');
        setType('');
        setFindings('');
        setComments('');
      }

    } 
    catch (error) {
      console.error('Failed to publish:', error);
    }
  };
  
 

  useEffect(() => {
    getNid(); // Call getNid when the component mounts
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  return (
    <div>
    <div className="flex justify-center items-center h-auto border-m mt-10">
      <div className="bg-white w-4/5 h-auto rounded-sm shadow-2xl p-5 py-12 ">
        <label className="text-2xl font-bold text-center items-center">Medical Record Entry</label>
        <form >
          <div className="flex justify-center items-center">
          <label className="text-l font-bold px-5 my-7">Patient ID :</label>
          <input className="border-2 border-blue-300 border-x-2 rounded-lg w-1/2 h-8 p-5" 
          type="text" 
          placeholder="Patient ID" value={nid}
          required
          />
          <button onClick={getNid} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded"
          >
          Search
          </button>
        </div>
      </form>

        <div className="flex flex-row justify-center h-auto m-2 border-2 rounded-md">
          <div className="bg-blue-100 float-left w-1/4 py-3 px-4 rounded-md ">
            <label className="text-l font-bold text-blue-900 my-7 ">Patient General Info</label>
              {loading &&(<div className='py-3'>
                <p className='py-1 font-semibold md:text-s'>Patient Name: {patient_name}</p>
                <p className='py-1 font-semibold md:text-s'>Patient Birthyear: {patient_birthyear}</p>
                <p className='py-1 font-semibold md:text-s'>Patient Gender: {patient_gender}</p>
                <p className='py-1 font-semibold md:text-s'>Patient Blood Group: {patient_blood}</p>
              </div>)}
          </div>

          <div className="bg-white float-left w-3/4 py-4 px-4">
            <label className="text-l font-bold justify-center text-blue-900 pl-2">EHR Entry</label>
            <form onSubmit={ehr_submit}>
            <div className="pt-5 pb-3">
              <label className="text-l font-bold px-2 ">Patient Age:</label>
              <input
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                type="text"
                placeholder="Enter Patient Age" onChange = { (e)=> { setPatientAge(e.target.value) }}
                required
              />
            </div>
            <div className="pt-5 pb-3">
              <label className="text-l font-bold px-2 ">Symptoms:</label>
              <input
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                type="text"
                placeholder="Enter Symptoms" onChange = { (e)=> { setSymptoms(e.target.value) }}
                required
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2 ">Diagnosis Catagory:</label>
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                placeholder="Enter Diagnosis Catagory" onChange={ (e) => { setDiagnosis(e.target.value)}}
                required
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2 ">Diagnosis Sub Catagory:</label>
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                placeholder="Enter Diagnosis Sub Catagory" onChange={ (e) => { setSubDiagnosis(e.target.value)}}
                required
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2 ">Treatment Catagory:</label>
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                placeholder="Enter Treatment Catagory" onChange={ (e) => { setTreatment(e.target.value)}}
                required
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2 ">Treatment Sub Catagory:</label>
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                placeholder="Enter Treatment Sub Catagory" onChange={ (e) => { setSubTreatment(e.target.value)}}
                required
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2 ">Determination:</label>
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                placeholder="Enter Determination" onChange={ (e) => { setDetermination(e.target.value)}}
                required
              />
            </div>
            <div className="py-4">
              <label className="text-l font-bold px-2 ">Type:</label>
              <input
                className="border-2 border-gray-300 rounded-lg w-full p-2 "
                type="text"
                placeholder="Enter Type" onChange={(e) => {  setType(e.target.value) }}
                required
              />
            </div>
            <div className="py-4">
              <label className="text-l font-bold px-2 ">Findings:</label>
              <input
                className="border-2 border-gray-300 rounded-lg w-full p-2 "
                type="text"
                placeholder="Enter Findings" onChange={(e) => {  setFindings(e.target.value) }}
                required
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2 ">Comments:</label>
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                placeholder="Enter Comments" onChange={(e) => { setComments(e.target.value) }}
                required
              />
              </div>
              <div> 
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 mt-3 rounded float-right">
                    Submit 
                </button>
            </div>
            </form>
            {success && (
              <div className="p-4 bg-green-200 rounded-md w-4/5 py-4">
                Record Successfully Saved.
                <button onClick={exit} className="bg-red-500 hover:bg-red-800 text-white font-bold  px-4 mx-4 mb-7 py-1 rounded float-right">
                    Exit 
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  </div>
  
)};


export default MedicalRecordEntry;