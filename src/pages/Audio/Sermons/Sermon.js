import React, { useState, useContext } from "react";
import { Outlet, useOutlet } from "react-router-dom";
import { useSermonsData } from "./useSermonsData";
import styled from "styled-components";
import AddSermonForm from "./AddSermonForm";
import CategorySelector from "../../../components/CategorySelector";
import SubcategorySelector from "../../../components/SubcategorySelector";
import ExploreBtn from "../../../components/ExploreBtn";
import AddNewBtn from "../../../components/AddNewBtn";
import { UserContext } from "../../../contexts/UserContext";
import SermonCard from "./SermonCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 45px 0;
`;

const PostContainer = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
    gap: 0;
    margin-bottom: 40px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 768px) {
    width: 95%;
    gap: 0;
    margin-inline: auto;
  }
`;

const CatContainer = styled.div`
  display: flex;
  height: 50px;
  margin-bottom: 10px;
`;

const SubCatContainer = styled.div`
  @media (max-width: 768px) {
    width: 80%;

    position: fixed;
    left: 0;
    top: 0;
    background: white;
    z-index: 1000;
    overflow-y: auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
`;
export default function Sermon() {
  const { sermonData } = useSermonsData();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const outlet = useOutlet();
  const { isAdmin } = useContext(UserContext);

  const sortedSermons = [...sermonData].sort(
    (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
  );

  const categories = [...new Set(sortedSermons.map(sermon => sermon.category))];
  const subcategories =
    selectedCategories.length > 0
      ? [
          ...new Set(
            sortedSermons
              .filter(sermon => selectedCategories.includes(sermon.category))
              .map(sermon => sermon.subcategory)
          ),
        ]
      : [];

  const filteredSermons = sortedSermons.filter(sermon => {
    return (
      (selectedCategories.length === 0 ||
        selectedCategories.includes(sermon.category)) &&
      (selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(sermon.subcategory))
    );
  });

  const handleAddNew = () => {
    setAddNew(true);
  };

  const handleCloseForm = () => {
    setAddNew(false);
  };

  const handleExploreClick = () => {
    setShowSubcategories(!showSubcategories);
  };

  return (
    <Container>
      {addNew && <AddSermonForm onClose={handleCloseForm} />}
      {!outlet && (
        <CatContainer>
          {isAdmin && <AddNewBtn onClick={handleAddNew} />}
          <ExploreBtn onClick={handleExploreClick} />
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            onSelectCategory={setSelectedCategories}
          />
        </CatContainer>
      )}
      <PostContainer>
        {!outlet && (
          <>
            <SubCatContainer>
              {showSubcategories && selectedCategories.length > 0 && (
                <SubcategorySelector
                  subcategories={subcategories}
                  selectedSubcategories={selectedSubcategories}
                  onSelectSubcategory={setSelectedSubcategories}
                  onClose={() => setShowSubcategories(false)}
                />
              )}
            </SubCatContainer>
            <ItemContainer>
              {filteredSermons.map((audio, index) => (
                <SermonCard
                  key={index}
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
            </ItemContainer>
          </>
        )}
        <Outlet />
      </PostContainer>
    </Container>
  );
}
