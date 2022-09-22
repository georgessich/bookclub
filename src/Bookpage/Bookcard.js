import classes from "./Bookcard.module.scss";
import { Link } from "react-router-dom";
const Bookcard = (props) => {
  return (
    <div className={classes["bookcard"]}>
      <div className={classes['bookcard-wrap']}>
        <img
          src={props.cover}
          alt={props.title}
          className={classes["bookcard-cover"]}
        />
        <div className={classes["bookcard-info"]}>
          <div className={classes["bookcard-info__title"]}>{props.title}</div>
          <Link to={`/author/${props.author}`}><div className={classes["bookcard-info__author"]}>{props.author}</div></Link>
          <div className={classes["bookcard-info__descr"]}>
            {props.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookcard;
