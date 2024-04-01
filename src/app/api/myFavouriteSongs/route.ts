import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_SECRET_ID;
  const redirect = process.env.SPOTIFY_REDIRECT;
  const scope = 'user-top-read%20playlist-modify-private';
  const accessCode = await req.json();

  const encodeHeader = Buffer.from(clientId + ':' + clientSecret).toString(
    'base64',
  );

  const header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${encodeHeader}`,
  };

  const options = {
    method: 'POST',
    headers: header,
  };

  const URL = `https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${accessCode}&redirect_uri=${redirect}`;

  const getSpotifyAccessToken = await fetch(URL, options);
  const spotifyAccessToken = await getSpotifyAccessToken.json();
  console.log('this is spotifyAccessCode');
  console.log(spotifyAccessToken);

  const { access_token, refresh_token } = spotifyAccessToken;

  //Store accessToken, refresh_token

  return NextResponse.json({ success: true });
}
