import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { getUserProfile } from "@/lib/server-api";
import { redirect } from "next/navigation";
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider";

export default async function AdminLayout({children}:{children:React.ReactNode}){
    const user = await getUserProfile();
    
    if(!user){
        redirect("/");
    }

    return(
        <div className="flex h-screen w-full">
            <ThemeProvider>
            <SidebarProvider>
            <AppSidebar user={user}/>
            
            <main className="flex-1 w-full p-6 overflow-auto">
                {children}
            </main>
 </SidebarProvider>
 </ThemeProvider>
        </div>
    )


}