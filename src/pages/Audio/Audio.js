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
import { Outlet, useOutlet } from "react-router-dom";

const Container = styled.div`
  display: flex;
  gap: 30px;
  height: 100vh;
  overflow: hidden;
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
margin: 10px 0 0 70px;
h1{
  font-size: 20px;
}
`
const LeftSide = styled.section`
display: flex;
flex-direction: column;
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
  const [lastScrollTop, setLastScrollTop] = useState(0);
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
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      setShowBtn(currentScrollTop <= lastScrollTop);
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

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
      <>
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
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-deezer" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 16.5h2v.5h-2z" />
      <path d="M8 16.5h2.5v.5h-2.5z" />
      <path d="M16 17h-2.5v-.5h2.5z" />
      <path d="M21.5 17h-2.5v-.5h2.5z" />
      <path d="M21.5 13h-2.5v.5h2.5z" />
      <path d="M21.5 9.5h-2.5v.5h2.5z" />
      <path d="M21.5 6h-2.5v.5h2.5z" />
      <path d="M16 13h-2.5v.5h2.5z" />
      <path d="M8 13.5h2.5v-.5h-2.5z" />
      <path d="M8 9.5h2.5v.5h-2.5z" />
    </svg>
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
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 14.4856 19.9937 16.7342 18.364 18.364C17.9734 18.7545 17.9734 19.3876 18.364 19.7782C18.7545 20.1687 19.3876 20.1687 19.7782 19.7782C21.7677 17.7887 23 15.0373 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 15.0373 2.23231 17.7887 4.22183 19.7782C4.61235 20.1687 5.24551 20.1687 5.63604 19.7782C6.02656 19.3876 6.02656 18.7545 5.63604 18.364C4.00626 16.7342 3 14.4856 3 12ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 13.381 16.4415 14.6296 15.5355 15.5355C15.145 15.9261 15.145 16.5592 15.5355 16.9497C15.9261 17.3403 16.5592 17.3403 16.9497 16.9497C18.2154 15.6841 19 13.9327 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 13.9327 5.7846 15.6841 7.05025 16.9497C7.44078 17.3403 8.07394 17.3403 8.46447 16.9497C8.85499 16.5592 8.85499 15.9261 8.46447 15.5355C7.55855 14.6296 7 13.381 7 12ZM14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12ZM9.67319 17.494C9.57955 16.1455 10.6482 15 12 15C13.3518 15 14.4205 16.1455 14.3268 17.494L14.0049 22.1295C13.9317 23.1829 13.0559 24 12 24C10.9441 24 10.0683 23.1829 9.9951 22.1295L9.67319 17.494Z" fill="#000000"/>
        </svg>
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
