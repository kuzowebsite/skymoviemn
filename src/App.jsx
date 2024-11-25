import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import MovieDetails from "./components/MovieDetails";
import Playlist from "./components/Playlist";
import Person from "./components/Person";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/watchlist" element={<Playlist />} />\
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
