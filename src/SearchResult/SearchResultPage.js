import React, { useContext, useEffect, useState} from "react";
import { SearchContext } from "../store/search-context";
import Book from "../bookgrid/Book";
import { useQuery, gql } from "@apollo/client";
import classes from "./SearchResultPage.module.scss";
import BookgridComp from "../components/bookgridcomp/BookgridComp";
import NoResult from "../components/noresult/NoResult";
import MiniSearch from 'minisearch';
import QueryResult from "../components/QueryResult";
const BOOKS = gql`
  query Query {
    bookCards {
      id
      title
      description
      cover
      author
    }
  }
`;
const SearchResultPage = () => {
  const [filteredBooks, setFilteredBooks] = useState([])
  const { loading, error, data } = useQuery(BOOKS);
  const searchContext = useContext(SearchContext);
  useEffect(() => {
    let miniSearch = new MiniSearch ({
      fields: ['title', 'author'],
      storeFields: ['title', 'description', 'cover', 'author']
    })
    miniSearch.addAll(data.bookCards)
  let filteredBooks = miniSearch.search(searchContext.searchQuery)
  setFilteredBooks(filteredBooks);
  }, [data.bookCards, searchContext.searchQuery])
 
  return (
    <QueryResult loading={loading} error={error} data={data}>
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
