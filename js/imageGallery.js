class AppGallery extends HTMLElement {
  static get observedAttributes() {
    return ["language"];
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
      alt: [
        "Dela kostnader enkelt",
        "Månadsbalans på autopilot",
        "Alltid i balans",
      ],
    },

    en: {
      title: "See how iziSettle works",
      alt: [
        "Share costs with ease",
        "Monthly balance on autopilot",
        "Always in balance",
      ],
    },
  };

  render() {
    const language = this.getAttribute("language") || "en";

    const t = this.translations[language] || this.translations.en;

    const images = ["appstore_1.png", "appstore_2.png", "appstore_3.png"];

    this.innerHTML = `
      <section
        class="gallery"
        aria-label="${t.title}"
      >

        <h2>
          ${t.title}
        </h2>

        <div class="images">

          ${images
            .map(
              (image, index) => `
          
            <figure>

              <img
                src="images/${image}"
                alt="${t.alt[index]}"
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
