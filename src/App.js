import React,{useEffect,useState} from 'react';
import Recipe from "./Recipe";
import './App.css';

const App= () => {

  const appID= "36269b35";
  const appKey= "a21c001699c98f68ccc08d18b117578f";



  const [recipes,setrecipe] = useState([]);
  const [search, setSearch]=useState("");
  const [query,setQuery]=useState('fish');
  
 

  const getrecipe = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}`);
    const data = await response.json();
    console.log(data);
    setrecipe(data.hits);
  }

  const updateSearch= e => {
    setSearch(e.target.value);

  }

  const getSearch= e =>{
    e.preventDefault();
    setQuery(search);
    setSearch("");

  }


  useEffect(() => {
    getrecipe();
  }, [query] );


  return(
    
    <div className="App">
      
      <form onSubmit={getSearch} className="search-form">
        <input 
        className="search-bar" 
        type="text" 
        value={search} 
        onChange={updateSearch}
        />
        <button className="search-button" type="submit">Search</button>
       
      </form>

      <div className="recipes">

      {recipes.map(recipe=> (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
       ))}

</div>

    </div>
  );
} ;

export default App;
