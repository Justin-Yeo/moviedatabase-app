import React, {useState} from 'react'; 
import axios from 'axios'

import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup';


function App() {
  const [state, setState] = useState({
    results : [], 
    selected: {}
  });
  const apirul = "http://www.omdbapi.com/?apikey=ce17eac6";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apirul + "&s=" + state.s).then(({data}) => {
        let results = data.Search; 

        setState(prevState => {
          return {...prevState, results: results}
        })
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value; 

    setState(prevState => {
      return {...prevState, s: s}
    }); 
  }

  const openPopup = id => {
    axios(apirul + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  
  const closePopup = () => {
    setState(prevState => {
      return  {...prevState, selected: {}}
    }); 
  }

  return (
    <div className="App">
      <header>
        <h1>Movie App</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup}/>
        
        {/* // if there is no title then we do not show popup */} 
        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
