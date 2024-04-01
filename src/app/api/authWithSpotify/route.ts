import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirect = process.env.SPOTIFY_REDIRECT;
  const scope =
    'user-top-read%20playlist-modify-private%20playlist-modify-public%20user-read-private';

  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirect}&state=34fFs29kd09&scope=${scope}`;
  return NextResponse.json({ redirect: url }, { status: 200 });
}
