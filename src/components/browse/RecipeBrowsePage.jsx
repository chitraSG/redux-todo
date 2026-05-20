import { useCallback, useMemo, useState } from "react";
import { RECIPES, filterRecipes } from "../../data/recipes.js";
import CategoryActionBar from "./CategoryActionBar.jsx";
import RecipeCard from "./RecipeCard.jsx";
import RecipeFilters from "./RecipeFilters.jsx";

const PAGE_SIZE = 6;

function emptyFilters() {
  return {
    diet: new Set(),
    allergies: new Set(),
    cuisines: new Set(),
    goals: new Set(),
  };
}

function RecipeBrowsePage() {
  const [filters, setFilters] = useState(emptyFilters);
  const [cuisinesExpanded, setCuisinesExpanded] = useState(false);
  const [mainCount, setMainCount] = useState(PAGE_SIZE);
  const [recoCount, setRecoCount] = useState(PAGE_SIZE);

  const onToggle = useCallback((section, key, checked) => {
    setFilters((prev) => {
      const nextSet = new Set(prev[section]);
      if (checked) nextSet.add(key);
      else nextSet.delete(key);
      return { ...prev, [section]: nextSet };
    });
  }, []);

  const filtered = useMemo(() => filterRecipes(RECIPES, filters), [filters]);

  const mainPool = useMemo(
    () => filtered.filter((r) => !r.recommended),
    [filtered],
  );
  const recoPool = useMemo(
    () => filtered.filter((r) => r.recommended),
    [filtered],
  );

  const mainVisible = mainPool.slice(0, mainCount);
  const recoVisible = recoPool.slice(0, recoCount);

  const canLoadMoreMain = mainVisible.length < mainPool.length;
  const canLoadMoreReco = recoVisible.length < recoPool.length;

  const loadMoreMain = () => {
    setMainCount((c) => Math.min(c + PAGE_SIZE, mainPool.length));
  };

  const loadMoreReco = () => {
    setRecoCount((c) => Math.min(c + PAGE_SIZE, recoPool.length));
  };

  const loadMoreAll = () => {
    loadMoreMain();
    loadMoreReco();
  };

  return (
    <div className="recipe-browse-page">
      <CategoryActionBar />

      <div className="recipe-browse">
        <RecipeFilters
          filters={filters}
          onToggle={onToggle}
          cuisinesExpanded={cuisinesExpanded}
          onToggleCuisines={() => setCuisinesExpanded((v) => !v)}
        />

        <div className="recipe-browse__main">
          {mainPool.length === 0 && recoPool.length === 0 ? (
            <p className="recipe-browse__empty">No recipes match these filters. Try clearing a filter.</p>
          ) : (
            <>
              {mainVisible.length > 0 && (
                <section className="recipe-browse__section" aria-label="Recipes">
                  <div className="recipe-grid">
                    {mainVisible.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                </section>
              )}

              {recoPool.length > 0 && (
                <section className="recipe-browse__section" aria-labelledby="reco-heading">
                  <h2 id="reco-heading" className="recipe-browse__section-title">
                    Recommended Recipes
                  </h2>
                  <div className="recipe-grid">
                    {recoVisible.map((recipe) => (
                      <RecipeCard key={`reco-${recipe.id}`} recipe={recipe} />
                    ))}
                  </div>
                </section>
              )}

              {(canLoadMoreMain || canLoadMoreReco) && (
                <div className="recipe-browse__load-wrap">
                  <button type="button" className="recipe-browse__load-more" onClick={loadMoreAll}>
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeBrowsePage;
