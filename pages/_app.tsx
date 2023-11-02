import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import AuthSessionProvider from "../components/AuthSessionProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <AuthSessionProvider session={session}>
      <Component {...pageProps} />
    </AuthSessionProvider>
  );
}
