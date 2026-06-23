class PrivacyPolicy extends HTMLElement {
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
        heading: "Privacy Policy",
        effectiveDate: "Effective Date: June 22, 2026",
        introduction:
          'IziSettle is committed to protecting your privacy. This Privacy Policy explains how user information is handled in connection with IziSettle ("the App").',
        items: [
          {
            title: "1. Information We Collect",
            content:
              "We do not collect, store, or transmit any of your personal information, usage data, or sensitive content on our own servers. Your data remains on your device and in your iCloud account.",
          },
          {
            title: "2. How We Use iCloud (CloudKit)",
            content:
              "If you choose to enable iCloud synchronization, the App uses your personal, private iCloud account to store your app data. This data is stored directly in your private iCloud container. You have total control over this data and can disable iCloud access for the App at any time through your device's iCloud settings. All data stored in iCloud is handled in accordance with Apple's Privacy Policy. We do not have access to, nor do we view or process, the data stored in your private iCloud.",
          },
          {
            title: "3. Third-Party Services",
            content:
              'We do not use third-party analytics, advertising networks, or tracking services. We do not share your personal information with any third parties. When you enter an expense in a foreign currency, the App fetches the exchange rate from open.er-api.com. Only the currency code (e.g., "EUR") is sent — no personal data. The App operates independently and respects your privacy completely.',
          },
          {
            title: "4. Children's Privacy",
            content:
              "The App does not knowingly collect personally identifiable information from anyone under the age of 13. If we become aware that we have collected personal information from a child under 13, we will take appropriate steps to delete such information.",
          },
          {
            title: "5. Data Security",
            content:
              "We are committed to ensuring the security of your information. Since we do not store your data on our servers, the security of your data depends on Apple's iCloud security measures and your device's security settings.",
          },
          {
            title: "6. Changes to This Privacy Policy",
            content:
              'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.',
          },
          {
            title: "7. Contact Us",
            content:
              "If you have any questions or suggestions about our Privacy Policy, please contact us at support@izisettle.se.",
          },
        ],
      },
      sv: {
        heading: "Integritetspolicy",
        effectiveDate: "Giltig från: 22 juni 2026",
        introduction:
          'IziSettle är engagerat i att skydda din integritet. Denna integritetspolicy förklarar hur användarinformation hanteras i samband med IziSettle ("Appen").',
        items: [
          {
            title: "1. Information vi samlar in",
            content:
              "Vi samlar inte in, lagrar eller överför någon personlig information, användningsdata eller känsligt innehåll på våra servrar. Din data förblir på din enhet och i ditt iCloud-konto.",
          },
          {
            title: "2. Hur vi använder iCloud (CloudKit)",
            content:
              "Om du väljer att aktivera iCloud-synkronisering använder Appen ditt personliga, privata iCloud-konto för att lagra din appdata. Denna data lagras direkt i din privata iCloud-behållare. Du har fullständig kontroll över denna data och kan inaktivera iCloud-åtkomst för Appen när som helst genom enhetens iCloud-inställningar. All data som lagras i iCloud hanteras i enlighet med Apples integritetspolicy. Vi har ingen åtkomst till och vi kan inte se eller bearbeta den data som lagras i ditt privata iCloud.",
          },
          {
            title: "3. Tredjepartstjänster",
            content:
              'Vi använder inte analysverktyg från tredje part, reklamföretag eller spårning. Vi delar inte din personliga information med någon tredje part. När du registrerar en utgift i utländsk valuta hämtar Appen växelkursen från open.er-api.com. Endast valutakoden (t.ex. "EUR") skickas — ingen personlig data. Appen fungerar oberoende och respekterar din integritet fullständigt.',
          },
          {
            title: "4. Integritet för barn",
            content:
              "Appen samlar inte medvetet in personligt identifierbar information från personer under 13 år. Om vi blir medvetna om att vi har samlat in personlig information från ett barn under 13 år, kommer vi att vidta lämpliga åtgärder för att ta bort sådan information.",
          },
          {
            title: "5. Datasäkerhet",
            content:
              "Vi är engagerade i att säkerställa säkerheten för din information. Eftersom vi inte lagrar din data på våra servrar beror säkerheten för din data på Apples iCloud-säkerhetsåtgärder och din enhets säkerhetsinställningar.",
          },
          {
            title: "6. Ändringar av denna integritetspolicy",
            content:
              'Vi kan uppdatera vår integritetspolicy från tid till annan. Vi meddelar dig om ändringar genom att publicera den nya integritetspolicyn på denna sida och uppdatera "Giltig från"-datumet högst upp.',
          },
          {
            title: "7. Kontakta oss",
            content:
              "Om du har några frågor eller förslag om vår integritetspolicy, vänligen kontakta oss på support@izisettle.se.",
          },
        ],
      },
      de: {
        heading: "Datenschutzrichtlinie",
        effectiveDate: "Gültig ab: 22. Juni 2026",
        introduction:
          'IziSettle setzt sich für den Schutz deiner Privatsphäre ein. Diese Datenschutzrichtlinie erklärt, wie Nutzerinformationen im Zusammenhang mit IziSettle ("die App") behandelt werden.',
        items: [
          {
            title: "1. Informationen, die wir erfassen",
            content:
              "Wir erfassen, speichern oder übertragen keine deiner personenbezogenen Daten, Nutzungsdaten oder sensiblen Inhalte auf unseren eigenen Servern. Deine Daten verbleiben auf deinem Gerät und in deinem iCloud-Konto.",
          },
          {
            title: "2. Wie wir iCloud (CloudKit) nutzen",
            content:
              "Wenn du dich für die iCloud-Synchronisierung entscheidest, nutzt die App dein persönliches, privates iCloud-Konto, um deine App-Daten zu speichern. Diese Daten werden direkt in deinem privaten iCloud-Container gespeichert. Du hast die volle Kontrolle über diese Daten und kannst den iCloud-Zugriff für die App jederzeit über die iCloud-Einstellungen deines Geräts deaktivieren. Alle in iCloud gespeicherten Daten werden gemäß der Datenschutzrichtlinie von Apple behandelt. Wir haben keinen Zugriff auf die in deinem privaten iCloud gespeicherten Daten und sehen oder verarbeiten diese nicht.",
          },
          {
            title: "3. Drittanbieter-Dienste",
            content:
              'Wir verwenden keine Analyse-Tools, Werbenetzwerke oder Tracking-Dienste von Drittanbietern. Wir geben deine personenbezogenen Daten nicht an Dritte weiter. Wenn du eine Ausgabe in einer Fremdwährung erfasst, ruft die App den Wechselkurs von open.er-api.com ab. Es wird nur der Währungscode (z. B. "EUR") übertragen — keine personenbezogenen Daten. Die App arbeitet unabhängig und respektiert deine Privatsphäre vollständig.',
          },
          {
            title: "4. Datenschutz für Kinder",
            content:
              "Die App erfasst wissentlich keine personenbezogenen Daten von Personen unter 13 Jahren. Sollten wir erfahren, dass wir personenbezogene Daten eines Kindes unter 13 Jahren erfasst haben, ergreifen wir geeignete Maßnahmen, um diese Daten zu löschen.",
          },
          {
            title: "5. Datensicherheit",
            content:
              "Wir setzen uns für die Sicherheit deiner Informationen ein. Da wir deine Daten nicht auf unseren Servern speichern, hängt die Sicherheit deiner Daten von den iCloud-Sicherheitsmaßnahmen von Apple und den Sicherheitseinstellungen deines Geräts ab.",
          },
          {
            title: "6. Änderungen dieser Datenschutzrichtlinie",
            content:
              'Wir können unsere Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir informieren dich über Änderungen, indem wir die neue Datenschutzrichtlinie auf dieser Seite veröffentlichen und das Datum "Gültig ab" oben aktualisieren.',
          },
          {
            title: "7. Kontaktiere uns",
            content:
              "Wenn du Fragen oder Vorschläge zu unserer Datenschutzrichtlinie hast, wende dich bitte an support@izisettle.se.",
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

    const policyItems = t.items
      .map(
        ({ title, content }) => `
        <section class="policy-item">
          <h2 class="izi-gradient">${title}</h2>
          <p>${content}</p>
        </section>`,
      )
      .join("");

    this.innerHTML = `
      <article class="privacy-policy" lang="${language}" aria-labelledby="privacy-heading">
        <header>
          <h1 id="privacy-heading" class="izi-gradient">${t.heading}</h1>
          <p class="effective-date">${t.effectiveDate}</p>
        </header>
        
        <p class="introduction">${t.introduction}</p>
        
        ${policyItems}
      </article>
    `;
  }
}

customElements.define("privacy-policy", PrivacyPolicy);
