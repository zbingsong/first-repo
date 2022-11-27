// Get the base URL for images and allowed size of movie posters
import API_KEY from './APIKey.js';


export default async function getConfig() {
    const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`);

    if (!response.ok) {
        alert('Failed to fetch genre list.');
        return { base_url: '', poster_size: '' };
    }

    const data = await response.json();
    return { base_url: data.base_url, poster_size: data.poster_sizes.at(-2) };
}
