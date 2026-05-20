const DIET = [
  { key: "veggies", label: "Veggies" },
  { key: "dairy", label: "Dairy" },
];

const ALLERGIES = [
  { key: "gluten", label: "Gluten", hint: "Show gluten-free only" },
  { key: "nuts", label: "Lorem", hint: "Show nut-free only" },
];

const CUISINES_BASE = [
  { key: "pakistani", label: "Pakistani" },
  { key: "indian", label: "Indian" },
  { key: "persian", label: "Persian" },
  { key: "british", label: "British" },
  { key: "irish", label: "Irish" },
];

const CUISINES_EXTRA = [
  { key: "italian", label: "Italian" },
  { key: "mexican", label: "Mexican" },
  { key: "thai", label: "Thai" },
];

const GOALS = [
  { key: "weight_loss", label: "Weight Loss" },
  { key: "get_active", label: "Get Active" },
];

function FilterCheckbox({ checked, label, onChange, id }) {
  return (
    <label className="recipe-filters__row" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="recipe-filters__checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="recipe-filters__text">{label}</span>
    </label>
  );
}

function RecipeFilters({ filters, onToggle, cuisinesExpanded, onToggleCuisines }) {
  const cuisineList = cuisinesExpanded ? [...CUISINES_BASE, ...CUISINES_EXTRA] : CUISINES_BASE;

  return (
    <aside className="recipe-filters" aria-labelledby="filters-heading">
      <h2 id="filters-heading" className="recipe-filters__title">
        Filters
      </h2>

      <fieldset className="recipe-filters__group">
        <legend className="recipe-filters__legend">Diet</legend>
        {DIET.map(({ key, label }) => (
          <FilterCheckbox
            key={key}
            id={`diet-${key}`}
            label={label}
            checked={filters.diet.has(key)}
            onChange={(on) => onToggle("diet", key, on)}
          />
        ))}
      </fieldset>

      <fieldset className="recipe-filters__group">
        <legend className="recipe-filters__legend">Allergies</legend>
        {ALLERGIES.map(({ key, label }) => (
          <FilterCheckbox
            key={key}
            id={`allergy-${key}`}
            label={label}
            checked={filters.allergies.has(key)}
            onChange={(on) => onToggle("allergies", key, on)}
          />
        ))}
      </fieldset>

      <fieldset className="recipe-filters__group">
        <legend className="recipe-filters__legend">Cuisines</legend>
        {cuisineList.map(({ key, label }) => (
          <FilterCheckbox
            key={key}
            id={`cuisine-${key}`}
            label={label}
            checked={filters.cuisines.has(key)}
            onChange={(on) => onToggle("cuisines", key, on)}
          />
        ))}
        <button
          type="button"
          className="recipe-filters__see-more"
          onClick={onToggleCuisines}
          aria-expanded={cuisinesExpanded}
        >
          {cuisinesExpanded ? "See less" : "See more"}
        </button>
      </fieldset>

      <fieldset className="recipe-filters__group">
        <legend className="recipe-filters__legend">Goals</legend>
        {GOALS.map(({ key, label }) => (
          <FilterCheckbox
            key={key}
            id={`goal-${key}`}
            label={label}
            checked={filters.goals.has(key)}
            onChange={(on) => onToggle("goals", key, on)}
          />
        ))}
      </fieldset>
    </aside>
  );
}

export default RecipeFilters;
