import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Categories from "../../components/Categories";
import Subcategories from "../../components/Subcategories";
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
  margin-top: 10px;
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

const Articles = () => {
  const { articleData, loading, error } = useArticlesData();
  const categories = [...new Set(articleData.map((post) => post.category))];
  const subcategories = [...new Set(articleData.map((post) => post.subcategory))];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState(["All"]);
  const [toggleCategories, setToggleCategories] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const outlet = useOutlet();
  const { isAdmin } = useContext(UserContext);

  useEffect(() => {
    if (selectedCategory !== null) {
      setSelectedSubcategories(["All"]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop) {
        setShowBtn(false);
      } else {
        setShowBtn(true);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

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
    setFlipped(false); 
  };

  const handleToggleCategories = () => {
    setToggleCategories(!toggleCategories);
    setFlipped(!flipped); 
  };

  return (
    <Container>
      <CategoriesBtn show={showBtn}>
        <ExploreBtn onClick={handleToggleCategories} flipped={flipped} />
      </CategoriesBtn>

      {selectedCategory !== null && (
        <Subcategories
          subcategories={filteredSubcategories}
          selectedSubcategories={selectedSubcategories}
          setSelectedSubcategories={setSelectedSubcategories}
        />
      )}

      <PostContainer>
        {addNew && <AddArticleForm onClose={handleCloseForm} />}
        <CategoriesContainer toggleCategories={toggleCategories}>
          {isAdmin ? <AddNewBtn onClick={handleAddNew} /> : ""}
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onClose={() => {
              setToggleCategories(false);
              setFlipped(false); 
            }}
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
