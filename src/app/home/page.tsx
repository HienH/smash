'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
const Home = () => {
  const pathname = usePathname();
  console.log(pathname);

  console.log('homeQuerycalled');

  return (
    <>
      <p>Congratulation you are authenticated with spotify</p>
    </>
  );
};

// get access code from query
// store code as cookie
// if cookie exist call getFavTrack else redirect/create
//

// getFavTrack()
///query spotify api users current favourite songs (based of plays)
// useQuery on access code??
// display list of favourite tracks

export default Home;
