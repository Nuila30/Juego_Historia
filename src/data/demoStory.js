export const initialStats = {
  vida: 100,
  inteligencia: 1,
  confianza: 0,
  honestidad: 0,
};

export const initialGameState = {
  inventory: [],
  clues: [],
  flags: {},
};

export const demoStory = {
  id: "sangre-y-rosas",
  title: "Sangre y Rosas",
  subtitle: "Asesinato, romance y amantes",
  genre: "Asesinato / Romance",
  status: "available",
  cover:
    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
  startScene: "inicio",

  scenes: {
    inicio: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Asesinato, romance y secretos prohibidos",
      tag: "Capítulo 1",
      place: "Mansión De la Vega",
      title: "La noche del crimen",
      image:
        "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1400&q=80",
      text: `La familia De la Vega celebraba un baile privado para anunciar el compromiso de Valeria con Adrián.

Pero a medianoche, el patriarca apareció muerto en la biblioteca.

Tú eres Lucía: periodista, invitada inesperada y antigua amante secreta de Adrián.

La policía aún no llega.
Valeria llora.
Adrián desapareció después del disparo.

Esta noche deberás decidir entre el amor, la verdad y la venganza.`,
      choices: [
        {
          label: "Buscar a Adrián antes que nadie.",
          next: "adrian",
          effect: { confianza: 1, inteligencia: 1 },
          setFlags: { busca_adrian_primero: true },
        },
        {
          label: "Entrar a la biblioteca y revisar la escena.",
          next: "biblioteca",
          effect: { inteligencia: 2, vida: -3 },
          addClues: ["escena_crimen_activa"],
          setFlags: { investigo_biblioteca: true },
        },
        {
          label: "Hablar con Valeria, la prometida.",
          next: "valeria",
          effect: { confianza: 1, honestidad: 1 },
          setFlags: { hablo_con_valeria: true },
        },
        {
          label: "Escuchar a los sirvientes en el pasillo.",
          next: "sirvientes",
          effect: { inteligencia: 1, honestidad: -1 },
          addClues: ["rumor_sirvientes"],
          setFlags: { espio_sirvientes: true },
        },
      ],
    },

    adrian: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "El amante que oculta algo",
      tag: "Capítulo 2",
      place: "Jardín trasero",
      title: "Bajo las rosas negras",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80",
      text: `Encuentras a Adrián en el jardín. Su camisa tiene una mancha de sangre.

—No es mía —dice con la voz rota—. Tienes que creerme.

Durante años juró que te amaba, pero terminó comprometido con Valeria para salvar la fortuna de su familia.

Sus ojos te suplican ayuda... o silencio.`,
      choices: [
        {
          label: "Creerle y prometer que lo ayudarás.",
          next: "pacto",
          effect: { confianza: 2, honestidad: 1 },
          setFlags: { confia_en_adrian: true },
        },
        {
          label: "Exigirle que diga toda la verdad.",
          next: "confesion",
          effect: { inteligencia: 1, honestidad: 1 },
          setFlags: { presiono_adrian: true },
        },
        {
          label: "Acusarlo de asesinato.",
          next: "ruptura",
          effect: { confianza: -2, honestidad: -1, vida: -2 },
          setFlags: { acuso_adrian: true },
        },
        {
          label: "Quitarle la llave que guarda en la mano.",
          next: "llave",
          effect: { inteligencia: 2, honestidad: -2, confianza: -1 },
          addItems: ["llave_ala_oeste"],
          setFlags: { robo_llave_adrian: true },
        },
      ],
    },

    biblioteca: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La escena del crimen",
      tag: "Capítulo 2",
      place: "Biblioteca principal",
      title: "Sangre sobre el terciopelo",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80",
      text: `La biblioteca huele a pólvora, vino y madera antigua.

El señor De la Vega yace junto al escritorio. En su puño cerrado hay un trozo de encaje rojo.

Debajo del sillón encuentras una carta de amor dirigida a Adrián.

También ves una copa rota con un olor extraño, casi dulce.

No sabes si el crimen nació por dinero... o por pasión.`,
      choices: [
        {
          label: "Examinar la copa rota.",
          next: "biblioteca",
          effect: { inteligencia: 1, vida: -1 },
          addClues: ["olor_almendras", "copa_envenenada"],
          setFlags: { examino_copa: true },
        },
        {
          label: "Tomar la carta de amor.",
          next: "carta",
          effect: { inteligencia: 1, honestidad: -1 },
          addItems: ["carta_amor"],
          addClues: ["carta_dirigida_adrian"],
          setFlags: { tomo_carta: true },
        },
        {
          label: "Guardar el encaje rojo.",
          next: "encaje",
          effect: { inteligencia: 1, honestidad: -1 },
          addItems: ["encaje_rojo"],
          addClues: ["encaje_en_mano_victima"],
          setFlags: { tomo_encaje: true },
        },
        {
          label: "Deducir que no fue un simple disparo.",
          next: "deduccionVeneno",
          effect: { inteligencia: 2 },
          requirements: {
            minStats: { inteligencia: 2 },
            clues: ["olor_almendras"],
          },
        },
      ],
    },

    deduccionVeneno: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Una pista cambia toda la investigación",
      tag: "Capítulo 2",
      place: "Biblioteca principal",
      title: "La deducción del veneno",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80",
      text: `El olor de la copa no encaja con el vino.

Recuerdas una nota de tus años como periodista: algunos venenos dejan un aroma parecido a almendras amargas.

El disparo pudo haber sido una distracción.
Tal vez el patriarca ya estaba muriendo antes de caer al suelo.

Ahora necesitas descubrir quién tuvo acceso a la copa.`,
      choices: [
        {
          label: "Interrogar a Valeria sobre la copa.",
          next: "valeria",
          effect: { inteligencia: 1, honestidad: 1 },
          requirements: {
            clues: ["copa_envenenada"],
          },
        },
        {
          label: "Preguntar a los sirvientes quién sirvió el vino.",
          next: "sirvientes",
          effect: { inteligencia: 1 },
          addClues: ["vino_servido_por_criada"],
        },
        {
          label: "Buscar a Adrián con esta nueva teoría.",
          next: "adrian",
          effect: { confianza: 1 },
        },
        {
          label: "Ocultar la pista para usarla después.",
          next: "llave",
          effect: { honestidad: -2, inteligencia: 1 },
          setFlags: { oculto_pista_veneno: true },
        },
      ],
    },

    valeria: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La prometida perfecta",
      tag: "Capítulo 2",
      place: "Salón principal",
      title: "Lágrimas demasiado limpias",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
      text: `Valeria está impecable, incluso después del asesinato.

—Mi padre quería destruirlo todo —susurra—. A Adrián, a mí... incluso a ti.

Te toma de la mano como si compartieran un secreto.

Por un segundo, sientes que no solo teme perder a Adrián.
Tal vez también teme perderte a ti.`,
      choices: [
        {
          label: "Consolarla y escucharla.",
          next: "alianzaValeria",
          effect: { confianza: 2, honestidad: 1 },
          setFlags: { valeria_confia: true },
        },
        {
          label: "Preguntarle por la carta de amor.",
          next: "celos",
          effect: { inteligencia: 1 },
          requirements: {
            clues: ["carta_dirigida_adrian"],
          },
        },
        {
          label: "Acusarla de saber más de lo que dice.",
          next: "verdadFinal",
          effect: { honestidad: -1, confianza: -1 },
          requirements: {
            minStats: { inteligencia: 2 },
          },
        },
        {
          label: "Observar si su vestido tiene encaje rojo.",
          next: "encajeDescubre",
          effect: { inteligencia: 2 },
          addClues: ["vestido_rojo_valeria"],
        },
      ],
    },

    sirvientes: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Los ojos que todo lo ven",
      tag: "Capítulo 2",
      place: "Pasillo de servicio",
      title: "Rumores entre susurros",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
      text: `Dos sirvientes cuchichean al fondo del pasillo.

Dicen haber visto a Valeria discutir con su padre.
Dicen también que Adrián besó a alguien en la biblioteca antes del disparo.

Cuando te ven, callan.

Uno de ellos menciona una habitación cerrada en el ala oeste.`,
      choices: [
        {
          label: "Ir al ala oeste.",
          next: "llave",
          effect: { inteligencia: 2, vida: -2 },
          addClues: ["habitacion_ala_oeste"],
          setFlags: { fue_ala_oeste: true },
        },
        {
          label: "Sobornarlos para que hablen.",
          next: "confesion",
          effect: { honestidad: -2, inteligencia: 1 },
          addClues: ["adrian_beso_alguien"],
          setFlags: { soborno_sirvientes: true },
        },
        {
          label: "Ir con esta información a Valeria.",
          next: "valeria",
          effect: { confianza: 1 },
        },
        {
          label: "Ir con esta información a Adrián.",
          next: "adrian",
          effect: { confianza: 1 },
        },
      ],
    },

    pacto: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "El amor como refugio",
      tag: "Capítulo 3",
      place: "Invernadero",
      title: "Un pacto entre amantes",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1400&q=80",
      text: `Te refugias con Adrián en el invernadero.

Él te besa con desesperación.
Confiesa que el padre de Valeria descubrió su antigua relación contigo y amenazó con arruinarte.

—No lo maté —insiste—, pero sí deseé verlo muerto.

Sabes que aún lo amas... y eso podría condenarte.`,
      choices: [
        {
          label: "Creer en Adrián y huir con él.",
          next: "finalFuga",
          effect: { confianza: 2, honestidad: -2 },
          requirements: {
            minStats: { confianza: 2 },
          },
        },
        {
          label: "Pedirle que se entregue.",
          next: "finalSacrificio",
          effect: { honestidad: 2, confianza: -1 },
        },
        {
          label: "Usarlo para descubrir al verdadero asesino.",
          next: "confesion",
          effect: { inteligencia: 1, honestidad: -1 },
        },
        {
          label: "Traicionarlo por despecho.",
          next: "finalVenganza",
          effect: { honestidad: -3, vida: -5 },
        },
      ],
    },

    confesion: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La verdad empieza a romperse",
      tag: "Capítulo 3",
      place: "Jardín trasero",
      title: "La confesión incompleta",
      image:
        "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1400&q=80",
      text: `Adrián finalmente te mira a los ojos.

—Valeria y yo no nos íbamos a casar por amor. Era un acuerdo.

Antes del disparo, Valeria entró a la biblioteca.
Después escuché su grito.

No sabe si ella mató a su padre.
No sabe si debe protegerla... o hundirse con ella.`,
      choices: [
        {
          label: "Buscar a Valeria y confrontarla.",
          next: "verdadFinal",
          effect: { inteligencia: 2, honestidad: 1 },
        },
        {
          label: "Creer que Adrián miente.",
          next: "finalVenganza",
          effect: { honestidad: -2, confianza: -2 },
        },
        {
          label: "Proponer que los tres huyan.",
          next: "finalTres",
          effect: { confianza: 1, honestidad: -1 },
          requirements: {
            minStats: { confianza: 2 },
          },
        },
        {
          label: "Investigar el ala oeste primero.",
          next: "llave",
          effect: { inteligencia: 1 },
          requirements: {
            clues: ["habitacion_ala_oeste"],
          },
        },
      ],
    },

    llave: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Toda llave abre un secreto",
      tag: "Capítulo 3",
      place: "Ala oeste",
      title: "La habitación cerrada",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      text: `La llave abre una habitación oculta.

Dentro hay cartas, retratos y un libro de cuentas.
Descubres que el señor De la Vega chantajeaba a todos en la mansión.

Entre los papeles encuentras una nota firmada por Valeria:

“Si esta noche no nos dejas libres, juro que todo terminará en sangre.”`,
      choices: [
        {
          label: "Enfrentar a Valeria con la carta.",
          next: "verdadFinal",
          effect: { inteligencia: 2, honestidad: 1 },
          addClues: ["nota_valeria_sangre"],
        },
        {
          label: "Esconder la carta y proteger a Adrián.",
          next: "pacto",
          effect: { confianza: 1, honestidad: -1 },
          addItems: ["nota_valeria"],
        },
        {
          label: "Usar la carta para chantajear a Valeria.",
          next: "finalPoder",
          effect: { honestidad: -3 },
        },
        {
          label: "Llevar la prueba a la policía.",
          next: "finalJusticia",
          effect: { honestidad: 2 },
          requirements: {
            minStats: { honestidad: 1 },
          },
        },
      ],
    },

    carta: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Una pasión escrita",
      tag: "Capítulo 3",
      place: "Biblioteca principal",
      title: "La carta escondida",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
      text: `La carta no era para Valeria.
Era para ti.

El señor De la Vega sabía que Adrián seguía enamorado de Lucía.

Pensaba usar esa verdad para destruir el compromiso y quedarse con toda la herencia.

Alguien mató para impedir que esa carta se hiciera pública.`,
      choices: [
        {
          label: "Buscar a Adrián con la carta.",
          next: "adrian",
          effect: { confianza: 1, inteligencia: 1 },
          requirements: {
            items: ["carta_amor"],
          },
        },
        {
          label: "Enfrentar a Valeria.",
          next: "verdadFinal",
          effect: { honestidad: 1 },
          requirements: {
            clues: ["carta_dirigida_adrian"],
          },
        },
        {
          label: "Quemar la carta para protegerte.",
          next: "finalSilencio",
          effect: { honestidad: -2 },
        },
        {
          label: "Guardar la carta como prueba.",
          next: "llave",
          effect: { inteligencia: 1, honestidad: 1 },
          addItems: ["prueba_carta_amor"],
        },
      ],
    },

    encaje: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La pista de color rojo",
      tag: "Capítulo 3",
      place: "Biblioteca principal",
      title: "El encaje manchado",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
      text: `El encaje rojo coincide con uno de los vestidos usados en la fiesta.

Pero no solo Valeria llevaba rojo.
Tú también.

La casa no es solo un crimen.
Es una red de amantes, celos y favores rotos.`,
      choices: [
        {
          label: "Buscar más pistas en el ala oeste.",
          next: "llave",
          effect: { inteligencia: 2 },
          requirements: {
            items: ["encaje_rojo"],
          },
        },
        {
          label: "Acusar a Valeria.",
          next: "verdadFinal",
          effect: { honestidad: -1, confianza: -1 },
        },
        {
          label: "Esconder el encaje.",
          next: "finalSilencio",
          effect: { honestidad: -2 },
        },
        {
          label: "Hablar con Adrián.",
          next: "confesion",
          effect: { confianza: 1 },
        },
      ],
    },

    alianzaValeria: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Una alianza inesperada",
      tag: "Capítulo 3",
      place: "Salón principal",
      title: "Entre enemigas y cómplices",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80",
      text: `Valeria te confiesa algo inesperado.

Nunca amó a Adrián como esposo.
Lo quería libre... para ti.

Su verdadero odio era hacia su padre.
Él la utilizó durante años como moneda de cambio.

Te suplica que la ayudes antes de que llegue la policía.`,
      choices: [
        {
          label: "Ayudar a Valeria a escapar.",
          next: "finalComplices",
          effect: { confianza: 2, honestidad: -2 },
          requirements: {
            minStats: { confianza: 2 },
          },
        },
        {
          label: "Exigirle la verdad del asesinato.",
          next: "verdadFinal",
          effect: { inteligencia: 2, honestidad: 1 },
        },
        {
          label: "Traicionarla para salvar a Adrián.",
          next: "finalSacrificio",
          effect: { honestidad: -1, confianza: -1 },
        },
        {
          label: "Proponer una alianza entre los tres.",
          next: "finalTres",
          effect: { confianza: 1, honestidad: -1 },
          requirements: {
            minStats: { confianza: 2 },
          },
        },
      ],
    },

    celos: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "El amor deja huellas",
      tag: "Capítulo 3",
      place: "Salón principal",
      title: "Celos bajo la seda",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
      text: `Valeria sonríe con tristeza.

—¿Crees que no sabía de ustedes?

No parece sorprendida por tu relación con Adrián.
Parece herida por otra cosa.

Quizá ella también deseaba algo que nunca se atrevió a decir.`,
      choices: [
        {
          label: "Corresponder a la cercanía de Valeria.",
          next: "alianzaValeria",
          effect: { confianza: 2, honestidad: -1 },
        },
        {
          label: "Decirle que sigues amando a Adrián.",
          next: "adrian",
          effect: { honestidad: 1, confianza: -1 },
        },
        {
          label: "Presionarla por la verdad.",
          next: "verdadFinal",
          effect: { inteligencia: 1, honestidad: 1 },
        },
        {
          label: "Apartarte antes de confundirte.",
          next: "sirvientes",
          effect: { inteligencia: 1 },
        },
      ],
    },

    encajeDescubre: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Una pista demasiado visible",
      tag: "Capítulo 3",
      place: "Salón principal",
      title: "El vestido rasgado",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
      text: `El vestido de Valeria tiene una parte descosida.

Falta exactamente un trozo de encaje rojo.

Cuando lo nota, deja de llorar.

—No fue como piensas —te dice—. Pero sí entré en esa biblioteca.

Ahora sabes que estuvo allí.`,
      choices: [
        {
          label: "Darle oportunidad de explicarse.",
          next: "verdadFinal",
          effect: { confianza: 1, inteligencia: 2 },
        },
        {
          label: "Acusarla directamente.",
          next: "finalJusticia",
          effect: { honestidad: -1, confianza: -1 },
        },
        {
          label: "Usar la información para manipularla.",
          next: "finalPoder",
          effect: { honestidad: -3 },
        },
        {
          label: "Ir a buscar a Adrián.",
          next: "confesion",
          effect: { confianza: 1 },
        },
      ],
    },

    ruptura: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "El amor se vuelve sospecha",
      tag: "Capítulo 3",
      place: "Jardín trasero",
      title: "Amor herido",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80",
      text: `Acusas a Adrián sin dudar.

Él te mira devastado.

—Si crees eso de mí, entonces jamás me conociste.

Te deja sola entre las rosas.

Quizás era culpable.
Quizás acabas de perder al único hombre que podía decirte la verdad.`,
      choices: [
        {
          label: "Seguir investigando por tu cuenta.",
          next: "llave",
          effect: { inteligencia: 1, vida: -3 },
        },
        {
          label: "Ir con Valeria.",
          next: "valeria",
          effect: { confianza: -1 },
        },
        {
          label: "Llamar a la policía.",
          next: "finalJusticia",
          effect: { honestidad: 2 },
        },
        {
          label: "Arrepentirte y buscarlo.",
          next: "confesion",
          effect: { confianza: 1, honestidad: 1 },
        },
      ],
    },

    verdadFinal: {
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Todo conduce al mismo corazón roto",
      tag: "Capítulo final",
      place: "Biblioteca principal",
      title: "La verdad en la biblioteca",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80",
      text: `Regresas a la biblioteca con todas las piezas.

Valeria admite que discutió con su padre.
Adrián admite que deseó verlo muerto.
Los sirvientes admiten que todos callaron durante años.

Pero quien disparó fue Valeria.

No por dinero.
No por celos.
Lo hizo cuando su padre quiso destruir la vida de todos.

Ahora la verdad está en tus manos.`,
      choices: [
        {
          label: "Encubrir a Valeria.",
          next: "finalComplices",
          effect: { confianza: 2, honestidad: -2 },
          requirements: {
            minStats: { confianza: 2 },
          },
        },
        {
          label: "Entregarla a la policía.",
          next: "finalJusticia",
          effect: { honestidad: 2 },
        },
        {
          label: "Huir con Adrián y dejar que Valeria escape.",
          next: "finalFuga",
          effect: { confianza: 1, honestidad: -2 },
          requirements: {
            minStats: { confianza: 2 },
          },
        },
        {
          label: "Usar la verdad para dominar a ambos.",
          next: "finalPoder",
          effect: { honestidad: -3 },
        },
      ],
    },

    finalFuga: {
      headerTitle: "Final desbloqueado",
      headerSubtitle: "Amor por encima de la verdad",
      tag: "Final",
      place: "Estación al amanecer",
      title: "Final: Fuga de amantes",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
      text: `Escapas con Adrián antes de que llegue la policía.

Nunca sabrás si amar a un hombre roto fue valentía o debilidad.

La mansión queda atrás, junto con el cadáver, los secretos y Valeria.

Solo quedan ustedes dos...
y una culpa que no viaja ligera.`,
      ending: "Final romántico oscuro",
    },

    finalSacrificio: {
      headerTitle: "Final desbloqueado",
      headerSubtitle: "El precio de amar",
      tag: "Final",
      place: "Jardín trasero",
      title: "Final: Sacrificio",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80",
      text: `Convences a Adrián de entregarse.

No era el asesino, pero sí parte del escándalo que destruyó la casa.

Lo ves marcharse con la cabeza en alto, sabiendo que jamás volverás a tocarlo.

A veces amar también es renunciar.`,
      ending: "Final melancólico",
    },

    finalVenganza: {
      headerTitle: "Final desbloqueado",
      headerSubtitle: "Cuando el rencor gana",
      tag: "Final",
      place: "Mansión De la Vega",
      title: "Final: Venganza",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=80",
      text: `Entregas a Adrián como principal sospechoso.

No importa si era inocente.
Lo importante era verlo caer como tú caíste antes.

Ganas la partida...
pero te vacías por dentro.`,
      ending: "Final cruel",
    },

    finalTres: {
      headerTitle: "Final desbloqueado",
      headerSubtitle: "Una salida imperfecta",
      tag: "Final",
      place: "Camino de escape",
      title: "Final: Tres corazones en ruinas",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80",
      text: `Por una noche imposible, decides no elegir.

Ayudas a Adrián y Valeria a escapar contigo.

No hay final feliz, pero sí una tregua nacida del dolor, el deseo y la culpa.

Tal vez mañana se destruyan.
Pero esta noche sobreviven juntos.`,
      ending: "Final ambiguo",
    },

    finalPoder: {
      headerTitle: "Final desbloqueado",
      headerSubtitle: "La verdad como arma",
      tag: "Final",
      place: "Despacho privado",
      title: "Final: Poder",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
      text: `No entregas a nadie.

Guardas las cartas, las pruebas y los secretos.

Ahora Adrián y Valeria te pertenecen de una forma u otra.

El crimen queda impune.
Pero tú te conviertes en la nueva dueña del juego.`,
      ending: "Final dominante",
    },

    finalJusticia: {
      headerTitle: "Final desbloqueado",
      headerSubtitle: "La verdad frente a la ley",
      tag: "Final",
      place: "Entrada principal",
      title: "Final: Justicia",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80",
      text: `La policía llega y entregas todo lo que sabes.

La verdad sale a la luz:
años de manipulación, chantaje, amantes ocultos y un asesinato nacido de la desesperación.

Quizás nadie sale limpio.
Pero alguien detuvo la cadena de mentiras.`,
      ending: "Final justo",
    },

    finalComplices: {
      headerTitle: "Final desbloqueado",
      headerSubtitle: "Secretos compartidos",
      tag: "Final",
      place: "Carruaje nocturno",
      title: "Final: Cómplices",
      image:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1400&q=80",
      text: `Decides encubrir a Valeria.

Ella te mira con una mezcla de gratitud, deseo y culpa.

Adrián entiende demasiado tarde que el vínculo entre ustedes cambió para siempre.

No nace una historia limpia.
Nace una alianza manchada de sangre.`,
      ending: "Final de complicidad",
    },

    finalSilencio: {
      headerTitle: "Final desbloqueado",
      headerSubtitle: "Lo que no se dice también mata",
      tag: "Final",
      place: "Biblioteca vacía",
      title: "Final: Silencio",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
      text: `Destruyes o escondes la prueba clave.

La investigación nunca se resuelve por completo.

La mansión vuelve a respirar, pero lo hace sobre una tumba de secretos.

Nadie gana.
Nadie confiesa.
Y el amor queda enterrado con la verdad.`,
      ending: "Final gris",
    },

    finalSinVida: {
      headerTitle: "Final desbloqueado",
      headerSubtitle: "La investigación terminó antes de tiempo",
      tag: "Final",
      place: "Mansión De la Vega",
      title: "Final: Sin fuerzas",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
      text: `Tu cuerpo y tu mente no resistieron más.

Las heridas, el miedo y las malas decisiones te dejaron sin fuerzas para seguir investigando.

La verdad quedó enterrada dentro de la mansión De la Vega.`,
      ending: "Final por vida agotada",
    },
  },
};