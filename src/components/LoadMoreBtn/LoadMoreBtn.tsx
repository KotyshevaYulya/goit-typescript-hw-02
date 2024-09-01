import { FC } from "react";
import css from "./LoadMoreBtn.module.css"

interface LoadMoreBtn {
    loadMore: () => void;
    isLastPage: boolean;
}

const LoadMoreBtn : FC <LoadMoreBtn> = ({ loadMore, isLastPage }) => {
    return (
        <div className={css.loadMore}>
            <button onClick={loadMore} disabled={isLastPage}>Load more</button>
        </div>
    )
}

export default LoadMoreBtn;