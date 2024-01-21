"use server";
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'


export default async function updateSesssion() {
  const session = await getServerSession(authOptions)
  
    const { user } = session
    user.auth = true;

    console.log(user);
    return user.auth;
}



