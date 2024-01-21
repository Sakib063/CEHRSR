"use server";
import { db } from "../firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

const fetchOtpData = async () => {

    const session = await getServerSession(authOptions)
    const { user } = session
    const {id} = user
    try {
      // Access the 'otp' collection in Firestore
      const otpCollectionRef = collection(db, id);
  
      // Retrieve all documents in the collection
      const querySnapshot = await getDocs(otpCollectionRef);
  
      // Extract data from each document
      const otpValues = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id, // Document ID
          otp: doc.data().otp,
        };
      });
  
      return otpValues;
    } catch (error) {
      console.error('Error fetching OTP data: ', error.message);
      return [];
    }
  };
  
  export { fetchOtpData };