import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=74e98b24f6b9f6e049cdcb6915b44ba7';
    let _baseOffset = 210;
    // let _comicsOffset = 20;
    

    const getAllCharacters = async (offset = _baseOffset) => {
        // передаємо offset щоб зробити цю функцію більш гнучкою. 
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_tranformComics);
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description === '' ? char.description = 'Description not found' : char.description.length > 220 ? char.description.slice(0, 216) + '...' : char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    const _tranformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price > 0 ? comics.prices[0].price : 'Not available',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,  
            // description: comics.description === '' ? comics.description = 'Description not found' : comics.description.length > 220 ? comics.description.slice(0, 216) + '...' : comics.description,
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics};
}

export default useMarvelService;
// Клас створений для роботи і запитів до API
// клас не наслідує реакт компонентів так як нам не потрібен ніякий функціонал реакту, лише чистий js
