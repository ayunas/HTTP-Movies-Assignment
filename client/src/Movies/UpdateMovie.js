import React, {useState, useEffect} from 'react';
import axios from 'axios';

export function UpdateMovie(props) {

    const [movieToEdit, setMovieToEdit] = useState();
    
    useEffect( () => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res =>{ 
            console.log(res);
            setMovieToEdit(res.data);
        })
        .catch(err => console.log(err))
    }, [props.match.params.id])

    function handleChange(e) {
        console.log("handleChange triggered", e.target);
        setMovieToEdit({...movieToEdit, [e.target.name] : e.target.value})
    }

    function handleStars(e) {
        console.log('stars input handleStars: ', e.target.placeholder);
        const newStars = [...movieToEdit.stars];
        const starIndex = e.target.placeholder.slice(e.target.placeholder.length-1); //get the index of the star from the inputs
        newStars[starIndex] = e.target.value;
        setMovieToEdit({...movieToEdit, stars : newStars});
    }

    if (!movieToEdit) {
        return <div>Loading</div>
    }
    return (
        <form>
            <input onChange={handleChange}placeholder="title" name="title" value={movieToEdit.title}/><br/>
            <input onChange={handleChange}placeholder="director" name="director" value={movieToEdit.director}/> <br/>
            <input onChange={handleChange}placeholder="metascore" name="metascore" value={movieToEdit.metascore}/><br/>
            {movieToEdit.stars.map( (star,i) => <><input key={i} onChange={handleStars} placeholder={`star-${i}`} name="star" value={star}/><br/></>)}
        </form>
    )
}