import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { motion, useViewportScroll } from "framer-motion";

import { IMovie } from "../api";
import { makeImagePath } from "../utils";



const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

interface IProps {
  layoutId: string,
  clickedMovie?: IMovie | string,
}

function BigMovieBox( { layoutId, clickedMovie} : IProps) {
  const history = useHistory();
  const onOverlayClick = () => history.push("/");
  const { scrollY } = useViewportScroll();

  if (typeof clickedMovie  === 'string' )
    return null;

  return (
    <>
    <Overlay
      onClick={onOverlayClick}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
    <BigMovie
      style={{ top: scrollY.get() + 100 }}
      layoutId={layoutId}
    >
      {clickedMovie && (
        <>
          <BigCover
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                clickedMovie.backdrop_path,
                "w500"
              )})`,
            }}
          />
          <BigTitle>{clickedMovie.title}</BigTitle>
          <BigOverview>{clickedMovie.overview}</BigOverview>
        </>
      )}
    </BigMovie>
    </>  
  )
}

export default BigMovieBox;