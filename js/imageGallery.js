class AppGallery extends HTMLElement {
  static get observedAttributes() {
    return ["language", "izicup"];
  }

  get iziCup() {
    return this.hasAttribute("izicup");
  }

  set iziCup(value) {
    this.toggleAttribute("izicup", Boolean(value));
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  translations = {
    sv: {
      title: "Se hur iziSettle fungerar",
      headlines: [
        "Dela utgifter på sekunder",
        "Hushållet på autopilot",
        "Aldrig mer ojämn skuld",
      ],
      alt: [
        "Dela kostnader enkelt",
        "Månadsbalans på autopilot",
        "Alltid i balans",
      ],
    },

    en: {
      title: "See how iziSettle works",
      headlines: [
        "Split expenses in seconds",
        "Your household on autopilot",
        "Always settled, never awkward",
      ],
      alt: [
        "Share costs with ease",
        "Monthly balance on autopilot",
        "Always in balance",
      ],
    },

    de: {
      title: "So funktioniert iziSettle",
      headlines: [
        "Teile Ausgaben in Sekunden",
        "Dein Haushalt auf Autopilot",
        "Immer ausgeglichen, nie unangenehm",
      ],
      alt: [
        "Kosten einfach teilen",
        "Monatsabrechnung auf Autopilot",
        "Immer im Gleichgewicht",
      ],
    },
  };

  render() {
    const language = this.getAttribute("language") || "en";
    const t = this.translations[language] || this.translations.en;
    const isIziCup = this.iziCup;
    const title =
      isIziCup && language === "sv" ? "Se hur IziCup fungerar" : t.title;
    const headlines =
      isIziCup && language === "sv"
        ? ["Tippa med kompisarna", "Tippa varje match", "Följ ställningen"]
        : t.headlines;
    const alt = isIziCup && language === "sv" ? headlines : t.alt;
    const imageDirectory = isIziCup ? "../images/izicup/" : "images/";

    const images = ["appstore_1.png", "appstore_2.png", "appstore_3.png"];

    this.innerHTML = `
      <section
        class="gallery"
        aria-label="${title}"
      >

        <h2>
          ${title}
        </h2>

        <div class="images">

          ${images
            .map(
              (image, index) => `
          
            <figure>

              <h3>${headlines[index]}</h3>

              <img
                src="${imageDirectory}${image}"
                alt="${alt[index]}"
                loading="${index === 0 ? "eager" : "lazy"}"
                decoding="async"
              >

            </figure>

          `,
            )
            .join("")}

        </div>

      </section>


      <style>
.gallery {
  width: 100%;
}

.images {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;

  width: min(1200px, 95vw);
  margin-inline: auto;
}

figure {
  margin: 0;
}

h3 {
  text-align: center;
  color: #fff;
}

img {
  display: block;
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-inline: auto;
  border-radius: 16px;
}
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #fff
  }


@media (max-width: 768px) {

  .images {
    grid-template-columns: 1fr;
    width: min(300px, 90vw);
    gap: 1.5rem;
  }

}


      </style>
    `;
  }
}

customElements.define("app-gallery", AppGallery);
