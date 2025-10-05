import { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecipes = async (query) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();

      if (data.meals) {
        setRecipes(data.meals);
        setError(null);
      } else {
        setRecipes([]);
        setError("No recipes found.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-center text-3xl font-bold py-6 text-blue-700">
        🍽️ Recipe Finder
      </h1>

      <SearchBar onSearch={fetchRecipes} />

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default App;
