import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
width: 600px;
`;

const GlassInput = styled.input`
  width:100%;
  padding: 8px 16px; /* Add some padding inside the input */
  border: none; /* Remove the default border */
  border-radius: 20px; /* Rounded corners for the input */
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  backdrop-filter: blur(10px); /* Blur effect for the background */
   /* Subtle shadow for depth */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Light border for the glass effect */
  transition: width 0.3s ease-in-out, box-shadow 0.3s ease; /* Smooth transition for width and shadow */

  &:focus {
  /* Stretch to full width on focus */
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); /* Larger shadow when focused */
    outline: none; /* Remove the default focus outline */
  }

  &::placeholder {
    color: black /* Light color for the placeholder text */
  }
`;

export default function Search() {
  return (
    <Wrapper>
      <GlassInput type="search" placeholder="search here" />
    </Wrapper>
  );
}
