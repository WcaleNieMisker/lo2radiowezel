import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fetchData = async (updateLfmData, setLoadingText) => {
  try {
    const response = await fetch('http://localhost:3000/spotify');
    if (response.ok) {
      const data = await response.json();
      updateLfmData(data);
    } else {
      throw new Error('error');
    }
  } catch (error) {
    console.error(error.message);
    updateLfmData({ error: 'Ups! Coś poszło nie tak!' });
  } finally {
    setLoadingText(''); // Clear loading text regardless of success or failure
  }
};

const TogglePlayer = styled.button`
  color: #E1E1E6;
  width: 30px;
  height: 30px;
  position: absolute;
  left: 10px;
  top: 12px;
  cursor: pointer;
`;

const Container = styled.div`
  grid-area: A;
  padding: 50px 38px;
  margin-right: 30px;
  border: 1px solid transparent;
  background-color: #080747;
  border-radius: 20px;
  transform: ${({ ishidden }) => {
    return ishidden ? 'translateX(90%)' : 'translateX(0)';
  }};
  transition: transform 0.3s ease-in-out;
  position: fixed;
  right: 20px;
  top: 150px;
  z-index: 1000;
`;

const Wrapper = styled.div`
  width: 190px;
`;

const AlbumCover = styled.img`
  width: 190px;
  height: 190px;
  object-fit: cover;
  border-radius: 10px;
`;

const NothingPlaysCover = styled.div``;

const Info = styled.div`
  color: #E1E1E6;
  z-index: 1000;
`;

const TrackName = styled.h1`
  font-size: 19px;
  color: #E1E1E6;
  padding-bottom: 7px;
`;

const NothingPlays = styled.h1`
  font-size: 19px;
  color: #E1E1E6;
  padding-bottom: 7px;
  text-align: center;
  margin-top: 5px;
`;

const ArtistName = styled.p`
  opacity: 0.68;
  font-size: 12px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const Previous = styled.div`
  opacity: 0.68;
`;

const Play = styled.div`
  opacity: 0.68;
`;

const Next = styled.div`
  opacity: 0.68;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  background-color: #eee;
  margin-top: 20px;
  position: relative;
  border-radius: 10px;
`;

const ProgressIndicator = styled.div`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: #D9D9D9;
  border-radius: 10px;
  opacity: 0.68; //usunąć jak progressbar bedzie zrobiony
`;

export const LastFmData = () => {
  const [lfmData, updateLfmData] = useState({});
  const [loadingText, setLoadingText] = useState('Ładuję');
  const [isContainerHidden, setIsContainerHidden] = useState(false);

  const handleTogglePlayer = () => {
    setIsContainerHidden((prevValue) => !prevValue);
  };
  
  useEffect(() => {
    fetchData(updateLfmData, setLoadingText);
  }, []);

  useEffect(() => {
    if (!lfmData?.recenttracks?.track) {
      const interval = setInterval(() => {
        setLoadingText((prevText) => {
          if (prevText === 'Ładuję...') {
            return 'Ładuję';
          } else {
            return `${prevText}.`;
          }
        });
      }, 270);

      return () => clearInterval(interval);
    }
  }, [lfmData]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      fetchData(updateLfmData, setLoadingText);
    }, 400);

    return () => clearInterval(updateInterval);
  }, []);

  const buildLastFmData = () => {
    const { error, recenttracks } = lfmData;
  
    if (error) {
      console.log(error);
    }
  
    if (!recenttracks || !recenttracks.track || recenttracks.track.length === 0) {
      return <p></p>;
    }
  
    const track = recenttracks.track[0];
    const { name: songName, artist: { '#text': artistName } = {}, album = {} } = track;
  
    // const progress = calculateProgress(track);
  
    return (
      <Container className="nowPlayingElement" ishidden={isContainerHidden}>
      <TogglePlayer onClick={handleTogglePlayer}>
        {!isContainerHidden ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
        )}
      </TogglePlayer>
      {track['@attr']?.nowplaying ? (
      <Wrapper className="nowPlayingWrapper">
            <AlbumCover src={track.image[3]['#text']} alt="Album Cover" className='albumCover' />
            <Info className='Info'>
              <TrackName>{songName}</TrackName>
              <ArtistName>{artistName}</ArtistName>
            </Info>
          {/* <Controls>
            <Previous>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.33917 13.7397L12.9664 7.38149C13.2293 7.22152 13.5303 7.13509 13.8381 7.13123C14.1458 7.12737 14.4489 7.20622 14.7157 7.35955C15.0053 7.52815 15.245 7.77036 15.4107 8.0616C15.5763 8.35284 15.6619 8.68272 15.6588 9.01775V13.4657L25.8274 7.3798C26.0903 7.21983 26.3914 7.13341 26.6991 7.12955C27.0068 7.12568 27.3099 7.20454 27.5768 7.35786C27.8663 7.52646 28.1061 7.76867 28.2717 8.05991C28.4373 8.35115 28.5229 8.68103 28.5198 9.01606V21.4512C28.5231 21.7863 28.4376 22.1163 28.2719 22.4077C28.1063 22.699 27.8664 22.9413 27.5768 23.1099C27.3099 23.2632 27.0068 23.3421 26.6991 23.3382C26.3914 23.3344 26.0903 23.2479 25.8274 23.088L15.6588 16.9993V21.4489C15.6625 21.7844 15.5771 22.1149 15.4114 22.4067C15.2458 22.6985 15.0057 22.9411 14.7157 23.1099C14.4489 23.2632 14.1458 23.3421 13.8381 23.3382C13.5303 23.3344 13.2293 23.2479 12.9664 23.088L2.33917 16.7298C2.08653 16.5715 1.87825 16.3516 1.73386 16.0908C1.58948 15.83 1.51373 15.5368 1.51373 15.2387C1.51373 14.9406 1.58948 14.6473 1.73386 14.3865C1.87825 14.1257 2.08653 13.9058 2.33917 13.7476V13.7397Z" fill="#E1E1E6"/>
                </svg>
            </Previous>
            <Play>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.32137 25.586C7.9759 25.5853 7.63655 25.4948 7.33669 25.3232C6.66148 24.9406 6.24173 24.1978 6.24173 23.3915V7.07398C6.24173 6.26542 6.66148 5.52494 7.33669 5.14232C7.64369 4.96589 7.99244 4.87516 8.3465 4.87961C8.70056 4.88407 9.04692 4.98354 9.34938 5.16764L23.2952 13.5155C23.5859 13.6977 23.8255 13.9508 23.9916 14.251C24.1577 14.5511 24.2448 14.8886 24.2448 15.2316C24.2448 15.5747 24.1577 15.9121 23.9916 16.2123C23.8255 16.5125 23.5859 16.7655 23.2952 16.9478L9.34713 25.2979C9.0376 25.485 8.68307 25.5846 8.32137 25.586V25.586Z" fill="#E1E1E6"/>
              </svg>
            </Play>
            <Next>
              <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.1426 13.7397L16.5154 7.38149C16.2525 7.22152 15.9514 7.13509 15.6437 7.13123C15.336 7.12737 15.0329 7.20622 14.766 7.35955C14.4765 7.52815 14.2368 7.77036 14.0711 8.0616C13.9055 8.35284 13.8199 8.68272 13.823 9.01775V13.4657L3.65435 7.3798C3.39144 7.21983 3.0904 7.13341 2.78268 7.12955C2.47495 7.12568 2.17183 7.20454 1.905 7.35786C1.61547 7.52646 1.37571 7.76867 1.21008 8.05991C1.04445 8.35115 0.958845 8.68103 0.961955 9.01606V21.4512C0.958745 21.7863 1.0443 22.1163 1.20994 22.4076C1.37558 22.699 1.61538 22.9413 1.905 23.1099C2.17183 23.2632 2.47495 23.3421 2.78268 23.3382C3.0904 23.3344 3.39144 23.2479 3.65435 23.088L13.823 16.9993V21.4489C13.8194 21.7844 13.9048 22.1149 14.0704 22.4066C14.2361 22.6984 14.4761 22.9411 14.766 23.1099C15.0329 23.2632 15.336 23.3421 15.6437 23.3382C15.9514 23.3344 16.2525 23.2479 16.5154 23.088L27.1426 16.7298C27.3953 16.5715 27.6035 16.3516 27.7479 16.0908C27.8923 15.83 27.968 15.5368 27.968 15.2387C27.968 14.9406 27.8923 14.6473 27.7479 14.3865C27.6035 14.1257 27.3953 13.9058 27.1426 13.7476V13.7397Z" fill="#E1E1E6"/>
              </svg>
            </Next>
          </Controls>
          <ProgressBar>
          <ProgressIndicator
           progress={progress} 
          />
          </ProgressBar> */}
      </Wrapper>
      ) : (
        <Wrapper className="nowPlayingWrapper">
          <NothingPlaysCover className="nothingplays"></NothingPlaysCover>
          <Info className='Info'>
            <NothingPlays className='nothingPlaysHeader'>Nic nie jest aktualnie odtwarzane</NothingPlays>
          </Info>
        {/* <Controls>
          <Previous>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.33917 13.7397L12.9664 7.38149C13.2293 7.22152 13.5303 7.13509 13.8381 7.13123C14.1458 7.12737 14.4489 7.20622 14.7157 7.35955C15.0053 7.52815 15.245 7.77036 15.4107 8.0616C15.5763 8.35284 15.6619 8.68272 15.6588 9.01775V13.4657L25.8274 7.3798C26.0903 7.21983 26.3914 7.13341 26.6991 7.12955C27.0068 7.12568 27.3099 7.20454 27.5768 7.35786C27.8663 7.52646 28.1061 7.76867 28.2717 8.05991C28.4373 8.35115 28.5229 8.68103 28.5198 9.01606V21.4512C28.5231 21.7863 28.4376 22.1163 28.2719 22.4077C28.1063 22.699 27.8664 22.9413 27.5768 23.1099C27.3099 23.2632 27.0068 23.3421 26.6991 23.3382C26.3914 23.3344 26.0903 23.2479 25.8274 23.088L15.6588 16.9993V21.4489C15.6625 21.7844 15.5771 22.1149 15.4114 22.4067C15.2458 22.6985 15.0057 22.9411 14.7157 23.1099C14.4489 23.2632 14.1458 23.3421 13.8381 23.3382C13.5303 23.3344 13.2293 23.2479 12.9664 23.088L2.33917 16.7298C2.08653 16.5715 1.87825 16.3516 1.73386 16.0908C1.58948 15.83 1.51373 15.5368 1.51373 15.2387C1.51373 14.9406 1.58948 14.6473 1.73386 14.3865C1.87825 14.1257 2.08653 13.9058 2.33917 13.7476V13.7397Z" fill="#E1E1E6"/>
              </svg>
          </Previous>
          <Play>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.32137 25.586C7.9759 25.5853 7.63655 25.4948 7.33669 25.3232C6.66148 24.9406 6.24173 24.1978 6.24173 23.3915V7.07398C6.24173 6.26542 6.66148 5.52494 7.33669 5.14232C7.64369 4.96589 7.99244 4.87516 8.3465 4.87961C8.70056 4.88407 9.04692 4.98354 9.34938 5.16764L23.2952 13.5155C23.5859 13.6977 23.8255 13.9508 23.9916 14.251C24.1577 14.5511 24.2448 14.8886 24.2448 15.2316C24.2448 15.5747 24.1577 15.9121 23.9916 16.2123C23.8255 16.5125 23.5859 16.7655 23.2952 16.9478L9.34713 25.2979C9.0376 25.485 8.68307 25.5846 8.32137 25.586V25.586Z" fill="#E1E1E6"/>
            </svg>
          </Play>
          <Next>
            <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.1426 13.7397L16.5154 7.38149C16.2525 7.22152 15.9514 7.13509 15.6437 7.13123C15.336 7.12737 15.0329 7.20622 14.766 7.35955C14.4765 7.52815 14.2368 7.77036 14.0711 8.0616C13.9055 8.35284 13.8199 8.68272 13.823 9.01775V13.4657L3.65435 7.3798C3.39144 7.21983 3.0904 7.13341 2.78268 7.12955C2.47495 7.12568 2.17183 7.20454 1.905 7.35786C1.61547 7.52646 1.37571 7.76867 1.21008 8.05991C1.04445 8.35115 0.958845 8.68103 0.961955 9.01606V21.4512C0.958745 21.7863 1.0443 22.1163 1.20994 22.4076C1.37558 22.699 1.61538 22.9413 1.905 23.1099C2.17183 23.2632 2.47495 23.3421 2.78268 23.3382C3.0904 23.3344 3.39144 23.2479 3.65435 23.088L13.823 16.9993V21.4489C13.8194 21.7844 13.9048 22.1149 14.0704 22.4066C14.2361 22.6984 14.4761 22.9411 14.766 23.1099C15.0329 23.2632 15.336 23.3421 15.6437 23.3382C15.9514 23.3344 16.2525 23.2479 16.5154 23.088L27.1426 16.7298C27.3953 16.5715 27.6035 16.3516 27.7479 16.0908C27.8923 15.83 27.968 15.5368 27.968 15.2387C27.968 14.9406 27.8923 14.6473 27.7479 14.3865C27.6035 14.1257 27.3953 13.9058 27.1426 13.7476V13.7397Z" fill="#E1E1E6"/>
            </svg>
          </Next>
        </Controls> */}
    </Wrapper>
      )}
  </Container>
    );
  };

//   const calculateProgress = (track) => {
//     const { duration, '@attr': { nowplaying } = {} } = track;
//     if (nowplaying === 'true') {
//       const elapsed = new Date().getTime() / 1000 - track.date.uts;
//       return (elapsed / duration) * 100;
//     } else {
//       return 0;
//     }
//   };

  return buildLastFmData();
};