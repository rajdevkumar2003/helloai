"use client";

import Image from "next/image";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1,{message:"Name is required"}),
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

const SignUpView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    authClient.signUp.email(
      {
        name:data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push("/sign-in");
          setPending(false);
        },
        onError:(ctx)=> {
            setError(ctx.error.message);
            setPending(false);
        },
      }
    );
  };

  const onSocial = (provider:"google"|"github") => {
      setError(null);
      setPending(true);
      authClient.signIn.social(
        {
          provider:provider,
          callbackURL:"/"
        },
        {
          onSuccess: () => {
            setPending(false);
          },
          onError:(ctx)=> {
              setError(ctx.error.message);
              setPending(false);
          },
        }
      );
    };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome</h1>
                  <p className="text-muted-foreground text-balance">
                    Sign up to your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="enter your name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@ex.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none items-center">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button disabled={pending} type="submit" className="w-full" variant="custom">
                  Sign In
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={()=>onSocial("google")} disabled={pending} variant="outline" type="button" className="w-full">
                    Google
                  </Button>
                  <Button onClick={()=>onSocial("github")} disabled={pending} variant="outline" type="button" className="w-full">
                    Github
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href={"/sign-in"} className="underline">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-blue-600 to-blue-800 relative hidden md:flex flex-col justify-center items-center">
            <Image
              alt="logo"
              src={"/logo.svg"}
              width={92}
              height={92}
              className="h-[92px] w-[92px]"
            />
            <p className="text-2xl font-bold text-white">Hello AI</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpView;
