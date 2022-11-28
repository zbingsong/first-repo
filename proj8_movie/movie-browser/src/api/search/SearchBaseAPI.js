export default async function getMoviesAsync(url, page) {
    const response = await fetch(url);

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
