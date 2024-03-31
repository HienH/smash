'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
export default async function create() {
  // redirct to home page
  const authSpotify = () => {
    console.log('auth-clicked');

    return;
  };
  return (
    <>
      <h1> Welcome to send me a song</h1>
      <Button onClick={authSpotify} variant='outline'>
        hellp
      </Button>
    </>
  );
}
