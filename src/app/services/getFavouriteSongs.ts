import { cookies } from 'next/headers';

export const getFavouriteSongs = async () => {
  try {
    const spotifyAccessToken = cookies().get('spotifyAccessToken');

    if (!spotifyAccessToken) {
      throw new Error('Missing Access Token');
    }

    const timeRange = 'short_term';
    const limit = 40;
    const URL = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`;
    const header = {
      Authorization: `Bearer ${spotifyAccessToken.value}`,
    };
    const options = {
      method: 'GET',
      headers: header,
    };
    const req = await fetch(URL, options);
    if (!req.ok) {
      throw new Error('Failed to fetch favorite songs');
    }

    const favTracks = await req.json();
    return favTracks;
  } catch (error) {
    console.error('Error fetching favorite songs:', error);
    throw error;
  }
};
