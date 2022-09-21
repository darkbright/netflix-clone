import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMoviesLatest,
  getMoviesTopRated,
  getMoviesUpcoming,
  IGetMoviesResult,
} from "../api/api";
import Banner from "../components/Banner";
import Modal from "../components/Modal";
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
  font-size: 35px;
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
    useQuery(["movie", "latest"], getMoviesLatest),
    useQuery(["movie", "topRated"], getMoviesTopRated),
    useQuery(["movie", "upcoming"], getMoviesUpcoming),
  ];
}

const Movie = () => {
  const [
    { data: latest,   isLoading: isLoadingLatest },
    { data: topRated, isLoading: isLoadingTopRated },
    { data: upcoming, isLoading: isLoadingUpcoming }
 ] = useMultipleQuery();

 return (
    <Wrapper>
      {isLoadingLatest && isLoadingTopRated && isLoadingUpcoming ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={latest} />
          <Contents>
            <ContentBox>
              <Title>평단의 찬사를 받은!</Title>
              <Slider data={topRated} type="topRated" category="movie"/>
            </ContentBox>
            <ContentBox>
              <Title>지금 뜨는!</Title>
              <Slider data={latest} type="Latest" category="movie"/>
            </ContentBox>
            <ContentBox>
              <Title>NEW! 요즘 대세!</Title>
              <Slider data={upcoming} type="Upcoming" category="movie"/>
            </ContentBox>
          </Contents>
          <Modal data={topRated} type="topRated" category="movie"/>
          <Modal data={latest} type="Latest" category="movie"/>
          <Modal data={upcoming} type="Upcoming" category="movie"/>
        </>
      )}
    </Wrapper>
  );
};

export default Movie;
