import API_KEY from '../APIKey.js';
import getMoviesAsync from './SearchBaseAPI.js';


export default async function getNowPlayingAsync(page) {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;
    const response = await getMoviesAsync(url, page);
    return response;
}
