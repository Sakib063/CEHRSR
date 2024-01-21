
import { db } from '../app/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const sendOtpToFirestore = async (otp) => {
    try {
      // Access the 'otp' collection in Firestore
      const otpRef = collection(db, 'otp');

      // Add a new document with the specified OTP
      await addDoc(otpRef, {
        otp: otp,
      });

      console.log('OTP added successfully!');
    } catch (error) {
      console.error('Error adding OTP: ', error.message);
    }
  };

  export default sendOtpToFirestore;