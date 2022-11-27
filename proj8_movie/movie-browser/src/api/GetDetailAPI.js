import API_KEY from './APIKey.js';


export default async function findMoviesAsync(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    if (!response.ok) {
        alert('Failed to fetch movie info.');
        return null;
    }

    const data = await response.json();
    return data;
}
