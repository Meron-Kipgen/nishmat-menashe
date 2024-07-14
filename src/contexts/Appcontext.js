import React, { createContext, useState } from "react";
import postData from "../pages/Post/postData"; // Assuming postData is imported

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const categories = [...new Set(postData.map(post => post.category))];
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <AppContext.Provider value={{ categories, selectedCategory, setSelectedCategory }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
