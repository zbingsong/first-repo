import API_KEY from '../APIKey.js';
import getMoviesAsync from './SearchBaseAPI.js';


export default async function getTrendingAsync(page) {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`;
    const response = await getMoviesAsync(url, page);
    return response;
}
