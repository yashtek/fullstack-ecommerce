const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const loginApi = async (data: { email: string; password: string }) => {
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

export const signupApi = async(data:{email:string,password:string,username:string})=>{
      const res = await fetch(`${BASE_URL}/signup`,{
        method:"POST",
         headers: {
      "Content-Type": "application/json",
    },
   body:JSON.stringify(data)
      });

      return res.json();
   
}

export const getUserProfile  = async ()=>{
  const res = await fetch(`${BASE_URL}/me`,{
     method:"GET",
     credentials:"include"
  })
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}
