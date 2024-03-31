'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
export default async function create() {
  const authSpotify = async () => {
    const response = await fetch('/api/authWithSpotify');
    const data = await response.json();
    window.location.href = data.redirect;
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
