import React, { useState } from 'react';
import PodcastCard from './PodcastCard';
import { usePodcastData } from './usePodcastData';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import AddNewPodcast from './AddNewPodcast';

const PodcastContainer = styled.div`
margin: 45px 0;
display: flex;
flex-direction: column;
width: 100%;
`
const FilterContainer = styled.section`

  background: white;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const FilterButton = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 30px;
  transition: background 0.3s, color 0.3s;

  // Default style
  background: ${(props) => (props.active ? '#142B42' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};

  // Hover style
  &:hover {
    background: #e2e6ea;
  }

  // Active style
  &.active {
    background: #007BFF;
    color: #000;
  }
`;

const CardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const AddFormContainer = styled.div`
  margin-top: 20px;
`;
const AddButton = styled.div`
cursor: pointer;
color: red;
`

export default function Podcast() {
  const { podcastData } = usePodcastData();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false); // State to control form visibility

  const filteredPodcasts = podcastData.filter(item => {
    if (filter === 'Completed' && !item.isComplete) return false;
    if (filter === 'On going' && item.isComplete) return false;
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const toggleAddForm = () => {
    setShowAddForm(prevShowAddForm => !prevShowAddForm);
  };

  return (
    <PodcastContainer>
      <FilterContainer>
      <FilterButton
  active={filter === 'All'}
  onClick={() => setFilter('All')}
>
  All
</FilterButton>
<FilterButton
  active={filter === 'Completed'}
  onClick={() => setFilter('Completed')}
>
  Completed
</FilterButton>
<FilterButton
  active={filter === 'On going'}
  onClick={() => setFilter('On going')}
>
  On going
</FilterButton>

        <SearchBar 
          podcastData={podcastData} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        <AddButton onClick={toggleAddForm}>
          {showAddForm ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-x-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" fill="currentColor" stroke-width="0" />
</svg>: <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-plus-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z" fill="currentColor" stroke-width="0" />
</svg>}
        </AddButton>
      </FilterContainer>

      {showAddForm && (
        <AddFormContainer>
          <AddNewPodcast onClose={toggleAddForm} />
        </AddFormContainer>
      )}

      <CardContainer>
        {filteredPodcasts.map(item => (
          <PodcastCard 
            key={item.$id}
            id={item.$id}
            title={item.title}
            description={item.description}
            thumbnail={item.thumbnail}
            rabbi={item.rabbi}
            season={item.season}
            isComplete={item.isComplete}
            played={item.played}
          />
        ))}
      </CardContainer>
    </PodcastContainer>
  );
}
