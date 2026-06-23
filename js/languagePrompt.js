const STORAGE_KEY = "izisettle-language-choice";

const translations = {
  sv: "se",
  en: "en",
  de: "de",
};

const DEFAULT_LOCALE = "en";

const LANGUAGE_LABELS = {
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

const SUPPORTED_LOCALES = Object.keys(translations);

function isLocale(value) {
  return SUPPORTED_LOCALES.includes(value);
}

function getCurrentLocale() {
  const pathname = window.location.pathname.toLowerCase();

  const urlLocale = Object.entries(translations).find(
    ([, path]) => pathname === `/${path}` || pathname.startsWith(`/${path}/`),
  );

  return urlLocale ? urlLocale[0] : DEFAULT_LOCALE;
}

function getBrowserLocale() {
  const languages = [...(navigator.languages || []), navigator.language]
    .filter(Boolean)
    .map((language) => language.toLowerCase());

  return (
    languages
      .map((language) =>
        SUPPORTED_LOCALES.find((locale) => language.startsWith(locale)),
      )
      .find(Boolean) || null
  );
}

function getPathByLocale(locale) {
  const pathname = window.location.pathname;

  const pathWithoutLocale = pathname.replace(
    new RegExp(`^/(${Object.values(translations).join("|")})(?=/|$)`, "i"),
    "",
  );

  const normalizedPath = pathWithoutLocale || "/";

  const urlLocale = translations[locale];

  if (locale === DEFAULT_LOCALE) {
    return normalizedPath;
  }

  return `/${urlLocale}${normalizedPath}`;
}

function buildTargetUrl(locale) {
  return new URL(getPathByLocale(locale), window.location.href).href;
}

function storePreference(locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Ignore storage failures
  }
}

function getStoredPreference() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);

    return value && isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

function createPrompt(currentLocale, targetLocale) {
  const copy = LANGUAGE_LABELS[targetLocale];

  const banner = document.createElement("section");

  banner.className = "language-prompt";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", `${copy.eyebrow} suggestion`);

  const primaryUrl = buildTargetUrl(targetLocale);

  banner.innerHTML = `
    <div class="language-prompt__content">
      <span class="language-prompt__eyebrow">
        ${copy.eyebrow}
      </span>

      <h2 class="language-prompt__title">
        ${copy.title}
      </h2>

      <p class="language-prompt__text">
        ${copy.text}
      </p>
    </div>

    <div class="language-prompt__actions">
      <a class="language-prompt__link" href="${primaryUrl}">
        ${copy.primary}
      </a>

      <button 
        class="language-prompt__button" 
        type="button">
        ${copy.secondary}
      </button>
    </div>
  `;

  const dismissButton = banner.querySelector(".language-prompt__button");

  dismissButton?.addEventListener("click", () => {
    storePreference(currentLocale);
    banner.remove();
  });

  return banner;
}

function initLanguagePrompt() {
  const currentLocale = getCurrentLocale();
  const browserLocale = getBrowserLocale();
  const storedPreference = getStoredPreference();

  console.log({
    currentLocale,
    browserLocale,
    storedPreference,
    path: window.location.pathname,
  });

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
