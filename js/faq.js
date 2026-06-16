class Faq extends HTMLElement {
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
    const translations = {
      en: {
        heading: "FAQ",
        items: [
          {
            question: "How do I get started?",
            answer:
              "Download the app from the App Store and create a profile to get started. Create a settlement and add expenses then invite your friends, through iMessage or Airdrop, to join the settlement.",
          },
          {
            question: "Does the app use iCloud?",
            answer:
              "Yes, the app uses iCloud to synchronize your data across your Apple devices.",
          },
          {
            question: "Can I share with Android users?",
            answer:
              "No, the app is currently only available for iPhone and does not support sharing with Android users.",
          },
          {
            question: "Is my data private?",
            answer:
              "Yes, your data is private and secure. We do not share your personal information with any third parties.",
          },
          {
            question: "How do I delete my account?",
            answer:
              'Delete your account by going to the app settings and selecting "Delete Account." Please note that this action is irreversible and will permanently delete all your iCloud data associated with the iziSettle app.',
          },
        ],
      },
      sv: {
        heading: "Vanliga frågor",
        items: [
          {
            question: "Hur kommer jag igång?",
            answer:
              "Ladda ner appen från App Store och skapa en profil för att komma igång. Skapa en uppgörelse och lägg till utgifter, och bjud sedan in dina vänner via iMessage eller Airdrop för att gå med i uppgörelsen.",
          },
          {
            question: "Använder appen iCloud?",
            answer:
              "Ja, appen använder iCloud för att synkronisera dina data mellan dina Apple-enheter.",
          },
          {
            question: "Kan jag dela med Android-användare?",
            answer:
              "Nej, appen är för närvarande endast tillgänglig för iPhone och stöder inte delning med Android-användare.",
          },
          {
            question: "Är mina data privat?",
            answer:
              "Ja, dina data är privata och säkra. Vi delar inte din personliga information med tredje part.",
          },
          {
            question: "Hur tar jag bort mitt konto?",
            answer:
              'Ta bort ditt konto genom att gå till appens inställningar och välja "Radera konto." Observera att denna åtgärd är oåterkallelig och kommer permanent att radera all din iCloud-data som är kopplad till appen iziSettle.',
          },
        ],
      },
    };

    const language = this.getAttribute("language") || "en";
    return translations[language] || translations.en;
  }

  render() {
    const t = this.getTranslations();
    const language = this.getAttribute("language") || "en";
    const faqItems = t.items
      .map(
        ({ question, answer }) => `
                <details>
                  <summary>${question}</summary>
                  <p>${answer}</p>
                </details>`,
      )
      .join("");

    this.innerHTML = `
            <section class="faq" lang="${language}" aria-labelledby="faq-heading">
                <h2 id="faq-heading">${t.heading}</h2>
                ${faqItems}
            </section>
    `;
  }
}
customElements.define("faq-comp", Faq);
