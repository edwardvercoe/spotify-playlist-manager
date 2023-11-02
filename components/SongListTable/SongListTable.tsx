import React from "react";
type PlaylistBannerProps = {
  selectedPlaylistData: any;
};

export const SongListTable = ({ selectedPlaylistData }: any) => {
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
            <th>Trash</th>
          </tr>
        </thead>
        <tbody>
          {selectedPlaylistData?.tracks?.items?.map(
            (song: any, index: number) => {
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
                      ? "0" +
                        Math.floor((song.track.duration_ms % 60000) / 1000)
                      : Math.floor((song.track.duration_ms % 60000) / 1000)}
                  </td>
                  <td>Trash</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </section>
  );
};
