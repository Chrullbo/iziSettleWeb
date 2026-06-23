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
      de: {
        heading: "Häufig gestellte Fragen",
        items: [
          {
            question: "Wie fange ich an?",
            answer:
              "Laden Sie die App aus dem App Store herunter und erstellen Sie ein Profil, um loszulegen. Erstellen Sie eine Abrechnung und fügen Sie Ausgaben hinzu, dann laden Sie Ihre Freunde über iMessage oder Airdrop ein, um der Abrechnung beizutreten.",
          },
          {
            question: "Verwendet die App iCloud?",
            answer:
              "Ja, die App verwendet iCloud, um Ihre Daten auf Ihren Apple-Geräten zu synchronisieren.",
          },
          {
            question: "Kann ich mit Android-Nutzern teilen?",
            answer:
              "Nein, die App ist derzeit nur für das iPhone verfügbar und unterstützt keine Freigabe mit Android-Nutzern.",
          },
          {
            question: "Sind meine Daten privat?",
            answer:
              "Ja, Ihre Daten sind privat und sicher. Wir geben Ihre persönlichen Informationen nicht an Dritte weiter.",
          },
          {
            question: "Wie lösche ich mein Konto?",
            answer:
              'Löschen Sie Ihr Konto, indem Sie zu den App-Einstellungen gehen und "Konto löschen" auswählen. Bitte beachten Sie, dass diese Aktion unwiderruflich ist und alle Ihre iCloud-Daten, die mit der iziSettle-App verknüpft sind, dauerhaft gelöscht werden.',
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
