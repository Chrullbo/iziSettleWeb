class Logo extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  imagePath = this.getAttribute("image-path") || "images/logo.png";
  render() {
    this.innerHTML = `
        <header>
          <h1>IziSettle</h1>
          <p aria-hidden="true">-- Settle your expenses with ease --</p>
          <img
            class="logo-img"
            src=${this.imagePath}
            alt=""
            width="200"
            height="200"
            aria-hidden="true"
          />
        </header>
      `;
  }
}
customElements.define("logo-comp", Logo);
