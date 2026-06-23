const STORAGE_KEY = "izisettle-language-choice";

const translations = {
  sv: "se",
  en: "en",
  de: "de",
} as const;

type Locale = keyof typeof translations;

const DEFAULT_LOCALE: Locale = "en";

const LANGUAGE_LABELS: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    text: string;
    primary: string;
    secondary: string;
  }
> = {
  en: {
    eyebrow: "Language",
    title: "Switch to English?",
    text: "We noticed your browser appears to prefer English.",
    primary: "Keep English",
    secondary: "Dismiss",
  },
  sv: {
    eyebrow: "Språk",
    title: "Byta till svenska?",
    text: "Vi ser att din webbläsare verkar föredra svenska.",
    primary: "Byt till svenska",
    secondary: "Stanna på engelska",
  },
  de: {
    eyebrow: "Sprache",
    title: "Auf Deutsch wechseln?",
    text: "Wir haben festgestellt, dass dein Browser Deutsch zu bevorzugen scheint.",
    primary: "Zu Deutsch wechseln",
    secondary: "Auf Englisch bleiben",
  },
};

const SUPPORTED_LOCALES = Object.keys(translations) as Locale[];

function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

function getCurrentLocale(): Locale {
  const htmlLang = document.documentElement.lang.toLowerCase();

  const htmlMatch = SUPPORTED_LOCALES.find((locale) =>
    htmlLang.startsWith(locale),
  );

  if (htmlMatch) {
    return htmlMatch;
  }

  const pathname = window.location.pathname.toLowerCase();

  const pathMatch = SUPPORTED_LOCALES.find(
    (locale) =>
      pathname.includes(`/${locale}/`) || pathname.endsWith(`/${locale}`),
  );

  return pathMatch ?? DEFAULT_LOCALE;
}

function getBrowserLocale(): Locale | null {
  const languages = [...(navigator.languages || []), navigator.language]
    .filter(Boolean)
    .map((language) => language.toLowerCase());

  return (
    languages
      .map((language) =>
        SUPPORTED_LOCALES.find((locale) => language.startsWith(locale)),
      )
      .find(Boolean) ?? null
  );
}

function getPathByLocale(locale: Locale): string {
  const pathname = window.location.pathname;

  // Ta bort ev. befintligt språkprefix
  const pathWithoutLocale = pathname.replace(
    new RegExp(`^/(${SUPPORTED_LOCALES.join("|")})(?=/|$)`, "i"),
    "",
  );

  const normalizedPath = pathWithoutLocale || "/";

  if (locale === DEFAULT_LOCALE) {
    return normalizedPath;
  }

  return `/${locale}${normalizedPath}`;
}

function buildTargetUrl(locale: Locale): string {
  return new URL(getPathByLocale(locale), window.location.href).href;
}

function storePreference(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Ignore storage failures.
  }
}

function getStoredPreference(): Locale | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);

    return value && isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

function createPrompt(
  currentLocale: Locale,
  targetLocale: Locale,
): HTMLElement {
  const copy = LANGUAGE_LABELS[targetLocale];

  const banner = document.createElement("section");
  banner.className = "language-prompt";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", `${copy.eyebrow} suggestion`);

  const primaryUrl = buildTargetUrl(targetLocale);

  banner.innerHTML = `
    <div class="language-prompt__content">
      <span class="language-prompt__eyebrow">${copy.eyebrow}</span>
      <h2 class="language-prompt__title">${copy.title}</h2>
      <p class="language-prompt__text">${copy.text}</p>
    </div>
    <div class="language-prompt__actions">
      <a class="language-prompt__link" href="${primaryUrl}">
        ${copy.primary}
      </a>
      <button class="language-prompt__button" type="button">
        ${copy.secondary}
      </button>
    </div>
  `;

  const dismissButton = banner.querySelector<HTMLButtonElement>(
    ".language-prompt__button",
  );

  dismissButton?.addEventListener("click", () => {
    storePreference(currentLocale);
    banner.remove();
  });

  return banner;
}

function initLanguagePrompt(): void {
  const currentLocale = getCurrentLocale();
  const browserLocale = getBrowserLocale();
  const storedPreference = getStoredPreference();

  if (storedPreference) {
    if (storedPreference !== currentLocale) {
      window.location.href = buildTargetUrl(storedPreference);
    }

    return;
  }

  if (!browserLocale || browserLocale === currentLocale) {
    return;
  }

  document.body.prepend(createPrompt(currentLocale, browserLocale));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLanguagePrompt, {
    once: true,
  });
} else {
  initLanguagePrompt();
}
