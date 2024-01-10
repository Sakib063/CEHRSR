"use client" ;
import ProjectLogo from 'next/image'
import { useAuth } from "@/hooks/useAuth";
import Link from 'next/link';

function Navbar() {
  const auth = useAuth();

  return (
    <div>
      <header className="px-20 py-8 shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-2 ml-5">
          <ProjectLogo src="/logo CEHRSR.png" width={50} height={60} alt="project-logo" />
          <h1 className="text-3xl"><a href="index.html">CEHRSR</a></h1>
        </div>

        <nav className="space-x-5 ml-auto mr-5">
          <ul className="flex space-x-5">
            <li><a href="#banner">Home</a></li>
            <li><a href="#ourServices">Our Services</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contacts">Contacts</a></li>
          </ul>
        </nav>

        {auth ? (
          // Render content for logged-in users
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
           <Link href={`/WelcomePatient/${encodeURIComponent(JSON.stringify(auth.username))}`}>
             {JSON.stringify(auth.username)}
</Link>


          </button>
        ) : (
          // Render the login/registration button for non-logged-in users
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <a href="/login">Login / Registration</a>
          </button>
        )}
      </header>
    </div>
  );
}

export default Navbar;

  