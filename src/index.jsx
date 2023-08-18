import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
// import MarvelService from './services/MarvelService';

import './style/style.scss';

// const marvelService = new MarvelService();

// marvelService.getAllCharacters().then(res => console.log(res));
// marvelService.getCharacter(1011052).then(res => console.log(res));

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
);

