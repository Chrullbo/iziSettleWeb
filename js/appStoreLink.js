class AppStoreLink extends HTMLElement {
  static get observedAttributes() {
    return ["language"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }
  imagePath = this.getAttribute("image-path") || "images/appstore.svg";

  getTranslations() {
    const translations = {
      en: {
        available: "Only available on iPhone",
      },
      sv: {
        available: "Endast tillgänglig på iPhone",
      },
    };

    const language = this.getAttribute("language") || "en";
    return translations[language] || translations.en;
  }

  render() {
    const t = this.getTranslations();

    this.innerHTML = `
          <section class="app-store-section" aria-label="App Store link">
            <div class="badge-row">
                <span class="iphone-badge" role="status" aria-live="polite">${t.available}</span>
            </div>

            <a
                class="app-store-link"
                href="https://apps.apple.com/us/app/izisettle/id6758045318"
                aria-label="Download IziSettle on the App Store"
            >
                <img
                src=${this.imagePath}
                alt=""
                width="200"
                height="60"
                aria-hidden="true"
                />
            </a>
          </section>
            <style>
              .app-store-section img {
              width: 200px;
              }
            </style>
    `;
  }
}
customElements.define("app-store-link", AppStoreLink);
