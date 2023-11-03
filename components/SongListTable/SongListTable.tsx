import React, { useEffect, useState } from "react";
import DeleteSvg from "@assets/svg/delete.svg";
import useSpotify from "@/hooks/useSpotify";
import { useToast } from "@/components/ui/use-toast";

type PlaylistBannerProps = {
  selectedPlaylistData: any;
};

export const SongListTable = ({ selectedPlaylistData }: any) => {
  const spotifyApi = useSpotify();
  const [playlistTracks, setPlaylistTracks] = useState(
    selectedPlaylistData?.tracks?.items || []
  );
  const { toast } = useToast();

  useEffect(() => {
    setPlaylistTracks(selectedPlaylistData?.tracks?.items || []);
  }, [selectedPlaylistData?.tracks?.items]);

  const handleDeleteSong = (
    trackUri: string,
    playlistId: string,
    song: any
  ) => {
    var tracks = [{ uri: trackUri }];
    // var options = { snapshot_id : "0wD+DKCUxiSR/WY8lF3fiCTb7Z8X4ifTUtqn8rO82O4Mvi5wsX8BsLj7IbIpLVM9" };
    spotifyApi.removeTracksFromPlaylist(playlistId, tracks).then(
      function (data) {
        setPlaylistTracks(
          playlistTracks.filter((song: any) => song.track.uri !== trackUri)
        );
        toast({
          title: "Removed song from playlist",
        });
      },
      function (err) {
        console.log("Something went wrong!", err);
        if (err.body.error.status === 403) {
          toast({
            title: "You don't have permission to edit a playlist you don't own",
          });
        }
      }
    );
  };

  return (
    <section className="song-list-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Date added</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {playlistTracks?.map((song: any, index: number) => {
            return (
              <tr key={song.track.id}>
                <td> {index + 1} </td>
                <td>
                  <p className="song-list-table__song-title">
                    {song.track.name}
                  </p>
                  <p className="song-list-table__artists">
                    {song.track.artists
                      ?.map((artist: any) => artist.name)
                      .join(", ")}
                  </p>
                </td>
                <td>{song.track.album.name}</td>
                <td>
                  {
                    // convert date to readable format - no time
                    new Date(song.added_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                </td>
                <td>
                  {Math.floor(song.track.duration_ms / 60000)}:
                  {Math.floor((song.track.duration_ms % 60000) / 1000) < 10
                    ? "0" + Math.floor((song.track.duration_ms % 60000) / 1000)
                    : Math.floor((song.track.duration_ms % 60000) / 1000)}
                </td>
                <td>
                  <DeleteSvg
                    onClick={() =>
                      handleDeleteSong(
                        song.track.uri,
                        selectedPlaylistData.id,
                        song
                      )
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

// Remove all occurrence of a track
