import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Bookcard from "./Bookcard";
import classes from "./Bookpage.module.scss";
import QueryResult from "../components/QueryResult";

const Bookpage = () => {
  let params = useParams();
  let bookId = params.bookId;
  console.log(bookId)
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://rhythm200-7b353-default-rtdb.europe-west1.firebasedatabase.app/books/b${bookId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
     
      const loadedBook = responseData;

     
      setBook(loadedBook);
      setIsLoading(false);
    };
    fetchBooks().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [bookId]);


  return (
    <QueryResult loading={isLoading} error={httpError} data={book}>
      <div className={classes["bookpage"]}>
        <Bookcard
          title={book.title}
          author={book.author}
          cover={book.cover}
          description={book.description}
          downloadLink={book.downloadLink}
        />
      </div>
    </QueryResult>
  );
};

export default Bookpage;
