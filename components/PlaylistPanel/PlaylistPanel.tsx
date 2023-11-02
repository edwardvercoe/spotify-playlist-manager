import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type PlaylistPanelProps = {
  setSelectedPlaylistID: React.Dispatch<React.SetStateAction<string>>;
  selectedPlaylistData: any;
};

export const PlaylistPanel = ({
  setSelectedPlaylistID,
  selectedPlaylistData,
}: PlaylistPanelProps) => {
  const [playlists, setPlaylists] = useState([] as any[]);
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi, selectedPlaylistData]);

  return (
    <aside className="playlist-panel">
      <h2>Your Playlists</h2>
      <div className="playlist-panel__items">
        {playlists.map((playlist) => {
          return (
            <div
              key={playlist.id}
              className={`
              ${
                playlist.id === selectedPlaylistData.id
                  ? "bg-spotify-white/20"
                  : ""
              }
              playlist-panel__item`}
              onClick={() => setSelectedPlaylistID(playlist.id)}
              style={{
                backgroundColor:
                  playlist.id === selectedPlaylistData.id ? "" : "",
              }}
            >
              <figure>
                {playlist.images[0] && (
                  <img src={playlist.images[0].url} alt={playlist.name} />
                )}
              </figure>
              <div className="playlist-panel__item-details">
                <p className="playlist-panel__name">{playlist.name}</p>
                <p className="playlist-panel__owner">
                  {playlist.owner.display_name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default PlaylistPanel;
