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

// on init of home; query spotify api users current favourite songs (based of plays)
// useQuery on access code??
// display list of favourite tracks

export default Home;
