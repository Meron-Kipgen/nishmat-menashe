import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuestionAnswerData } from './useQuestionAnswerData';
import HeaderSection from './HeaderSection';
import QuestionSection from './QuestionSection';
import AnswerSection from './AnswerSection';
import { UserContext } from '../../contexts/UserContext';
import styled from 'styled-components';

const Container = styled.div`
position: relative;
width: 700px;
padding: 10px;

background: white;
@media (max-width: 768px) {
    width: 100%;
  }
`
const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 1em;
  margin-top: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

export default function QuestionAnswerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { QuestionAnswerData, updateQuestionAnswer, deleteQuestionAnswer } = useQuestionAnswerData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);
  const { userId, isAdmin } = useContext(UserContext);
  const [question, setQuestion] = useState(null);
  const [editFields, setEditFields] = useState({
    category: '',
    subcategory: '',
    title: '',
    question: '',
  });

  const [savingQuestion, setSavingQuestion] = useState(false);
  const [deletingQuestion, setDeletingQuestion] = useState(false);
  const [fontSize, setFontSize] = useState('1rem');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ref for the dropdown menu
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (QuestionAnswerData.length) {
      const foundQuestion = QuestionAnswerData.find((qna) => qna.$id === id);
      if (foundQuestion) {
        setQuestion(foundQuestion);
        setEditFields({
          category: foundQuestion.category || '',
          subcategory: foundQuestion.subcategory || '',
          title: foundQuestion.title || '',
          question: foundQuestion.question || '',
        });
      }
    }
  }, [QuestionAnswerData, id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!question) {
    return <div>Question not found</div>;
  }

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    setSavingQuestion(true);
    setError(null);
    try {
      await updateQuestionAnswer(question.$id, editFields);
      setIsEditingQuestion(false);
    } catch (error) {
      console.error('Error updating question:', error);
      setError('Failed to update question.');
    } finally {
      setSavingQuestion(false);
    }
  };

  const handleSubmitAnswer = async (answer) => {
    setLoading(true);
    setError(null);
    try {
      await updateQuestionAnswer(question.$id, { answer });
      setIsEditingAnswer(false);
    } catch (error) {
      console.error('Error updating answer:', error);
      setError('Failed to update answer.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeletingQuestion(true);
    setError(null);
    try {
      await deleteQuestionAnswer(question.$id);
      navigate('/questions');
    } catch (error) {
      console.error('Error deleting question:', error);
      setError('Failed to delete question.');
    } finally {
      setDeletingQuestion(false);
    }
  };

  const increaseFontSize = () => setFontSize((prevSize) => {
    const newSize = parseFloat(prevSize) + 0.1;
    return `${newSize}rem`;
  });

  const decreaseFontSize = () => setFontSize((prevSize) => {
    const newSize = parseFloat(prevSize) - 0.1;
    return `${Math.max(newSize, 0.8)}rem`;
  });

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: question.title,
        text: question.question,
        url: window.location.href,
      });
    } else {
      alert('Share not supported');
    }
  };

  return (
    <Container>
      <HeaderSection
        question={question}
        dropdownOpen={dropdownOpen}
        toggleDropdown={() => setDropdownOpen((prev) => !prev)}
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
        shareContent={shareContent}
        dropdownRef={dropdownRef}
      />
      <QuestionSection
        question={question}
        isEditingQuestion={isEditingQuestion}
        editFields={editFields}
        handleFieldChange={(e) => setEditFields({ ...editFields, [e.target.name]: e.target.value })}
        handleSubmitQuestion={handleSubmitQuestion}
        setIsEditingQuestion={setIsEditingQuestion}
        fontSize={fontSize}
        canEditQuestion={question.userId === userId || isAdmin}
        savingQuestion={savingQuestion}
      />
      <AnswerSection
        question={question}
        isEditingAnswer={isEditingAnswer}
        handleSubmitAnswer={handleSubmitAnswer}
        loading={loading}
        setIsEditingAnswer={setIsEditingAnswer}
        isAdmin={isAdmin}
        handleDelete={handleDelete}
        deletingQuestion={deletingQuestion}
        fontSize={fontSize}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}
