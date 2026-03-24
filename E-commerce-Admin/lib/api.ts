"use client"

import { error } from "node:console";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const loginApi = async (data: { email: string; password: string }):Promise<any> => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
    credentials: "include",
  });
    
  return res.json()
}

export const signupApi = async(data:{email:string,password:string,username:string}):Promise<any>=>{
      const res = await fetch(`${BASE_URL}/signup`,{
        method:"POST",
         headers: {
      "Content-Type": "application/json",
    },
   body:JSON.stringify(data),
   credentials: "include",
      });

      return res.json();
   
}



