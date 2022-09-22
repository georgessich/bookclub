import { Link } from "react-router-dom";
import classes from "./header.module.scss";
import SearchInput from "./components/searchInput/SearchInput";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes['header-wrapper']}>
        <Link to="/">
          <h1 className={classes["header-title"]}>РИТМ 200</h1>
        </Link>
        <SearchInput/>
      </div>
    </div>
  );
};
export default Header;
