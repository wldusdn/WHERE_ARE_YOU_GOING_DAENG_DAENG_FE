import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ReviewPictureContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  margin-left: 5px;
  padding: 20px 0;

  @media (max-width: 554px) {
    margin-left: 10px;
  }
`;

const ReviewPictureWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex, itemWidth }) =>
    `translateX(-${currentIndex * (itemWidth + 5)}px)`};
`;

const ReviewPicture = styled.img`
  width: ${({ itemWidth }) => `${itemWidth}px`};
  height: ${({ itemWidth }) => `${itemWidth}px`};
  object-fit: cover;
  margin-right: 5px;
  border-radius: 8px;

  @media (max-width: 554px) {
    margin-right: 3px;
  }
  cursor: pointer;
`;

const Video = styled.video`
  width: ${({ itemWidth }) => `${itemWidth}px`};
  height: ${({ itemWidth }) => `${itemWidth}px`};
  object-fit: cover;
  margin-right: 5px;
  background-color: #d9d9d9;
  border-radius: 8px;

  @media (max-width: 554px) {
    margin-right: 3px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 2;

  ${({ direction }) => (direction === "left" ? "left: 10px;" : "right: 10px;")}

  @media (max-width: 554px) {
    padding: 8px;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px; 
  right: 20px; 
  background: rgba(0, 0, 0, 0.6); 
  color: white; 
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1001;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 554px) {
    width: 35px;
    height: 35px;
    top: 10px;
    right: 10px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  max-width: 80%;
  max-height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

  img,
  video {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    border-radius: 10px;
  }

  video {
    background-color: #000;
  }
`;

const ReviewSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [itemWidth, setItemWidth] = useState(120);
  const [modalMedia, setModalMedia] = useState(null); 

  const totalImages = images.length;

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 554) {
        setVisibleCount(2);
        setItemWidth(90);
      } else if (screenWidth <= 768) {
        setVisibleCount(3);
        setItemWidth(110);
      } else {
        setVisibleCount(4);
        setItemWidth(120);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.max(totalImages - visibleCount, 0))
    );
  };

  const canShowPrev = currentIndex > 0;
  const canShowNext = currentIndex < totalImages - visibleCount;

  const openModal = (src) => {
    setModalMedia(src); 
  };

  const closeModal = () => {
    setModalMedia(null); 
  };

  const isVideo = (src) => src.endsWith(".mp4") || src.endsWith(".mov");

  return (
    <>
      <ReviewPictureContainer>
        {canShowPrev && (
          <ArrowButton direction="left" onClick={handlePrev}>
            ◀
          </ArrowButton>
        )}
        <ReviewPictureWrapper currentIndex={currentIndex} itemWidth={itemWidth}>
          {images.map((src, index) => {
            if (isVideo(src)) {
              return (
                <Video
                  key={index}
                  controls
                  itemWidth={itemWidth}
                  onClick={() => openModal(src)} 
                >
                  <source src={src} type="video/mp4" />
                </Video>
              );
            } else {
              return (
                <ReviewPicture
                  key={index}
                  src={src}
                  alt={`리뷰 이미지 ${index + 1}`}
                  itemWidth={itemWidth}
                  onClick={() => openModal(src)} 
                />
              );
            }
          })}
        </ReviewPictureWrapper>
        {canShowNext && (
          <ArrowButton direction="right" onClick={handleNext}>
            ▶
          </ArrowButton>
        )}
      </ReviewPictureContainer>
      {modalMedia && (
        <ModalOverlay>
          <ModalContent>
            {isVideo(modalMedia) ? (
              <video controls>
                <source src={modalMedia} type="video/mp4" />
              </video>
            ) : (
              <img src={modalMedia} alt="확대된 미디어" />
            )}
          </ModalContent>
          <CloseButton onClick={closeModal}>×</CloseButton>
        </ModalOverlay>
      )}
    </>
  );
};

export default ReviewSlideshow;
