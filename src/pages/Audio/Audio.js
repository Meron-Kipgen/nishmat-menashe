import React from "react";
import styled from "styled-components";
import PodcastCard from "./Podcast/PodcastCard";
import SermonCard from "./Sermons/SermonCard";
import { useSermonsData } from "./Sermons/useSermonsData";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import { usePodcastData } from "./Podcast/usePodcastData";

const Container = styled.div`
  display: flex;
  margin: 50px 0;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
const AudioTitleContainer = styled.div`
  padding: 0 90px 0 30px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  width: 100%; 

   p {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    &:hover {
      color: red;
    }
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
    height: auto;
    overflow-y: hidden;
  }
`;
const PodcastTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    position: absolute;
    top: 50px;
    padding: 0 10px;
  }
  p {
    display: flex;
    align-items: center;
   cursor: pointer;
  }
`;
const PodcastContainer = styled.div`
  width: 500px;
  height: 100vh;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: auto;

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
    gap: 15px;
    margin-top: 50px;
  }

  & > * {
    min-width: 200px;
    flex-shrink: 0;
  }
`;

export default function Audio() {
  const { podcastData } = usePodcastData(); // Fixed typo
  const { sermonData } = useSermonsData();
  const outlet = useOutlet();
  const navigate = useNavigate();

  const gotoSermonPage = () => {
    navigate("/Audio/Sermon");
  };
  const gotoPodcastPage = () => {
    navigate("/Audio/Podcast");
  };
  return (
    <>
      {!outlet && (
        <Container>
          <SermonContainer>
            <AudioTitleContainer>
              <h1>Audio</h1>
              <p onClick={gotoSermonPage}>
                See all{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-chevrons-right"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000000"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7l5 5l-5 5" />
                  <path d="M13 7l5 5l-5 5" />
                </svg>
              </p>
            </AudioTitleContainer>
            {sermonData.map((audio) => (
              <SermonCard
                id={audio.$id}
                title={audio.title}
                thumbnail={audio.thumbnail}
                createdAt={audio.$createdAt}
                rabbi={audio.rabbi}
                category={audio.category}
                subcategory={audio.subcategory}
                played={audio.played}
              />
            ))}
          </SermonContainer>

          <PodcastContainer>
            <PodcastTitleContainer>
              <h1>Podcast</h1>
              <p onClick={gotoPodcastPage}>
                See all{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-chevrons-right"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000000"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7l5 5l-5 5" />
                  <path d="M13 7l5 5l-5 5" />
                </svg>
              </p>
            </PodcastTitleContainer>
            {podcastData.map((item) => (
              <PodcastCard
                key={item.$id}
                id={item.$id}
                title={item.title}
                description={item.description}
                thumbnail={item.thumbnail}
                rabbi={item.rabbi}
                season={item.season}
                isComplete={item.isComplete}
                played={item.played}
              />
            ))}
          </PodcastContainer>
        </Container>
      )}

      <Outlet />
    </>
  );
}
