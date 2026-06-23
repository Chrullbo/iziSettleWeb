const STORAGE_KEY = "izisettle-language-choice";

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

function getCurrentLocale() {
  const htmlLang = (document.documentElement.lang || "").toLowerCase();

  if (htmlLang.startsWith("sv")) {
    return "sv";
  }

  if (htmlLang.startsWith("en")) {
    return "en";
  }

  const pathname = window.location.pathname.toLowerCase();

  if (pathname.includes("/se/")) {
    return "sv";
  }

  return "en";
}

function getBrowserLocale() {
  const languages = [...(navigator.languages || []), navigator.language]
    .filter(Boolean)
    .map((language) => language.toLowerCase());

  for (const language of languages) {
    if (language.startsWith("sv")) {
      return "sv";
    }

    if (language.startsWith("en")) {
      return "en";
    }
  }

  return null;
}

function getPathByLocale(locale) {
  const pathname = window.location.pathname;

  if (pathname.endsWith("/se") || pathname.endsWith("/")) {
    return locale === "sv"
      ? pathname.replace(/\/$/i, "/se/")
      : pathname.replace(/\/se\/$/i, "/");
  }

  if (pathname.endsWith("/se/privacy/") || pathname.endsWith("/privacy.html")) {
    return locale === "sv"
      ? pathname.replace(/\/privacy\.html$/i, "/se/privacy/")
      : pathname.replace(/\/se\/privacy\/index\.html$/i, "/privacy.html");
  }

  return pathname;
}

function buildTargetUrl(locale) {
  return new URL(getPathByLocale(locale), window.location.href).href;
}

function storePreference(locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Ignore storage failures and keep the prompt non-blocking.
  }
}

function getStoredPreference() {
  try {
    return localStorage.getItem(STORAGE_KEY);
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
      <span class="language-prompt__eyebrow">${copy.eyebrow}</span>
      <h2 class="language-prompt__title">${copy.title}</h2>
      <p class="language-prompt__text">${copy.text}</p>
    </div>
    <div class="language-prompt__actions">
      <a class="language-prompt__link" href="${primaryUrl}">${copy.primary}</a>
      <button class="language-prompt__button" type="button">${copy.secondary}</button>
    </div>
  `;

  const dismissButton = banner.querySelector(".language-prompt__button");

  dismissButton.addEventListener("click", () => {
    storePreference(currentLocale);
    banner.remove();
  });

  return banner;
}

function initLanguagePrompt() {
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

  const banner = createPrompt(currentLocale, browserLocale);
  document.body.prepend(banner);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLanguagePrompt, {
    once: true,
  });
} else {
  initLanguagePrompt();
}
