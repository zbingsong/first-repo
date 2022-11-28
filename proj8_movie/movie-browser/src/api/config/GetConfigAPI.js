// Get the base URL for images and allowed size of movie posters
import API_KEY from '../APIKey.js';


export default async function getConfig() {
    const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`);

    if (!response.ok) {
        alert('Failed to fetch genre list.');
        return { base_url: '', poster_size: '' };
    }

    const data = await response.json();
    const baseUrl = data.images.base_url;
    const posterSizes = data.images.poster_sizes;
    // console.log(posterSizes);

    return {
        baseUrl: baseUrl,
        posterSize: posterSizes[posterSizes.length-3],
    };
}
