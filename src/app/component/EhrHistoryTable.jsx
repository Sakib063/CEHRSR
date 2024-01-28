// ConsultationHistoryTable.js
import Link from 'next/link';

const ConsultationHistoryTable = ({ consultations, view_ehr, id }) => {
    let view_ehr=async(key,id)=>{
        router.push(`/ConsultationHistory/ViewEHR?id=${id}&key=${key}`);
    } 
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold border-b-4 border-blue-500 mt-20 mb-5">
        Consultation History
      </h1>
      <div className="overflow-auto rounded-lg shadow mb-10">
        <table className="w-auto border">
          <thead className="bg-blue-200 border-b-2 border-blue-300">
            <tr className="border border-solid border-l-0 border-r-0">
              <th className="text-md px-10 py-5 border">Date</th>
              <th className="text-md px-10 py-5 border">Hospital</th>
              <th className="text-md px-10 py-5 border">Doctor</th>
              <th className="text-md px-10 py-5 border"></th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="text-md px-8 py-4 border">{consultation.date}</td>
                <td className="text-md px-8 py-4 border">{consultation.hospital}</td>
                <td className="text-md px-8 py-4 border">{consultation.doctor}</td>
                <td
                  onClick={() => view_ehr(consultation.date, id)}
                  className="text-md px-8 py-4 border"
                >
                  <button className="bg-blue-500 text-white rounded-full p-2 w-40 hover:bg-blue-700">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mt-4">
        <Link href={'/dashboard'}>
          <button className="bg-blue-500 text-white px-4 py-2 mr-10 rounded">
            Back to Previous Page
          </button>
        </Link>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Summarized Report
        </button>
      </div>
    </main>
  );
};

export default ConsultationHistoryTable;
