import API_KEY from '../APIKey.js';


export default async function getGenreList() {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);

    const genres = {};

    if (response.ok) {
        const data = await response.json();
        data.genres.forEach(genre => {
            genres[genre.id] = genre.name
        });
    } else {
        alert('Failed to fetch genre list.');
    }

    return genres;
}
