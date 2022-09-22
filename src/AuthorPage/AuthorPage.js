import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import BookgridComp from "../components/bookgridcomp/BookgridComp";
import Book from "../bookgrid/Book";
import classes from './AuthorPage.module.scss'
import QueryResult from "../components/QueryResult";
const BOOKS = gql`
  query Query {
    bookCards {
      id
      title
      cover
      description
      author
    }
  }
`;

const AuthorPage = () => {
  const { loading, error, data } = useQuery(BOOKS);
  let params = useParams();
  let author = params.authorname;
  const book = data.bookCards.filter((books) => books.author === author);
  return (
    <QueryResult loading={loading} error={error} data={data}>
    <div className={classes["authorpage"]}>
      <div className={classes["authorpage-wrapper"]}>
      <BookgridComp>
        <span className={classes["authorpage-title"]}>
          Автор: {author}
        </span>
        {book.map((book) => (
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
