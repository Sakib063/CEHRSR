import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton } from './auth'
import { User } from './user'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    
    <main>
      <LoginButton />
      
      
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <LogoutButton />      
      <h2>Client Call</h2>
      <User />
    </main>
    
  )
}




// "use client" ;

// import Image from 'next/image'
// import { useAuth } from "@/hooks/useAuth";
// import Link from "next/link";


// export default function Home() {
//   const auth = useAuth();
  
//   return <> 
//            <h1>Public Home Page</h1>
//                 {auth ? (
//                   console.log(auth),
//                    <p>logged in</p>
//                 ) : (
//                   <Link href="/login">Login</Link>
//                 )}
//   </>
// }
