import API_KEY from '../APIKey.js';
import getMovies from './SearchBaseAPI.js';


export default async function searchForMoviesAsync(title, page) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}&page=${page}`;
    const response = await getMovies(url, page);
    return response;
}
