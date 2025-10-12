import { useState } from "react";
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";

export default function RecipeFinder() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setError("No recipes found. Try another search term!");
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-blue-700 pt-8">
        🍳 Recipe Finder
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <p className="text-center text-gray-500">Loading recipes...</p>
      )}

      {error && (
        <p className="text-center text-red-600 font-medium">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} onClick={setSelectedMeal} />
        ))}
      </div>

      {/* Modal Section */}
      {selectedMeal && (
        <RecipeModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
}
