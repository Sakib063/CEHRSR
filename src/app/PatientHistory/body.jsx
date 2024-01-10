'use client';

import React from 'react';

import { useState } from 'react';




const PatientHistory = () => {
  
  const [data, setData] = useState([]);
  const [NID, setNID] = useState('');
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(false);
  
  async function MedicalHistory () {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/get');
      if (response.ok) {
        const patientData = await response.json();
        const extractedData = patientData.map(item => item.data.json);
        
        // Reverse the order of the array
        const reversedData = extractedData.reverse();
        
        console.log(reversedData);
        setData(reversedData);
        setTimeout(() => {
          setId(true);
        }, 800);
        
        console.log(data);
      } else {
        console.log(response)
        console.log(typeof(response))
        console.error('Failed to fetch patient data');
      }
    } catch (error) {
     
      console.error('Fetch error:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      
    }
    setNID(''); 
  }

  return (
    <div>

      <div className="bg-white flex justify-center items-center h-auto border-m mt-10">
        
        <label className="p-5 text-xl font-bold">
          Enter NID no. of patient:
        </label>
        <input
          className="bg-blue-100 border-2 h-14 rounded-xl justify-center px-6"
          onChange={(e) => {
            setNID(e.target.value);
          }}
          type="text"
          placeholder="NID no."
          value={NID}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded "
          onClick={MedicalHistory}
        >
          Search
        </button>
      </div>

      <div className="  w-1/4 float-right rounded-md ">
            { id ? (
                  <div className='py-3 font-bold'>
                    <p className='py-1 md:text-s'>Patient Name: John Doe</p>
                    <p className='py-1 md:text-s'>Patient Age: 25</p>
                    <p className='py-1 md:text-s'>Patient NID: 58556802</p>
                  </div>
                ): null }

          </div>

      <div className="w-3/4 mx-auto h-3/4 border-m rounded-m flex row justify-center items-center ml-48">
  {loading ? (
    <div className="text-center p-4">Loading...</div>
  ) : data.length > 0 ? (
    <div className="bg-white  shadow-inner mx-auto p-8 border-m my-5 w-3/4 rounded-xl">
      <div className="p-4">
  <h2 className="text-xl font-bold">Patient Information</h2>
  
          {data.map((item) => (
          <div className='bg-blue-100 h-auto w-3/4 m-4 p-4 rounded-md font-bold'>
        <p>date: 2/11/23 </p>
        <p key={item.NID}> Diagnosis {item.diagnosis}</p>
        <p key={item.NID}> Medicine {item.medicine}</p>
        <p key={item.NID}> Tests {item.test}</p>
          
          </div>
         ))}

      </div>
    </div>
  ) : null}
</div>
</div>
  );
};


export default PatientHistory;
