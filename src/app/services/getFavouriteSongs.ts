export const getFavouriteSongs = async (accessToken: string) => {
  const timeRange = 'short_term';
  const URL = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`;
  const header = {
    Authorization: `Bearer ${accessToken}`,
  };
  const options = {
    method: 'GET',
    headers: header,
  };
  const req = await fetch(URL, options);
  const favTracks = await req.json();
  return favTracks;
};
