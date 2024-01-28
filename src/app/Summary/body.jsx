"use client";
import React from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";


const Main = () => {
    const params = useSearchParams();
    const summary =  params.get('summary')
    const id =  params.get('id')
    console.log(summary);
    return (
        <div className="mt-15">
        <main className="max-w-4xl mx-auto w-screen flex flex-col items-center justify-center">
  <header className="my-6">
    <h1 className="text-center font-extrabold text-sky-700 tracking-tight text-6xl">Health Summary</h1>
  </header>
  <div className="w-full grid gap-2 px-4 mt-20 pb-40">
    <div className="flex justify-between items-center">
      <label htmlFor="name" className="w-100 text-right pr-4 font-bold text-gray-700">National Identification No.</label>
      <div className="flex-1">
        <input required type="text" id="nid" value={id} className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent" readOnly/>
      </div>
    </div>
    
    
    <div className="flex justify-between items-center">
      <label htmlFor="summary" className="self-start w-32 text-right mt-2 pr-4 font-bold text-gray-700">Summary</label>
      <textarea disabled id="about" name="about" rows={6} className="disabled:bg-gray-100 w-full flex-1 placeholder:text-slate-400 appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600" readOnly>{summary}</textarea>
    </div>
    
    
    
    <div className="flex justify-end">
        <Link href="/dashboard">
      <button type="button" className="bg-white py-2 px-2 border border-gray-300 rounded-md shadow-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600">Back</button>
        </Link>
      <button type="submit" className="ml-3 inline-flex justify-center py-2 px-2 border border-transparent shadow-sm font-bold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600">Download</button>
    </div>
  </div>
</main>
        </div>
    );
}

export default Main;