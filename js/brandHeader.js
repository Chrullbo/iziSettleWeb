class BrandHeader extends HTMLElement {
  static get observedAttributes() {
    return ["izicup"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }

  render() {
    const isIziCup = this.hasAttribute("izicup");
    const brand = isIziCup
      ? {
          image: "../images/izicup_header.svg",
          alt: "iziCup - predict matches easy",
        }
      : {
          image: "../images/izisettle_header.svg",
          alt: "iziSettle - settle your expenses easy",
        };
    const section = document.createElement("section");
    section.className = "brand-header";

    const title = document.createElement("h1");
    title.className = "brand-header__title";

    const image = document.createElement("img");
    image.className = "brand-header__image";
    image.src = new URL(brand.image, import.meta.url).href;
    image.alt = brand.alt;
    title.append(image);
    section.append(title);
    this.replaceChildren(section);
  }
}

customElements.define("brand-header", BrandHeader);
