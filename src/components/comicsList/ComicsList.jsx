import { useState, useEffect, useRef} from 'react';
import { useHttp } from '../../hooks/http.hook';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended = true;
        }

        setComicsList( [...comicsList, ...newComicsList]);
        setNewComicsLoading( false);
        setOffset( offset + 8);
        setComicsEnded( ended);
    }

    function renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className={"comics__item"}
                    key={item.id}
                    >
                        
                        {/* <img src={item.thumbnail} alt={item.name} style={imgStyle}/> */}
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                        {/* <div className="comics__name">{item.name}</div> */}
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}    
            </ul>
        )
    }

        const items = renderItems(comicsList);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newComicsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newComicsLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;