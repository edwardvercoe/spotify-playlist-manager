import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyApi from "@/lib/spotify";

const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // @ts-ignore
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      // @ts-ignore
      spotifyApi.setAccessToken(session.accessToken);
    }
  }, [session]);
  return spotifyApi;
};
export default useSpotify;
