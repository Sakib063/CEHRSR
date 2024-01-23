import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request){
    const res = await request.json();  
    const newData = res.map((item) => {
        const { hospital, date, patientAge, doctorName, ...newItem } = item;
        return newItem;
      });
      console.log(newData);
    const handleGenerateSummary = async () => {
        try {
            // Make a POST request to the Flask API
            const response = await axios.post('http://localhost link for bart', {
            input_text: newData,
        });
            setSummary(response.data.summary);
        } 
        catch (error) {
            console.error('Error generating summary:', error.message);
        }
    };
}