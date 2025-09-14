import React, { useEffect, useId, useRef, useState } from "react";

// Tailwind Combobox Component (TypeScript + React)
// - Accessible (aria roles/attributes)
// - Keyboard support (ArrowUp/Down, Enter, Escape)
// - Search/filtering
// - Click-outside to close
// - Customizable via props and renderOption

export type ComboboxOption = {
  categoryId: number;
  name: string;
  status: string;
  [k: string]: any;
};

type ComboboxProps = {
  options: ComboboxOption[];
  value?: ComboboxOption | null;
  onChange: (opt: ComboboxOption | null) => void;
  placeholder?: string;
  disabled?: boolean;
  maxResults?: number; // limit dropdown items
  className?: string;
  renderOption?: (
    opt: ComboboxOption,
    isHighlighted: boolean
  ) => React.ReactNode;
};

export default function ComboboxItem({
  options,
  value = null,
  onChange,
  placeholder = "Select...",
  disabled = false,
  maxResults = 100,
  className = "",
  renderOption,
}: ComboboxProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value?.name || "");
  const [filtered, setFiltered] = useState<ComboboxOption[]>(options);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  // keep query synced when parent value changes
  useEffect(() => {
    if (value) {
      setQuery(value.name);
    } else {
      setQuery("");
    }
  }, [value]);

  useEffect(() => {
    // Reset filtered when options change
    setFiltered(options.slice(0, maxResults));
  }, [options, maxResults]);

  useEffect(() => {
    // Filter options by query (case-insensitive). Simple contains match.
    if (!query) {
      setFiltered(options.slice(0, maxResults));
      setHighlightedIndex(-1);
      return;
    }

    const q = query.trim().toLowerCase();
    const filtered = options
      .filter((o) => {
        const name = o.name ?? "";
        const status = o.status ?? "";
        return (
          name.toLowerCase().includes(q) || status.toLowerCase().includes(q)
        );
      })
      .slice(0, maxResults);

    setFiltered(filtered);
    setHighlightedIndex(filtered.length ? 0 : -1);
  }, [query, options, maxResults]);

  useEffect(() => {
    // close on outside click
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    // Keep input focused when open
    if (open) inputRef.current?.focus();
  }, [open]);

  function openDropdown() {
    if (disabled) return;
    setOpen(true);
  }

  function closeDropdown() {
    setOpen(false);
    setHighlightedIndex(-1);
  }

  function selectOption(opt: ComboboxOption | null) {
    onChange(opt);
    if (opt) setQuery(opt.name);
    closeDropdown();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && ["ArrowDown", "ArrowUp"].includes(e.key)) {
      openDropdown();
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) =>
        Math.min((filtered.length || 1) - 1, Math.max(0, i + 1))
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && highlightedIndex >= 0 && highlightedIndex < filtered.length) {
        selectOption(filtered[highlightedIndex]);
      } else if (!open && filtered.length === 1) {
        selectOption(filtered[0]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeDropdown();
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
      aria-haspopup="listbox"
      aria-expanded={open}
    >
      <label htmlFor={`cb-${id}`} className="sr-only">
        {placeholder}
      </label>

      <div className="flex items-center gap-2">
        <input
          id={`cb-${id}`}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-controls={`cb-list-${id}`}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-activedescendant={
            highlightedIndex >= 0 && filtered[highlightedIndex]
              ? `cb-item-${id}-${filtered[highlightedIndex].categoryId}`
              : undefined
          }
          className={
            "file:text-foreground placeholder:text-muted-foreground w-72 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          }
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            openDropdown();
          }}
          onFocus={() => openDropdown()}
          onKeyDown={onKeyDown}
          disabled={disabled}
          autoComplete="off"
        />

        <button
          type="button"
          aria-label={open ? "Close" : "Open"}
          onClick={() => (open ? closeDropdown() : openDropdown())}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-gray-500"
        >
          <svg
            className={`h-4 w-4 transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown */}
      <div
        id={`cb-list-${id}`}
        role="listbox"
        aria-labelledby={`cb-${id}`}
        className={`absolute z-50 mt-1 w-72 overflow-hidden rounded-md border bg-gray-700 text-sm shadow-lg transition-all duration-150 ${
          open
            ? "opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-95"
        }`}
      >
        {open && (
          <ul className="max-h-64 divide-y overflow-auto">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-gray-500">No results</li>
            ) : (
              filtered.map((opt, idx) => {
                const isHighlighted = idx === highlightedIndex;
                return (
                  <li
                    key={opt.categoryId}
                    id={`cb-item-${id}-${opt.categoryId}`}
                    role="option"
                    aria-selected={value?.categoryId === opt.categoryId}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onMouseDown={(e) => e.preventDefault()} // prevent blur before click
                    onClick={() => selectOption(opt)}
                    className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2 hover:bg-gray-500 focus:bg-gray-500 ${
                      isHighlighted ? "bg-gray-500" : ""
                    }`}
                  >
                    <div className="flex flex-col">
                      {renderOption ? (
                        renderOption(opt, isHighlighted)
                      ) : (
                        <>
                          <span className="text-sm">{opt.name}</span>
                          {opt.status && (
                            <span className="text-xs text-gray-500">
                              {opt.status}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {value?.categoryId === opt.categoryId && (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 10l3 3L15 6"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
