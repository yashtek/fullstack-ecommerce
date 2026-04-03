"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { ReactNode } from "react"
import Navbar from "@/components/Navbar";
import  Footer  from "@/components/Footer";

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
  
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Navbar/>
        {children}
        <Toaster position="top-right" />
        <Footer/>
        </ThemeProvider>
      </QueryClientProvider>
 
  )
}
