import API_KEY from './APIKey.js';


export default async function searchForMoviesAsync(title, page) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}&page=${page}`);

    if (!response.ok) {
        alert('Failed to fetch result list.');
        return { movies: [], ifMoreAvailable: true };
    }

    const data = await response.json();

    const results = data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        rating: movie.vote_average,
        genre: movie.genre_ids,
    }));

    const ifMoreAvailable = (page <= parseInt(data.total_pages));
    return { movies: results, ifMoreAvailable: ifMoreAvailable };
}
