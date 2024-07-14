import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import postData from "./postData";
import Categories from "./Categories";
import Subcategories from "./Subcategories";
import PostItem from "./PostItem";
import { Outlet, useOutlet } from "react-router-dom";

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
  position: absolute;
  top: 110px;
  left: ${({ toggleCategories }) => (toggleCategories ? '0' : '-300px')};
  width: 300px;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

const SubcategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  gap: 30px;
  margin-bottom: 10px;
  padding-left: 20px;
  height: 40px;
`;

const ExploreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: red;
  border-radius: 30px;
  height: 30px;
  padding: 5px 10px;
  cursor: pointer;
  color: white;

 
`;

const Posts = () => {
  const categories = [...new Set(postData.map(post => post.category))];
  const subcategories = [...new Set(postData.map(post => post.subcategory))];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState(["All"]);
  const [toggleCategories, setToggleCategories] = useState(false);
  const containerRef = useRef(null);
  const exploreRef = useRef(null);
  const categoriesRef = useRef(null);
  const outlet = useOutlet();

  useEffect(() => {
    if (selectedCategory !== null) {
      setSelectedSubcategories(["All"]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target) &&
        exploreRef.current &&
        !exploreRef.current.contains(event.target)
      ) {
        setToggleCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredPosts = postData.filter(
    post =>
      (selectedCategory === null || post.category === selectedCategory) &&
      (selectedSubcategories.includes("All") ||
        selectedSubcategories.includes(post.subcategory))
  );

  const filteredSubcategories =
    selectedCategory === null
      ? ["All", ...subcategories]
      : [
          "All",
          ...subcategories.filter(subcategory =>
            postData.some(
              post =>
                post.category === selectedCategory &&
                post.subcategory === subcategory
            )
          ),
        ];

  return (
    <Container>
      <SubcategoriesContainer>
        <ExploreContainer
          ref={exploreRef}
          onClick={() => setToggleCategories(!toggleCategories)}
        >
         <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-components"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12l3 3l3 -3l-3 -3z" /><path d="M15 12l3 3l3 -3l-3 -3z" /><path d="M9 6l3 3l3 -3l-3 -3z" /><path d="M9 18l3 3l3 -3l-3 -3z" /></svg> <span>Explore</span>
        </ExploreContainer>

        {selectedCategory !== null && (
          <Subcategories
            subcategories={filteredSubcategories}
            selectedSubcategories={selectedSubcategories}
            setSelectedSubcategories={setSelectedSubcategories}
          />
        )}
      </SubcategoriesContainer>

      <PostContainer ref={containerRef}>
        <CategoriesContainer ref={categoriesRef} toggleCategories={toggleCategories}>
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </CategoriesContainer>

        {outlet ? null : (
          <ItemContainer>
              {filteredPosts.map(post => (
                <PostItem
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.body.substring(0, 200)}
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

export default Posts;
