import WelcomeDoctor from './Doctor';
import WelcomePatientWithSuggestions from './Patient';
import WelcomeHospital from './Hospital';

import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton } from '../auth'
import { User } from '../user'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  
    return (
      <div>
      {session?.user?.type === 'Patient' ? (
        <WelcomePatientWithSuggestions />
      ) : session?.user?.type === 'Doctor' ? (
        <WelcomeDoctor />
      ) : (
        <WelcomeHospital />
      )}
    </div>
  
    )
  }



