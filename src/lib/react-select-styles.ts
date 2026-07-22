import type { GroupBase, StylesConfig } from "react-select";

/**
 * react-select ignores Tailwind classes for its actual visual styling —
 * classNamePrefix only adds class *names* to target, it doesn't remove
 * react-select's own default inline styles. This config maps its
 * styling API to our semantic tokens so every instance stays on-brand
 * and responds to dark mode, without duplicating this per-component.
 *
 * A generic function (not a fixed object) because StylesConfig is
 * parameterized on the option type — this keeps real type safety per
 * call site instead of widening to `any`.
 *
 * Usage: <Select styles={selectStyles<CountryOption>()} ... />
 */
export function selectStyles<
  Option,
  IsMulti extends boolean = false,
>(): StylesConfig<Option, IsMulti, GroupBase<Option>> {
  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: "var(--color-surface)",
      borderColor: state.isFocused
        ? "var(--color-brand)"
        : "var(--color-border)",
      borderRadius: "var(--radius-lg)",
      boxShadow: state.isFocused ? "0 0 0 2px var(--color-brand-tint)" : "none",
      minHeight: "2.5rem",
      "&:hover": { borderColor: "var(--color-brand)" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--color-brand)"
        : state.isFocused
          ? "var(--color-brand-tint)"
          : "var(--color-surface)",
      color: state.isSelected
        ? "var(--color-text-inverse)"
        : "var(--color-text-primary)",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--color-text-primary)",
    }),
    input: (base) => ({
      ...base,
      color: "var(--color-text-primary)",
    }),
    placeholder: (base) => ({
      ...base,
      color: "var(--color-text-secondary)",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "var(--color-border)",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "var(--color-text-secondary)",
    }),
  };
}
