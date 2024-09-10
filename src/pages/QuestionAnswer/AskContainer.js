import React from 'react';
import styled from 'styled-components';
import Avatar from '../../Features/User/Avatar'; // Adjust the import path as needed

const AskContainerWrapper = styled.section`
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  padding: 20px;
  margin-top: 10px;
  border-radius: 8px;
  margin-bottom: 20px;

  input, textarea, select {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 8px;
    }
  }
`;

const AskBtnContainer = styled.div`
  display: flex;

  align-items: center;
  gap: 10px;

  @media (min-width: 768px) {

    justify-content: space-between;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }
`;

const AskButton = styled.div`
  display: flex;
  cursor: pointer;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  width: 100%;
  max-width: 150px;
  height: 40px;
  color: white;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  border-radius: 20px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #1f3a93 0%, #1b68d4 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    padding: 10px 0;
  }
`;

export default function AskContainer({ 
  title, 
  setTitle, 
  category, 
  setCategory, 
  subcategory, 
  setSubcategory, 
  question, 
  setQuestion, 
  selectOption, 
  handleSubmit, 
  handleCategoryChange, 
  username, 
  userAvatarUrl 

}) {
  return (
    <AskContainerWrapper>
      <input 
        type="text" 
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {Object.keys(selectOption).map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {category && (
        <select 
          value={subcategory} 
          onChange={(e) => setSubcategory(e.target.value)}
        >
          <option value="">Select Subcategory</option>
          {selectOption[category].map((subcat) => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
      )}
      <textarea 
        placeholder="Ask anything..." 
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <AskBtnContainer>
        <UserInfo>
          <Avatar src={userAvatarUrl} name={username}/>
          <p>{username}</p>
        </UserInfo>
        <AskButton onClick={handleSubmit}>Ask</AskButton>
      </AskBtnContainer>
    </AskContainerWrapper>
  );
}
