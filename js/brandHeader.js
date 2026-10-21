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
          name: "iziCup",
          pitch: "-predict matches easy-",
          logo: "../images/izicup/logo.png",
        }
      : {
          name: "iziSettle",
          pitch: "-settle your expenses easy-",
          logo: "../images/logo.png",
        };
    const section = document.createElement("section");
    section.className = "brand-header";

    const logo = document.createElement("img");
    logo.className = "brand-header__logo";
    logo.src = new URL(brand.logo, import.meta.url).href;
    logo.alt = "";
    logo.setAttribute("aria-hidden", "true");

    const title = document.createElement("h1");
    title.className = "brand-header__title";
    title.textContent = brand.name;

    const pitch = document.createElement("p");
    pitch.className = "brand-header__tagline";
    pitch.textContent = brand.pitch;

    const content = document.createElement("div");
    content.className = "brand-header__content";
    content.append(title, pitch);
    const layout = document.createElement("div");
    layout.className = "brand-header__layout";
    layout.append(logo, content);
    section.append(layout);
    this.replaceChildren(section);
  }
}

customElements.define("brand-header", BrandHeader);
