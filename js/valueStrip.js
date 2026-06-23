class ValueStrip extends HTMLElement {
  static get observedAttributes() {
    return ["language"];
  }

  connectedCallback() {
    if (!this.hasAttribute("language")) {
      this.setAttribute("language", "en");
    }
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "language" && oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }

  getTranslations() {
    const translations = {
      sv: {
        title: "Varför människor älskar iziSettle",
        points: [
          "Slipp huvudräkningen — IziSettle vet vem som är skyldig vem.",
          "Lägg till utgifter på sekunder och dela med ett tryck.",
          "Allt synkas via iCloud. Inget konto, inga lösenord, ingen reklam.",
          "Reglera direkt med Swish eller PayPal — beloppet är redan ifyllt.",
          "Gratis för en resa eller fest. Pro för det dagliga livet.",
        ],
      },
      en: {
        title: "Why people love iziSettle",
        points: [
          "Stop doing the math — IziSettle knows who owes whom.",
          "Add expenses in seconds and share them with one tap.",
          "Everything syncs via iCloud. No account, no passwords, no ads.",
          "Settle instantly with Swish or PayPal — the amount is pre-filled.",
          "Free for a trip or a party. Pro for everyday life.",
        ],
      },
      de: {
        title: "Warum Menschen iziSettle lieben",
        points: [
          "Schluss mit Kopfrechnen — IziSettle weiß, wer wem was schuldet.",
          "Trage Ausgaben in Sekunden ein und teile sie mit einem Tipp.",
          "Alles synct über iCloud. Kein Konto, keine Passwörter, keine Werbung.",
          "Begleiche sofort per PayPal — der Betrag ist schon ausgefüllt.",
          "Kostenlos für die Reise oder die Party. Pro für den Alltag.",
        ],
      },
    };

    const language = (this.getAttribute("language") || "en").toLowerCase();
    return translations[language] || translations.en;
  }

  render() {
    const { title, points } = this.getTranslations();
    const language = (this.getAttribute("language") || "en").toLowerCase();
    const items = points
      .map(
        (point) => `
          <article class="value-strip__point">
            <p>${point}</p>
          </article>`,
      )
      .join("");

    this.innerHTML = `
      <section class="value-strip brand-gradient" lang="${language}" aria-labelledby="value-strip-title">
        <div class="value-strip__inner">
          <h2 id="value-strip-title">${title}</h2>
          <div class="value-strip__points">
            ${items}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("value-strip", ValueStrip);
