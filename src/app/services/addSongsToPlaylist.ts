export const addSongsToPlaylist = async (
  playlistId: string,
  songsToAdd: string[],
  accessToken: string,
) => {
  const URL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const header = {
    Authorization: `Bearer ${accessToken}`,
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

  try {
    let isSuccess = false;
    const res = await fetch(URL, options);

    if (res.status == 201 || res.status == 200) {
      isSuccess = true;
    } else {
      throw new Error(
        JSON.stringify({
          errors: res.body,
          status: res.status,
        }),
      );
    }

    return isSuccess;
  } catch (error) {
    console.log('error in adding songs', error);
  }
};
