import classes from './Book.module.scss';
import { Link } from 'react-router-dom';
const Book = (props) => {
    return(
        <li style={{listStyle: "none"}}>
            <Link to={`/books/${props.id}`}>
            <div className={classes['bookcard']}>
            <img className={classes['bookcard-cover']} src={props.cover} alt={props.title}/>
            <span className={classes['bookcard-title']}>{props.title}</span>
            <span className={classes['bookcard-author']}>{props.author}</span>
            </div>
            </Link>
        </li>
    )
}

export default Book;