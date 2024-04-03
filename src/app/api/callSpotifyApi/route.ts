import { ISong, formatSong } from '@/app/helpers/formatSong';
import { addSongsToPlaylist } from '@/app/services/addSongsToPlaylist';
import { createPlaylist } from '@/app/services/createPlaylist';
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
    console.log(access_token);
    const favSongs = await getFavouriteSongs(access_token);
    const songs: ISong[] = favSongs.items.map((song) => formatSong(song));
    const userId = await getUserId(access_token);

    if (userId) {
      const smashPlaylistId = await createPlaylist(access_token, userId);
      console.log(smashPlaylistId);

      if (smashPlaylistId) {
        const songsUri = songs.map((song) => song.uri);
        const addToPlaylist = await addSongsToPlaylist(
          smashPlaylistId,
          songsUri,
          access_token,
        );
        console.log(addToPlaylist);
      }
    }

    return NextResponse.json({ songs }, { status: 200 });
  }

  return NextResponse.json(
    { error: 'failed to call spotify api' },
    { status: 500 },
  );
}

//TODO get refresh token when access token is expires_in - in seconds which access is valid
const getRefreshToken = () => {};
