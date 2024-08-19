import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { Outlet, useOutlet } from 'react-router-dom';
import { useQuestionAnswerData } from './useQuestionAnswerData'; // Adjust the import path as needed
import { UserContext } from '../../contexts/UserContext';
import AskContainer from './AskContainer'; // Import the reusable AskContainer component

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
margin: 40px 0;
  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

const QuestionAnswerContainer = styled.section`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

const categoryOptions = {
  Halakha: ['Shabbat', 'Kashrut', 'Family Purity', 'General'],
  Mussar: ['Ethics', 'Character Development', 'Repentance','General'],
  Parasha: ['Genesis', 'Exodus', 'Leviticus'],
  Tanakh: ['Prophets', 'Writings', 'Historical Books','General'],
  General:['General']
};

export default function QuestionAnswer() {
  const { QuestionAnswerData, addQuestionAnswer } = useQuestionAnswerData();
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const outlet = useOutlet();
  const { isAdmin, username, userAvatarUrl, userId, isLogin } = useContext(UserContext);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory(''); // Reset subcategory when category changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() && title.trim() && category.trim() && subcategory.trim()) {
      try {
        await addQuestionAnswer({ 
          title,
          question, 
          category,
          subcategory,
          userId: userId, 
          userName: username,
          avatarUrl: userAvatarUrl,
        }); 
        setQuestion(''); 
        setTitle('');
        setCategory('');
        setSubcategory('');
      } catch (error) {
        console.error('Error adding question:', error);
      }
    }
  };

  return (
    <Container>
      {!outlet && (
        <>
          {isLogin ? (
            <AskContainer 
              title={title} 
              setTitle={setTitle} 
              category={category} 
              setCategory={setCategory} 
              subcategory={subcategory} 
              setSubcategory={setSubcategory} 
              question={question} 
              setQuestion={setQuestion} 
              categoryOptions={categoryOptions} 
              handleSubmit={handleSubmit} 
              handleCategoryChange={handleCategoryChange} 
              username={username} 
              userAvatarUrl={userAvatarUrl} 
            />
          ) : (
            <p>Please login to ask</p>
          )}
          
          <QuestionAnswerContainer>
            {[...QuestionAnswerData].reverse().map((QuestionAnswer) => (
              <Card
                key={QuestionAnswer.$id} 
                id={QuestionAnswer.$id} 
                userId={QuestionAnswer.userId}
                userName={QuestionAnswer.userName}
                question={QuestionAnswer.question}
                title={QuestionAnswer.title}
                category={QuestionAnswer.category}
                subcategory={QuestionAnswer.subcategory}
                avatarUrl={QuestionAnswer.avatarUrl}
                createdAt={QuestionAnswer.$createdAt}
              />
            ))}
          </QuestionAnswerContainer>
        </>
      )}
      
      <Outlet />
    </Container>
  );
}
