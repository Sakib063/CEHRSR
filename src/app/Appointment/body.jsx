"use client"
import React, { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Main = () => {
  const [isAppointClicked, setIsAppointClicked] = useState(false);

  const handleAppointClick = () => {
    setIsAppointClicked(true);
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('document');
  
    // Dimensions of A4 page in millimeters
    const a4Width = 210;
    const a4Height = 297;
  
    // Get the width and height of the element
    const width = 1000;
    const height = 800;
  
  
    try {
      const canvas = await html2canvas(element, { scale: 1 });
  
      const a4Width = 300;
      const a4Height = 297;
      
      // Create a PDF with wider dimensions
      const pdf = new jsPDF('p', 'mm', [a4Width, a4Height]);
      
      // Add the captured image to the PDF
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, a4Width, a4Height);
      
      // Save the PDF
      pdf.save('Appointment.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  return (
    <main >
      <h1 className="text-3xl font-bold text-center border-b-4 border-blue-700 mt-20 mb-5 w-3/12 mx-auto">
        Book Doctor's Appointment
      </h1>

      <div className="py-6">
        <div className="mx-auto flex flex-wrap mt-10 w-2/3 bg-slate-200 rounded-sm h-3/4 p-8">
          
          <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Patient's NID
                                </label>
                                <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Patient's Name (optional)
                                    </label>
                                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue=""/>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Doctor ID
                                    </label>
                                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Doctor's Name (optional)
                                    </label>
                                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
          <div className="text-center justify-between mx-auto">
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold text-lg px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mt-4 mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleAppointClick}
            >
              Appoint
            </button>
          </div>
        </div>

        {isAppointClicked && (
          <>
          <div  className="w-1/2 mx-auto mt-16 p-8 border border-gray-300 rounded-lg bg-white">
            <div id="document">
          <h1 className="text-3xl font-bold text-center border-b-4 border-blue-700 mb-5">Appointment Ticket</h1>
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">PATIENT : MUSARRAT ZEBA</h2>
            <h2 className="text-lg font-semibold mb-2">DOCTOR: DR. AFSARA YEASMIN </h2>
            <h6 className="text-blueGray-700 text-2xl font-bold mb-4">Serial Number #83456</h6>
            <h6 className="text-blueGray-700 text-2xl font-bold mb-4">Date and Time: 12/12/2021 12:00 PM - 12:30 PM (30 min)</h6>
        </div>
        <button
        className="bg-blue-500 text-white active:bg-blue-600 mt-10 font-bold uppercase text-md px-4 py-2 rounded w-1/2  shadow hover:shadow-md outline-none focus:outline-none ease-linear  ml-44 transition-all duration-150"
        type="button"
        onClick={handleDownloadPdf}
      >
        Download Ticket
      </button>
          </div>

        
       
      </div>
        </>
        )}
      </div>
    </main>
  );
};

export default Main;
