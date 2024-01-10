"use client" ;

import Image from 'next/image'
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";


export default function Home() {
  const auth = useAuth();
  console.log(auth);
  return <> 
           <h1>Public Home Page</h1>
                {auth ? (
                  console.log(auth),
                   <p>logged in</p>
                ) : (
                  <Link href="/login">Login</Link>
                )}
  </>
}
