import * as React from 'react'

export default function DiagnosisReport() {
    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold border-b-4 border-blue-500 mt-20 mb-5">Diagnosis Reports
            </h1>
            <div className="overflow-auto rounded-lg shadow mb-20">
                <table className="w-auto border">
                    <thead className="bg-blue-200 border-b-2 border-blue-300">
                        <tr className="border border-solid border-l-0 border-r-0">
                            <th className="text-md px-10 py-5 border">Date</th>
                            <th className="text-md px-10 py-5 border">Hospital</th>
                            <th className="text-md px-10 py-5 border">Report Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-50">
                            <td className="text-md px-8 py-4 border">2022-11-01</td>
                            <td className="text-md px-8 py-4 border">Hospital A</td>
                            <td className="text-md px-8 py-4 border">CBC</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="text-md px-8 py-4 border">2022-11-02</td>
                            <td className="text-md px-8 py-4 border">Hospital B</td>
                            <td className="text-md px-8 py-4 border">NS1</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="text-md px-8 py-4 border">2022-11-03</td>
                            <td className="text-md px-8 py-4 border">Hospital C</td>
                            <td className="text-md px-8 py-4 border">Blood</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 mr-10 rounded">
                    Back to Previous Page
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Summarized Report
                </button>
            </div>
        </main>
    )
}
