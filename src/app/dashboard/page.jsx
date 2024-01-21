import WelcomeDoctor from './Doctor';
import WelcomePatient from './Patient';

import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton } from '../auth'
import { User } from '../user'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  
    return (
      ((session?.user?.type==='Patient') ? <WelcomePatient/> : <WelcomeDoctor/> )

    )
  }



