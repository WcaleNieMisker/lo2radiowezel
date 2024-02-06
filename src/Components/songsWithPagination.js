import Item from "./items.js";
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { getElements } from './axios.js';
const ListPage = ({ searchResults, loaded, elements, number }) => {
  const [loadingText, setLoadingText] = useState('Ładuję');
  const [pageNumber, setPageNumber] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [previousPageCount, setPreviousPageCount] = useState(0);
  const [data, setData] = useState([]);

  const resultsPerPage = 9;
  const pagesVisited = pageNumber * resultsPerPage;
  const refreshData = async () => {
    try {
      const get = await getElements();
      console.log(get);
      setData(get);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 10000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prevText => {
        if (prevText === 'Ładuję...') {
          return 'Ładuję'
        } else {
          return `${prevText}.`
        }
      })
    }, 270)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setFilteredResults(searchResults);
    setPageNumber(previousPageCount);
  }, [searchResults]);

  useEffect(() => {
    setPageNumber(prevPage => {
      if (prevPage >= Math.ceil(searchResults.length / resultsPerPage)) {
        return 0;
      } else {
        return prevPage;
      }
    });
  }, [searchResults]);

  useEffect(() => {
    if (number === 1) {
      setPageNumber(previousPageCount);
    };
  }, [number]);

  const results = filteredResults
    .slice(pagesVisited, pagesVisited + resultsPerPage)
    .map(item => <Item key={item.song_id} item={item} elements={elements} refresh={data} />)

  const pageCount = Math.ceil(filteredResults.length / resultsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    setPreviousPageCount(selected);
  };

  let content;

  if (results && results.length && loaded === true) {
    content = results;
  } else if (results && loaded === false) {
    content = <article><p>{loadingText}</p></article>;
  } else if (!(results && results.length) && loaded === true) {
    content = <article><p>Brak utworów. Zapraszam do <a href="#">propozycji</a></p></article>
  }

  return (
    <>
      <div className="grid-cols-3">{content}</div>
      {filteredResults.length !== 0 && (
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousClassName={"pagination__prev"}
        nextClassName={"pagination__next"}
        activeClassName={"pagination__active"}
        disabledClassName={"pagination__disabled"}
        initialPage={previousPageCount}  
      />
    )}
    </>
  )
}

export default ListPage;
