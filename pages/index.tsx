import Layout from "@/components/Layout/Layout";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main>
      <Layout />
      <button onClick={() => signOut()}>Logout</button>
    </main>
  );
}
