import { cookies } from 'next/headers';

export const addSongsToPlaylist = async (
  playlistId: string,
  songsToAdd: string[],
) => {
  try {
    const spotifyAccessToken = cookies().get('spotifyAccessToken');

    if (!spotifyAccessToken) {
      throw new Error('Missing Access Token ');
    }

    const URL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    const header = {
      Authorization: `Bearer ${spotifyAccessToken.value}`,
      'Content-Type': 'application/json',
    };

    const body = {
      uris: songsToAdd,
    };

    const options = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body),
    };
    const res = await fetch(URL, options);

    if (!res.ok) {
      throw new Error('Failed to get userId');
    }

    return { isSuccess: true };
  } catch (error) {
    console.error('Error in adding songs', error);
    throw error;
  }
};
