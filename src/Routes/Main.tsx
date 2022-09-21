import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "../components/Header";
import BlockMobile from "../lib/BlockMobile";
import Movie from "./Movie";
import Tv from "./Tv";
import Search from "./Search";

const Main = () => {
  return (
    <HashRouter>
      <BlockMobile />
      <Header />
      <Routes>
        <Route path="/" element={ <Navigate to="/movie" /> } />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/*" element={<Movie />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/*" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/*" element={<Search />} />
      </Routes>
    </HashRouter>
  );
};

export default Main;