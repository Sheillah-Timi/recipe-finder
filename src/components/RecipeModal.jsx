export default function RecipeModal({ meal, onClose }) {
  if (!meal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
        >
          &times;
        </button>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-64 object-cover rounded-t-xl"
        />

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            {meal.strMeal}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {meal.strCategory} | {meal.strArea}
          </p>

          <h3 className="text-lg font-semibold mb-1">🧂 Ingredients:</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .map((i) => {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                return ingredient ? (
                  <li key={i}>
                    {ingredient} – {measure}
                  </li>
                ) : null;
              })
              .filter(Boolean)}
          </ul>

          <h3 className="text-lg font-semibold mb-1">👩🏽‍🍳 Instructions:</h3>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {meal.strInstructions}
          </p>

          {meal.strYoutube && (
            <div className="mt-4">
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                ▶ Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
