import Book from "./Book";
import { useState, useEffect } from 'react';
import QueryResult from "../components/QueryResult";
import BookgridComp from "../components/bookgridcomp/BookgridComp";
import classes from "./Bookgrid.module.scss"
const Bookgrid = () => {
const [ books, setBooks ] = useState([]);
const [ isLoading, setIsLoading ] = useState(true);
const [ httpError, setHttpError ] = useState();


useEffect (() => {
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
}, [])
console.log(books)
  return (

    <QueryResult error={httpError} loading={isLoading} data={books}>
    <div className={classes['bookgrid']}>
      <BookgridComp>
      
          {books?.map((book) => (
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
    </QueryResult>


  );
};

export default Bookgrid;
