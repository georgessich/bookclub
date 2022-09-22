import classes from "./PageNotFound.module.scss";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className={classes['pagenotfound']}>
      <span className={classes['pagenotfound-digits']}>
        404
      </span>
      <span className={classes['pagenotfound-title']}>Страница не найдена</span>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default PageNotFound;