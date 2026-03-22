"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {  signupApi } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import Link from "next/link"


export const loginSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(4)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers,underscore allowed"),
  password: z
    .string()
    .min(8, "Password must contain at least one letter and one number"),
})

export function SignupForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  })
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success("Signup Successfully")
      router.push("/")
    },
    onError: () => {
      toast.error("Unable to signup")
    },
  })

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate(data)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
       <div className="flex items-center justify-center">
          <img src="/logo.png" alt="admin logo" width={80} height={80} />
  <CardTitle>Signin to your account</CardTitle>
         </div>
       
         <CardAction>
          <Link className="hover:underline" href="/">Log in</Link>
        </CardAction>
       
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <div className="grid gap-2">
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        UserName
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your Name"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="m@example.com"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-password">
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="******"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </div>
        
            <Button type="submit" className="w-full mt-4">
              {isPending ? "Signing in..." : "Signup"}
            </Button>
         
        </form>
      </CardContent>
    </Card>
  )
}
