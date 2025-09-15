import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header';
import ExploreModule from '../../components/ExploreModule/ExploreModule';

const Home = () => {

  return (
    <div>
      <Header/>
      <ExploreModule />
    </div>
  )
}

export default Home
