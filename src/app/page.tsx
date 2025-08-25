"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import HomeLoginPage from "@/modules/dashboard/views/homeLogin";

const Home = () => {
  const { data: session } = authClient.useSession();




  if (session) {
    return (
      <div className="h-screen w-full justify-center items-center flex flex-col gap-3 p-4">
        <h1 className="font-extrabold text-5xl capitalize text-blue-400">
          Welcome to HAI, {session.user.name.split(" ")[0]}
        </h1>
        <Button variant="custom" onClick={() => authClient.signOut()}>
          Log Out
        </Button>
      </div>
    );
  }

  return (
    <HomeLoginPage/>
  );
};

export default Home;
