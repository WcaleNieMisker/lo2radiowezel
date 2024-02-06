import React, { Component, useState, useEffect } from 'react';
// import './api';
import SearchBar from './SearchBar.js';
import { getElements } from './axios.js'
import ListPage from './songsWithPagination.js';
import BackToTopButton from './backToTop.js';
import {LastFmData} from "./spotifyAPI.js";

const themeChange = () => {
    let elements = document.querySelectorAll('*')
    let button = document.querySelector('#theme')
    elements.forEach(element => {
      if (button.checked === true) {
          element.classList.add('dark-theme');
          localStorage.setItem('theme', 'dark')
      } else {
          element.classList.remove('dark-theme');
          localStorage.setItem('theme', 'light')
      }
    })
}

const toggleMenu = () => {
    const navId = document.querySelector(".nav_menu")
    navId.classList.add("show");
};
  
const closeMenu = () => {
    const navId = document.querySelector(".nav_menu")
    navId.classList.remove("show");
};

function App(){
    const [elements, setElements] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0);
    
    useEffect(() => {
        getElements().then(json => {
            setElements(json)
            return json
        }).then(json => {
            setSearchResults(json)
            setLoaded(true)
        })
    }, [])

    useEffect(() => {
        if (searchResults.length === 0) {
            setPageNumber(1)
        }
    }, [searchResults]);

    useEffect(() => {
        if (pageNumber === 1) {
          setPageNumber(prevPage => {
            if (prevPage >= Math.ceil(searchResults.length / 9)) {
              return 0;
            } else {
              return prevPage;
            }
          });
        }
    }, [pageNumber])
    
    return (
        <div>
            <div className="bg"></div>
            <BackToTopButton />
            <LastFmData />
                <header className="container header">
                    <nav className="nav">
                    <a href="./index.html"><div className="logo"></div></a>
                    <div className="nav_menu" id="nav_menu">
                        <div>
                            <button className="close_btn" id="close_btn" onClick={closeMenu}>
                                <i className="ri-close-fill"></i>
                            </button>
                            <label htmlFor="theme" className="toggler">
                                <input type="checkbox" id="theme" onClick={themeChange} /> 
                                <span className="ball"></span>
                                <i className="ri-sun-line sun"></i>
                                <i className="ri-moon-line moon"></i>
                            </label>
                        </div>
                        <ul className="nav_menu_list">
                
                        <li className="nav_menu_item">
                            <a href="#playlista" className="nav_menu_link">playlista</a>
                        </li>
                        <li className="nav_menu_item">
                            {/* <a href="#" className="nav_menu_link">propozycje (wkrótce)</a> */}
                            <a href="https://open.spotify.com/playlist/0hHY4NA8HAUCZyXLWq4Ip0?si=1e1147c4588641be" className="nav_menu_link">propozycje</a>
                        </li>
                        <li className="nav_menu_item">
                            <a href="#info" className="nav_menu_link">informacje</a>
                        </li>
                        <li className="nav_menu_item">
                            <a href="http://2loraciborz.pl/" className="nav_menu_link">szkoła</a>
                        </li>
                        </ul>
                    </div>

                    <button className="toggle_btn" id="toggle_btn" onClick={toggleMenu}>
                        <i className="ri-menu-line"></i>
                    </button>
                    </nav>
                </header>

                <section className="wrapper">
                    <div className="container">
                    <div className="grid-cols-2">
                        <div className="grid-item-1">
                        <h1 className="main-heading">
                            <span>Radiowęzeł</span>
                        </h1>
                        <p className="info-text">
                        Radiowęzeł LO2 to oficjalna strona szkolnego radiowęzła Liceum Ogólnokształcącego Nr 2 w Raciborzu. Dziel się propozycjami, polub lubiane utwory oraz steruj muzyką na przerwach (już wkrótce)!</p>

                        <div className="btn_wrapper">
                            <a href="#playlista"><button className="btn view_more_btn">
                            playlista <i className="ri-arrow-down-line"></i>
                            </button></a>

                            <button className="btn documentation_btn"><a href="https://open.spotify.com/playlist/0hHY4NA8HAUCZyXLWq4Ip0?si=1e1147c4588641be">propozycje</a></button>
                        </div>
                        </div>
                        <div className="grid-item-2">
                        <div className="team_img_wrapper">
                        </div>
                        </div>
                    </div>
                    </div>
                </section>

                <section className="wrapper">
                    <div className="container">
                        <h1 id="playlista" className="section-header"><a href="https://open.spotify.com/playlist/132h2BMTZWy0VH4gqLWeVD?si=c2b3c43904ef41df" target="_blank">Playlista</a></h1>
                        <SearchBar elements={elements} setSearchResults={setSearchResults} />
                        <ListPage searchResults={searchResults} loaded={loaded} elements={elements} number={pageNumber} />
                    </div>
                </section>
                <footer id="info">
                    <div className="content">
                    <div className="top">
                        <div className="logo-details">
                        Radiowęzeł LO2
                        <a href="https://open.spotify.com/user/31sejasvsuyf46kb7c5fwrs74fue?si=8c0f7f67e4554a9e"><i className="ri-spotify-fill"></i></a>
                        </div>
                        <div className="media-icons">
                        <a href="https://www.facebook.com/lo2rac"><i className="ri-facebook-fill"></i></a>
                        <a href="https://twitter.com/lo2rac/"><i className="ri-twitter-fill"></i></a>
                        <a href="https://www.instagram.com/2lo_raciborz/"><i className="ri-instagram-line"></i></a>
                        <a href="https://www.tiktok.com/@2lo_raciborz"><i className="bi bi-tiktok"></i></a>
                        </div>
                    </div>
                    <div className="link-boxes">
                        <ul className="box">
                        <li className="link_name">O stronie</li>
                        <li><a href="#nav_menu">Strona główna</a></li>
                        <li><a href="#playlista">Playlista</a></li>
                        <li><a href="#">Propozycje</a></li>
                        </ul>
                        <ul className="box">
                        <li className="link_name">Adres</li>
                        <li className="not-a">II Liceum Ogólnokształcące im. Adama Mickiewicza</li>
                        <li className="not-a">Kard. S. Wyszyńskiego 3</li>
                        <li className="not-a">47-400 Racibórz</li>
                        </ul>
                        <ul className="box">
                        <li className="link_name">Kontakt</li>
                        <li><a href="mailto:lo2radiowezel@proton.me">Poczta</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">TikTok</a></li>
                        </ul>
                        <ul className="box">
                        <li className="link_name">Informacje</li>
                        <li className="not-a">©Radiowęzeł LO2</li>
                        <li><a href="https://open.spotify.com/playlist/6kG5IPJjb2xyu0mouhET7B?si=bf71003228344627">Playlista Spotify</a></li>
                        <li><a href="https://instagram/drapehsmikser">Pomysłodawca: Mikuś</a></li>
                        <li><a href="https://instagram/drapehsmikser">Wykonawca: Mikuś</a></li>
                        <li><a href="https://chat.openai.com">Pomocnik: ChatGPT</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="bottom-details">
                    <div className="bottom_text">
                        <span className="copyright_text">Copyright ©2022 <a>Radiowęzeł LO2</a></span>
                        <span className="policy_terms">
                        All rights reserved
                        </span>
                    </div>
                    </div>
                </footer>
            </div>
    )
}

export default App;