import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <>
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-[800px] mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Nutzungsbedingungen für Safina AI</h1>

            <section>
              <h2 className="text-2xl font-semibold">1. Einleitung</h2>
              <p>Diese Nutzungsbedingungen regeln die Nutzung des Safina AI-Dienstes, bereitgestellt von Karsten's Kohle UG, Schwanthalerstr. 141, 80339 München, Deutschland. Durch die Nutzung unseres Dienstes stimmen Sie diesen Bedingungen zu.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">2. Akzeptanz der Bedingungen</h2>
              <p>Mit dem Zugriff auf oder der Nutzung von Safina AI erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie nicht einverstanden sind, dürfen Sie Safina AI nicht nutzen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">3. Dienstbeschreibung</h2>
              <p>Safina AI bietet eine Telefonassistenten-Dienstleistung, die eingehende Anrufe entgegennimmt, basierend auf den Präferenzen des Nutzers, einschließlich Fokusmodus, abgelehnter Anrufe oder unbeantworteter Anrufe. Nutzer können bestimmte Dienste aktivieren oder deaktivieren und Filterlisten für Anrufer erstellen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">4. Nutzerkonten</h2>
              <p>Zur Nutzung von Safina AI ist ein Nutzerkonto erforderlich. Sie sind für die Vertraulichkeit Ihrer Kontoinformationen verantwortlich.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">5. Preismodell und Zahlungsbedingungen</h2>
              <p>Safina AI bietet mehrere Abonnement-Pläne (Basic und Professional), die monatlich oder jährlich abgerechnet werden. Preise sind auf unserer Website veröffentlicht. Der Service kann jederzeit über die App gekündigt werden.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">6. Datenschutz</h2>
              <p>Unsere Datenschutzpraktiken sind in unserer Datenschutzerklärung beschrieben, die Sie auf unserer Website finden können.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">7. Aufzeichnungs- und Gesprächsverarbeitung</h2>
              <p>Wir erfassen und verarbeiten Anrufe, um umfassende Gesprächszusammenfassungen und Analysen zu erstellen. Mit der Nutzung unseres Dienstes stimmen Sie der Erfassung dieser Daten zu. Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie unseren Service kündigen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">8. Verbotene Nutzungen</h2>
              <p>Sie verpflichten sich, Safina AI nicht für rechtswidrige oder unbefugte Zwecke zu nutzen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">9. Haftungsbeschränkung</h2>
              <p>Soweit gesetzlich zulässig, haftet Karsten's Kohle UG nicht für indirekte oder Folgeschäden, die aus der Nutzung von Safina AI entstehen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">10. Gewährleistungsausschluss</h2>
              <p>Safina AI wird "wie besehen" bereitgestellt, und wir geben keine Garantien in Bezug auf die Verfügbarkeit oder Leistung.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">11. Sicherheitsmaßnahmen</h2>
              <p>Safina AI implementiert branchenübliche Sicherheitsmaßnahmen, um Ihre Daten zu schützen, einschließlich Datenverschlüsselung und sicherer Netzwerkprotokolle.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">12. Änderungen der Bedingungen</h2>
              <p>Karsten's Kohle UG behält sich das Recht vor, diese Nutzungsbedingungen zu aktualisieren. Änderungen werden per E-Mail und in der App bekannt gegeben.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">13. Kündigung</h2>
              <p>Sie können Ihre Nutzung von Safina AI jederzeit beenden. Wir behalten uns das Recht vor, Ihr Konto bei Verstoß gegen diese Bedingungen zu kündigen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">14. Anwendbares Recht und Gerichtsstand</h2>
              <p>Diese Nutzungsbedingungen unterliegen deutschen Gesetzen. Ausschließlicher Gerichtsstand ist München.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">15. Kontaktinformationen</h2>
              <p>Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns bitte unter: <a href="mailto:info@safina.ai" className="text-teal-600 hover:text-teal-700">info@safina.ai</a></p>
            </section>

            <div className="mt-12 text-sm text-gray-600">
              <p>Stand: März 2024</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TermsOfUse;
