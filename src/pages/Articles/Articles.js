import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import CategorySelector from "../../components/CategorySelector";
import SubcategorySelector from "../../components/SubcategorySelector";
import PostItem from "./PostItem";
import { Outlet, useOutlet } from "react-router-dom";
import { useArticlesData } from "./useArticlesData";
import AddArticleForm from "./AddArticleForm";
import ExploreBtn from "../../components/ExploreBtn";
import AddNewBtn from "../../components/AddNewBtn";
import { UserContext } from "../../contexts/UserContext";

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
    width: 100%;
    gap: 10px;
   
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
const Articles = () => {
  const { articleData, loading, error } = useArticlesData();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(true);
  const [addNew, setAddNew] = useState(false);

  const outlet = useOutlet();
  const { isAdmin } = useContext(UserContext);

  const sortedArticles = [...articleData].sort(
    (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
  );

  const categories = [...new Set(sortedArticles.map(article => article.category))];
  const subcategories =
    selectedCategories.length > 0
      ? [
          ...new Set(
            sortedArticles
              .filter(article => selectedCategories.includes(article.category))
              .map(article => article.subcategory)
          ),
        ]
      : [];

  const filteredArticles = sortedArticles.filter(article => {
    return (
      (selectedCategories.length === 0 ||
        selectedCategories.includes(article.category)) &&
      (selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(article.subcategory))
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
     
     {addNew && <AddArticleForm onClose={handleCloseForm} />}
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
              {filteredArticles.map(article => (
                <PostItem
                  key={article.$id}
                  id={article.$id}
                  title={article.title}
                  views={article.views}
                  writer={article.writer}
                  createdAt={article.$createdAt}
                  body={article.body.substring(0, 200) + " ....."}
                  subcategory={article.subcategory}
                />
              ))}
            </ItemContainer>
          </>
        )}
        <Outlet />
      </PostContainer>
    </Container>
  );
};

export default Articles;
