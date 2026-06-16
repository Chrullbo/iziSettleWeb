class ContactForm extends HTMLElement {
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

  getTranslations() {
    const language = this.getAttribute("language") || "en";

    switch (language) {
      case "sv":
        return {
          title: "Ställ en fråga",
          subtitle:
            "Har du en fråga om våra tjänster? Fyll i formuläret nedan så återkommer vi så snart som möjligt.",
          question: "Fråga till iziSettle",
          send: "Skicka",
          formError: "Vänligen fyll i frågan.",
          spamDetected: "Spam upptäckt.",
          sentFrom: "Skickat från användarens enhet via e-postklient.",
          openingMailClient: "Öppnar e-postklient…",
          honeypotLabel: "Lämna detta fält tomt",
        };

      default:
        return {
          title: "Ask a question",
          subtitle:
            "Have a question about our services? Fill out the form below and we'll get back to you as soon as possible.",
          question: "Question for iziSettle",
          send: "Send",
          formError: "Please fill in the question.",
          spamDetected: "Spam detected.",
          sentFrom: "Sent from user device via mail client.",
          openingMailClient: "Opening mail client…",
          honeypotLabel: "Leave this field empty",
        };
    }
  }

  render() {
    const t = this.getTranslations();
    const language = this.getAttribute("language") || "en";

    this.innerHTML = `
      <section class="contact" lang="${language}" aria-labelledby="contact-heading">
        <h2 id="contact-heading">${t.title}</h2>

        <p class="contact-note" id="contact-note">
          ${t.subtitle}
        </p>

        <form id="contactForm">
          <label for="cf-question">
            ${t.question}
            <textarea
              id="cf-question"
              name="question"
              rows="4"
              required
              aria-describedby="contact-note"
            ></textarea>
          </label>

          <label hidden aria-hidden="true" style="display: none;">
            <input
              type="text"
              id="cf-hp"
              name="hp"
              autocomplete="off"
              tabindex="-1"
              aria-hidden="true"
            />
          </label>

          <button type="submit" id="cf-submit" aria-busy="false">
            ${t.send}
          </button>

          <p id="cf-status" aria-live="polite" aria-atomic="true"></p>
        </form>
      </section>
    `;

    const form = this.querySelector("#contactForm");
    const questionField = this.querySelector("#cf-question");
    const honeypotField = this.querySelector("#cf-hp");
    const submitBtn = this.querySelector("#cf-submit");
    const status = this.querySelector("#cf-status");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      status.textContent = "";

      if (honeypotField.value.trim()) {
        status.textContent = t.spamDetected;
        return;
      }

      if (!form.reportValidity()) {
        status.textContent = t.formError;
        return;
      }

      const question = questionField.value.trim();

      const subject = encodeURIComponent(question);

      const body = encodeURIComponent(
        `Question:\n${question}\n\n${t.sentFrom}`,
      );

      const mailto = `mailto:support@izisettle.se?subject=${subject}&body=${body}`;

      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.textContent = t.openingMailClient;

      status.textContent = t.openingMailClient;

      window.location.href = mailto;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        submitBtn.textContent = t.send;
      }, 1000);

      form.reset();
    });
  }
}

customElements.define("contact-form", ContactForm);
