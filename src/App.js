import './App.css';
import {  useState, useRef } from 'react';
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'
import Greetings from './Components/Greetings/Greetings';

function App() {

  const refer = useRef(null);

  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(false)

  let time_of_day;
  let date = new Date();
  if(date.getHours() >= 12){
    time_of_day = "PM"
  }else{
    time_of_day = "AM"
  }



  const getMovie = (e) => {
    e.preventDefault();
    let currentValue = refer.current.value.trim();

    if(currentValue.length !== 0){
      setLoading(true)

      axios.get(`http://www.omdbapi.com/?s=${currentValue}&apikey=283b9738`).then((feedback) => {
        console.log(feedback)
        setMovie(feedback.data.Search)
        setLoading(false)
      })
    }

  }

  function loadMovie(index){
    console.log(movie[index])

    let single_movie = []
    single_movie.push(movie[index])

    setMovie(single_movie)
    
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Movie App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            
        </ul>
        <form className="d-flex">
          <Greetings whatever={time_of_day} another='hello'/>
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={refer}/>
          <button className="btn btn-outline-success" type="button" onClick={getMovie}>Search</button>
        </form>
        </div>
        </div>
      </nav>
      
      <div className='container my-3' >
        {loading ? <ReactBootStrap.Spinner animation="border" style={{marginLeft: "45%"}}/>: <div></div>}
        {movie ? <div className='row'>
          {
            movie.map((value, index) => {
              console.log("All movies: ", movie)
              return (
              <div className='col-3'key={index}>
                <div className="card image-container" style={{width: "18rem"}}>
                  <img src={value.Poster} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h3 className="card-title">{value.Year}</h3>
                    <h4 className="card-text"> {value.Title} </h4>
                    <button onClick={() => loadMovie(index)}>More</button>
                    <button >Add to Collections</button>
                  </div>
                </div>
              </div>
              )
            })
          }
        </div>: <div style={{color: 'red' }}>No Search result</div>}
      </div>

    </>
  );
}

export default App;
