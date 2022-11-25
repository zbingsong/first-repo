import { Asset } from 'expo-asset';


const API_KEY = '1a5689e1';

const findMoviesAsync = async (imdbID) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${API_KEY}&r=json`);
    if (!response.ok) {
        alert('Failed to fetch movie info.');
        return null;
    }

    const data = await response.json();
    if (data.Response === 'False') {
        return null;
    }
    return data;
}

// const loadMovieInfo = async (id) => {
//     const result = await findMoviesAsync(id);
//     if (result === null) {
//         return null;
//     }

//     const poster = await Asset.loadAsync(require(result.Poster));
//     result.Poster = poster;
//     return result;
// }

export default findMoviesAsync;
