import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const Login = ({ providers }: any) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/"); // redirect to homepage if user is logged in
    }
  }, [session]);

  return (
    <main>
      <section className="login-page">
        <h1>Spotify Playlist Manager</h1>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Log in with {provider.name}
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
