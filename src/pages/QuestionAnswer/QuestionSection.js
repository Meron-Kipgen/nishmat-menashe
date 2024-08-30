import React from "react";
import styled from "styled-components";
import QuestionEditForm from "./QuestionEditForm";

const QuestionContainer = styled.div`
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  p {
    font-size: ${({ fontSize }) => fontSize || "1rem"};
  }
`;

const QuestionSection = ({
  question,
  isEditingQuestion,
  editFields,
  handleFieldChange,
  handleSubmitQuestion,
  setIsEditingQuestion,
  fontSize,
  canEditQuestion,
  savingQuestion,
}) => (
  <div>
    {isEditingQuestion ? (
      <QuestionEditForm
        editFields={editFields}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmitQuestion}
        loading={savingQuestion}
        setIsEditing={setIsEditingQuestion}
      />
    ) : (
      <QuestionContainer fontSize={fontSize}>
        <h4>
          {question.category} - {question.subcategory}
        </h4>
        <h1>{question.title}</h1>
        <p>{question.question}</p>
        {canEditQuestion && (
          <button type="button" onClick={() => setIsEditingQuestion(true)}>
            Edit Question
          </button>
        )}
      </QuestionContainer>
    )}
  </div>
);

export default QuestionSection;
