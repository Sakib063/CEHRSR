import ProjectLogo from 'next/image'
import Link from 'next/link';
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton } from '../auth'
import NotificationBell from './notificationBell'

async function Navbar() {
  const session = await getServerSession(authOptions);
  const userType = session?.user?.type || null;
  const userId = session?.user?.id || null;

  console.log('hellloooo', userType);

  return (
    <div>
      <header className="pl-5 md:pl-20 py-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-2 ml-5">
          <ProjectLogo src="/logo CEHRSR.png" width={50} height={60} alt="project-logo" />
          <h1 className="text-2xl md:text-3xl font-bold">
            <a href="index.html">CEHRSR</a>
          </h1>
        </div>

        <nav className="hidden md:flex space-x-5 ml-auto mr-5">
          <ul className="flex space-x-5">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/#ourServices">Our Services</a>
            </li>
            <li>
              <a href="/#faq">FAQ</a>
            </li>
            <li>
              <a href="/#contacts">Contacts</a>
            </li>
          </ul>
        </nav>

        {userType === 'Patient' && session ? (
        // Render content for logged-in patients with notification bell
        <div className="flex space-x-2 md:space-x-5">
          <Link href={`/dashboard`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-4 rounded-full">
              Dashboard - {session?.user?.name}
            </button>
          </Link>
          <NotificationBell userId={session?.user?.id} />
        </div>
      ) : userType === 'Doctor' && session ? (
        // Render content for logged-in doctors with hospital name
        <div className="flex space-x-2 md:space-x-5">
          <Link href={`/dashboard`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-4 rounded-full">
              Dashboard - Dr. {session?.user?.name}
            </button>
          </Link>
         
        </div>
      ) : userType === 'Hospital' && session ? (
        // Check if the user type is "Hospital" and return session.user.name
        <Link href={`/dashboard`}>
        <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 md:py-3 md:px-4 rounded-full">
          Dashboard - Hospital {session?.user?.name}
        </button>
      </Link>
      ) : (
        // Render content for users who are not logged in
        <div className="px-5 md:px-10">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-4 rounded-full">
            <Link href="/signin">Login / Registration</Link>
          </button>
        </div>
      )}
      {!session ? null : (
        // Render logout button for logged-in users
        <div className="mt-1.5 px-3 md:px-6">
          <LogoutButton />
        </div>
      )}
      </header>
    </div>
  );
}

export default Navbar;
