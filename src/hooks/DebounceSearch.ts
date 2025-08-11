import { ArticleQuery } from '@/types/articleTypes';
import { Dispatch, SetStateAction, useEffect } from 'react';

// type SetArticleParamFn = React.Dispatch<React.SetStateAction<{ title: string; page: number }>>;

export function DebounceSearch(
    searchTerm: string,
    setArticleParam: Dispatch<SetStateAction<ArticleQuery>>,
    delay = 500
) {
    useEffect(() => {
        const handler = setTimeout(() => {
            setArticleParam((prev) => ({
                ...prev,
                title: searchTerm,
                page: 1,
            }));
        }, delay);

        return () => clearTimeout(handler);
    }, [searchTerm, setArticleParam, delay]);
}
