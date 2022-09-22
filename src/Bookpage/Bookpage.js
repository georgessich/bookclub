import { useParams } from "react-router-dom"
import { useQuery, gql } from "@apollo/client";
import Bookcard from "./Bookcard"
import classes from './Bookpage.module.scss'
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

const Bookpage = () => {
    const {loading, error, data} = useQuery(BOOKS);
    let params = useParams()
    let bookId = params.bookId
    const book = data.bookCards.find(books => books.id === bookId)
    console.log({book})
    return(
      <QueryResult loading={loading} error={error} data={data}>
        <div className={classes['bookpage']}>
            <Bookcard title={book.title} author={book.author} cover={book.cover} description={book.description}/>
        </div>
        </QueryResult>
    )
}

export default Bookpage;