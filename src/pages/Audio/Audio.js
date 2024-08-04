import React, { useState } from 'react';
import styled from 'styled-components';
import GlobalPlayer from './GlobalPlayer'; // Make sure to import the correct path
import Card from './Card';

const PageContainer = styled.div`
  display: flex;

  align-items: center;
  padding: 20px;
`;

const Audio = () => {
  const [currentAudioId, setCurrentAudioId] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  const handlePlayAudio = (audioId) => {
    if (currentAudioId === audioId) {
      // If the same audio is clicked, toggle play/pause
      setShouldPlay((prev) => !prev);
    } else {
      // If a new audio is selected, set the new ID and start playing
      setCurrentAudioId(audioId);
      setShouldPlay(true);
    }
  };

  // Sample audio data
  const audioData = [
    { title: "Sample Audio 1", description: "Description for audio 1.", audioId: "O7Hb8jtASrg" },
    { title: "Sample Audio 2", description: "Description for audio 2.", audioId: "ETOXFqB-o6I" },
    { title: "Sample Audio 3", description: "Description for audio 3.", audioId: "eEqCEFuQqF8" },
    { title: "Sample Audio 4", description: "Description for audio 4.", audioId: "sDDHIu6nwUs" },
    { title: "Sample Audio 5", description: "Description for audio 5.", audioId: "nUb9Pvhxd2M" },
  ];

  return (
    <>
     <PageContainer>
      {audioData.map((audio, index) => (
        <Card
          key={index}
          title={audio.title}
          description={audio.description}
          audioId={audio.audioId}
          onPlay={handlePlayAudio}
        />
      ))}
    
    </PageContainer>  
    <GlobalPlayer audioId={currentAudioId} shouldPlay={shouldPlay} />
    </>
   
  );
};

export default Audio;
