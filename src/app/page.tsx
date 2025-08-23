"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const Home = () => {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginActive, setLoginActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length === 0) {
      alert("please enter your name");
      return;
    }
    authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
      },
      {
        onSuccess: () => {
          setLoginActive(true);
          alert("success");
        },
        onError: () => {
          alert("something went wrong");
        },
      }
    );
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    authClient.signIn.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
      },
      {
        onSuccess: () => {
          alert("success");
        },
        onError: () => {
          alert("something went wrong");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="h-screen w-full justify-center items-center flex flex-col gap-3 p-4">
        <h1 className="font-extrabold text-9xl capitalize text-blue-400">
          Welcome to HAI, {session.user.name}
        </h1>
        <Button variant="custom" onClick={() => authClient.signOut()}>
          Log Out
        </Button>
      </div>
    );
  }

  return (
    <div>
      {!loginActive ? (
        <div className="h-screen w-full justify-center items-center flex p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-lvh">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter your name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
            />
            <Input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
            />
            <Button type="submit" variant="custom">
              Sign Up
            </Button>
            <Button variant="ghost" onClick={()=>setLoginActive(true)}>Have an acc?</Button>
          </form>
        </div>
      ) : (
        <div className="h-screen w-full justify-center items-center flex p-4">
          <form onSubmit={handleLogin} className="flex flex-col gap-2 w-lvh">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
            />
            <Input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
            />
            <Button variant="custom" type="submit">
              Sign In
            </Button>
            <Button variant="ghost" onClick={()=>setLoginActive(false)}>Dont have an acc?</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
