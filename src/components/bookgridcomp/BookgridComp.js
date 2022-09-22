import classes from './BookgridComp.module.scss'
const BookgridComp = (props) => {
    return (
        <ul className={classes['bookgrid']}>
            {props.children}
        </ul>
    )
}

export default BookgridComp