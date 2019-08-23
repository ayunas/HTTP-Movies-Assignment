import React from 'react';
import axios from 'axios';


export function AddMovie(props) {
    const [newMovie, setNewMovie] = React.useState({title : null, director: null, metascore : null, stars : []});
    const [stars, setStars] = React.useState(3);
    function handleChange(e) {
        console.log("handleChange triggered", e.target);
        setNewMovie({...newMovie, [e.target.name] : e.target.value})
    }

    function handleStars(e) {
        console.log('stars input handleStars: ', e.target.placeholder);
        const newStars = [...newMovie.stars];
        const starIndex = e.target.placeholder.slice(e.target.placeholder.length-1); //get the index of the star from the inputs. stored as the last character in the string value of the placeholder prop
        newStars[starIndex] = e.target.value;
        setNewMovie({...newMovie, stars : newStars});
        //dynamically rendering inputs for the # of stars in the array.  using the placeholder to grab the index value to use it to update the stars array in the state variable newMovie.
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('new movie ', newMovie)
        axios.post(`http://localhost:5000/api/movies/`, newMovie)
        .then(res => {
            console.log(res);
            props.history.push('/');
        })
        .catch(err => console.log(err))
    }

    function handleSelect(e) {
        console.log(e.target.value);
        setStars(e.target.value);
    }

    function starInputs() {
        const inputArr = []
        for (let i=0; i<stars; i++) {
            inputArr.push(<input key={i} onChange={handleStars} placeholder={i} name="star" value={newMovie.stars[i]}/>)
            inputArr.push(<br/>);
        }
        console.log(inputArr, 'inputArr');
        return inputArr;
    }

    return (
    <form onSubmit={handleSubmit}>
        <input onChange={handleChange}placeholder="title" name="title" value={newMovie.title}/><br/>
        <input onChange={handleChange}placeholder="director" name="director" value={newMovie.director}/> <br/>
        <input onChange={handleChange}placeholder="metascore" name="metascore" value={newMovie.metascore}/><br/>
        <label># of stars </label>
        <select onChange={handleSelect} name="star-count">
            <option value="1">one</option>
            <option value="2">two</option>
            <option selected value="3">three</option>
            <option value="4">four</option>
            <option value="5">five</option>
        </select><br/>
        {starInputs()}
        <button>Submit</button>
    </form>
    )
}

