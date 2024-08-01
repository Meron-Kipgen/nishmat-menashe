import React from 'react'
import AudioPlayer from '../../Features/AudioPlayer/AudioPlayer';
import playerVars from '../../Features/AudioPlayer/PlayerVars';
export default function Audio() {

  return (
    <div>
        <AudioPlayer
        audioId="O7Hb8jtASrg" 
        playerVars={playerVars}
      />
    </div>
  )
}
