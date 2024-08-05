import React, { useState } from 'react';
import styled from 'styled-components';
import GlobalPlayer from './GlobalPlayer';
import Card from './Card';
import Podcast from './Podcast';

const Container = styled.div`
  display: flex;
  height: 100vh; 
  overflow: hidden;
  gap: 10px;
`;

const AudioContainer = styled.div`
  flex: 2; 
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  overflow-y: auto; 
  height: 100%; 
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  h1{
    width: 100%;
    margin-left: 60px;
    margin-top: 20px;
display: flex;
align-items: center;
gap: 20px;
  }
`;

const PodcastContainer = styled.div`
  flex: 1; 
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto; 
  height: 100%; 
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  h1{
    width: 100%;
    margin-left: 50px;
    margin-top: 20px;
display: flex;
align-items: center;
gap: 20px;
  }

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
    { title: "Sample Audio 1", description: "Description for audio 1.", audioId: "O7Hb8jtASrg" },
    { title: "Sample Audio 2", description: "Description for audio 2.", audioId: "ETOXFqB-o6I" },
    { title: "Sample Audio 3", description: "Description for audio 3.", audioId: "eEqCEFuQqF8" },
    { title: "Sample Audio 4", description: "Description for audio 4.", audioId: "sDDHIu6nwUs" },
    { title: "Sample Audio 5", description: "Description for audio 5.", audioId: "nUb9Pvhxd2M" },
  ];

  return (
    <Container>
      <AudioContainer> 
        <h1><span>
        <svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M468.53 236.03H486v39.94h-17.47v-39.94zm-34.426 51.634h17.47v-63.328h-17.47v63.328zm-33.848 32.756h17.47V191.58h-17.47v128.84zm-32.177 25.276h17.47V167.483h-17.47v178.17zm-34.448-43.521h17.47v-92.35h-17.47v92.35zm-34.994 69.879h17.47v-236.06h-17.525v236.06zM264.2 405.9h17.47V106.1H264.2V405.9zm-33.848-46.284h17.47V152.383h-17.47v207.234zm-35.016-58.85h17.47v-87.35h-17.47v87.35zm-33.847-20.823h17.47V231.98h-17.47v48.042zm-33.848 25.66h17.47v-99.24h-17.47v99.272zm-33.302 48.04h17.47V152.678H94.34v201zm-33.847-30.702h17.47V187.333h-17.47v135.642zM26 287.664h17.47v-63.328H26v63.328z"/></svg> 
          </span>
          Audio</h1>
        {audioData.map((audio, index) => (
          <Card
            key={index}
            title={audio.title}
            description={audio.description}
            audioId={audio.audioId}
            onPlay={handlePlayAudio}
          />
        ))}
        <GlobalPlayer audioId={currentAudioId} shouldPlay={shouldPlay} />
      </AudioContainer>

      <PodcastContainer>

        <h1><span>
        <svg fill="#000000" width="30px" height="30px" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z"/></svg>
          </span>
          Podcast</h1>
        {audioData.map((audio, index) => (
          <Podcast
            key={index}
            title={audio.title}
            description={audio.description}
            audioId={audio.audioId}
          />
        ))}
      </PodcastContainer>
    </Container>
  );
};

export default Audio;
