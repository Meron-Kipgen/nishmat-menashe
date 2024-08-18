import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { fetchDataFromCollections } from '../../utils/allData';

const collections = [
  { name: 'video', databaseId: '666aff03003ba124b787', collectionId: '666aff1400318bf6aa6f' },
  { name: 'audio', databaseId: '666aff03003ba124b787', collectionId: 'YOUR_AUDIO_COLLECTION_ID' },
  { name: 'library', databaseId: '666aff03003ba124b787', collectionId: '668d39710005c04f99c6' },
  { name: 'questionAndAnswer', databaseId: '666aff03003ba124b787', collectionId: '66ba303a002c4c5a6d6a' },
  { name: 'article', databaseId: '666aff03003ba124b787', collectionId: '666b0186000007f47da9' },
];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background: ${props => (props.active ? '#007bff' : '#e0e0e0')};
  color: ${props => (props.active ? '#fff' : '#000')};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${props => (props.active ? '#0056b3' : '#c0c0c0')};
  }
`;

const ResultsContainer = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SearchResultItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  a {
    text-decoration: none;
    color: #1a0dab;
    font-size: 18px;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    display: block;
    color: #6a6a6a;
    font-size: 14px;
    margin-top: 4px;
  }
`;

const Loading = styled.p`
  text-align: center;
  font-size: 18px;
`;

const Error = styled.p`
  text-align: center;
  color: red;
  font-size: 18px;
`;

export default function Results() {
  const query = useQuery();
  const searchTerm = query.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedData = await fetchDataFromCollections(collections);
        const filteredResults = fetchedData.filter((item) => {
          const lowerCasedTitle = item.title.toLowerCase();
          const lowerCasedSearchTerm = searchTerm.toLowerCase();
          return (
            lowerCasedTitle.includes(lowerCasedSearchTerm) ||
            lowerCasedSearchTerm.split(" ").some(term => lowerCasedTitle.includes(term))
          );
        });
        setResults(filteredResults);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  const handleFilterClick = (filter) => {
    setSelectedFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const filteredResults = selectedFilters.length
    ? results.filter(result => selectedFilters.includes(result.collection))
    : results;

  const getResultLink = (result) => {
    let path = '';
    switch (result.collection) {
      case 'video':
        path = `/Video/${result.$id}`;
        break;
      case 'audio':
        path = `/audios/${result.$id}`;
        break;
      case 'library':
        path = `/libraries/${result.$id}`;
        break;
      case 'questionAndAnswer':
        path = `/qas/${result.$id}`;
        break;
      case 'article':
        path = `/articles/${result.$id}`;
        break;
      default:
        path = '/';
        break;
    }
    return path;
  };

  if (loading) return <Loading>Loading...</Loading>;
  if (error) return <Error>Error: {error}</Error>;

  return (
    <Wrapper>
      <FilterContainer>
        {collections.map(collection => (
          <FilterButton
            key={collection.name}
            active={selectedFilters.includes(collection.name)}
            onClick={() => handleFilterClick(collection.name)}
          >
            {collection.name}
          </FilterButton>
        ))}
      </FilterContainer>
      <ResultsContainer>
        <h1>Search Results for "{searchTerm}"</h1>
        {filteredResults.length > 0 ? (
          <ul>
            {filteredResults.map((result, index) => (
              <SearchResultItem key={index}>
                <Link to={getResultLink(result)}>
                  {result.title}
                </Link>
                <span>({result.collection})</span>
                {/* Add more details based on the collection */}
                {result.collection === 'video' && (
                  <div>
                    <p>{result.description}</p>
                    <video src={result.videoUrl} controls width="100%" />
                  </div>
                )}
                {result.collection === 'article' && (
                  <div>
                    <p>{result.description}</p>
                  </div>
                )}
              </SearchResultItem>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </ResultsContainer>
    </Wrapper>
  );
}
