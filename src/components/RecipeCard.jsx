export default function RecipeCard({ meal }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
        <p className="text-sm text-gray-500">
          {meal.strCategory} | {meal.strArea}
        </p>
      </div>
    </div>
  );
}
