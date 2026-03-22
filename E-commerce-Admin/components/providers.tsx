"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { ReactNode } from "react"

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
  
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right" />
      </QueryClientProvider>
 
  )
}
