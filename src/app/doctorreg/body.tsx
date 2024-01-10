import React from 'react';

export default function Main() {
    return (
        <main>
            <div className="text-4xl text-center font-bold pt-20">
                <h1>Doctor Registration Form</h1>
                <p className="text-blue-500 dark:text-blue-400"></p>
                <hr className="w-48 h-1 mx-auto my-4 bg-blue-100 border-0 rounded md:my-10 dark:bg-blue-700" />
                <p className="text-blue-500 dark:text-blue-400"></p>
            </div>
            <div className="w-1/2 border-blue-700 border-2 rounded-md mx-auto my-20">
                <div className="flex items-center justify-center">
                    <form className="py-10 flex-col">
                        <div className="mb-4">
                            <label htmlFor="firstName" className="text-sm text-black float-left w-32">First Name</label>
                            <input type="text" id="firstName" className="border border-blue-700 rounded p-1 text-sm flex-1" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="text-sm text-black float-left w-32">Last Name</label>
                            <input type="text" id="lastName" className="border border-blue-700 rounded p-1 text-sm flex-1" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nid" className="text-sm text-black float-left w-32">National ID</label>
                            <input type="text" id="nid" className="border border-blue-700 rounded p-1 text-sm flex-1" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="text-sm text-black float-left w-32">Phone Number</label>
                            <input type="text" id="phone" className="border border-blue-700 rounded p-1 text-sm flex-1" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-sm text-black float-left w-32">Email</label>
                            <input type="email" id="email" className="border border-blue-700 rounded p-1 text-sm flex-1" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-sm text-black float-left w-32">Password</label>
                            <input type="password" id="password" className="border border-blue-700 rounded p-1 text-sm flex-1" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="text-sm text-black float-left w-32">Confirm Password</label>
                            <input type="password" id="confirmPassword" className="border border-blue-700 rounded p-1 text-sm flex-1" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="license" className="text-sm text-black float-left w-32">BM & DC License Number</label>
                            <input type="text" id="license" className="border border-blue-700 rounded p-1 text-sm flex-1" required />
                        </div>
                        <div className="flex items-center justify-center mb-4 pt-4">
                            <button type="submit" className="bg-blue-500 text-white rounded-full p-2 w-40 hover:bg-blue-700">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
