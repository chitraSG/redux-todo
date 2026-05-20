const ACTIONS = [
  {
    id: "menus",
    label: "Recipes & Menus",
    className: "category-bar__pill--coral",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 4h12v2H6V4zm0 4h12v12a2 2 0 01-2 2H8a2 2 0 01-2-2V8zm3 2v8h6v-8H9z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "share",
    label: "Share your recipe",
    className: "category-bar__pill--lime",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 5v11M8 9l4-4 4 4M5 19h14v2H5v-2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "mealplan",
    label: "Custom meal plan",
    className: "category-bar__pill--amber",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "grocery",
    label: "Create grocery list",
    className: "category-bar__pill--orange",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 6h15l-1.5 9H7.5L6 3H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.5" fill="currentColor" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "tips",
    label: "Cooking Tips & Tricks",
    className: "category-bar__pill--green",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.74V17h8v-2.26A7 7 0 0012 2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function CategoryActionBar() {
  return (
    <nav className="category-bar" aria-label="Quick actions">
      <ul className="category-bar__list">
        {ACTIONS.map((action) => (
          <li key={action.id}>
            <button type="button" className={`category-bar__pill ${action.className}`}>
              <span className="category-bar__icon">{action.icon}</span>
              <span className="category-bar__label">{action.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryActionBar;
