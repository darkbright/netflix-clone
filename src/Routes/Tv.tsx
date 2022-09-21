import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getTvShowsAiringToday,
  getTvShowsOnTheAir,
  getTvShowsPopular,
  getTvShowsTopRated,
  IGetShowsResult,
} from "../api/api";
import Banner from "../components/Banner";
import ModalTV from "../components/ModalTV";
import Slider from "../components/Slider";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
  padding-bottom: 200px;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 300px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding-left: 2%;
  padding-bottom: 15px;
  font-size: 25px;
  font-weight: bold;
  position: relative;
  top: -150px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const useMultipleQuery = () => {
  return [
    useQuery(["tv", "popular"],     getTvShowsPopular),
    useQuery(["tv", "topRated"],    getTvShowsTopRated),
    useQuery(["tv", "onTheAir"],    getTvShowsOnTheAir),
    useQuery(["tv", "airingToday"], getTvShowsAiringToday),
  ];
}

const Tv = () => {
  const [
    { data: popular,      isLoading: isLoadingPopular },
    { data: topRated,     isLoading: isLoadingTopRated },
    { data: onTheAir,     isLoading: isLoadingOnTheAir },
    { data: airingToday,  isLoading: isLoadingAiringToday }
  ] = useMultipleQuery();

  return (
    <Wrapper>
      {isLoadingPopular && isLoadingTopRated && isLoadingOnTheAir && isLoadingAiringToday ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={popular} />
          <Contents>
            <ContentBox>
              <Title>평단의 찬사를 받은!</Title>
              <Slider data={topRated} type="topRated" category="tv"/>
            </ContentBox>
            <ContentBox>
              <Title>취향 저격 인기!</Title>
              <Slider data={popular} type="Popular" category="tv"/>
            </ContentBox>
            <ContentBox>
              <Title>오늘 바로 방영!</Title>
              <Slider data={airingToday} type="AiringToday" category="tv"/>
            </ContentBox>
            <ContentBox>
              <Title>NEW! 요즘 대세!</Title>
              <Slider data={onTheAir} type="onTheAir" category="tv"/>
            </ContentBox>
          </Contents>
          <ModalTV data={topRated} type="topRated" category="tv"/>
          <ModalTV data={popular} type="Popular" category="tv"/>
          <ModalTV data={airingToday} type="AiringToday" category="tv"/>
          <ModalTV data={onTheAir} type="OnTheAir" category="tv"/>
        </>
      )}
    </Wrapper>
  );
};

export default Tv;
