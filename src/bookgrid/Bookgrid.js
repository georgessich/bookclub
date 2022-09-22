import Book from "./Book";
import { useQuery, gql } from "@apollo/client";
import QueryResult from "../components/QueryResult";
import BookgridComp from "../components/bookgridcomp/BookgridComp";
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
const Bookgrid = () => {
  const { loading, error, data } = useQuery(BOOKS);
  // console.log(data.bookCards);
  return (
    <QueryResult error={error} loading={loading} data={data}>
    <div style={{position: "absolute", right:"0", top: "10%"}}>
      <BookgridComp>
      
          {data?.bookCards?.map((book) => (
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
