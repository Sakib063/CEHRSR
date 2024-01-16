


export { default } from 'next-auth/middleware'


export const config = {
  
  matcher: ['/WelcomePatient','/WelcomeDoctor', '/ViewConsent', '/other/:path*', '/help/:path*']
}