import { useQuery } from "react-query";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useRouteMatch } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { indexAtom, toggleLeavingAtom } from "../atoms";

import MainMovie from "../Components/MainMovie";
import BigMovieBox from "../Components/BigMovie";
import MovieSlider from "../Components/MovieSlider";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const offset = 6;

function Home() {
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const setIndex = useSetRecoilState(indexAtom);
  const [leaving, setLeaving] = useRecoilState(toggleLeavingAtom);

  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MainMovie
            onClick={incraseIndex} 
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")} 
            title={data?.results[0].title} 
            overview={data?.results[0].overview} 
          />

          <MovieSlider />

          <AnimatePresence>
            {bigMovieMatch ? (
              <BigMovieBox clickedMovie={clickedMovie} layoutId={bigMovieMatch.params.movieId} />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
