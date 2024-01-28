"use client";
import React, { useState, useEffect } from "react";

const Main = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getDoctorList");
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    // Filter doctors based on the search term
    const filteredDoctors = doctors.filter((doctor) =>
      `${doctor.first_name} ${doctor.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setDoctors(filteredDoctors);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    fetchData();
  };

  return (
    
    <main className="mt-12">
    

      <h1 className="text-3xl text-center font-bold border-b-4 border-blue-500 mt-4 mb-4 w-80 mx-auto">
        Affiliated Doctors
      </h1>
      <div className="flex items-center ml-56 my-8">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-500 w-80 rounded-md mr-2"
        />
        <button onClick={handleSearch} className="bg-cyan-500 text-white px-4 py-2 rounded-md">
          Search
        </button>
        <button onClick={handleResetSearch} className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2">
          Reset
        </button>
      </div>
      <div className="mx-auto rounded-lg">
        <div className="overflow-x-auto">
          <table className="text-center w-full md:w-3/4 mx-auto">
            <thead className="bg-blue-200 border-b-2 border-blue-300 sticky top-0">
              <tr className="flex w-full">
                <th className="p-4 w-1/4">Sl.</th>
                <th className="p-4 w-1/4">Name</th>
                <th className="p-4 w-1/4">Specialisation</th>
                <th className="p-4 w-1/4">Contact</th>
                <th className="p-4 w-1/4">Doctor Id.</th>
              </tr>
            </thead>
            <tbody className="bg-cyan-100 flex flex-col items-center justify-between">
              {doctors.map((doctor, index) => (
                <tr key={index} className="flex w-full hover:bg-cyan-300 border-b-2">
                  <td className="p-4 w-1/4">{index + 1}</td>
                  <td className="p-4 w-1/4">{doctor.first_name} {doctor.last_name}</td>
                  <td className="p-4 w-1/4">Cardiologist</td>
                  <td className="p-4 w-1/4">{doctor.phone_number}</td>
                  <td className="p-4 w-1/4">{doctor.doctor_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Main;
