import { cookies } from 'next/headers';

export const createPlaylist = async (userId: string) => {
  try {
    const spotifyAccessToken = cookies().get('spotifyAccessToken');

    if (!spotifyAccessToken) {
      throw new Error('Missing Access Token ');
    }

    const URL = `https://api.spotify.com/v1/users/${userId}/playlists`;

    const header = {
      Authorization: `Bearer ${spotifyAccessToken.value}`,
    };

    const playList = {
      name: 'Gang Gang',
      public: true,
      collaborative: true,
      description: 'Playlist created from send me a song',
    };

    const options = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(playList),
    };

    const req = await fetch(URL, options);
    if (!req.ok) {
      throw Error('failed to create playlitst on spotify');
    }

    const createPlaylist = await req.json();

    const { id: playlistId } = createPlaylist;

    return playlistId;
  } catch (error) {
    console.error('Error getting creating playlist ', error);
    throw error;
  }
};
