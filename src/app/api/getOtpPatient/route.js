import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    try {
      const req = await request.json();
      const nid = req.nid;
      
      const otp = req.otp;
      
       console.log(otp);
      //  console.log('streamName', streamName);
  
      
      return NextResponse.json({otp},{status: 200});
    } 
    catch (error) {
      
      return NextResponse.json({ message: 'Internal Server Error' });
    }
  }