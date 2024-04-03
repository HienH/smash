export const createPlaylist = async (accessToken: string, userId: string) => {
  const URL = `https://api.spotify.com/v1/users/${userId}/playlists`;

  const header = {
    Authorization: `Bearer ${accessToken}`,
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

  try {
    const req = await fetch(URL, options);
    const createPlaylist = await req.json();

    const { id: playlistId } = createPlaylist;

    if (!playlistId) {
      throw Error('failed to create playlitst on spotify');
    }

    return playlistId;
  } catch (error) {
    console.log('error in creating playlist', error);
  }
};
