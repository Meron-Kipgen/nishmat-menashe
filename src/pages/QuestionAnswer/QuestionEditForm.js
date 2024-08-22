import React, { useEffect } from 'react';
import styled from 'styled-components';
import selectOption from './SelectOption';

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-weight: bold;
  }

  input, select, textarea {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
    height: auto;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export default function QuestionEditForm({ editFields = {}, handleFieldChange, handleSubmit, loading, setIsEditing }) {
  const subcategories = selectOption[editFields.category] || [];
  
  // Effect to handle category change and possibly reset subcategory
  useEffect(() => {
    if (subcategories.length > 0 && !subcategories.includes(editFields.subcategory)) {
      handleFieldChange({ target: { name: 'subcategory', value: subcategories[0] } });
    }
  }, [editFields.category, subcategories, editFields.subcategory, handleFieldChange]);

  return (
    <EditForm onSubmit={handleSubmit}>
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        name="category"
        value={editFields.category || ''}
        onChange={handleFieldChange}
      >
        {Object.keys(selectOption).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="subcategory">Subcategory:</label>
      <select
        id="subcategory"
        name="subcategory"
        value={editFields.subcategory || ''}
        onChange={handleFieldChange}
      >
        {subcategories.map((subcategory) => (
          <option key={subcategory} value={subcategory}>
            {subcategory}
          </option>
        ))}
      </select>

      <label htmlFor="title">Title:</label>
      <input
        id="title"
        name="title"
        value={editFields.title || ''}
        onChange={handleFieldChange}
      />

      <label htmlFor="question">Question:</label>
      <textarea
        id="question"
        name="question"
        value={editFields.question || ''}
        onChange={handleFieldChange}
      />

      <ButtonGroup>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </ButtonGroup>
    </EditForm>
  );
}
