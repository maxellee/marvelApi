import { useParams, Link} from 'react-router-dom';
import { useState, useEffect} from 'react';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

import './singlePage.scss';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {process, setProcess, clearError, getComic, getCharacter} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id])


    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }
    
    const onCharLoaded = (data) => {
        setData(data);
    }

        // const errorMessage = error ? <ErrorMessage/> : null;
        // const spinner = loading ? <Spinner/> : null;
        // const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {/* {errorMessage}
            {spinner}
            {content} */}
            {setContent(process, Component, data)}
        </>
    )
}

// const View = ({data}) => {
//     const {title, description, language, pageCount, price, thumbnail} = data;

//     return (
//         <div className="single-comic">
//             <img src={thumbnail} alt={title} className="single-comic__img"/>
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount}</p>
//                 <p className="single-comic__descr">{language}</p>
//                 <div className="single-comic__price">{`${price}$`}</div>
//             </div>
//             <Link to='/comics' className="single-comic__back">Back to all</Link>
//         </div>
//     )
// }

export default SinglePage;