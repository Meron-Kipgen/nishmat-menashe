import React, { useState } from "react";
import PodcastCard from "./PodcastCard";
import { usePodcastData } from "./usePodcastData";
import Filters from "./Filters";
import styled from "styled-components";
import AddNewPodcast from "./AddNewPodcast";
import { Outlet, useOutlet } from "react-router-dom";

const PodcastContainer = styled.div`
  margin: 45px 0 60px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const AddFormContainer = styled.div`
  margin-top: 20px;
`;

export default function Podcast() {
  const { podcastData } = usePodcastData();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const outlet = useOutlet();

  const toggleAddForm = () => setShowAddForm(!showAddForm);

  const filteredData = (podcastData || [])
    .filter((podcast) => {
      if (filter === "All") return true;
      if (filter === "Completed") return podcast.isComplete === true;
      if (filter === "On going") return podcast.isComplete === false;
      return true; 
    })
    .filter((podcast) =>
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <PodcastContainer>
      {!outlet && (
        <>
          <Filters
            filter={filter}
            setFilter={setFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showAddForm={showAddForm}
            toggleAddForm={toggleAddForm}
            podcastData={podcastData} 
          />
          <CardContainer>
            {filteredData.map(item => (
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
          </CardContainer>
        </>
      )}
      {showAddForm && (
        <AddFormContainer>
          <AddNewPodcast onClose={toggleAddForm} />
        </AddFormContainer>
      )}
      <Outlet />
    </PodcastContainer>
  );
}

