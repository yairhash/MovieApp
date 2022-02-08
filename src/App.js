
import './App.css';
import Header from "./components/Header/Header"
import SimpleBottomNavigation from "./components/MainNav"
import { Container } from "@mui/material";
import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Trending from "./Pages/Trending/Trending"
import Movies from "./Pages/Movies/Movies"
import Search from "./Pages/Search/Search"
import Series from "./Pages/Series/Series"




function App() { 
  
  const trendingComponent = <Trending/>
  const moviesgComponent = <Movies/>
  const seriesComponent = <Series/>
  const searchComponent = <Search/>
  

  return (
    <BrowserRouter>
      <Header/>
      <div className="app">
 
         <Routes>
           <Route exact path="/" element={trendingComponent} />
           <Route path="/Movies" element={moviesgComponent}/>
           <Route path="/Series" element={seriesComponent}/>
           <Route path="/Search" element={searchComponent}/>
         </Routes>
      
      </div> 
      <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
