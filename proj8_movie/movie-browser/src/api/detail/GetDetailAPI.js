import API_KEY from '../APIKey.js';


export default async function getMovieDetailAsync(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    if (!response.ok) {
        alert('Failed to fetch movie info.');
        return null;
    }

    const data = await response.json();
    return {
        title: data.title,
        tagline: data.tagline,
        genres: data.genres.map(item => item.id),
        imdbId: data.imdb_id,
        plot: data.overview,
        poster: data.poster_path,
        popularity: data.popularity,
        rating: data.vote_average,
        ratingCount: data.vote_count,
        length: data.runtime,
        release: data.release_date,
        homepage: data.homepage,
    };
}
