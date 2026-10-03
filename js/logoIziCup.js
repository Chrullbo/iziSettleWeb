class Logo extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  imagePath = this.getAttribute("image-path") || "images/logo.png";
  render() {
    this.innerHTML = `
        <header>
          <h1 class="izi-gradient-pro">IziCup</h1>
          <p aria-hidden="true">-- Handle your tournament bets with ease --</p>
          <img
            class="logo-img"
            src=${this.imagePath}
            alt=""
            width="154"
            height="200"
            aria-hidden="true"
          />
        </header>
      `;
  }
}
customElements.define("logo-comp", Logo);
