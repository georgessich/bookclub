import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BookgridComp from "../components/bookgridcomp/BookgridComp";
import Book from "../bookgrid/Book";
import classes from './AuthorPage.module.scss'
import QueryResult from "../components/QueryResult";

const AuthorPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

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
  let params = useParams();
  let author = params.authorname;
  console.log(author)
  const book = books?.filter((books) => books.author === author);
  console.log(book)
  return (
    <QueryResult loading={isLoading} error={httpError} data={book}>
    <div className={classes["authorpage"]}>
      <div className={classes["authorpage-wrapper"]}>
      <BookgridComp>
        <span className={classes["authorpage-title"]}>
          Автор: {author}
        </span>
        {book?.map((book) => (
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
    </div>
    </QueryResult>
  );
};

export default AuthorPage;
