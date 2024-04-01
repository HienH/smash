import { formatSong } from '@/app/helpers/formatSong';
import { getFavouriteSongs } from '@/app/services/getFavouriteSongs';
import { getUserId } from '@/app/services/getUserId';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_SECRET_ID;
  const redirect = process.env.SPOTIFY_REDIRECT;
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
  const { access_token, refresh_token, expires_in } = spotifyAccessToken;

  if (access_token) {
    const favSongs = await getFavouriteSongs(access_token);
    const songs = favSongs.items.map((song) => formatSong(song));
    const userId = await getUserId(access_token);

    console.log('this is working ');
    console.log(userId);
    return NextResponse.json({ songs, userId }, { status: 200 });
  }

  return NextResponse.json(
    { error: 'failed to call spotify api' },
    { status: 500 },
  );
}

//TODO get refresh token when access token is expires_in - in seconds which access is valid
const getRefreshToken = () => {};
