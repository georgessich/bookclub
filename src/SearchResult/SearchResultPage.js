import React, { useContext, useEffect, useState} from "react";
import { SearchContext } from "../store/search-context";
import Book from "../bookgrid/Book";

import classes from "./SearchResultPage.module.scss";
import BookgridComp from "../components/bookgridcomp/BookgridComp";
import NoResult from "../components/noresult/NoResult";
import MiniSearch from 'minisearch';
import QueryResult from "../components/QueryResult";

const SearchResultPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [filteredBooks, setFilteredBooks] = useState([])
  const searchContext = useContext(SearchContext);
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch (`https://rhythm200-7b353-default-rtdb.europe-west1.firebasedatabase.app/books.json`)
      if(!response.ok) {
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json();
  
      const loadedBooks = [];
  
      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          author: responseData[key].author,
          cover: responseData[key].cover,
          title: responseData[key].title,
          description: responseData[key].description
        })
      }
      setBooks(loadedBooks);
      setIsLoading(false);
    }
    fetchBooks().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    })
    let miniSearch = new MiniSearch ({
      fields: ['title', 'author'],
      storeFields: ['title', 'description', 'cover', 'author']
    })
    miniSearch.addAll(books)
  let filteredBooks = miniSearch.search(searchContext.searchQuery)
  setFilteredBooks(filteredBooks);
  }, [books, searchContext.searchQuery])
 
  return (
    <QueryResult loading={isLoading} error={httpError} data={books}>
    <div className={classes["searchpage"]}>
      {filteredBooks.length === 0 || searchContext === "" ? (
        <NoResult />
      ) : (
        <div className={classes["searchpage-wrapper"]}>
          <BookgridComp>
            <span className={classes["searchpage-title"]}>
              Результаты поиска: {filteredBooks.length}
            </span>
            {filteredBooks.map((book) => (
              <Book
                key={book.id}
                id={book.id}
                author={book.author}
                title={book.title}
                cover={book.cover}
              />
            ))}
          </BookgridComp>
        </div>
      )}
    </div>
    </QueryResult>
  );
};

export default SearchResultPage;
