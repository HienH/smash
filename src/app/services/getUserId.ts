import { cookies } from 'next/headers';

export const getUserId = async () => {
  try {
    const spotifyAccessToken = cookies().get('spotifyAccessToken');

    if (!spotifyAccessToken) {
      throw new Error('Missing Access Token');
    }
    const URL = 'https://api.spotify.com/v1/me';
    const header = {
      Authorization: `Bearer ${spotifyAccessToken.value}`,
    };

    const options = {
      method: 'GET',
      headers: header,
    };

    const req = await fetch(URL, options);
    if (!req.ok) {
      throw new Error('Failed to get userId');
    }

    const userInfo = await req.json();
    const { id } = userInfo;

    return id;
  } catch (error) {
    console.error('Error getting userId ', error);
    throw error;
  }
};
