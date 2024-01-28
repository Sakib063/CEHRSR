import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request){
    try {
        const res = await request.json();  
        var newData = res.map((item) => {
            const { hospital, date, patientAge, doctorName, ...newItem } = item;
            return newItem;
        });
        newData=JSON.stringify(newData);
        const cstring = newData.replace(/["\[\]]/g, '');
        const response = await axios.post('https://91d4-34-141-128-24.ngrok-free.app/api/data', {
            input_text: cstring,
        });

        const summary=response.data.summary;
        console.log('Response from Flask API:', summary);
        return NextResponse.json({summary},{status: 200});
    } 
    catch (error) {
        console.error('Error processing request:', error.message);
        return new Response({ body: 'Internal Server Error', status: 500 });
    }
}