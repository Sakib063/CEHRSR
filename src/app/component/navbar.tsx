import ProjectLogo from 'next/image'
import Link from 'next/link';
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton } from '../auth'
import { User } from '../user'


 async function Navbar() {
  const session  = await getServerSession(authOptions)
  const type = session?.user?.type || null
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

        {session ? (
          
          // Render content for logged-in users
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          
          <Link href={`/dashboard`}>
              Dashboard - {(session?.user?.name)}
            </Link>
          

          </button>
          
        ) : (
          // Render the login/registration button for non-logged-in users
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <a href="/signin">Login / Registration</a>
          </button>
        )}
        {!session ? null : ( <div> <LogoutButton/> </div>) }
      </header>
    </div>
  );
}

export default Navbar;

  