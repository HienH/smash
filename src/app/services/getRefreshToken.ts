import { cookies } from 'next/headers';

export const getRefreshToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const spotifyRefreshToken = cookies().get('spotifyRefreshToken');

  const URL = `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}`;

  // if (spotifyRefreshToken) return;
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const res = await fetch(URL, payload);

  const accesstoken = res.json();
  // update access cookie
  console.log(accesstoken);
};
