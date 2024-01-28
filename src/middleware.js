


export { default } from 'next-auth/middleware'



export const config = {
  
  matcher: ['/dashboard', '/ConsultationHistory/:path*', '/MedicalRecordEntry', '/help/:path*']
}