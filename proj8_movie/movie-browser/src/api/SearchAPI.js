const API_KEY = '1a5689e1';

export default async function searchForMoviesAsync(title, year, page) {
    let response = null;
    if (year !== '') {
        response = await fetch(`https://www.omdbapi.com/?s=${title}&y=${year}&page=${page}&apikey=${API_KEY}&r=json`);
    } else {
        response = await fetch(`https://www.omdbapi.com/?s=${title}&page=${page}&apikey=${API_KEY}&r=json`);
    }

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