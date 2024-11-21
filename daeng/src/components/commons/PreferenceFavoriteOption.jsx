import React from 'react'
import styled from "styled-components";

const PreferenceButton = styled.button`
  max-width: auto;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;
  font-size: 12px;
  color: black;
  margin-top:3px;
  cursor: pointer;
  margin-right: 10px;
  white-space: nowrap;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  transition: all 0.3s ease;

  &:hover {
    background-color: #FDF2F8;
    color: #DB2877;
    font-weight: bold;
    border-color: #FF4B98;
  }

  @media (max-width: 554px) {
    height:30px;
    font-size: 10px;
  }
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;

  @media (max-width: 554px) {
    width: 15px;
    height: 15px;
  }
`;

function PreferenceFavoriteOption({ label, icon }) {
  return (
    <PreferenceButton>
      <StyledIcon src={icon} alt={label} />
      {label}
    </PreferenceButton>
  );
}

export default PreferenceFavoriteOption;
