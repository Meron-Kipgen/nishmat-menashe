import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAllPosts } from "../../pages/Feed/useAllPost";
import SearchItems from "./SearchItems";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 45px;
  
  @media (max-width: 768px) {
    padding: 15px;
    margin-top: 30px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Ensures buttons wrap on smaller screens */

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  background: ${(props) => (props.active ? '#007bff' : '#e0e0e0')};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  color: ${(props) => (props.active ? '#fff' : '#000')};
  cursor: pointer;
  position: relative;
  font-size: 14px;
  white-space: nowrap; /* Prevents text from overflowing */
  
  &:hover {
    background: ${(props) => (props.active ? '#0056b3' : '#bdbdbd')};
  }

  &::after {
    content: ${(props) => (props.count > 0 ? `"${props.count}"` : '""')};
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
    display: ${(props) => (props.count > 0 ? 'block' : 'none')};
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 12px;
  }
`;

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NoResultsText = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Results = () => {
  const query = useQuery();
  const searchTerm = query.get("q") || '';
  const [selectedTypes, setSelectedTypes] = useState(new Set()); // State to manage selected types
  const { posts, loading } = useAllPosts(); // Use useAllPosts to get all posts

  const calculateRelevance = (post) => {
    const searchTermLower = searchTerm.toLowerCase();
    let score = 0;

    if (post.title?.toLowerCase().includes(searchTermLower)) score += 1;
    if (post.category?.toLowerCase().includes(searchTermLower)) score += 1;
    if (post.subcategory?.toLowerCase().includes(searchTermLower)) score += 1;
    if (post.feedback?.toLowerCase().includes(searchTermLower)) score += 1;
    if (post.answer?.toLowerCase().includes(searchTermLower)) score += 1;

    return score;
  };

  const filteredResults = posts
    .filter(post => selectedTypes.size === 0 || selectedTypes.has(post.type))
    .map(post => ({ ...post, relevance: calculateRelevance(post) }))
    .filter(post => post.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);

  const typeCounts = useMemo(() => {
    const counts = { audio: 0, video: 0, article: 0, QnA: 0, feedback: 0 };
    posts.forEach(post => {
      if (calculateRelevance(post) > 0) {
        counts[post.type] = (counts[post.type] || 0) + 1;
      }
    });
    return counts;
  }, [posts, searchTerm]);

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => {
      const newTypes = new Set(prev);
      if (newTypes.has(type)) {
        newTypes.delete(type);
      } else {
        newTypes.add(type);
      }
      return newTypes;
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Wrapper>
      <FilterContainer>
        <FilterButton
          active={selectedTypes.size === 0}
          onClick={() => setSelectedTypes(new Set())}
          count={filteredResults.length}
        >
          All
        </FilterButton>
        {['audio', 'video', 'article', 'QnA', 'feedback'].map(type => (
          <FilterButton
            key={type}
            active={selectedTypes.has(type)}
            onClick={() => handleTypeToggle(type)}
            count={typeCounts[type]}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </FilterButton>
        ))}
      </FilterContainer>
      <ResultsWrapper>
        {filteredResults.length > 0 ? (
          filteredResults.map((post) => (
            <SearchItems key={post.id} post={post} />
          ))
        ) : (
          <NoResultsText>No results found.</NoResultsText>
        )}
      </ResultsWrapper>
    </Wrapper>
  );
};

export default Results;
