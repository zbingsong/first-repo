import API_KEY from '../APIKey.js';


export default async function searchForMoviesAdvAsync(title, page) {
    const response = await fetch(`https://www.omdbapi.com/?s=${title}&page=${page}&apikey=${API_KEY}&r=json`);

    if (!response.ok) {
        alert('Failed to fetch result list.');
        return { movies: [], ifMoreAvailable: true };
    }

    const data = await response.json();
    if (data.Response === 'False') {
        // do something when no movie is found
        return { movies: [], ifMoreAvailable: true };
    }

    const ifMoreAvailable = (page *  10 <= parseInt(data.totalResults));
    return { movies: data.Search, ifMoreAvailable: ifMoreAvailable };
}
