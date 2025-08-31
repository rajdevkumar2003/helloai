import { auth } from "@/lib/auth";
import HomeLoginPage from "@/modules/dashboard/views/HomeLoginPage";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/sign-in");
  }

  return <HomeLoginPage />;
};

export default Home;
