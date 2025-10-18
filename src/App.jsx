import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setRecipes([]);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>🍲 Recipe Finder</h1>

      <form onSubmit={searchRecipes}>
        <input
          type="text"
          placeholder="Search for a recipe (e.g. chicken)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading recipes...</p>}

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.idMeal}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h2>{recipe.strMeal}</h2>
              <p><strong>Category:</strong> {recipe.strCategory}</p>
              <a
                href={recipe.strSource || recipe.strYoutube}
                target="_blank"
                rel="noreferrer"
              >
                View Full Recipe
              </a>
            </div>
          ))
        ) : (
          !loading && <p>No recipes found. Try another ingredient.</p>
        )}
      </div>
    </div>
  );
}

export default App;
