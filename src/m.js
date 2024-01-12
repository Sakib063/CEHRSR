import { NextResponse } from "next/server";

import { verifyJwtToken } from "@/libs/auth";
import { useAuth } from "@/hooks/useAuth";



export default async function middleware(request) {

  // const auth = useAuth();
  // var pre_token = request.cookies;
  // var tk=String(pre_token);
  // tk=tk.split("=");
  // var token=tk[1];
  // console.log(token);
//   console.log(token);
}