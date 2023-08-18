import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharList from "../charList/CharList";
import RandomChar from "../randomChar/RandomChar";
import AppHeader from "../appHeader/AppHeader";
import ComicsList from "../comicsList/ComicsList";
import PropTypes from 'prop-types';
import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const App = () => {

    const [selectedChar, setChar] = useState(null);
    
    const onCharSelected = (id) => {
            setChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div> */}
                {/* <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <ComicsList/>
            </main>
        </div>
    )
}
App.propTypes = {
    onCharSelected: PropTypes.number.isRequired
}

export default App;