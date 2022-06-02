import './App.css';
import {  useState, useRef } from 'react';
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'




 


function App() {

  const refer = useRef(null);

  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(false)

  //get cart items from localStorage
  let collectionStorage = localStorage.getItem("collection-storage");

  if(collectionStorage == null){
    collectionStorage = [];
  }else{
    collectionStorage = JSON.parse(collectionStorage);
  }

  const [currentCollection, setCollection] = useState(collectionStorage);
  const [currentTracker, setTracker ] = useState(0);




  const getMovie = (e) => {
    e.preventDefault();
    let currentValue = refer.current.value.trim();

    if(currentValue.length !== 0){
      setLoading(true)

      axios.get(`http://www.omdbapi.com/?s=${currentValue}&apikey=283b9738`).then((feedback) => {
        // console.log(feedback)
        setMovie(feedback.data.Search)
        setLoading(false)
      })
    }

  }

  function loadMovie(index){
    // console.log(movie[index])

    let single_movie = []
    single_movie.push(movie[index])

    setMovie(single_movie)
    
  }

  // let localStorePush
  // let cartMovie = []
  // function cartClick(index){
  //   console.log(movie[index])
  //   /// console.log(cartMovie.push(movie[index]))
  //   localStorePush = cartMovie.push(movie[index])
  //  localStorePush = localStorage.setItem('carter', JSON.stringify(cartMovie))
  
  // }

  function loadCart (index){
    
    
  }

  function addToCollection(index){
      //add this movie to collection
      if(currentCollection.length == 0){
        //there is nothing in the collection

        const collectionStorage = [];
        collectionStorage.push(movie[index]);

        localStorage.setItem("collection-storage", JSON.stringify(collectionStorage));
        
        setCollection(collectionStorage);

        

        //save the collection to localStorage
        
      }else{
        const collectionStorage = JSON.parse(localStorage.getItem("collection-storage"));

        //check if this movie has been added already..

        collectionStorage.push(movie[index]);

        localStorage.setItem("collection-storage", JSON.stringify(collectionStorage));

        setCollection(collectionStorage);


        

      }


  }




  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Movie Search App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#"></a>
          </li>
            <li className="nav-item">
              <a className="nav-link" href="#"></a>
            </li>
            
        </ul>
        
        <div className='cart' onClick={() => loadCart()}>
          <span><i className="fas fa-cart-plus"></i><sup><small> {currentCollection.length}</small></sup></span>
        </div>
        <form className="d-flex">
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
              //check the localStorage
              collectionStorage = localStorage.getItem("collection-storage");
              let addOrRemoveBtn;
              if(collectionStorage == null){
                  //there is nothing in the collection
                  addOrRemoveBtn = <button className='m-2 butt' onClick={() => addToCollection(index)}>Add to Collections</button>
              }else{
                collectionStorage = JSON.parse(collectionStorage);
                const matchesFound = [];
                for(let i = 0; i < collectionStorage.length; i++){
                    if(collectionStorage[i]['imdbID'] == value.imdbID ){
                      //we have found a match
                      matchesFound.push(value);
                    }

                }

                if(matchesFound.length > 0){
                  addOrRemoveBtn = <button className='m-2 butt'>Remove from Collections</button>
                }else{
                  addOrRemoveBtn = <button className='m-2 butt' onClick={() => addToCollection(index)}>Add to Collections</button>
                }

              }



              return (
              <div className='col-3'key={index}>
                <div className="card image-container" style={{width: "18rem"}}>
                  <img src={value.Poster} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h3 className="card-title">{value.Year}</h3>
                    <h4 className="card-text"> {value.Title} </h4>
                    <button onClick={() => loadMovie(index)} className='butt'>More</button>
                    {addOrRemoveBtn}
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
