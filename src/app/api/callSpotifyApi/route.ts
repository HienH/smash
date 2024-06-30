import { ISong, formatSong } from '@/app/helpers/formatSong';
import { addSongsToPlaylist } from '@/app/services/addSongsToPlaylist';
import { createPlaylist } from '@/app/services/createPlaylist';
import { getFavouriteSongs } from '@/app/services/getFavouriteSongs';
import { getUserId } from '@/app/services/getUserId';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
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

    // learn how to set multiple cookie
    cookies().set('spotifyAccessToken', access_token, {
      maxAge: expires_in,
    });
    // cookies().set('spotifyRefreshToken', refresh_token);

    if (!access_token) {
      return NextResponse.json(
        { error: 'Failed to authenticate with Spotify - access token missing' },
        { status: 500 },
      );
    }

    const favSongs = await getFavouriteSongs();
    const userId = await getUserId();
    const songs: ISong[] = favSongs.items.map((song) => formatSong(song));

    if (!userId) {
      return NextResponse.json(
        { error: 'Failed to get user ID' },
        { status: 500 },
      );
    }
    const smashPlaylistId = await createPlaylist(userId);

    if (!smashPlaylistId) {
      return NextResponse.json(
        { error: 'Failed to create playlist on spotify' },
        { status: 500 },
      );
    }

    const songsUri = songs.map((song) => song.uri);
    // Adding song song to playlist created
    const addToPlaylist = await addSongsToPlaylist(smashPlaylistId, songsUri);

    if (!addToPlaylist) {
      return NextResponse.json(
        { error: 'Failed to add songs to playlist' },
        { status: 500 },
      );
    }

    // const data = {
    //   playlistId: smashPlaylistId,
    //   refreshToken: refresh_token,
    //   spotifyId: userId,
    // };

    // const createUser = await fetch('/api/createUser', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    return NextResponse.json({ songs }, { status: 200 });
  } catch (error) {
    console.error('spotify api error', error);
    return NextResponse.json(
      { error: 'Failed to call spotify api' },
      { status: 500 },
    );
  }
}

//TODO get refresh token when access token is expires_in - in seconds which access is valid
const getRefreshToken = () => {};
