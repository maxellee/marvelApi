import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharList from "../charList/CharList";
import PropTypes from 'prop-types';
import decoration from '../../resources/img/vision.png';
import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";

const App = () => {

    const [selectedChar, setChar] = useState(null);
    
    const onCharSelected = (id) => {
            setChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}
App.propTypes = {
    onCharSelected: PropTypes.number.isRequired
}

export default App;