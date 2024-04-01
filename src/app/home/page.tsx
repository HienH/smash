'use client';

import { redirect, useSearchParams } from 'next/navigation';
import React from 'react';
const Home = () => {
  const searchParams = useSearchParams().get('code');

  const getFavouriteSongs = async (authKey: string) => {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authKey),
    };
    const response = await fetch('/api/myFavouriteSongs', option);
    const favouriteSongs = await response.json();
    console.log(favouriteSongs);
  };

  if (searchParams) {
    getFavouriteSongs(searchParams);
  } else {
    redirect('/create');
  }
  return (
    <>
      <p>Congratulation you are authenticated with spotify</p>
    </>
  );
};

// get access token
// use access token to getFavTrack()
///query spotify api users current favourite songs (based of plays)
// useQuery on access code??
// display list of favourite tracks

export default Home;
