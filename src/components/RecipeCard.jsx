export default function RecipeCard({ meal, onClick }) {
  return (
    <div
      onClick={() => onClick(meal)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden"
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{meal.strMeal}</h2>
        <p className="text-sm text-gray-500">
          {meal.strCategory} | {meal.strArea}
        </p>
      </div>
    </div>
  );
}
