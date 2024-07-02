'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

export default async function Help() {
  // const res = await fetch(process.env.URL + '/api/getUsers', {
  //   cache: 'no-store',
  // });
  // const users = await res.json();
  // console.log(users);

  const createUser = async () => {
    const data = {
      playlistId: 'smashPlaylistId',
      refreshToken: 'refresh_token',
      spotifyId: 'spotifyId',
      name: 'name',
    };
    // Create user on database
    const send = await fetch('/api/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log('send');
    console.log(send);

    return send;
  };

  return (
    <>
      <h1 className='title'>HELPP</h1>
      <Button onClick={createUser} variant='outline'>
        Auth with Spotify
      </Button>
    </>
  );
}
