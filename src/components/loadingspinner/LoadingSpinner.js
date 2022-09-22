import classes from './LoadingSpinner.module.scss'

const LoadingSpinner = () => {
    return (
        <div className={classes['loading-container']}>
            <div className={classes['loading-spinner']}></div>
        </div>
    )
}

export default LoadingSpinner;