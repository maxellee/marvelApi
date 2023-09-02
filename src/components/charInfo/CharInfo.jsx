import { useState, useEffect } from 'react';

import PropTypes from   'prop-types';
import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import Skeleton from '../skeleton/Skeleton';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
    // state = {
    //     char: null,
    //     loading: false,
    //     error: false,
    // }

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelService();

    // componentDidMount(){
    //     this.updateChar();
    // }

    useEffect(() => {
        updateChar();
    }, [props.charId])

    // componentDidUpdate(prevProps, prevState){
    //     if (this.props.charId !== prevProps.charId){
    //         this.updateChar();
    //     }
    // }


    const updateChar = () => {
        const {charId} = props;
        if(!charId){
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));

    }
    
    const onCharLoaded = (char) => {
        // this.setState({
        //     char, 
        //     loading: false,
        // })

        setChar(char);
    }

    // const setContent = (process, char) => {
    //     switch(process){
    //         case 'waiting':
    //             return <Skeleton/>;
    //             break;
    //         case 'loading':
    //             return <Spinner/>;
    //             break;
    //         case 'confirmed':
    //             return <View char={char}/>;
    //             break;
    //         case 'error':
    //             return <ErrorMessage/>;
    //         default:
    //             throw new Error('Unexpected process state');
    //     }
    // }

        // const skeleton = char || loading || error ? null : <Skeleton/>;
        // const errorMessage = error ? <ErrorMessage/> : null;
        // const spinner = loading ? <Spinner/> : null;
        // const content = !(loading || error || !char) ? <View char={char}/> : null;
        

        return (
            <div className="char__info">
                {/* {skeleton}
                {errorMessage}
                {spinner}
                {content} */}
                {setContent(process, View, char)}
            </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    let imgStyle = {'objectFit' : 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit' : 'contain'}
    }

    return (
        <>
        <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Comics not found'}
                {
                    // eslint-disable-next-line
                    comics.map((item, i) => {
                        if(i < 6){
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        }
                    }) 
                }
                
                
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}
export default CharInfo;