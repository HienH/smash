'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
export default async function create() {
  // redirct to home page
  const authSpotify = async () => {
    const response = await fetch('/api/authWithSpotify');

    console.log('called auth with spotify');
    return;
  };

  return (
    <>
      <h1> Welcome to send me a song</h1>
      <Button onClick={authSpotify} variant='outline'>
        Auth with Spotify
      </Button>
    </>
  );
}
