/**
 * ============================================================================
 * SYSTÈME DE TRADUCTION - FICHIER CENTRALISÉ
 * ============================================================================
 *
 * Ce fichier contient toutes les traductions de l'application.
 * Il définit la structure TypeScript des traductions et les textes en FR/EN.
 *
 * Utilisation dans les composants :
 *   const { t } = useLanguage();
 *   <h1>{t.home.title}</h1>
 */

// ============================================================================
// TYPES ET INTERFACES
// ============================================================================

/**
 * Langues disponibles dans l'application
 * Pour ajouter une nouvelle langue, ajoutez-la ici et dans l'objet translations
 */
export type Language = "fr" | "en";

/**
 * Interface TypeScript définissant la structure complète des traductions
 * Cette interface garantit que toutes les traductions ont la même structure
 * et permet l'autocomplétion dans l'IDE
 */
export interface Translations {
  // ========================================================================
  // NAVIGATION - Textes utilisés dans le menu de navigation (Header)
  // ========================================================================
  nav: {
    home: string; // "ACCUEIL" / "HOME"
    about: string; // "BIO" / "BIO"
    music: string; // "MUSIC" / "MUSIC"
    videos: string; // "VIDEOS" / "VIDEOS"
    concerts: string; // "CONCERTS" / "CONCERTS"
    pedago: string; // "PEDAGO" / "PEDAGO"
    contact: string; // "CONTACT" / "CONTACT"
  };

  // ========================================================================
  // PAGE D'ACCUEIL - Textes de la section hero et des cartes
  // ========================================================================
  home: {
    title: string; // Titre principal de la page d'accueil
    subtitle: string; // Sous-titre (rôle de l'artiste)
    subtitle2: string; // Deuxième sous-titre (album)
    album: string; // Nom de l'album
    discoverMusic: string; // Texte du bouton "Découvrir la Musique"
    upcomingConcerts: string; // Texte du bouton "Prochains Concerts"

    // Sous-sections pour les cartes de la page d'accueil
    news: {
      title: string; // Titre de la carte News
      description: string; // Description de la carte News
      seeNews: string; // Lien "Voir les news →"
      supportProject: string; // Bouton "Soutenir le projet →"
    };
    about: {
      title: string; // Titre de la carte À Propos
      description: string; // Description de la carte À Propos
      learnMore: string; // Lien "En savoir plus →"
    };
    music: {
      title: string; // Titre de la carte Musique
      description: string; // Description de la carte Musique
      listenNow: string; // Bouton "Écouter maintenant →"
    };
    videos: {
      title: string; // Titre de la carte Vidéos
      description: string; // Description de la carte Vidéos
      seeVideos: string; // Lien "Voir les vidéos →"
    };
    concerts: {
      title: string; // Titre de la carte Concerts
      description: string; // Description de la carte Concerts
      seeDates: string; // Lien "Voir les dates →"
    };
    formation: {
      title: string; // Titre de la carte Formation
      description: string; // Description de la carte Formation
      seeCourses: string; // Lien "Voir les cours →"
    };
  };

  // ========================================================================
  // PAGE NEWS - Textes de la page dédiée aux actualités
  // ========================================================================
  news: {
    title: string; // Titre de la page (ex: "Contrast - Nouvel Album")
    description: string; // Description complète de l'actualité
    supportProject: string; // Bouton "Soutenir le projet →"
    discoverDiscography: string; // Bouton "Découvrir la discographie →"
    followMe: string; // Titre de la section réseaux sociaux
  };

  // ========================================================================
  // PAGE ABOUT (BIO) - Textes de la page biographique
  // ========================================================================
  about: {
    title: string; // Titre de la page (nom de l'artiste)
    bio: string; // Biographie complète de l'artiste
    discoverMusic: string; // Bouton "Découvrir la Musique →"
    seeVideos: string; // Bouton "Voir les vidéos →"
    followMe: string; // Titre de la section réseaux sociaux
  };

  // ========================================================================
  // PAGE PEDAGO - Textes de la page de formation
  // ========================================================================
  pedago: {
    title: string; // Titre de la page "Formation"
    description: string; // Description générale des cours
    courses: {
      // Cours de basse
      bass: {
        title: string; // "Basse Instrument"
        description: string; // Description du cours de basse
      };
      // Cours d'arrangement
      arrangement: {
        title: string; // "Arrangement"
        description: string; // Description du cours d'arrangement
      };
      // Cours de composition
      composition: {
        title: string; // "Composition"
        description: string; // Description du cours de composition
      };
    };
    contactMe: string; // Bouton "Me contacter" sur chaque carte de cours
  };

  // ========================================================================
  // FORMULAIRE DE CONTACT - Tous les textes du formulaire
  // ========================================================================
  contact: {
    // Labels des champs du formulaire
    name: string; // "Nom" / "Name"
    email: string; // "Email" / "Email"
    subject: string; // "Sujet" / "Subject"
    message: string; // "Message" / "Message"

    // Bouton d'envoi
    send: string; // "Envoyer" / "Send"
    sending: string; // "Envoi en cours..." / "Sending..." (état de chargement)

    // Options du select "Sujet"
    subjectOptions: {
      contact: string; // "Demande de contact" / "Contact request"
      collaboration: string; // "Demande de collaboration" / "Collaboration request"
      concert: string; // "Demande de concert" / "Concert request"
      press: string; // "Demande de presse" / "Press request"
      training: string; // "Demande de formation" / "Training request"
      other: string; // "Autre" / "Other"
    };

    // Messages de retour (succès/erreur)
    messages: {
      success: string; // Message de succès après envoi
      error: string; // Message d'erreur spécifique
      errorGeneric: string; // Message d'erreur générique
    };
  };

  // ========================================================================
  // PAGE DISCOGRAPHIE - Textes de la page de discographie
  // ========================================================================
  discographie: {
    title: string; // "Discographie" / "Discography"
    description: string; // Description de la page
    noCover: string; // "Pas de pochette" / "No cover"
    noAlbums: string; // "Aucun album disponible pour le moment." / "No albums available at the moment."
  };

  // ========================================================================
  // PAGE VIDEOS - Textes de la page des vidéos
  // ========================================================================
  videos: {
    title: string; // "Vidéos Live" / "Live Videos"
    description: string; // Description de la page
  };

  // ========================================================================
  // PAGE CHECKOUT - Textes de la page de checkout
  // ========================================================================
  checkout: {
    title: string; // "Récapitulatif de votre commande" / "Order Summary"
    selectedAlbum: string; // "Album sélectionné" / "Selected Album"
    orderInfo: string; // "Informations de commande" / "Order Information"
    noCover: string; // "Pas de pochette" / "No cover"
  };

  // ========================================================================
  // PAGE CONCERTS - Textes de la page des concerts
  // ========================================================================
    concerts: {
      title: string; // "Les concerts de Slim Abida" / "Slim Abida's Concerts"
      description: string; // "Tous les Concerts de Slim Abida" / "All Slim Abida's Concerts"
      noConcerts: string; // "Aucun concert disponible pour le moment." / "No concerts available at the moment."
    };
    notFound: {
      title: string; // "404 - Page non trouvée" / "404 - Page Not Found"
      description: string; // "La page que vous cherchez n'existe pas." / "The page you are looking for does not exist."
      homeButton: string; // "Retour à l'accueil" / "Back to Home"
    };
  }

// ============================================================================
// OBJET DES TRADUCTIONS
// ============================================================================

/**
 * Objet contenant toutes les traductions pour chaque langue
 * Structure : translations[langue][section][clé]
 * Exemple : translations.fr.home.title
 */
export const translations: Record<Language, Translations> = {
  // ========================================================================
  // TRADUCTIONS FRANÇAISES
  // ========================================================================
  fr: {
    nav: {
      home: "ACCUEIL",
      about: "BIO",
      music: "MUSIC",
      videos: "VIDEOS",
      concerts: "CONCERTS",
      pedago: "PEDAGO",
      contact: "CONTACT",
    },
    home: {
      title: "Slim Abida",
      subtitle: "Bassiste / Compositeur / Arrangeur",
      subtitle2: "Contrast Nouvel album",
      album: "Contrast Nouvel album",
      discoverMusic: "Découvrir la Musique",
      upcomingConcerts: "Prochains Concerts",
      news: {
        title: "News",
        description:
          "Découvrez les dernières nouvelles de Slim Abida. Contrast nouvel album N'hésitez pas à nous suivre sur les réseaux sociaux et à nous soutenir en contribuant à notre Crowdfunding.",
        seeNews: "Voir les news →",
        supportProject: "Soutenir le projet →",
      },
      about: {
        title: "À Propos",
        description:
          "Découvrez l'univers musical unique de Slim Abida, où le jazz rencontre la fusion dans une expérience sonore captivante. Une exploration artistique qui transcende les genres et les frontières.",
        learnMore: "En savoir plus →",
      },
      music: {
        title: "Musique",
        description:
          "Plongez dans la discographie de Slim Abida et explorez des compositions originales qui mêlent harmonieusement les influences jazz et fusion.",
        listenNow: "Écouter maintenant →",
      },
      videos: {
        title: "Vidéos",
        description:
          "Découvrez les vidéos de Slim Abida et profitez de ses performances live.",
        seeVideos: "Voir les vidéos →",
      },
      concerts: {
        title: "Concerts",
        description:
          "Ne manquez pas les prochaines dates de concert et vivez l'expérience live de Slim Abida Project.",
        seeDates: "Voir les dates →",
      },
      formation: {
        title: "Formation",
        description: "Découvrez les cours de formation de Slim Abida.",
        seeCourses: "Voir les cours →",
      },
    },
    news: {
      title: "Contrast - Nouvel Album",
      description:
        "Dans un monde où tout s'oppose et se complète, CONTRAST prend vie. Après Fréquences Basses (2020) et Asymétrie (2022), Slim Abida poursuit son exploration musicale, façonnant un univers où la beauté naît de la mise en évidence des contrastes qui jalonnent notre monde. Cet album est une immersion dans les dualités qui rythment nos existences : l'ombre et la lumière, l'amour et la haine, l'espoir et le désespoir, la justice et l'injustice. Chaque morceau est une facette d'un prisme émotionnel, une onde sonore oscillant entre harmonie et chaos, entre douceur et brutalité. Plus qu'un simple album, CONTRAST est une invitation à ressentir la complexité du monde au-delà des jugements binaires. Il ne tranche pas entre le bien et le mal, mais révèle toute la richesse et la profondeur sousjacentes. Il est ce point d'équilibre fragile entre les extrêmes, une quête d'harmonie au sein du tumulte.",
      supportProject: "Soutenir le projet →",
      discoverDiscography: "Découvrir la discographie →",
      followMe: "Suivez-moi",
    },
    about: {
      title: "Slim Abida",
      bio: "Slim Abida est un bassiste et compositeur tunisien, connu pour sa signature musicale singulière. En 2002, il co-fonde le groupe Melmoth, un projet de metal tunisien qui lui permet de se produire à l'international (Algérie, Maroc). En 2005, il rejoint le projet Goultrah Sound System, fusion de Gnawa, dub et reggae, qui rencontre un franc succès. Il collabore avec des artistes de renommée internationale tels que Richard Bona, Naïssam Jalal, Amine Bouhafa, Emel Mathlouthi ou encore Sabry Mosbah. En 2016, avec Jazz Oil, groupe de jazz-world dont il est le fondateur, il sort l'album Lamma. En 2020, il se lance en solo et publie Fréquences Basses, suivi d'Asymétrie en 2022. Il travaille actuellement sur son troisième album solo, Contrast.",
      discoverMusic: "Découvrir la Musique →",
      seeVideos: "Voir les vidéos →",
      followMe: "Suivez-moi",
    },
    pedago: {
      title: "Formation",
      description:
        "Découvrez les cours de formation de Slim Abida. Des cours personnalisés pour développer vos compétences musicales.",
      courses: {
        bass: {
          title: "Basse Instrument",
          description:
            "Apprenez la basse électrique avec Slim Abida. Cours personnalisés adaptés à votre niveau, de débutant à avancé. Technique, groove, harmonie et improvisation.",
        },
        arrangement: {
          title: "Arrangement",
          description:
            "Maîtrisez l'art de l'arrangement musical. Apprenez à orchestrer vos compositions, créer des textures sonores et développer votre identité musicale.",
        },
        composition: {
          title: "Composition",
          description:
            "Développez vos compétences en composition. De l'idée initiale à la réalisation complète, explorez les techniques de création musicale et d'écriture.",
        },
      },
      contactMe: "Me contacter",
    },
    contact: {
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer",
      sending: "Envoi en cours...",
      subjectOptions: {
        contact: "Demande de contact",
        collaboration: "Demande de collaboration",
        concert: "Demande de concert",
        press: "Demande de presse",
        training: "Demande de formation",
        other: "Autre",
      },
      messages: {
        success:
          "Merci de nous avoir contacté ! Nous vous répondrons dans les 24 heures.",
        error: "Erreur lors de l'envoi de l'email",
        errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
      },
    },
    discographie: {
      title: "Discographie",
      description:
        "Découvrez les albums de Slim Abida et soutenez l'artiste en achetant ses œuvres.",
      noCover: "Pas de pochette",
      noAlbums: "Aucun album disponible pour le moment.",
    },
    videos: {
      title: "Vidéos Live",
      description:
        "Découvrez les vidéos de Slim Abida et profitez de ses performances live.",
    },
    checkout: {
      title: "Récapitulatif de votre commande",
      selectedAlbum: "Album sélectionné",
      orderInfo: "Informations de commande",
      noCover: "Pas de pochette",
    },
    concerts: {
      title: "Les concerts de Slim Abida",
      description: "Tous les Concerts de Slim Abida",
      noConcerts: "Aucun concert disponible pour le moment.",
    },
    notFound: {
      title: "404 - Page non trouvée",
      description: "La page que vous cherchez n'existe pas.",
      homeButton: "Retour à l'accueil",
    },
  },

  // ========================================================================
  // TRADUCTIONS ANGLAISES
  // ========================================================================
  en: {
    nav: {
      home: "HOME",
      about: "BIO",
      music: "MUSIC",
      videos: "VIDEOS",
      concerts: "CONCERTS",
      pedago: "PEDAGO",
      contact: "CONTACT",
    },
    home: {
      title: "Slim Abida",
      subtitle: "Bassist / Composer / Arranger",
      subtitle2: "Contrast New Album",
      album: "Contrast New Album",
      discoverMusic: "Discover Music",
      upcomingConcerts: "Upcoming Concerts",
      news: {
        title: "News",
        description:
          "Discover the latest news from Slim Abida. Contrast new album Don't hesitate to follow us on social networks and support us by contributing to our Crowdfunding.",
        seeNews: "See news →",
        supportProject: "Support the project →",
      },
      about: {
        title: "About",
        description:
          "Discover the unique musical universe of Slim Abida, where jazz meets fusion in a captivating sound experience. An artistic exploration that transcends genres and boundaries.",
        learnMore: "Learn more →",
      },
      music: {
        title: "Music",
        description:
          "Dive into Slim Abida's discography and explore original compositions that harmoniously blend jazz and fusion influences.",
        listenNow: "Listen now →",
      },
      videos: {
        title: "Videos",
        description:
          "Discover Slim Abida's videos and enjoy his live performances.",
        seeVideos: "See videos →",
      },
      concerts: {
        title: "Concerts",
        description:
          "Don't miss the upcoming concert dates and experience the live performance of Slim Abida Project.",
        seeDates: "See dates →",
      },
      formation: {
        title: "Training",
        description: "Discover Slim Abida's training courses.",
        seeCourses: "See courses →",
      },
    },
    news: {
      title: "Contrast - New Album",
      description:
        "In a world where everything opposes and complements, CONTRAST comes to life. After Fréquences Basses (2020) and Asymétrie (2022), Slim Abida continues his musical exploration, shaping a universe where beauty is born from highlighting the contrasts that mark our world. This album is an immersion into the dualities that rhythm our existence: shadow and light, love and hate, hope and despair, justice and injustice. Each track is a facet of an emotional prism, a sound wave oscillating between harmony and chaos, between gentleness and brutality. More than just an album, CONTRAST is an invitation to feel the complexity of the world beyond binary judgments. It does not choose between good and evil, but reveals all the underlying richness and depth. It is that fragile point of balance between extremes, a quest for harmony within turmoil.",
      supportProject: "Support the project →",
      discoverDiscography: "Discover discography →",
      followMe: "Follow me",
    },
    about: {
      title: "Slim Abida",
      bio: "Slim Abida is a Tunisian bassist and composer, known for his unique musical signature. In 2002, he co-founded the group Melmoth, a Tunisian metal project that allowed him to perform internationally (Algeria, Morocco). In 2005, he joined the Goultrah Sound System project, a fusion of Gnawa, dub, and reggae, which met with great success. He collaborates with internationally renowned artists such as Richard Bona, Naïssam Jalal, Amine Bouhafa, Emel Mathlouthi, and Sabry Mosbah. In 2016, with Jazz Oil, a jazz-world group of which he is the founder, he released the album Lamma. In 2020, he launched his solo career and published Fréquences Basses, followed by Asymétrie in 2022. He is currently working on his third solo album, Contrast.",
      discoverMusic: "Discover Music →",
      seeVideos: "See videos →",
      followMe: "Follow me",
    },
    pedago: {
      title: "Training",
      description:
        "Discover Slim Abida's training courses. Personalized courses to develop your musical skills.",
      courses: {
        bass: {
          title: "Bass Instrument",
          description:
            "Learn electric bass with Slim Abida. Personalized courses adapted to your level, from beginner to advanced. Technique, groove, harmony, and improvisation.",
        },
        arrangement: {
          title: "Arrangement",
          description:
            "Master the art of musical arrangement. Learn to orchestrate your compositions, create sound textures, and develop your musical identity.",
        },
        composition: {
          title: "Composition",
          description:
            "Develop your composition skills. From the initial idea to complete realization, explore techniques of musical creation and writing.",
        },
      },
      contactMe: "Contact me",
    },
    contact: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send",
      sending: "Sending...",
      subjectOptions: {
        contact: "Contact request",
        collaboration: "Collaboration request",
        concert: "Concert request",
        press: "Press request",
        training: "Training request",
        other: "Other",
      },
      messages: {
        success:
          "Thank you for contacting us! We will respond within 24 hours.",
        error: "Error sending email",
        errorGeneric: "An error occurred. Please try again.",
      },
    },
    discographie: {
      title: "Discography",
      description:
        "Discover Slim Abida's albums and support the artist by purchasing his works.",
      noCover: "No cover",
      noAlbums: "No albums available at the moment.",
    },
    videos: {
      title: "Live Videos",
      description:
        "Discover Slim Abida's videos and enjoy his live performances.",
    },
    checkout: {
      title: "Order Summary",
      selectedAlbum: "Selected Album",
      orderInfo: "Order Information",
      noCover: "No cover",
    },
    concerts: {
      title: "Slim Abida's Concerts",
      description: "All Slim Abida's Concerts",
      noConcerts: "No concerts available at the moment.",
    },
    notFound: {
      title: "404 - Page Not Found",
      description: "The page you are looking for does not exist.",
      homeButton: "Back to Home",
    },
  },
};
