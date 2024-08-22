import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Categories from "../../components/Categories";
import Subcategories from "../../components/Subcategories";
import Card from './Card';
import GlobalPlayer from './GlobalPlayer';
import AddAudioForm from './AddAudioForm'; 
import EditAudioForm from "./EditAudioForm";
import { useAudioData } from "./useAudioData";
import ExploreBtn from "../../components/ExploreBtn";
import AddNewBtn from "../../components/AddNewBtn";
import { UserContext } from "../../contexts/UserContext";
import Podcast from "../Audio/Podcast/Podcast";
import { Link, Outlet, useOutlet } from "react-router-dom";
import PodcastCard from "./Podcast/PodcastCard";

const Container = styled.div`
  display: flex;
  gap: 30px;
  height: 100vh;
  overflow: hidden;
  @media (max-width: 768px) {
     width: 100%;
     flex-direction: column;
    }
`;

const AudioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  justify-content: flex-end;
  overflow-y: auto; 
  height: 100vh; 
  scrollbar-width: none;
  -ms-overflow-style: none; 

  @media (max-width: 768px) {
    width: 100%;
  
 
    }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PodcastContainer = styled.section`
  width: 550px;
  flex-wrap: wrap;
  display: flex;
  height: 100vh;
  overflow-y: auto; 
  scrollbar-width: none;
  -ms-overflow-style: none; 

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 768px) {
      width: 100%;
    }
`;

const CategoriesContainer = styled.div`
  position: fixed;
  top: 45px;
  left: ${({ toggleCategories }) => (toggleCategories ? "0" : "-300px")};
  width: 300px;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

const CategoriesBtn = styled.div`
  position: fixed;
  top: ${({ show }) => (show ? "0px" : "-40px")};
  left: 10px;
  z-index: 1000;
  transition: top 0.3s ease-in-out;
`;

const AudioHeading = styled.section`
width: 100%;
height: 30px;
display: flex;
align-items: center;
gap: 20px;
margin: 50px 0 0 70px;
h1{
  font-size: 20px;
}
`
const LeftSide = styled.section`
display: flex;
flex-direction: column;
@media (max-width: 768px) {
      display: none;
    }
`
const Heading = styled.section`
display: flex;
align-items: center;
gap: 20px;
margin: 10px 0 0 30px;
h1{
  font-size: 20px;
}
`
const MobilePodcast = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 768px) {
      display: none;
    }
`;
const Audio = () => {
  const { audioData, deleteAudio, updatePlayed, fetchAudioData } = useAudioData();
  const { isAdmin } = useContext(UserContext);
  const categories = [...new Set(audioData.map(audio => audio.category))];
  const subcategories = [...new Set(audioData.map(audio => audio.subcategory))];
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [selectedSubcategories, setSelectedSubcategories] = useState(["All"]);
  const [toggleCategories, setToggleCategories] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [currentThumbnail, setCurrentThumbnail] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentRabbi, setCurrentRabbi] = useState('');
  const [editingAudio, setEditingAudio] = useState(null);
  const outlet = useOutlet()

  const uniqueAudioData = Array.from(new Set(audioData.map(a => a.audioUrl)))
    .map(url => audioData.find(audio => audio.audioUrl === url));

  const filteredAudios = uniqueAudioData
    .filter(audio =>
      (selectedCategory === null || audio.category === selectedCategory) &&
      (selectedSubcategories.includes("All") || selectedSubcategories.includes(audio.subcategory))
    )
    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

  const filteredSubcategories =
    selectedCategory === null
      ? ["All", ...subcategories]
      : [
          "All",
          ...subcategories.filter(subcategory =>
            audioData.some(
              audio =>
                audio.category === selectedCategory &&
                audio.subcategory === subcategory
            )
          ),
        ];



  useEffect(() => {
    if (selectedCategory === null) {
      setSelectedSubcategories(["All"]);
    } else {
      setSelectedSubcategories(["All"]); 
    }
  }, [selectedCategory]);

  const handleEditAudio = (audio) => setEditingAudio(audio);

  const handleDeleteAudio = async (audioUrl) => {
    try {
      await deleteAudio(audioUrl);
      await fetchAudioData();
    } catch (error) {
      console.error("Failed to delete audio", error);
    }
  };

  const handlePlayAudio = async (audioUrl, thumbnail, title, rabbi) => {
    try {
      if (currentAudioUrl === audioUrl) {
        setShouldPlay(prev => !prev);
      } else {
        setCurrentAudioUrl(audioUrl);
        setCurrentThumbnail(thumbnail);
        setCurrentTitle(title);
        setCurrentRabbi(rabbi);
        setShouldPlay(true);
        await updatePlayed(audioUrl);
      }
    } catch (error) {
      console.error("Failed to update played count", error);
    }
  };

  const handleAddNew = () => setAddNew(prev => !prev);

  const handleCloseForm = () => {
    setAddNew(false);
    setFlipped(false); 
  };

  const handleToggleCategories = () => {
    setToggleCategories(prev => !prev);
    setFlipped(prev => !prev); 
  };

  return (
    <Container>

    {!outlet && (
      <>      <p><Link to="/podcast"/>Podcast</p>
<MobilePodcast>
 
<PodcastCard/>
<PodcastCard/>
<PodcastCard/>
<PodcastCard/>
<PodcastCard/>
<PodcastCard/>
<PodcastCard/>
<PodcastCard/>
<PodcastCard/>
<PodcastCard/>
</MobilePodcast>
      <CategoriesBtn show={showBtn}>
        <ExploreBtn onClick={handleToggleCategories} flipped={flipped} />
      </CategoriesBtn>
      <AudioContainer>
        {selectedCategory !== null && (
          <Subcategories
            subcategories={filteredSubcategories} 
            selectedSubcategories={selectedSubcategories}
            setSelectedSubcategories={setSelectedSubcategories}
          />
        )}
        {addNew && <AddAudioForm onClose={handleCloseForm} onAdd={fetchAudioData} />}
        <CategoriesContainer toggleCategories={toggleCategories}>
          {isAdmin && <AddNewBtn onClick={handleAddNew} />}
          <Categories
            categories={[ ...categories]}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onClose={() => {
              setToggleCategories(false);
              setFlipped(false); 
            }}
          />
        </CategoriesContainer>


       <AudioHeading>
       <h1> Audio</h1>
        </AudioHeading>
      
           <ItemContainer>  
         
          {editingAudio && <EditAudioForm audio={editingAudio} onClose={() => setEditingAudio(null)} />}
          {filteredAudios.map((audio) => (
            <Card
              key={audio.audioUrl}
              id={audio.$id}
              thumbnail={audio.thumbnail}
              title={audio.title}
              createdAt={audio.$createdAt}
              played={audio.played}
              category={audio.category}
              subcategory={audio.subcategory}
              rabbi={audio.rabbi}
              onPlay={() => handlePlayAudio(audio.audioUrl, audio.thumbnail, audio.title, audio.rabbi)}
              onEdit={() => handleEditAudio(audio)}
              onDelete={() => handleDeleteAudio(audio.audioUrl)}
              onClick={() => handlePlayAudio(audio.audioUrl, audio.thumbnail, audio.title, audio.rabbi)}
              isPlaying={currentAudioUrl === audio.audioUrl && shouldPlay}
            />
          ))}
        </ItemContainer>
     
      
      </AudioContainer>
       <Outlet/>
      {currentAudioUrl && (
        <GlobalPlayer
          audioUrl={currentAudioUrl}
          thumbnail={currentThumbnail}
          title={currentTitle}
          rabbi={currentRabbi}
          shouldPlay={shouldPlay}
          onClose={() => setCurrentAudioUrl(null)}
        />
      )}


      <LeftSide>
     
      <Heading>

        <h1> Podcast</h1>
      </Heading>
    
       <PodcastContainer>
        <Podcast/>
      </PodcastContainer>  
      </LeftSide>
  
  </>
)}
      <Outlet/>
    </Container>
  );
};

export default Audio;
