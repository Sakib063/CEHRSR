import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton } from './auth'
import { User } from './user'
import Image from 'next/image'
import FAQ from './component/FAQ'

import Link from 'next/link'
import Contact from './component/Contact'







export default async function Home() {
 const session = await getServerSession(authOptions)
console.log(session);
  return (
    <div className='shadow-m'>
        
        <section id='banner' style={{ backgroundImage: 'url("hero-bg.png")', height:'600px' }} className="align-items-center shadow-md relative bg-cover  pt-40 pl-20">
  <div className='container'>
    <h1 className='m-0 text-5xl font-bold uppercase text-blue-900'>Welcome to CEHRSR</h1>
    <h2 className=' mt-5 text-blue-900 text-2xl'>Find all your medical reports just in a few clicks</h2>
    <div className="flex flex-col ">
  <Link href={"/Hospital/HospitalLogin"}>
    <button className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md mt-8">
      Get Started as Hospital Admin
    </button>
  </Link>

  <Link href={"/signin"}>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-4">
      Sign In
    </button>
  </Link>
</div>

  </div>
</section>



        <hr className='mt-10' />

        <section id='ourServices' className='mt-20  lg:px-0'>
  <div className="mx-auto mb-8 max-w-2xl  text-center lg:mb-10">
    <h3 className="mb-3 text-xl font-bold text-dark sm:text-2xl">
      Our Services
    </h3>
  </div>

  <div className="container mx-auto mt-10 h-1/2 flex flex-col items-center lg:flex-row lg:justify-center">
    <div className="bg-blue-600 p-4 rounded-lg shadow-md text-white mb-8 lg:mb-0 lg:mr-8 lg:w-60">
      <h3 className="text-xl font-semibold mb-2">Why Choose CEHRSR?</h3>
      <p className="text-white">CEHRSR is an online platform where patients can find their previous medical records and see the summarized version of the records.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:w-full lg:max-w-2xl">
      <div className="bg-white p-4 rounded-lg shadow-md hover:bg-blue-500 hover:text-white">
        <h3 className="text-xl font-semibold mb-2">Centralized Patient Records</h3>
        <p className="text-gray-600">CEHRSR is an online platform where patients can find their previous medical records and see the summarized version of the records.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md hover:bg-blue-500 hover:text-white">
        <h3 className="text-xl font-semibold mb-2">Time Saving</h3>
        <p className="text-gray-600">The platform ensures time-saving and efficient healthcare delivery, improving the overall quality of patient care.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md hover:bg-blue-500 hover:text-white">
        <h3 className="text-xl font-semibold mb-2">Emergency Patient's Records</h3>
        <p className="text-gray-600">The system ensures quick access to the emergency patient's records during an emergency situation, saving precious time and improving the quality of patient care.</p>
      </div>
    </div>
  </div>
</section>
        <hr className='mt-20' />


        
        <section id='faq' className='mt-10 '>
          <FAQ/>
        </section>
      

      <section id='contactUs' className='mt-20'>
      <Contact/>
      </section>
      

    </div>
  )
}
// export default async function Home() {
//   const session = await getServerSession(authOptions)
//   return (
    
//     <main>
//       <LoginButton />
      
      
//       <h2>Server Session</h2>
//       <pre>{JSON.stringify(session)}</pre>
//       <LogoutButton />      
//       <h2>Client Call</h2>
//       <User />
//     </main>
    
//   )
// }




// // "use client" ;

// // import Image from 'next/image'
// // import { useAuth } from "@/hooks/useAuth";
// // import Link from "next/link";


// // export default function Home() {
// //   const auth = useAuth();
  
// //   return <> 
// //            <h1>Public Home Page</h1>
// //                 {auth ? (
// //                   console.log(auth),
// //                    <p>logged in</p>
// //                 ) : (
// //                   <Link href="/login">Login</Link>
// //                 )}
// //   </>
// // }
