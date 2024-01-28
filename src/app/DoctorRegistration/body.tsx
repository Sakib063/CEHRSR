"use client";
import React, { useState } from 'react';

export default function Main() {

  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    national_id: '',
    phone_number: '',
    email: '',
    password: '',
    confirmPassword: '',
    bm_dc_license_number: '',
    assoc_hospital_id: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      console.error('Password and Confirm Password do not match.');
      return;
    }
  
    try {
      const response = await fetch('/api/doctorReg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
  
      if (response.ok) {
        setSuccess(true);
        console.log('Doctor registered successfully:', response);
       
        

      } else {
        console.error('Error registering doctor:', data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <main>
      <div className="text-4xl text-center font-bold pt-16">
        <h1>Doctor Registration Form</h1>
        <p className="text-blue-500 dark:text-blue-400"></p>
        <hr className="w-48 h-1 mx-auto my-4 bg-blue-100 border-0 rounded md:my-10 dark:bg-blue-700" />
        <p className="text-blue-500 dark:text-blue-400"></p>
      </div>
      <div className="w-1/2 border-blue-700 border-2 rounded-md mx-auto my-20">
        <div className="flex items-center justify-center">
          <form className="py-10 flex-col" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="first_name" className="text-sm text-black float-left w-32">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                className="border border-blue-700 rounded p-1 text-sm flex-1"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="text-sm text-black float-left w-32">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                className="border border-blue-700 rounded p-1 text-sm flex-1"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="national_id" className="text-sm text-black float-left w-32">
                National ID
              </label>
              <input
                type="text"
                id="national_id"
                className="border border-blue-700 rounded p-1 text-sm flex-1"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone_number" className="text-sm text-black float-left w-32">
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                className="border border-blue-700 rounded p-1 text-sm flex-1"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-sm text-black float-left w-32">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-blue-700 rounded p-1 text-sm flex-1"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-sm text-black float-left w-32">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-blue-700 rounded p-1 text-sm flex-1"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="text-sm text-black float-left w-32">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="border border-blue-700 rounded p-1 text-sm flex-1"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bm_dc_license_number" className="text-sm text-black float-left w-32">
                BM & DC License Number
              </label>
              <input
                type="text"
                id="bm_dc_license_number"
                className="border border-blue-700 rounded p-1 text-sm flex-1"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="assoc_hospital_id" className="text-sm text-black float-left w-42 pr-8">
                Associated <br /> Hospital ID
              </label>
              <input
                type="number"
                id="assoc_hospital_id"
                className="border border-blue-700 rounded p-1 ml-7 text-sm flex-1"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-center mb-4 pt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-full p-2 w-40 hover:bg-blue-700"
              >
                Register Doctor
              </button>
            </div>
            {success ? (
              <div className=" p-4 px-auto mx-auto bg-green-200 rounded-md w-4/5 ">
                 Successfully Registered.
                
              </div>
            ): null}
          </form>
        </div>
      </div>
    </main>
  );
}
