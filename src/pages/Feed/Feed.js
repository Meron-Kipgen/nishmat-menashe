import React, { useState, useEffect } from 'react';
import GoogleLogin from '../../components/GoogleLogin';
import UserProfile from '../../components/UserProfile';
import LogoutButton from '../../components/Logout';
import { account } from '../../db/config';

function Feed() {

  return (

    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
      </header>
      <main>
     
            <UserProfile/>
            <LogoutButton />
   
      </main>


    </div>
  );
}

export default Feed;
