import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type PlaylistPanelProps = {
  componentData?: any;
};

export const PlaylistPanel = ({ componentData }: PlaylistPanelProps) => {
  const [playlists, setPlaylists] = useState([] as any[]);
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();

  console.log(spotifyApi);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <aside className="playlist-panel">
      <h2>Your Playlists</h2>
      <div className="playlist-panel__items">
        {playlists.map((playlist) => {
          return (
            <div key={playlist.id} className="playlist-panel__item">
              <figure>
                <img src={playlist.images[0].url} alt={playlist.name} />
              </figure>
              <div className="playlist-panel__item-details">
                {playlist.name}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default PlaylistPanel;
