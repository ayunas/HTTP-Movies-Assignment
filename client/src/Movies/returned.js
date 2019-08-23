import MovieList from "./MovieList";

function handleStar() {

    return function() {
        setMovies({...MovieList })
    }
}

handleStar()() 0 
