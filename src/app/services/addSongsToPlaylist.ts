export const addSongsToPlaylist = async (
  playlistId: string,
  songsToAdd: string[],
  accessToken: string,
) => {
  const URL = `https://api.spotify.com/v1/playlist/${playlistId}/tracks`;
  // useContext
  const header = {
    Authorization: `Bearer ${accessToken}`,
  };

  const options = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(songsToAdd),
  };

  try {
    let isSuccess = false;
    const req = await fetch(URL, options);
    if (req.status == 201) {
      isSuccess = true;
    }
    return isSuccess;
  } catch (error) {
    console.log('error in adding songs', error);
  }
};
