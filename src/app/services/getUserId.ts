export const getUserId = async (accessToken: string) => {
  const URL = 'https://api.spotify.com/v1/me';
  const header = {
    Authorization: `Bearer ${accessToken}`,
  };

  const options = {
    method: 'GET',
    headers: header,
  };

  const req = await fetch(URL, options);
  const userInfo = await req.json();
  const { id } = userInfo;

  return id;
};
