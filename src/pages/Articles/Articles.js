import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Categories from "./Categories";
import Subcategories from "./Subcategories";
import PostItem from "./PostItem";
import { Outlet, useOutlet } from "react-router-dom";
import { useArticlesData } from "./useArticlesData";
import AddArticleForm from "./AddArticleForm";
import ExploreBtn from "./ExploreBtn";
import AddNewBtn from "./AddNewBtn";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const CategoriesContainer = styled.div`
  position: fixed;
  top: 110px;
  left: ${({ toggleCategories }) => (toggleCategories ? "0" : "-300px")};
  width: 300px;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

const SubcategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: white;
  gap: 30px;
  margin-bottom: 10px;
  padding: 0 20px;
  height: 40px;
`;

const Articles = () => {
  const { articleData, loading, error } = useArticlesData();
  const categories = [...new Set(articleData.map((post) => post.category))];
  const subcategories = [...new Set(articleData.map((post) => post.subcategory))];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState(["All"]);
  const [toggleCategories, setToggleCategories] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const outlet = useOutlet();

  useEffect(() => {
    if (selectedCategory !== null) {
      setSelectedSubcategories(["All"]);
    }
  }, [selectedCategory]);

  const filteredPosts = articleData
    .filter(
      (post) =>
        (selectedCategory === null || post.category === selectedCategory) &&
        (selectedSubcategories.includes("All") ||
          selectedSubcategories.includes(post.subcategory))
    )
    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

  const filteredSubcategories =
    selectedCategory === null
      ? ["All", ...subcategories]
      : [
          "All",
          ...subcategories.filter((subcategory) =>
            articleData.some(
              (post) =>
                post.category === selectedCategory &&
                post.subcategory === subcategory
            )
          ),
        ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleAddNew = () => {
    setAddNew(!addNew);
  };

  const handleCloseForm = () => {
    setAddNew(false);
  };

  return (
    <Container>
      <SubcategoriesContainer>
         <AddNewBtn onClick={handleAddNew} />
        {addNew && <AddArticleForm onClose={handleCloseForm} />}
        <ExploreBtn onClick={() => setToggleCategories(!toggleCategories)} />
        {selectedCategory !== null && (
          <Subcategories
            subcategories={filteredSubcategories}
            selectedSubcategories={selectedSubcategories}
            setSelectedSubcategories={setSelectedSubcategories}
          />
        )}
       
      </SubcategoriesContainer>

      <PostContainer>
        <CategoriesContainer toggleCategories={toggleCategories}>
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onClose={() => setToggleCategories(!toggleCategories)}
          />
        </CategoriesContainer>

        {!outlet && (
          <ItemContainer>
            {filteredPosts.map((post) => (
              <PostItem
                key={post.$id}
                id={post.$id}
                title={post.title}
                views={post.views}
                writer={post.writer}
                createdAt={post.$createdAt}
                body={post.body.substring(0, 300) + " ....."}
                subcategory={post.subcategory}
              />
            ))}
          </ItemContainer>
        )}
        <Outlet />
      </PostContainer>
    </Container>
  );
};

export default Articles;
