export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = Exclude<Theme, "system">;
export type ThemeAttribute = "class" | `data-${string}`;

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

export function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveTheme(
  theme: Theme,
  enableSystem: boolean,
): ResolvedTheme {
  if (theme === "system" && enableSystem) {
    return getSystemTheme();
  }

  return theme === "system" ? "light" : theme;
}

export function applyThemeToDocument(
  resolvedTheme: ResolvedTheme,
  attribute: ThemeAttribute,
  enableColorScheme: boolean,
) {
  const root = document.documentElement;

  if (attribute === "class") {
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  } else {
    root.setAttribute(attribute, resolvedTheme);
  }

  if (enableColorScheme) {
    root.style.colorScheme = resolvedTheme;
  }
}

export function getThemeScript({
  attribute,
  defaultTheme,
  enableSystem,
  enableColorScheme,
  storageKey,
}: {
  attribute: ThemeAttribute;
  defaultTheme: Theme;
  enableSystem: boolean;
  enableColorScheme: boolean;
  storageKey: string;
}) {
  return `(function(){try{var d=document.documentElement;var s=localStorage.getItem(${JSON.stringify(
    storageKey,
  )});var t=s||${JSON.stringify(defaultTheme)};var r=t;if(t==="system"&&${String(
    enableSystem,
  )}){r=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(r!=="light"&&r!=="dark"){r="light"}if(${JSON.stringify(
    attribute,
  )}==="class"){d.classList.remove("light","dark");d.classList.add(r)}else{d.setAttribute(${JSON.stringify(
    attribute,
  )},r)}if(${String(enableColorScheme)}){d.style.colorScheme=r}}catch(e){}})();`;
}
