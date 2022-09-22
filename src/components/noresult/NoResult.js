import classes from './NoResult.module.scss'
const NoResult = () => {
    return (
        <div className={classes['noresult']}>
            <span className={classes['noresult-title']}>По вашему запросу ничего не найдено ;(</span>
        </div>
    )
}

export default NoResult;