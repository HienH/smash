export interface ISong {
  uri: string;
  name: string;
  artists: string[];
}

export const formatSong = (spotifySongData) => {
  const { name, uri, artists } = spotifySongData;

  const formatArtists = artists.map((artist) => artist.name);

  return {
    name,
    uri,
    artists: formatArtists,
  };
};
