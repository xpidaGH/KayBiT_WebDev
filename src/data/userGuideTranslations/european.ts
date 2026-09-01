import { UserGuideContent } from '../userGuideTypes';

// French (Français)
export const frGuide: UserGuideContent = {
  title: "Guide de l'utilisateur & Référence des Archétypes Web",
  subtitle: 'Maîtriser les 11 modèles d’architecture fondamentaux des systèmes web modernes',
  badge: 'Référence Pédagogique Interactive',
  tableOfContents: {
    overview: '1. Aperçu Pédagogique',
    navigation: '2. Interface & Navigation',
    archetypes: '3. Catalogue des 11 Archétypes',
    modes: "4. Modes d'Exploration",
    studentGuide: '5. Parcours d’Apprentissage',
    faq: '6. Questions Fréquentes (FAQ)',
  },
  sections: {
    overview: {
      title: '1. Aperçu Pédagogique & Objectifs',
      desc: 'L’ingénierie web moderne s’étend de la publication statique ultra-rapide aux applications transactionnelles temps réel réparties. Ce laboratoire propose des implémentations complètes et prêtes pour la production des 11 archétypes web fondamentaux.',
      highlights: [
        '11 archétypes interactifs fonctionnels avec UX réaliste et zéro simulation.',
        'Décomposition architecturale en 5 couches : Présentation, État Client, API, Base de données, et Cache.',
        'Modélisation des menaces de sécurité OWASP Top 10 et modèles de remédiation éprouvés.',
        'Défis étudiants progressifs : Échauffement, Défi Principal et Projet Capstone Avancé.',
      ],
    },
    navigation: {
      title: '2. Guide d’Interface & de Navigation',
      desc: 'Basculez facilement entre les modèles, les simulateurs d’écrans et les analyses techniques.',
      steps: [
        {
          title: 'Navigateur de Programme Latéral',
          detail: 'Filtrez les modèles par catégorie (Sites Web vs Applications Web) ou utilisez la recherche pour cibler des modèles précis (SSG, SSR, RBAC, etc.).',
        },
        {
          title: 'Sélecteur de Mode Supérieur',
          detail: 'Naviguez entre l’Aperçu Interactif, l’Architecture & Stack, la Sécurité & Menaces, les Défis Étudiants et le Code Source.',
        },
        {
          title: 'Simulateur d’Appareils (Viewports)',
          detail: 'Testez la fluidité responsive en direct sur Ordinateur (100%), Tablette (768px) et Mobile (375px).',
        },
        {
          title: 'Copie de Code Source',
          detail: 'Cliquez sur "Copier le Blueprint" pour récupérer des composants TypeScript modulaires directement dans votre éditeur.',
        },
      ],
    },
    archetypes: {
      title: '3. Catalogue des 11 Archétypes',
      desc: 'Explorez les deux grandes familles du web : les Sites de Contenu et les Applications Transactionnelles.',
      websites: [
        { name: 'Blog / Site de Contenu', pattern: 'SSG + ISR', desc: 'Indicateur de lecture, parseur AST markdown, taxonomie et métadonnées SEO.' },
        { name: 'Boutique E-commerce', pattern: 'Hybride (SSG + CSR)', desc: 'Filtres à facettes, tiroir de panier dynamique, codes promo et machine à états de paiement.' },
        { name: 'Portfolio Professionnel', pattern: 'Jamstack / SSG', desc: 'Études de cas en modal, optimisation Core Web Vitals et formulaire de contact.' },
        { name: 'Site d’Entreprise B2B', pattern: 'SSR + Headless CMS', desc: 'Calculateur interactif de ROI, matrice de services, témoignages et prise de rendez-vous.' },
        { name: 'Page d’Atterrissage (Landing)', pattern: 'SSG Edge Cached', desc: 'Compteur de lancement en direct, tarification Mensuel/Annuel (-20%) et capture de prospects.' },
        { name: 'Wiki Éducatif & Documentation', pattern: 'SSG Indexé pour la Recherche', desc: 'Hiérarchie pliable, recherche instantanée, blocs de code et télémétrie de satisfaction.' },
      ],
      webapps: [
        { name: 'Tableau de Bord SaaS', pattern: 'CSR + Télémétrie Temps Réel', desc: 'Histogrammes de requêtes, génération de clés API sécurisées et gestion RBAC des membres.' },
        { name: 'Réseau Social d’Ingénieurs', pattern: 'CSR Optimiste + Événements', desc: 'Anneaux de stories, éditeur avec extraits de code, likes optimistes et fils de commentaires.' },
        { name: 'Portail d’Accès Sécurisé (RBAC)', pattern: 'Portail Entreprise / SSO', desc: 'Changement de rôle (Étudiant, Professeur, Admin), téléchargements signés et badges QR.' },
        { name: 'Tableau Kanban de Projet', pattern: 'Machine à États Kanban', desc: 'Sprint en 4 étapes, vélocité en points d’histoire, priorités et transitions atomiques.' },
        { name: 'Plateforme E-learning LMS', pattern: 'Moteur de Cours Interactif', desc: 'Lecteur vidéo simulé, liste de leçons, quiz noté avec explications et certificat de réussite.' },
      ],
    },
    modes: {
      title: '4. Modes d’Exploration du Laboratoire',
      desc: 'Chaque archétype intègre 5 perspectives pédagogiques dédiées.',
      items: [
        { name: 'Aperçu Interactif', desc: 'Interagissez avec le composant réel, testez les formulaires et vérifiez l’ergonomie tactile.' },
        { name: 'Architecture & Stack', desc: 'Analysez l’architecture complète sur 5 couches : Présentation, État, API, Données et Cache.' },
        { name: 'Sécurité & Menaces', desc: 'Étudiez les failles OWASP Top 10, les vecteurs d’attaque et les solutions de remédiation en code.' },
        { name: 'Défis Étudiants', desc: 'Réalisez des exercices de code gradués : Échauffement, Défi Majeur et Projet Capstone.' },
        { name: 'Code Source Scaffold', desc: 'Consultez et copiez les composants TypeScript prêts à l’emploi pour vos propres projets.' },
      ],
    },
    studentGuide: {
      title: '5. Parcours Conseillé pour les Étudiants',
      desc: 'Recommandations pour maximiser votre apprentissage en génie logiciel.',
      tips: [
        'Comparez les paradigmes : comprenez pourquoi un Wiki utilise du SSG pur tandis qu’un Kanban nécessite un état transactionnel mutable.',
        'Analysez la sécurité en amont : inspectez toujours l’onglet Sécurité avant de concevoir vos endpoints API.',
        'Vérifiez la responsivité : testez chaque modèle sur le format Mobile (375px) pour observer l’adaptation des composants.',
        'Pratiquez sur votre machine : clonez le projet et résolvez les défis proposés pour ancrer vos compétences.',
      ],
    },
    faq: {
      title: '6. Questions Fréquentes (FAQ)',
      items: [
        {
          q: 'Quelle est la différence fondamentale entre Site Web et Application Web ?',
          a: 'Les sites web priorisent la diffusion de contenu, le SEO et le cache CDN global. Les applications web gèrent des mutations d’état riches, des transactions multi-utilisateurs et des autorisations fines.',
        },
        {
          q: 'Puis-je réutiliser ces modèles dans mes projets universitaires ou professionnels ?',
          a: 'Oui, tous les modèles et blueprints sont conçus sous licence éducative ouverte pour servir de référence architecturale.',
        },
      ],
    },
  },
};

// German (Deutsch)
export const deGuide: UserGuideContent = {
  title: 'Web-Entwicklungs-Archetypen Benutzerhandbuch',
  subtitle: 'Meistern Sie die 11 grundlegenden Architekturmuster moderner Websysteme',
  badge: 'Interaktive Lehr-Referenz',
  tableOfContents: {
    overview: '1. Pädagogische Übersicht',
    navigation: '2. Benutzeroberfläche & Navigation',
    archetypes: '3. Katalog der 11 Archetypen',
    modes: '4. Erkundungsmodi',
    studentGuide: '5. Leitfaden für Studierende',
    faq: '6. Häufig gestellte Fragen (FAQ)',
  },
  sections: {
    overview: {
      title: '1. Pädagogische Übersicht & Zweck',
      desc: 'Moderne Webentwicklung reicht von statischen, schnellen Websites bis hin zu hochgradig interaktiven, transaktionalen Webanwendungen. Dieses Labor bietet 11 praxisnahe Produktions-Archetypen.',
      highlights: [
        '11 interaktive Archetypen mit echtem State und reaktiver Benutzeroberfläche.',
        '5-Schichten-Architektur: Präsentation, Client-Status, API, Datenbank und Cache.',
        'OWASP Top 10 Bedrohungsanalyse und praxiserprobte Sicherheitsmuster.',
        'Strukturierte Programmieraufgaben für Studierende: Warmup, Core Challenge und Capstone.',
      ],
    },
    navigation: {
      title: '2. Navigation & Bedienung',
      desc: 'Wechseln Sie mühelos zwischen Archetypen, Display-Größen und tiefgehenden Architekturanalysen.',
      steps: [
        { title: 'Seitenleiste', detail: 'Filtern Sie nach Websites vs. Web-Apps oder suchen Sie nach Rendering-Mustern wie SSG, SSR oder RBAC.' },
        { title: 'Modus-Umschalter', detail: 'Wechseln Sie zwischen Vorschau, Architektur, Sicherheit, Aufgaben und Quellcode.' },
        { title: 'Gerätesimulator', detail: 'Testen Sie Desktop (100%), Tablet (768px) und Smartphone (375px) in Echtzeit.' },
        { title: 'Blueprint-Export', detail: 'Kopieren Sie saubere TypeScript-Komponenten direkt in Ihre lokale Entwicklungsumgebung.' },
      ],
    },
    archetypes: {
      title: '3. Die 11 Web-Archetypen im Detail',
      desc: 'Gegenüberstellung von inhaltsorientierten Websites und transaktionsbasierten Web-Apps.',
      websites: [
        { name: 'Blog / Magazin', pattern: 'SSG + ISR', desc: 'Lesefortschrittsanzeige, Markdown-Parser, Taxonomie und SEO-Metadaten.' },
        { name: 'E-Commerce Shop', pattern: 'Hybrid (SSG + CSR)', desc: 'Attribut-Filterung, Slide-Over Warenkorb, Rabattberechnung und Checkout-Zustandsautomat.' },
        { name: 'Portfolio', pattern: 'Jamstack / SSG', desc: 'Projekt-Fallstudien in Modals, Core Web Vitals Optimierung und Kontaktformular.' },
        { name: 'Unternehmens-Website', pattern: 'SSR + Headless CMS', desc: 'Interaktiver ROI-Rechner, Leistungsübersicht, Kundenstimmen und Terminbuchung.' },
        { name: 'Landingpage', pattern: 'Edge Cached SSG', desc: 'Produkt-Countdown, Jahresrabatt-Umschalter (-20%) und Lead-Erfassung.' },
        { name: 'Bildungs-Wiki & Docs', pattern: 'Suchindexiertes SSG', desc: 'Klappbare Navigation, Echtzeit-Suche, Code-Blöcke und Feedback-Zähler.' },
      ],
      webapps: [
        { name: 'SaaS-Dashboard', pattern: 'CSR + Echtzeit-Telemetrie', desc: 'Latenz-Histogramme, kryptografische API-Schlüsselgenerierung und RBAC-Teamverwaltung.' },
        { name: 'Social-Media-Netzwerk', pattern: 'Optimistisches CSR', desc: 'Story-Ringe, Code-Snippet-Editor, optimistische Likes und verschachtelte Kommentare.' },
        { name: 'Rollenbasiertes Portal', pattern: 'SSO / RBAC Enterprise', desc: 'Rollenwechsel (Student, Dozent, Admin), signierte Download-Links und QR-Verifizierung.' },
        { name: 'Projektmanagement-Kanban', pattern: 'Kanban Zustandsautomat', desc: '4-stufiges Sprint-Board, Story-Points, Prioritäten und atomare Statuswechsel.' },
        { name: 'E-Learning LMS Plattform', pattern: 'Interaktiver Kurs-Engine', desc: 'Videosimulation, Fortschritts-Checkliste, Wissenstest mit Auswertung und Zertifikat.' },
      ],
    },
    modes: {
      title: '4. Lern- und Analysemodi',
      desc: 'Fünf didaktische Perspektiven für jeden Web-Archetyp.',
      items: [
        { name: 'Interaktive Vorschau', desc: 'Erleben Sie die Live-Benutzeroberfläche und testen Sie alle Interaktionen.' },
        { name: 'Architektur & Stack', desc: 'Analysieren Sie Schichtenarchitektur, Datenfluss und empfohlene Technologien.' },
        { name: 'Sicherheit & Bedrohungen', desc: 'Lernen Sie OWASP-Sicherheitsrisiken und Schutzmaßnahmen anhand von Beispielcode kennen.' },
        { name: 'Studenten-Aufgaben', desc: 'Lösen Sie praxisnahe Programmieraufgaben in drei Schwierigkeitsstufen.' },
        { name: 'Quellcode-Gerüst', desc: 'Vollständiger TypeScript-Startercode zum einfachen Kopieren und Weiterentwickeln.' },
      ],
    },
    studentGuide: {
      title: '5. Leitfaden für Studierende',
      desc: 'Didaktische Empfehlungen für den maximalen Lernerfolg.',
      tips: [
        'Vergleichen Sie statische und dynamische Paradigmen gezielt miteinander.',
        'Überprüfen Sie Sicherheitsaspekte stets vor dem Schreiben von Backend-Endpunkten.',
        'Achten Sie auf Responsive Design und Barrierefreiheit auf Mobilgeräten.',
        'Lösen Sie die bereitgestellten Aufgaben schrittweise auf Ihrem eigenen Rechner.',
      ],
    },
    faq: {
      title: '6. Häufig gestellte Fragen (FAQ)',
      items: [
        {
          q: 'Was unterscheidet eine Website von einer Web-App?',
          a: 'Websites fokussieren sich auf Inhaltsbereitstellung und SEO via Edge-Caching. Web-Apps verarbeiten dynamischen Client-State, Benutzerberechtigungen und Transaktionen.',
        },
      ],
    },
  },
};

// Spanish (Español)
export const esGuide: UserGuideContent = {
  title: 'Guía de Usuario y Referencia de Arquetipos Web',
  subtitle: 'Domine los 11 patrones arquitectónicos fundamentales de los sistemas web modernos',
  badge: 'Referencia Educativa Interactiva',
  tableOfContents: {
    overview: '1. Resumen Pedagógico',
    navigation: '2. Interfaz y Navegación',
    archetypes: '3. Catálogo de los 11 Arquetipos',
    modes: '4. Modos de Exploración',
    studentGuide: '5. Ruta de Aprendizaje para Estudiantes',
    faq: '6. Preguntas Frecuentes (FAQ)',
  },
  sections: {
    overview: {
      title: '1. Resumen Pedagógico y Propósito',
      desc: 'El desarrollo web actual abarca desde sitios estáticos de entrega ultrarrápida hasta aplicaciones distribuidas en tiempo real. Este laboratorio ofrece 11 arquetipos interactivos listos para producción.',
      highlights: [
        '11 arquetipos interactivos con UX realista sin datos simulados ficticios.',
        'Desglose en 5 capas: Presentación, Estado Cliente, API, Base de Datos y Caché.',
        'Modelado de amenazas OWASP Top 10 y patrones de mitigación verificados.',
        'Retos de código estructurados: Calentamiento, Desafío Principal y Proyecto Capstone.',
      ],
    },
    navigation: {
      title: '2. Guía de Interfaz y Navegación',
      desc: 'Navegue con fluidez entre plantillas, resoluciones de pantalla y análisis arquitectónicos.',
      steps: [
        { title: 'Navegador Lateral', detail: 'Filtre por Sitios Web o Aplicaciones Web, o use el buscador para localizar patrones como SSG, SSR o RBAC.' },
        { title: 'Selector de Modos', detail: 'Alterne entre Vista Interactiva, Arquitectura, Seguridad, Retos y Código Fuente.' },
        { title: 'Simulador de Dispositivos', detail: 'Compruebe el diseño responsivo en Escritorio (100%), Tableta (768px) y Móvil (375px).' },
        { title: 'Copia de Plantillas', detail: 'Haga clic en "Copiar Blueprint" para llevar código TypeScript limpio a su entorno de desarrollo.' },
      ],
    },
    archetypes: {
      title: '3. Catálogo de los 11 Arquetipos',
      desc: 'Comparativa entre Sitios de Contenido y Aplicaciones Web Transaccionales.',
      websites: [
        { name: 'Blog / Sitio de Contenido', pattern: 'SSG + ISR', desc: 'Barra de progreso de lectura, parser markdown AST, taxonomías y SEO estructurado.' },
        { name: 'Tienda E-commerce', pattern: 'Híbrido (SSG + CSR)', desc: 'Filtros facetados, carrito deslizable, cupones de descuento y máquina de estados de pago.' },
        { name: 'Portafolio Profesional', pattern: 'Jamstack / SSG', desc: 'Casos de estudio en modales, optimización Core Web Vitals y formulario de contacto.' },
        { name: 'Sitio Corporativo B2B', pattern: 'SSR + Headless CMS', desc: 'Calculadora interactiva de ROI, catálogo de servicios, testimonios y reserva de reuniones.' },
        { name: 'Página de Aterrizaje (Landing)', pattern: 'SSG Edge Cached', desc: 'Cuenta atrás de lanzamiento, selector de precios mensual/anual (-20%) y captura de leads.' },
        { name: 'Wiki Educativa y Documentación', pattern: 'SSG con Índice de Búsqueda', desc: 'Navegación colapsable, búsqueda algorítmica instantánea, bloques de código y feedback.' },
      ],
      webapps: [
        { name: 'Panel de Control SaaS', pattern: 'CSR + Telemetría en Tiempo Real', desc: 'Histogramas de latencia, generador de claves API seguras y gestión de permisos RBAC.' },
        { name: 'Red Social para Desarrolladores', pattern: 'CSR Optimista + Eventos', desc: 'Historias efímeras, editor con snippets de código, likes optimistas y comentarios anidados.' },
        { name: 'Portal de Acceso Restringido', pattern: 'SSO / RBAC Empresarial', desc: 'Cambio de rol (Estudiante, Profesor, Admin), descargas seguras con token y credencial QR.' },
        { name: 'Tablero Kanban de Proyectos', pattern: 'Máquina de Estados Kanban', desc: 'Sprint en 4 columnas, puntos de historia, prioridades y transiciones atómicas de tareas.' },
        { name: 'Plataforma E-learning LMS', pattern: 'Motor de Cursos Interactivo', desc: 'Reproductor de video simulado, lista de lecciones, cuestionario evaluado y certificado.' },
      ],
    },
    modes: {
      title: '4. Modos de Exploración',
      desc: 'Cinco enfoques pedagógicos integrados en cada arquetipo.',
      items: [
        { name: 'Vista Interactiva', desc: 'Interactúe con la interfaz real y pruebe todos los componentes en vivo.' },
        { name: 'Arquitectura y Stack', desc: 'Analice la división en capas, el flujo de datos y el stack tecnológico recomendado.' },
        { name: 'Seguridad y Amenazas', desc: 'Estudie vulnerabilidades OWASP y ejemplos de código defensivo.' },
        { name: 'Retos de Programación', desc: 'Resuelva ejercicios prácticos divididos en tres niveles de dificultad.' },
        { name: 'Código Base Scaffold', desc: 'Examine y copie componentes TypeScript listos para usar.' },
      ],
    },
    studentGuide: {
      title: '5. Recomendaciones para Estudiantes',
      desc: 'Consejos clave para potenciar su aprendizaje de ingeniería de software.',
      tips: [
        'Compare las diferencias arquitectónicas entre un sitio estático y una aplicación transaccional.',
        'Inspeccione la pestaña de Seguridad antes de diseñar rutas de backend o bases de datos.',
        'Pruebe siempre el diseño en resolución móvil (375px) para asegurar una óptima experiencia táctil.',
        'Clone el proyecto y resuelva los retos en su editor local.',
      ],
    },
    faq: {
      title: '6. Preguntas Frecuentes (FAQ)',
      items: [
        {
          q: '¿Cuál es la diferencia principal entre Sitio Web y Aplicación Web?',
          a: 'Los sitios web priorizan la velocidad de entrega de contenidos, SEO y almacenamiento en caché CDN. Las aplicaciones web gestionan mutaciones dinámicas de estado, permisos de usuario y transacciones en tiempo real.',
        },
      ],
    },
  },
};

// Italian (Italiano)
export const itGuide: UserGuideContent = {
  title: 'Guida Utente e Riferimento Archetipi Web',
  subtitle: 'Padroneggia gli 11 pattern architetturali fondamentali dei moderni sistemi web',
  badge: 'Riferimento Didattico Interattivo',
  tableOfContents: {
    overview: '1. Panoramica Didattica',
    navigation: '2. Interfaccia e Navigazione',
    archetypes: '3. Catalogo degli 11 Archetipi',
    modes: '4. Modalità di Esplorazione',
    studentGuide: '5. Percorso per Studenti',
    faq: '6. Domande Frequenti (FAQ)',
  },
  sections: {
    overview: {
      title: '1. Panoramica Didattica e Obiettivi',
      desc: 'Lo sviluppo web contemporaneo spazia dai siti statici ultra-veloci alle complesse applicazioni web distribuite in tempo reale. Questo laboratorio offre 11 archetipi completi di livello enterprise.',
      highlights: [
        '11 archetipi interattivi pronti all’uso con UX realistica.',
        'Analisi su 5 livelli: Presentazione, Stato Client, API, Database e Caching.',
        'Modellazione delle minacce OWASP Top 10 con codice di mitigazione certificato.',
        'Sfide di programmazione graduate: Warmup, Core Challenge e Progetto Capstone.',
      ],
    },
    navigation: {
      title: '2. Guida all’Interfaccia e Navigazione',
      desc: 'Passa agevolmente da un archetipo all’altro, testa i breakpoint e studia l’architettura software.',
      steps: [
        { title: 'Menu Laterale', detail: 'Filtra per Siti Web o Web App oppure cerca schemi specifici (SSG, SSR, RBAC).' },
        { title: 'Selettore Modalità', detail: 'Passa dall’anteprima interattiva alle schede Architettura, Sicurezza, Esercizi e Codice.' },
        { title: 'Simulatore Dispositivi', detail: 'Testa la reattività su Desktop (100%), Tablet (768px) e Smartphone (375px).' },
        { title: 'Copia Blueprint', detail: 'Copia componenti TypeScript modulari per iniziare i tuoi progetti.' },
      ],
    },
    archetypes: {
      title: '3. Catalogo degli 11 Archetipi',
      desc: 'Confronto diretto tra Siti di Contenuto e Applicazioni Web Transazionali.',
      websites: [
        { name: 'Blog / Sito Contenuti', pattern: 'SSG + ISR', desc: 'Avanzamento lettura, parser markdown, categorie e metadati SEO.' },
        { name: 'Negozio E-commerce', pattern: 'Ibrido (SSG + CSR)', desc: 'Filtri a faccette, carrello a comparsa, coupon sconto e checkout a stati.' },
        { name: 'Portfolio Professionale', pattern: 'Jamstack / SSG', desc: 'Casi studio in finestre modali, Core Web Vitals e form di contatto.' },
        { name: 'Sito Aziendale B2B', pattern: 'SSR + Headless CMS', desc: 'Calcolatore ROI, matrice servizi, testimonianze e prenotazione consulenze.' },
        { name: 'Landing Page di Lancio', pattern: 'SSG Edge Cached', desc: 'Conto alla rovescia, selettore prezzi con sconto 20% e lead capture.' },
        { name: 'Wiki Didattica e Documentazione', pattern: 'SSG Indicizzato', desc: 'Menu ad albero, ricerca rapida, blocchi di codice e valutazione utilità.' },
      ],
      webapps: [
        { name: 'Dashboard SaaS', pattern: 'CSR + Telemetria Realtime', desc: 'Istogrammi latenza, generatore chiavi API e gestione permessi RBAC.' },
        { name: 'Social Network per Sviluppatori', pattern: 'CSR Ottimistico', desc: 'Storie, editor con snippet di codice, like ottimistici e commenti nidificati.' },
        { name: 'Portale a Ruoli (RBAC)', pattern: 'SSO / Portale Enterprise', desc: 'Cambio profilo (Studente, Docente, Admin), download protetti e badge QR.' },
        { name: 'Kanban di Gestione Progetti', pattern: 'Macchina a Stati Kanban', desc: 'Board a 4 colonne, story point, priorità e transizioni atomiche.' },
        { name: 'Piattaforma E-learning LMS', pattern: 'Motore Corsi Interattivo', desc: 'Simulatore video, avanzamento lezioni, quiz interattivo e attestato.' },
      ],
    },
    modes: {
      title: '4. Modalità di Apprendimento',
      desc: 'Cinque prospettive didattiche integrate.',
      items: [
        { name: 'Anteprima Interattiva', desc: 'Interagisci direttamente con l’interfaccia funzionante.' },
        { name: 'Architettura & Stack', desc: 'Studia la suddivisione a livelli e i flussi di dati.' },
        { name: 'Sicurezza & Minacce', desc: 'Approfondisci le vulnerabilità OWASP e le relative correzioni.' },
        { name: 'Sfide per Studenti', desc: 'Mettiti alla prova con compiti pratici a difficoltà crescente.' },
        { name: 'Codice Sorgente', desc: 'Esamina e copia codice TypeScript pulito e moderno.' },
      ],
    },
    studentGuide: {
      title: '5. Consigli per gli Studenti',
      desc: 'Strategie per un apprendimento efficace in ingegneria del software.',
      tips: [
        'Confronta sempre le scelte di rendering in base all’obiettivo del progetto.',
        'Progetta la sicurezza prima di scrivere codice applicativo.',
        'Verifica l’accessibilità e i target di tocco su schermi mobili da 375px.',
      ],
    },
    faq: {
      title: '6. Domande Frequenti (FAQ)',
      items: [
        {
          q: 'Qual è la differenza chiave tra Sito Web e Web App?',
          a: 'I siti web privilegiano la distribuzione statica e la SEO, mentre le web app gestiscono stati complessi e flussi transazionali.',
        },
      ],
    },
  },
};

// Portuguese (Português)
export const ptGuide: UserGuideContent = {
  title: 'Guia do Usuário e Referência de Arquétipos Web',
  subtitle: 'Domine os 11 padrões arquiteturais fundamentais dos sistemas web modernos',
  badge: 'Referência Educacional Interativa',
  tableOfContents: {
    overview: '1. Visão Geral Pedagógica',
    navigation: '2. Interface e Navegação',
    archetypes: '3. Catálogo dos 11 Arquétipos',
    modes: '4. Modos de Exploração',
    studentGuide: '5. Roteiro de Aprendizagem',
    faq: '6. Perguntas Frequentes (FAQ)',
  },
  sections: {
    overview: {
      title: '1. Visão Geral Pedagógica e Propósito',
      desc: 'O desenvolvimento web contemporâneo compreende desde portais estáticos ultrarrápidos até aplicações transacionais distribuídas em tempo real. Este laboratório fornece 11 implementações completas.',
      highlights: [
        '11 arquétipos interativos funcionais com UX autêntica.',
        'Desconstrução em 5 camadas: Apresentação, Estado, API, Banco de Dados e Cache.',
        'Modelagem de ameaças OWASP Top 10 e padrões defensivos comprovados.',
        'Desafios de código graduados: Aquecimento, Desafio Central e Projeto Final.',
      ],
    },
    navigation: {
      title: '2. Guia de Interface e Navegação',
      desc: 'Alterne entre templates, simuladores de tela e análises técnicas completas.',
      steps: [
        { title: 'Menu Lateral', detail: 'Filtre por Sites ou Aplicações Web ou pesquise padrões como SSG, SSR e RBAC.' },
        { title: 'Seletor de Modo', detail: 'Alterne entre Prévia Interativa, Arquitetura, Segurança, Exercícios e Código.' },
        { title: 'Simulador de Dispositivos', detail: 'Teste a responsividade em Desktop (100%), Tablet (768px) e Celular (375px).' },
        { title: 'Exportação de Código', detail: 'Copie componentes TypeScript limpos para o seu ambiente local.' },
      ],
    },
    archetypes: {
      title: '3. Catálogo dos 11 Arquétipos Web',
      desc: 'Comparativo entre Sites de Conteúdo e Aplicações Web Transacionais.',
      websites: [
        { name: 'Blog / Site de Conteúdo', pattern: 'SSG + ISR', desc: 'Progresso de leitura, parser markdown AST, taxonomia e metadados SEO.' },
        { name: 'Loja E-commerce', pattern: 'Híbrido (SSG + CSR)', desc: 'Filtros facetados, carrinho deslizante, cupons e máquina de estados de checkout.' },
        { name: 'Portfólio Profissional', pattern: 'Jamstack / SSG', desc: 'Estudos de caso em modais, otimização Core Web Vitals e formulário de contato.' },
        { name: 'Site Corporativo B2B', pattern: 'SSR + Headless CMS', desc: 'Calculadora de ROI, matriz de serviços, depoimentos e agendamento de reuniões.' },
        { name: 'Página de Lançamento (Landing)', pattern: 'SSG Edge Cached', desc: 'Contador regressivo, planos anual/mensal (-20%) e captação de leads.' },
        { name: 'Wiki Educacional e Docs', pattern: 'SSG Indexado', desc: 'Navegação colapsável, busca instantânea, blocos de código e telemetria de feedback.' },
      ],
      webapps: [
        { name: 'Painel de Controle SaaS', pattern: 'CSR + Telemetria em Tempo Real', desc: 'Histogramas de latência, geração de chaves de API e gestão RBAC.' },
        { name: 'Rede Social para Desenvolvedores', pattern: 'CSR Otimista', desc: 'Stories, editor de código, curtidas otimistas e comentários encadeados.' },
        { name: 'Portal com Controle de Acesso', pattern: 'SSO / RBAC Corporativo', desc: 'Troca de perfil (Aluno, Professor, Admin), downloads seguros e crachá QR.' },
        { name: 'Quadro Kanban de Projetos', pattern: 'Máquina de Estados Kanban', desc: 'Quadro de sprint com 4 colunas, story points, prioridades e transições atômicas.' },
        { name: 'Plataforma E-learning LMS', pattern: 'Motor de Cursos Interativo', desc: 'Simulador de vídeo, progresso de aulas, testes com nota e certificado.' },
      ],
    },
    modes: {
      title: '4. Modos de Exploração',
      desc: 'Cinco abordagens didáticas especializadas.',
      items: [
        { name: 'Prévia Interativa', desc: 'Interaja diretamente com a aplicação em execução.' },
        { name: 'Arquitetura e Stack', desc: 'Examine a arquitetura em camadas e o fluxo de dados.' },
        { name: 'Segurança e Ameaças', desc: 'Aprenda vulnerabilidades OWASP e padrões de código seguro.' },
        { name: 'Desafios para Alunos', desc: 'Pratique com exercícios em 3 níveis de complexidade.' },
        { name: 'Código Fonte Scaffold', desc: 'Copie código TypeScript pronto para produção.' },
      ],
    },
    studentGuide: {
      title: '5. Recomendações para Estudantes',
      desc: 'Boas práticas para impulsionar seu aprendizado em engenharia de software.',
      tips: [
        'Compreenda o motivo de cada estratégia de renderização (SSG vs SSR vs CSR).',
        'Analise a segurança da aplicação antes de construir as rotas de backend.',
        'Valide o layout em telas de 375px para garantir ótima experiência móvel.',
      ],
    },
    faq: {
      title: '6. Perguntas Frequentes (FAQ)',
      items: [
        {
          q: 'Qual é a principal diferença entre um Site e uma Aplicação Web?',
          a: 'Sites web focam em entrega estática, SEO e cache em CDN. Aplicações web gerenciam mutações dinâmicas de estado, usuários e transações.',
        },
      ],
    },
  },
};

// Russian (Русский)
export const ruGuide: UserGuideContent = {
  title: 'Руководство пользователя и Справочник Веб-Архетипов',
  subtitle: 'Изучение 11 фундаментальных архитектурных паттернов современных веб-систем',
  badge: 'Интерактивный Учебный Справочник',
  tableOfContents: {
    overview: '1. Педагогический обзор',
    navigation: '2. Интерфейс и навигация',
    archetypes: '3. Каталог 11 архетипов',
    modes: '4. Режимы исследования',
    studentGuide: '5. Руководство для студентов',
    faq: '6. Часто задаваемые вопросы (FAQ)',
  },
  sections: {
    overview: {
      title: '1. Педагогический обзор и цели',
      desc: 'Современная веб-разработка охватывает спектр от статических сайтов до распределенных приложений реального времени. Лаборатория содержит 11 полнофункциональных архетипов.',
      highlights: [
        '11 интерактивных архетипов с реалистичным состоянием и интерфейсом.',
        '5-уровневая архитектура: Презентация, Состояние клиента, API, База данных и Кэш.',
        'Моделирование угроз OWASP Top 10 и практические примеры защитного кода.',
        'Практические задачи для студентов: Разминка, Основное задание и Дипломный проект.',
      ],
    },
    navigation: {
      title: '2. Руководство по интерфейсу и навигации',
      desc: 'Удобное переключение между шаблонами, симулятором экранов и архитектурным анализом.',
      steps: [
        { title: 'Боковая панель', detail: 'Фильтрация по сайтам/веб-приложениям или поиск паттернов (SSG, SSR, RBAC).' },
        { title: 'Переключатель режимов', detail: 'Переход между интерактивным превью, архитектурой, безопасностью, задачами и кодом.' },
        { title: 'Симулятор устройств', detail: 'Тестирование адаптивности на ПК (100%), планшете (768px) и смартфоне (375px).' },
        { title: 'Копирование кода', detail: 'Копируйте готовые модульные компоненты на TypeScript в свой проект.' },
      ],
    },
    archetypes: {
      title: '3. Каталог 11 Веб-Архетипов',
      desc: 'Сравнение контентных сайтов и транзакционных веб-приложений.',
      websites: [
        { name: 'Блог / Контентный сайт', pattern: 'SSG + ISR', desc: 'Прогресс чтения, парсер Markdown AST, таксономия и SEO-разметка.' },
        { name: 'Интернет-магазин', pattern: 'Гибрид (SSG + CSR)', desc: 'Фасетные фильтры, выдвижная корзина, скидки и автомат состояний оформления.' },
        { name: 'Портфолио', pattern: 'Jamstack / SSG', desc: 'Кейсы в модальных окнах, оптимизация Core Web Vitals и форма обратной связи.' },
        { name: 'Корпоративный сайт B2B', pattern: 'SSR + Headless CMS', desc: 'Интерактивный калькулятор ROI, матрица услуг, отзывы и запись на встречу.' },
        { name: 'Целевая страница (Landing)', pattern: 'Edge Cached SSG', desc: 'Таймер запуска, переключатель тарифов со скидкой 20% и сбор лидов.' },
        { name: 'Образовательная Вики и Документация', pattern: 'SSG с поисковым индексом', desc: 'Древовидная навигация, моментальный поиск, блоки кода и оценка полезности.' },
      ],
      webapps: [
        { name: 'SaaS-панель управления', pattern: 'CSR + Поток телеметрии', desc: 'Гистограммы задержек, генерация защищенных API-ключей и RBAC доступ.' },
        { name: 'Социальная сеть для инженеров', pattern: 'Оптимистичный CSR', desc: 'Истории, редактор с фрагментами кода, оптимистичные лайки и ветки комментариев.' },
        { name: 'Портал с контролем доступа (RBAC)', pattern: 'SSO / Корпоративный портал', desc: 'Смена ролей (Студент, Преподаватель, Админ), подписанные ссылки и QR-верификация.' },
        { name: 'Kanban-доска управления проектами', pattern: 'Автомат состояний Kanban', desc: 'Спринт-доска на 4 колонки, стори-поинты, приоритеты и атомарные переходы.' },
        { name: 'Платформа онлайн-обучения (LMS)', pattern: 'Интерактивный курс', desc: 'Симулятор видеоплеера, прогресс уроков, тесты с проверкой и сертификат.' },
      ],
    },
    modes: {
      title: '4. Режимы исследования',
      desc: 'Пять обучающих перспектив для каждого архетипа.',
      items: [
        { name: 'Интерактивное превью', desc: 'Работайте с живым веб-интерфейсом и проверяйте взаимодействие элементов.' },
        { name: 'Архитектура и стек', desc: 'Изучайте послойную архитектуру и потоки данных.' },
        { name: 'Безопасность и угрозы', desc: 'Анализируйте риски OWASP и примеры защитного кода.' },
        { name: 'Задания для студентов', desc: 'Решайте практические задачи разного уровня сложности.' },
        { name: 'Исходный каркас кода', desc: 'Готовые к использованию TypeScript шаблоны.' },
      ],
    },
    studentGuide: {
      title: '5. Советы для студентов',
      desc: 'Рекомендации для эффективного освоения веб-инженерии.',
      tips: [
        'Сравнивайте принципы рендеринга (SSG, SSR, CSR) для разных задач.',
        'Изучайте безопасность до написания серверного кода.',
        'Тестируйте мобильную верстку на экранах шириной 375px.',
      ],
    },
    faq: {
      title: '6. Часто задаваемые вопросы (FAQ)',
      items: [
        {
          q: 'В чем ключевое отличие Сайта от Веб-приложения?',
          a: 'Сайты оптимизированы для доставки контента, SEO и CDN-кэширования. Веб-приложения обрабатывают сложное клиентское состояние, права доступа и транзакции.',
        },
      ],
    },
  },
};
