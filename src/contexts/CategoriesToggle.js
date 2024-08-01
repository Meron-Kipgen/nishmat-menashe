import React, { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [toggleCategories, setToggleCategories] = useState(false);

  const handleToggleCategories = () => {
    setToggleCategories((prev) => !prev);
  };

  return (
    <CategoryContext.Provider value={{ toggleCategories, handleToggleCategories, setToggleCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
