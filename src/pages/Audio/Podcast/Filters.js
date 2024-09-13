// Filters.js
import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const Container = styled.section`
  background: white;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start; 
  align-items: center;
 
  white-space: nowrap;
  padding: 0 5px;
`;

const FilterButton = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 30px;
  transition: background 0.3s, color 0.3s;
  display: inline-block; 
  background: ${props => (props.active ? "#142B42" : "#fff")};
  color: ${props => (props.active ? "#fff" : "#000")};

  &:hover {
    background: #e2e6ea;
  }

  &.active {
    background: #007bff;
    color: #000;
  }
`;

const AddButton = styled.div`
  cursor: pointer;
  color: red;
  display: inline-block; 
`;

const Filters = ({ filter, setFilter, searchTerm, setSearchTerm, showAddForm, toggleAddForm }) => {
  return (
    <Container>
      <AddButton onClick={toggleAddForm}>
        {showAddForm ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-square-rounded-x-filled"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
              fill="currentColor"
              strokeWidth="0"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-square-rounded-plus-filled"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z"
              fill="currentColor"
              strokeWidth="0"
            />
          </svg>
        )}
      </AddButton>
      <FilterButton
        active={filter === "All"}
        onClick={() => setFilter("All")}
      >
        All
      </FilterButton>
      
      <FilterButton
        active={filter === "Completed"}
        onClick={() => setFilter("Completed")}
      >
        Completed
      </FilterButton>
      <FilterButton
        active={filter === "On going"}
        onClick={() => setFilter("On going")}
      >
        On going
      </FilterButton>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </Container>
  );
};

export default Filters;
