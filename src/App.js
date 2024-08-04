import React, {useState} from 'react'; 
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'


function App() {
  const [state, setState] = useState({
    results : [], 
    selected: {}
  });
  const apirul = "http://www.omdbapi.com/?i=tt3896198&apikey=ce17eac6"

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

  return (
    <div className="App">
      <header>
        <h1>Movie App</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} />
      </main>
    </div>
  );
}

export default App;
