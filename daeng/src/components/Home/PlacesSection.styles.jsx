import styled from "styled-components";

export const Wrapper = styled.div`
  @media (max-width: 554px) {
    margin-top: 10px;
  }
`;

export const Title = styled.h3`
  display: flex;
  align-items: center;
  text-align: left;
  margin: 20px 30px;
  font-size: 20px;
  font-weight: 600;
  color: black;

  @media (max-width: 554px) {
    margin: 10px 20px;
    font-size: 15px;
  }

  img {
    margin-left: 3px;
    width: 20px;
    height: 20px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  
  @media (max-width: 554px) {
    padding: 0 20px;
    gap: 10px;
  }
`;

export const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 152px;

  @media (max-width: 554px) {
    width: 100%;
  }
`;

export const ImageBox = styled.div`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 150 / 173;

  @media (max-width: 554px) {
    aspect-ratio: 150 / 173;
  }
`;

export const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlaceName = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: center;

  @media (max-width: 554px) {
    font-size: 12px;
  }
`;
