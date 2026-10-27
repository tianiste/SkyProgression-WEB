import { useState } from "preact/hooks";

interface Props {
  categories: { id: string; label: string }[];
}

/** Category chips for the guide list. Without JavaScript every category stays visible. */
export default function CategoryFilter({ categories }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const pick = (id: string | null) => {
    setActive(id);
    document.querySelectorAll<HTMLElement>("[data-category]").forEach((el) => {
      el.hidden = id !== null && el.dataset.category !== id;
    });
  };

  return (
    <div class="chips" role="group" aria-label="Show guides for">
      <button type="button" aria-pressed={active === null} onClick={() => pick(null)}>
        All
      </button>
      {categories.map((c) => (
        <button type="button" key={c.id} aria-pressed={active === c.id} onClick={() => pick(c.id)}>
          {c.label}
        </button>
      ))}
    </div>
  );
}
