'use client'

import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export const LoginButton = () => {
  return <button onClick={() => signIn()}>Sign in</button>
}

export const LogoutButton = () => {
  return (
    <button className="pr-4" onClick={() => signOut()}>
      
      
      <Image src="/logout.png" alt="Sign out" width={36} height={36} />
    </button>
  );
};