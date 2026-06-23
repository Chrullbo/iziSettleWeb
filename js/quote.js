class Quote extends HTMLElement {
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
    // const translations = {
    //   sv: {
    //     quote:
    //       "Alla våra hushållskostnader ligger nu i IziSettle — hyra, billån, el, mat. De fasta utgifterna lägger vi in en gång och appen sköter resten. Bråken om pengar har försvunnit helt.",
    //     author: "Jenny, 46",
    //     location: "Stockholm",
    //   },
    //   en: {
    //     quote:
    //       "All our household costs are in IziSettle now — rent, car loan, electricity, groceries. The fixed expenses go in once and the app handles the rest. The money arguments have completely disappeared.",
    //     author: "Jenny, 46",
    //     location: "Stockholm",
    //   },
    //   de: {
    //     quote:
    //       "Alle unsere Haushaltskosten laufen jetzt über IziSettle — Miete, Autokredit, Strom, Lebensmittel. Die festen Ausgaben tragen wir einmal ein und die App erledigt den Rest. Die Streitereien ums Geld sind komplett verschwunden.",
    //     author: "Jenny, 46",
    //     location: "Stockholm",
    //   },
    // };
    const translations = {
      sv: {
        quote:
          "IziSettle började som ett sätt att slippa konflikter med ex-frun om utgifter kopplade till barnen. Sen växte appen med resten av livet — hushållsekonomin med nuvarande frun, replokal och resor med bandet, de vuxna barnens småskulder till mig, semestrar med vänner. Allt ligger på ett ställe nu. Inte ett enda obekvämt samtal om pengar.",
        author: "Christian",
        role: "IziSettles grundare",
      },

      en: {
        quote:
          "IziSettle started as a way to avoid conflicts with my ex over expenses tied to the kids. Then the app grew with the rest of my life — the household with my current wife, rehearsal space and tours with my band, the small IOUs my now-grown kids owe me, holidays with friends. It's all in one place now. Not a single awkward conversation about money.",
        author: "Christian",
        role: "Founder of IziSettle",
      },
      de: {
        quote:
          "IziSettle entstand, weil ich Streit mit der Ex-Frau über Kosten rund um die Kinder vermeiden wollte. Dann wuchs die App mit dem Rest meines Lebens mit — der Haushalt mit meiner aktuellen Frau, Proberaum und Touren mit der Band, die kleinen Schulden meiner erwachsenen Kinder bei mir, Urlaube mit Freunden. Alles an einem Ort. Kein einziges unangenehmes Geldgespräch mehr.",
        author: "Christian",
        role: "Gründer von IziSettle",
      },
    };

    const language = (this.getAttribute("language") || "en").toLowerCase();
    return translations[language] || translations.en;
  }

  render() {
    const { quote, author, role } = this.getTranslations();
    const language = (this.getAttribute("language") || "en").toLowerCase();

    this.innerHTML = `
      <section class="quote-card" lang="${language}" aria-label="Customer quote">
        <div class="quote-card__inner">
          <p class="quote-card__quote">“${quote}”</p>
          <p class="quote-card__author">${author}</p>
          <p class="quote-card__role">${role}</p>
        </div>
      </section>
    `;
  }
}

customElements.define("quote-card", Quote);
