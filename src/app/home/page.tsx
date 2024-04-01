'use client';

import { redirect, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [favSongs, setFavSongs] = useState();
  const code = useSearchParams().get('code');

  useEffect(() => {
    if (code) {
      callSpotifyApi(code);
    } else {
      redirect('/create');
    }
  }, [code]);

  const callSpotifyApi = async (authKey: string) => {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authKey),
    };

    const response = await fetch('/api/callSpotifyApi', option);
    const data = await response.json();
    const { userId, songs } = data;
    setFavSongs(songs);
  };

  return (
    <>
      <p>Congratulation you are authenticated with spotify</p>

      {favSongs && (
        <>
          <h2>Your Favourite Songs</h2>
          <ul>
            {favSongs.map((song) => (
              <li>{song.name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

// useQuery on access code??
// display list of favourite tracks

export default Home;
