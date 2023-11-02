import React, { useEffect, useState } from "react";
import PlaylistPanel from "../PlaylistPanel/PlaylistPanel";
import PlaylistBanner from "../PlaylistBanner/PlaylistBanner";
import { signOut } from "next-auth/react";
import { Nav } from "../Nav/Nav";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import { SongListTable } from "../SongListTable/SongListTable";

type LayoutProps = {
  componentData?: any;
};

export const Layout = ({ componentData }: LayoutProps) => {
  const [selectedPlaylistID, setSelectedPlaylistID] = useState("");
  const [selectedPlaylistData, setSelectedPlaylistData] = useState({} as any);
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  useEffect(() => {
    if (!selectedPlaylistID) return;
    spotifyApi.getPlaylist(selectedPlaylistID).then(
      function (data) {
        console.log("Some information about this playlist", data.body);
        setSelectedPlaylistData(data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [selectedPlaylistID]);

  return (
    <div className="layout">
      <div className="layout__aside-panel layout__panel">
        <PlaylistPanel
          setSelectedPlaylistID={setSelectedPlaylistID}
          selectedPlaylistData={selectedPlaylistData}
        />
      </div>
      <div className="layout__main-panel layout__panel">
        <Nav userImage={session?.user?.image} />
        <PlaylistBanner selectedPlaylistData={selectedPlaylistData} />
        <SongListTable selectedPlaylistData={selectedPlaylistData} />
      </div>
    </div>
  );
};

export default Layout;
