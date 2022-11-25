const API_KEY = '1a5689e1';

export default async function searchForMoviesAsync(title, year, page) {
    // console.log(title);
    let response = null;
    if (year !== '') {
        response = await fetch(`https://www.omdbapi.com/?s=${title}&y=${year}&apikey=${API_KEY}&r=json`);
    } else {
        response = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}&r=json`);
    }

    if (!response.ok) {
        alert('Failed to fetch result list.');
        return [];
    }

    const data = await response.json();
    if (data.Response === 'False') {
        // do something when no movie is found
        return [];
    }
    return data.Search;
}
