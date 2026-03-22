import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
    return (
       <div className="relative min-h-screen flex items-center justify-center">
             {/* Background Image */}
             <img
               src="https://picsum.photos/1500/800"
               alt="bg"
               className="absolute inset-0 w-full h-full object-cover -z-10"
             />
       
             {/* Dark Overlay */}
             <div className="absolute inset-0 bg-black/40 -z-10" />
       
             {/* Content Container */}
             <div className="flex flex-col items-center justify-center text-center px-4 w-full max-w-md">
              
               {/* Login Form */}
               <div className="w-full ">
                 <SignupForm />
               </div>
             </div>
           </div>
    )
}