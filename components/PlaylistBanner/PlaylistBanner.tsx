import DeleteSvg from "@assets/svg/delete.svg";
import useSpotify from "@/hooks/useSpotify";
import { useToast } from "@/components/ui/use-toast";

type PlaylistBannerProps = {
  selectedPlaylistData: any;
  setSelectedPlaylistData: any;
};

export const PlaylistBanner = ({
  selectedPlaylistData,
  setSelectedPlaylistData,
}: PlaylistBannerProps) => {
  const spotifyApi = useSpotify();
  const { toast } = useToast();
  const handleUnfollowPlaylist = (playlistId: string, playlistName: string) => {
    // Unfollow a playlist
    spotifyApi.unfollowPlaylist(playlistId).then(
      function (data) {
        setSelectedPlaylistData({});
        toast({
          title: `Unfollowed playlist ${playlistName}`,
        });
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  return (
    <section className="playlist-banner">
      <figure>
        {selectedPlaylistData?.images?.length > 0 && (
          <img
            className="playlist-banner__image"
            src={selectedPlaylistData?.images[0].url || ""}
            alt="Playlist Banner"
          />
        )}
      </figure>

      <div className="playlist-banner__info">
        <h1 className="playlist-banner__title">{selectedPlaylistData?.name}</h1>
        <div className="playlist-banner__description">
          <p
            dangerouslySetInnerHTML={{
              __html: selectedPlaylistData?.description,
            }}
          ></p>
          {Object.keys(selectedPlaylistData).length > 0 && (
            <div className="playlist-banner__button">
              <button
                onClick={() =>
                  handleUnfollowPlaylist(
                    selectedPlaylistData.id,
                    selectedPlaylistData.name
                  )
                }
              >
                <span>Unfollow Playlist</span>
                <DeleteSvg />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlaylistBanner;
