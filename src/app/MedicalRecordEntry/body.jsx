'use client';

import React from 'react';

import { useState } from 'react';

const MedicalRecordEntry = () => {
  var patient_name='';
  var patient_birthyear='';
  var patient_gender='';

  const [nid, setNid] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medicine, setMedicine] = useState('');
  const [tests, setTests] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
    
  const getNid = async(e)=>{
    e.preventDefault();
    const id={nid}
    console.log('from submit',id)
    const response=await fetch('/api/PatientInfo',{ 
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(id),
    });
    if(response.status===200){
        const data = await response.json();
        console.log('lala');
        console.log(data);
    }
  }

  const ehr_submit = async (e) => {
    e.preventDefault();
    const data = {
      doctorName: 'John Doe',
      patientAge,
      symptoms,
      diagnosis,
      medicine,
      tests,
      comments,
    };
    try{
      const result = await fetch('/api/EHREntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } 
    catch (error) {
      console.error('Failed to publish:', error);
    }

    setPatientAge('');
    setSymptoms('');
    setDiagnosis('');
    setMedicine('');
    setTests('');
    setComments('');
  };
    

  return (
    <div>
    <div className="flex justify-center items-center h-auto border-m mt-10">
      <div className="bg-white w-4/5 h-auto rounded-sm shadow-2xl p-5 py-12 ">
        <label className="text-2xl font-bold text-center items-center">Medical Record Entry</label>
        <form onSubmit={getNid}>
          <div className="flex justify-center items-center">
          <label className="text-l font-bold px-5 my-7">Patient ID :</label>
          <input className="border-2 border-blue-300 border-x-2 rounded-lg w-1/2 h-8 p-5" 
          type="text" 
          placeholder="Patient ID" value={nid}
          onChange = { (e)=> { setNid(e.target.value) }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded"
            onClick={getNid}
          >
          Search
          </button>
        </div>
      </form>

        <div className="flex flex-row justify-center h-auto m-2 border-2 rounded-md">
          <div className="bg-blue-100 float-left w-1/4 py-3 px-4 rounded-md ">
            <label className="text-l font-bold text-blue-900 my-7 ">Patient General Info</label>
              <div className='py-3'>
                <p className='py-1 md:text-s'>Patient Name: </p>
                <p className='py-1 md:text-s'>Patient Birthyear: </p>
                <p className='py-1 md:text-s'>Patient Gender: </p>
              </div>
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
              />
            </div>
            <div className="pt-5 pb-3">
              <label className="text-l font-bold px-2 ">Symptoms:</label>
              <input
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                type="text"
                placeholder="Enter Symptoms" onChange = { (e)=> { setSymptoms(e.target.value) }}
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2 ">Diagnosis:</label>
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                placeholder="Enter Diagnosis" onChange={ (e) => { setDiagnosis(e.target.value)}}
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2  ">Medicine:</label>
              <input
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                type="text"
                placeholder="Enter Prescribed Medicine" onChange={(e) => { setMedicine(e.target.value) }}
              />
            </div>
            <div className="py-4">
              <label className="text-l font-bold px-2 ">Tests:</label>
              <input
                className="border-2 border-gray-300 rounded-lg w-full p-2 "
                type="text"
                placeholder="Enter Suggested Tests" onChange={(e) => {  setTests(e.target.value) }}
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2 ">Comments:</label>
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                placeholder="Enter Comments" onChange={(e) => { setComments(e.target.value) }}
              />
              </div>
              <div> 
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded float-right">
                    Submit 
                </button>
            </div>
            </form>

            {success && (
              <div className="p-4 bg-green-200 rounded-md w-4/5 ">
                Record Successfully Saved.
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  </div>
  
)};


export default MedicalRecordEntry;
