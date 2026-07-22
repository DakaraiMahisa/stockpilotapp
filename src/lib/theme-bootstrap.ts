const STORAGE_KEY = "color-mode";

export function applyStoredOrSystemTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const isDark = stored ? stored === "dark" : systemPrefersDark;
  document.documentElement.classList.toggle("dark", isDark);
}

export function setTheme(mode: "light" | "dark") {
  localStorage.setItem(STORAGE_KEY, mode);
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export function useSystemTheme() {
  localStorage.removeItem(STORAGE_KEY);
  applyStoredOrSystemTheme();
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (!localStorage.getItem(STORAGE_KEY)) applyStoredOrSystemTheme();
  });
