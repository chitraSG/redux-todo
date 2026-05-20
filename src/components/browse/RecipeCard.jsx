import { useDispatch } from "react-redux";
import { addItem } from "../../features/cart/cartSlice";

function RecipeCard({ recipe }) {
  const dispatch = useDispatch();

  return (
    <article className="recipe-card">
      <div
        className="recipe-card__image-wrap"
        style={{ backgroundImage: `url(${recipe.image})` }}
      >
        <span className="recipe-card__badge">{recipe.badge}</span>
      </div>
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{recipe.title}</h3>
        <div className="recipe-card__meta">
          <span className="recipe-card__rating" aria-label={`Rating ${recipe.rating} out of 5`}>
            ★ {recipe.rating}
          </span>
          <span className="recipe-card__time">{recipe.minutes} min</span>
        </div>
        <button
          type="button"
          className="recipe-card__add-cart"
          onClick={() => dispatch(addItem(recipe))}
        >
          Add to cart
        </button>
        <div className="recipe-card__actions">
          <button type="button" className="recipe-card__icon-btn" aria-label="Save recipe">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21s-7-4.35-7-10a4.5 4.5 0 017-3 4.5 4.5 0 017 3c0 5.65-7 10-7 10z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button type="button" className="recipe-card__icon-btn" aria-label="Comments">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 9.5h7M8.5 13h4.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
