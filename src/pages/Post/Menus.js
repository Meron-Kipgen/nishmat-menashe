import React from 'react';
import styled from 'styled-components';

const MenuContainerWrapper = styled.div`
  position: relative;
background: #f0efef;
  width: 100%;
padding: 5px 30px;

  display: flex;
  align-items: center;
justify-content: space-between;

 
`;

const Menu = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  outline: none;
  border: none;
  padding: 5px;
  cursor: pointer;

`;
const ForUsers = styled.div`
display: flex;
gap: 30px;
`
const ForAdmin = styled.div`
display: flex;
gap: 30px;
`
const Menus = ({ views, handleClose, increaseFont, decreaseFont }) => {

  const handleIncreaseFont = () => {
    if (increaseFont) {
      increaseFont();
    }
  };

  const handleDecreaseFont = () => {
    if (decreaseFont) {
      decreaseFont();
    }
  };


  return (
    <MenuContainerWrapper>
     
      <ForUsers>
        <Menu onClick={handleClose}>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>
     
        </Menu>
        <Menu onClick={handleIncreaseFont}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-text-increase">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 19v-10.5a3.5 3.5 0 1 1 7 0v10.5" />
          <path d="M4 13h7" />
          <path d="M18 9v6" />
          <path d="M21 12h-6" />
        </svg>

      </Menu>
      <Menu onClick={handleDecreaseFont}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-text-decrease">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 19v-10.5a3.5 3.5 0 1 1 7 0v10.5" />
          <path d="M4 13h7" />
          <path d="M21 12h-6" />
        </svg>
   
      </Menu>
      <Menu >
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-bookmark"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" /></svg>
        Save
      </Menu>
      <Menu>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-share">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M8.7 10.7l6.6 -3.4" />
          <path d="M8.7 13.3l6.6 3.4" />
        </svg>
        share
      </Menu>
 <Menu>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
        </svg>
        Views: {views}
      </Menu>
     
     
      
       </ForUsers>
     
     
      <ForAdmin>
      <Menu>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
          <path d="M16 5l3 3" />
        </svg>
      </Menu>
      <Menu>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7l16 0" />
          <path d="M10 11l0 6" />
          <path d="M14 11l0 6" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </Menu>
      </ForAdmin>
    </MenuContainerWrapper>
  );
};

export default Menus;
