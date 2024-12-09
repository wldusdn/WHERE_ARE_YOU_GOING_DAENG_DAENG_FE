import { useState } from "react";
import styled from "styled-components";
import joinIcon from "../../assets/icons/join.svg"
import ReviewKeywords from "../../components/commons/ReviewKeywords";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import filledbookmarkIcon from "../../assets/icons/filledbookmark.svg";
import starIcon from "../../assets/icons/star.svg"
import { useNavigate, useParams } from "react-router-dom";
import useFavoriteStore from "../../stores/useFavoriteStore";
import useUserStore from "../../stores/userStore";
import AlertDialog from "../commons/SweetAlert";
import SquareBtn from "../commons/SquareBtn";

const Container = styled.div`
  padding: 0px 44px;
  @media(max-width: 554px){
    padding: 0px 8%;
  }
`

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  text-align: left;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 3px;
    text-align:left;

    @media(max-width: 554px){
    font-size: 20px;
  }

`;

const SubTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 15px;
  aling-items: center;

  .detail-category{
    color: #FF69A9;
    margin-right: 5px;
  }

  img{
    margin: 0 5px;
    width: 15px;
    cursor:pointer;
  }

  .detail-reviewcnt{
    margin-left: 2px;
    color: #808080;
    font-weight: normal;
    cursor:pointer;
  }
`

const PlaceTitle = ({ data, setData }) => {
    const navigate = useNavigate();
    const { id: placeId } = useParams();
    const { userId } = useUserStore.getState();
    
    const toggleBookmark = async (placeId, isFavorite) => {
      const favoriteStore = useFavoriteStore.getState();
      
      try {
        if (isFavorite) {
          const favoriteId = favoriteStore.getFavoriteId(placeId);
          if (favoriteId) {
            await favoriteStore.removeFavorite(favoriteId);
          } else {
            console.warn(`Favorite ID not found for placeId: ${placeId}`);
          }
        } else {
          await favoriteStore.addFavorite(placeId);
        }
    
        setData((prevData) => ({
          ...prevData,
          isFavorite: !isFavorite,
        }));
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    };

    const handleVisitListClick = (placeId) => {
      if (userId) {
        navigate(`/visit-list/${placeId}`);
      } else {
        AlertDialog({
          mode: "alert",
          title: "로그인 필요",
          text: "방문등록을 하시려면 로그인이 필요합니다.",
          confirmText: "확인",
        });
      }
    }

    const handleReviewClick = () => {
      console.log(userId)
      if (userId) {
        navigate(`/write-review/${placeId}`, { state: { type: "realTime" } });
      } else {
        AlertDialog({
          mode: "alert",
          title: "로그인 필요",
          text: "땅따먹기 리뷰를 작성하려면 로그인이 필요합니다.",
          confirmText: "확인",
        });
      }
    };
  
    return(
        <Container>
            <TitleSection>
                <h1>{data.name}</h1>
                <SquareBtn mode="visit" onClick={handleVisitListClick}/>
                {/* <ReviewKeywords label="방문하고 싶어요" icon={joinIcon} onClick={() => handleVisitListClick(data.placeId)}/> */}
            </TitleSection>
            <SubTitleSection>
                <Info>
                  <p className="detail-category">{data.placeType}</p>
                  <p>| 평점</p>
                  <img src={starIcon} alt="평점" />
                  <p>{data.score}</p>
                  <p className="detail-reviewcnt" onClick={()=>navigate(`/total-review/${data.placeId}`)}>({data.total})</p>
                  <img
                      src={data.isFavorite ? filledbookmarkIcon : bookmarkIcon}
                      alt="Favorite"
                      className="favorite-button"
                      onClick={()=>toggleBookmark(data.placeId, data.isFavorite)}
                  />
                </Info>
                <SquareBtn mode="review" onClick={handleReviewClick}/>
            </SubTitleSection>
        </Container>
    )
}

export default PlaceTitle;