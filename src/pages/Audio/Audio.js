import React from "react";
import styled from "styled-components";
import PodcastCard from "./Podcast/PodcastCard";
import AudioCard from "./AudioCard";

const Container = styled.div`
  display: flex;
  margin: 50px 0;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const SermonContainer = styled.div`
  width: 1000px;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto; /* Allow height to adjust based on content */
    overflow-y: hidden; /* Hide vertical overflow */
  }
`;

const PodcastContainer = styled.div`
  width: 500px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    gap: 15px; /* Adjust the gap between items */
  }

  /* Ensure that the cards maintain their original size */
  & > * {
    min-width: 200px; /* Set this to the same as the card's width */
    flex-shrink: 0; /* Prevent shrinking */
  }
`;

export default function Audio() {
  return (
    <Container>
      <SermonContainer>
        {/* AudioCard components go here */}
        <AudioCard />
        <AudioCard />
        <AudioCard />
        <AudioCard />
        <AudioCard />
        <AudioCard />
        {/* Repeat as needed */}
      </SermonContainer>
      <PodcastContainer>
        {/* PodcastCard components go here */}
        <PodcastCard title="Podcast 1" description="Description 1" rabbi="Rabbi 1" season="Season 1" played="50" isComplete={true} thumbnail="https://via.placeholder.com/200" />
        <PodcastCard title="Podcast 2" description="Description 2" rabbi="Rabbi 2" season="Season 2" played="30" isComplete={false} thumbnail="https://via.placeholder.com/200" />
        <PodcastCard title="Podcast 3" description="Description 3" rabbi="Rabbi 3" season="Season 3" played="70" isComplete={true} thumbnail="https://via.placeholder.com/200" />
        <PodcastCard title="Podcast 4" description="Description 4" rabbi="Rabbi 4" season="Season 4" played="20" isComplete={false} thumbnail="https://via.placeholder.com/200" />
        <PodcastCard title="Podcast 5" description="Description 5" rabbi="Rabbi 5" season="Season 5" played="40" isComplete={true} thumbnail="https://via.placeholder.com/200" />
        <PodcastCard title="Podcast 6" description="Description 6" rabbi="Rabbi 6" season="Season 6" played="60" isComplete={false} thumbnail="https://via.placeholder.com/200" />
        <PodcastCard title="Podcast 7" description="Description 7" rabbi="Rabbi 7" season="Season 7" played="90" isComplete={true} thumbnail="https://via.placeholder.com/200" />
        {/* Repeat as needed */}
      </PodcastContainer>
    </Container>
  );
}
