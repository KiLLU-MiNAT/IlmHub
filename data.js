export const COURSES = [
    {
        id: "bibel-koran-basics",
        title: "Bibel & Koran – Grundlagenvergleich",
        level: "Beginner",
        priceLabel: "Kostenlos (Demo)",
        tags: ["Bibel", "Koran", "Methodik"],
        blurb:
            "Ein sauberer Einstieg: Begriffe, Offenbarung, Kontext & typische Streitpunkte — ohne Clickbait.",
        chapters: [
            {
                id: "c1",
                title: "Grundlagen",
                lessons: [
                    { id: "l1", title: "Was ist Offenbarung?", duration: "8 min" },
                    { id: "l2", title: "Kanon & Textüberlieferung (Überblick)", duration: "12 min" },
                    { id: "l3", title: "Kontext lesen: 3 Regeln", duration: "9 min" }
                ]
            },
            {
                id: "c2",
                title: "Vergleich: zentrale Fragen",
                lessons: [
                    { id: "l4", title: "Prophetenverständnis: Gemeinsamkeiten & Unterschiede", duration: "10 min" },
                    { id: "l5", title: "Begriffe: Sohn Gottes, Messias, Geist", duration: "13 min" }
                ]
            }
        ]
    },
    {
        id: "propheten-portraits",
        title: "Propheten-Portraits (Koran & Bibel)",
        level: "Intermediate",
        priceLabel: "39€ (Beispiel)",
        tags: ["Propheten", "Geschichte", "Ethik"],
        blurb:
            "Profile zu Propheten: Botschaft, Umfeld, Kernlehren, häufige Missverständnisse.",
        chapters: [
            {
                id: "c1",
                title: "Ibrahim (Abraham)",
                lessons: [
                    { id: "l1", title: "Biografie & Kernbotschaft", duration: "11 min" },
                    { id: "l2", title: "Bund, Prüfungen, Vertrauen", duration: "10 min" }
                ]
            },
            {
                id: "c2",
                title: "Musa (Moses)",
                lessons: [
                    { id: "l3", title: "Exodus & Gesetz (Rahmen)", duration: "14 min" },
                    { id: "l4", title: "Freiheit, Verantwortung, Gemeinschaft", duration: "12 min" }
                ]
            }
        ]
    },
    {
        id: "debate-toolkit",
        title: "Debate Toolkit (Fair & sauber argumentieren)",
        level: "Advanced",
        priceLabel: "59€ (Beispiel)",
        tags: ["Argumentation", "Adab", "Logik"],
        blurb:
            "Wie du diskutierst ohne zu beleidigen: Begriffsarbeit, Quellenhygiene, typische Fehlschlüsse.",
        chapters: [
            {
                id: "c1",
                title: "Adab & Struktur",
                lessons: [
                    { id: "l1", title: "Adab: Grenzen & Ziele", duration: "7 min" },
                    { id: "l2", title: "These–Beleg–Schluss: die 3-Stufen", duration: "9 min" }
                ]
            },
            {
                id: "c2",
                title: "Tools",
                lessons: [
                    { id: "l3", title: "Fehlschlüsse erkennen (5 Klassiker)", duration: "11 min" },
                    { id: "l4", title: "Steelman statt Strawman", duration: "8 min" }
                ]
            }
        ]
    }
];

export const POSTS = [
    {
        id: "johannes14-paraklet",
        title: "Johannes 14–16 & der Paraklet: Wie wird es diskutiert?",
        author: "IlmHub Redaktion",
        date: "2026-03-02",
        tags: ["Bibel", "NT", "Diskurs"],
        excerpt:
            "Überblick über christliche Auslegungen und muslimische Lesarten — mit Fokus auf Kontext & Begriffsklärung.",
        body: [
            "In Johannes 14–16 wird der Paraklet erwähnt. In der christlichen Tradition wird dies meist als Heiliger Geist verstanden.",
            "In muslimischen Diskussionen wird teils argumentiert, dass der Text auch als Hinweis auf einen kommenden Gesandten gelesen werden könnte.",
            "IlmHub-Regel: Erst Kontext & Sprache klären, dann Schlussfolgerungen. Sonst baut man auf Missverständnissen."
        ]
    },
    {
        id: "trinity-timeline",
        title: "Trinität: Begriff, Entwicklung, Streitpunkte (kurzer Zeitstrahl)",
        author: "Gastautor: A. Karim",
        date: "2026-02-18",
        tags: ["Theologie", "Geschichte"],
        excerpt:
            "Was meinen Christen damit, was kritisieren Muslime daran, und wo entstehen Missverständnisse?",
        body: [
            "Viele Debatten scheitern daran, dass Leute Begriffe unterschiedlich verwenden (Person, Wesen, Sohn, Geist).",
            "Ein fairer Ansatz trennt: (1) biblische Texte, (2) frühe Auslegung, (3) spätere dogmatische Formulierungen.",
            "Das Ziel ist nicht 'Punkte sammeln', sondern Klarheit und saubere Argumente."
        ]
    },
    {
        id: "textkritik-basics",
        title: "Textkritik Basics: Was bedeutet 'Überlieferung' praktisch?",
        author: "IlmHub Redaktion",
        date: "2026-01-30",
        tags: ["Methodik", "Quellen"],
        excerpt:
            "Ein einfacher Einstieg: Was man prüfen kann, was man nicht behaupten sollte, und wie man sauber zitiert.",
        body: [
            "Überlieferung ist mehr als 'wer hat’s gesagt': Man schaut auf Handschriften, Varianten, Übersetzungen, Kontext.",
            "Achtung: Aus einer Variante folgt nicht automatisch 'alles ist falsch' — aber man darf auch nicht ignorieren, dass Varianten existieren.",
            "Für Einsteiger: Arbeite mit anerkannten Ausgaben/Kommentaren und dokumentiere deine Quellen."
        ]
    }
];

export const WORKSHEETS = [
    {
        id: "textanalyse-kontext",
        title: "Arbeitsblatt: Textanalyse (Kontext & Begriffe)",
        tags: ["Methodik", "Lernen"],
        intro:
            "Ziel: Du lernst, eine Stelle strukturiert zu lesen, ohne vorschnelle Schlussfolgerungen.",
        questions: [
            { id: "q1", type: "text", label: "Welche Stelle/Quelle analysierst du? (Buch, Kapitel, Vers / Surah, Ayah)" },
            { id: "q2", type: "textarea", label: "Schreibe den Kontext in 2–4 Sätzen (wer spricht zu wem, warum?)." },
            { id: "q3", type: "textarea", label: "Welche Schlüsselbegriffe sind wichtig? Erkläre kurz." },
            { id: "q4", type: "textarea", label: "Welche alternative Auslegung gibt es? (mind. 1)" }
        ]
    },
    {
        id: "argument-map",
        title: "Arbeitsblatt: Argument-Map (These → Beleg → Schluss)",
        tags: ["Argumentation", "Adab"],
        intro:
            "Ziel: Eine Behauptung so aufschreiben, dass andere sie prüfen können (und du selbst Fehler findest).",
        questions: [
            { id: "q1", type: "textarea", label: "These: Was behauptest du genau? (1–2 Sätze)" },
            { id: "q2", type: "textarea", label: "Belege: Welche Quellen/Indizien stützen das? (Liste)" },
            { id: "q3", type: "textarea", label: "Schluss: Warum folgt die These aus den Belegen?" },
            { id: "q4", type: "textarea", label: "Gegenargument: Was könnte dagegen sprechen?" },
            { id: "q5", type: "textarea", label: "Antwort: Wie reagierst du fair darauf?" }
        ]
    }
];