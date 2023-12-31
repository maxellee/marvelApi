import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
// import Skeleton from '../components/skeleton/Skeleton';
import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch(process){
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    
    const {loading, error, getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const itemRefs = useRef([]);
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => (item.classList.remove('char__item_selected')))
        // console.log(this.itemRefs.forEach(item => (item.classList.remove('char__item_selected'))))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        // В реакті 18 колбек не потрібен
        setCharList( [...charList, ...newCharList]);
        setNewItemLoading( false);
        setOffset( offset + 9);
        setCharEnded( ended);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className={"char__item"}
                    key={item.id}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => 
                        {
                            props.onCharSelected(item.id)
                            focusOnItem(i)
                        }}
                        onKeyPress={(e) => {
                            if(e.key === ' ' || e.key === "Enter"){
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}
                    >
                        
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // конструкція винесена для центрування спіннера/помилки
        return (
            <ul className="char__grid">
                {items}
     
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading);
    }, [process]);

    return (        
        <div className="char__list">
            {elements}
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;