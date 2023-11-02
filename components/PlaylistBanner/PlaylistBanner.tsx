type PlaylistBannerProps = {
  selectedPlaylistData: any;
};

export const PlaylistBanner = ({
  selectedPlaylistData,
}: PlaylistBannerProps) => {
  return (
    <section className="playlist-banner">
      <figure>
        {selectedPlaylistData?.images && (
          <img
            className="playlist-banner__image"
            src={selectedPlaylistData?.images[0].url}
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
        </div>
      </div>
    </section>
  );
};

export default PlaylistBanner;
