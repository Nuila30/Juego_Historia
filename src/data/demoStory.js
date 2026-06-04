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
  subtitle: "Asesinato, romance, secretos familiares y una herencia maldita",
  genre: "Asesinato / Romance / Misterio",
  status: "available",
  cover:
    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
  startScene: "inicio",

  chapters: [
    {
      id: "capitulo-1",
      chapterNumber: 1,
      label: "Capítulo 1",
      title: "La noche del crimen",
      startScene: "inicio",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "capitulo-2",
      chapterNumber: 2,
      label: "Capítulo 2",
      title: "Las primeras mentiras",
      startScene: "cap2_inicio",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "capitulo-3",
      chapterNumber: 3,
      label: "Capítulo 3",
      title: "El testamento secreto",
      startScene: "cap3_inicio",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "capitulo-4",
      chapterNumber: 4,
      label: "Capítulo 4",
      title: "La verdad envenenada",
      startScene: "cap4_inicio",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    },
  ],

  scenes: {
    inicio: {
      chapterNumber: 1,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Asesinato, romance y secretos prohibidos",
      tag: "Capítulo 1",
      place: "Mansión De la Vega",
      title: "La noche del crimen",
      image:
        "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1400&q=80",
      text: `La familia De la Vega celebra un baile privado para anunciar el compromiso de Valeria con Adrián.

Tú eres Lucía Herrera: periodista, invitada inesperada y antigua amante secreta de Adrián.

A medianoche, las luces se apagan.
Un disparo rompe la música.
Cuando las lámparas vuelven a encenderse, Don Esteban De la Vega aparece muerto en la biblioteca.

La policía aún no llega.
Valeria llora sin lágrimas.
Adrián desapareció.
Y en el suelo, cerca del cadáver, hay una rosa roja aplastada.

Esta noche no solo investigarás un asesinato.
Investigarás si alguna vez amaste a la persona correcta.`,
      choices: [
        {
          label: "Entrar a la biblioteca antes de que alguien toque la escena.",
          next: "cap1_biblioteca",
          effect: { inteligencia: 2, vida: -3 },
          addClues: ["escena_crimen_intacta"],
          setFlags: { investigo_primero: true },
        },
        {
          label: "Buscar a Adrián en los jardines.",
          next: "cap1_adrian",
          effect: { confianza: 1, inteligencia: 1 },
          setFlags: { busco_adrian_primero: true },
        },
        {
          label: "Quedarte con Valeria y observar su reacción.",
          next: "cap1_valeria",
          effect: { confianza: 1, honestidad: 1 },
          setFlags: { observo_valeria: true },
        },
        {
          label: "Escuchar a los sirvientes antes de decidir.",
          next: "cap1_sirvientes",
          effect: { inteligencia: 1, honestidad: -1 },
          addClues: ["rumor_de_servicio"],
          setFlags: { espio_sirvientes: true },
        },
      ],
    },

    cap1_biblioteca: {
      chapterNumber: 1,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La escena del crimen",
      tag: "Capítulo 1",
      place: "Biblioteca principal",
      title: "Sangre sobre terciopelo",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80",
      text: `La biblioteca huele a pólvora, vino dulce y madera vieja.

Don Esteban yace junto al escritorio. Tiene una herida de bala, pero su rostro parece demasiado sereno para una muerte violenta.

En su mano derecha hay un trozo de encaje rojo.
En la mesa hay una copa rota.
Bajo el escritorio encuentras un sobre sellado con cera negra.

En la puerta, alguien dejó una huella de barro fresco.`,
      choices: [
        {
          label: "Examinar la copa rota.",
          next: "cap1_copa",
          effect: { inteligencia: 2, vida: -2 },
          addClues: ["olor_almendras", "copa_sospechosa"],
          setFlags: { examino_copa: true },
        },
        {
          label: "Guardar el encaje rojo.",
          next: "cap1_encaje",
          effect: { inteligencia: 1, honestidad: -1 },
          addItems: ["encaje_rojo"],
          addClues: ["encaje_en_mano_victima"],
          setFlags: { tomo_encaje: true },
        },
        {
          label: "Abrir el sobre de cera negra.",
          next: "cap1_sobre",
          effect: { inteligencia: 1, honestidad: -1 },
          addItems: ["sobre_cera_negra"],
          addClues: ["sobre_oculto"],
          setFlags: { abrio_sobre: true },
        },
        {
          label: "Seguir la huella de barro.",
          next: "cap1_jardin",
          effect: { inteligencia: 1, vida: -2 },
          addClues: ["huella_barro"],
        },
      ],
    },

    cap1_copa: {
      chapterNumber: 1,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Una muerte con dos armas",
      tag: "Capítulo 1",
      place: "Biblioteca principal",
      title: "El olor de las almendras",
      image:
        "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=1400&q=80",
      text: `Te acercas a la copa rota.

El vino tiene un olor casi dulce, parecido a almendras amargas. Recuerdas un antiguo caso que investigaste: ciertos venenos dejan ese aroma.

La bala pudo ser una distracción.
Tal vez Don Esteban ya estaba muriendo antes del disparo.

Alguien quiso que todos miraran el arma equivocada.`,
      choices: [
        {
          label: "Guardar un fragmento de la copa como prueba.",
          next: "cap2_inicio",
          effect: { inteligencia: 1, honestidad: 1 },
          addItems: ["fragmento_copa"],
          addClues: ["posible_veneno"],
        },
        {
          label: "Ocultar la pista para usarla como ventaja.",
          next: "cap2_inicio",
          effect: { inteligencia: 1, honestidad: -2 },
          addItems: ["fragmento_copa"],
          setFlags: { oculto_pista_veneno: true },
        },
      ],
    },

    cap1_encaje: {
      chapterNumber: 1,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La tela de una mentira",
      tag: "Capítulo 1",
      place: "Biblioteca principal",
      title: "El encaje rojo",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
      text: `El encaje está manchado de sangre y perfume.

No pertenece al traje de Don Esteban.
Es de un vestido caro.

Valeria viste seda roja esta noche.
Pero tú también llevas un adorno rojo en el cabello.

Por primera vez entiendes que la escena pudo haber sido preparada para culpar a cualquiera.`,
      choices: [
        {
          label: "Comparar el encaje con el vestido de Valeria.",
          next: "cap2_inicio",
          effect: { inteligencia: 2 },
          addClues: ["encaje_puede_ser_de_valeria"],
        },
        {
          label: "Guardar silencio y conservar el encaje.",
          next: "cap2_inicio",
          effect: { honestidad: -1, confianza: 1 },
          addItems: ["encaje_rojo_oculto"],
        },
      ],
    },

    cap1_sobre: {
      chapterNumber: 1,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "El nombre dentro del sobre",
      tag: "Capítulo 1",
      place: "Biblioteca principal",
      title: "La carta que nadie debía leer",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
      text: `Rompes el sello.

Dentro hay una carta escrita por Don Esteban:

“Si Valeria se niega al matrimonio, desheredaré a todos. Si Adrián vuelve con Lucía, la destruiré públicamente.”

Tu nombre está escrito tres veces.
Adrián no era el único atrapado.
Tú también eras una pieza en el tablero de Don Esteban.`,
      choices: [
        {
          label: "Guardar la carta como prueba.",
          next: "cap2_inicio",
          effect: { inteligencia: 1, honestidad: 1 },
          addItems: ["carta_amenaza_lucia"],
          addClues: ["don_esteban_amenazo_lucia"],
        },
        {
          label: "Romper la carta para proteger tu nombre.",
          next: "cap2_inicio",
          effect: { honestidad: -2, confianza: -1 },
          setFlags: { destruyo_carta_lucia: true },
        },
      ],
    },

    cap1_jardin: {
      chapterNumber: 1,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Rosas negras bajo la lluvia",
      tag: "Capítulo 1",
      place: "Jardín trasero",
      title: "La sombra entre los rosales",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1400&q=80",
      text: `La huella conduce al jardín.

Entre los rosales encuentras un pañuelo masculino con iniciales bordadas: A.M.

Adrián Montes.

Pero el pañuelo no tiene sangre.
Tiene perfume de mujer.

Al fondo escuchas pasos. Alguien se esconde entre los arbustos.`,
      choices: [
        {
          label: "Perseguir la sombra.",
          next: "cap1_adrian",
          effect: { vida: -5, inteligencia: 1 },
          addItems: ["panuelo_adrian"],
          addClues: ["panuelo_con_perfume"],
        },
        {
          label: "Volver a la mansión con el pañuelo.",
          next: "cap2_inicio",
          effect: { inteligencia: 1 },
          addItems: ["panuelo_adrian"],
        },
      ],
    },

    cap1_adrian: {
      chapterNumber: 1,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "El amante que sangra",
      tag: "Capítulo 1",
      place: "Jardín trasero",
      title: "Adrián bajo la lluvia",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80",
      text: `Encuentras a Adrián junto a una fuente apagada.

Su camisa está manchada de sangre.
No parece herido.

—Lucía, no es lo que parece —dice—. Yo entré a la biblioteca, pero Don Esteban ya estaba muerto.

Sus manos tiemblan.
En una de ellas aprieta una llave dorada.`,
      choices: [
        {
          label: "Creerle y pedirle que confíe en ti.",
          next: "cap2_inicio",
          effect: { confianza: 2, honestidad: 1 },
          setFlags: { confia_en_adrian: true },
          addClues: ["adrian_estuvo_biblioteca"],
        },
        {
          label: "Quitarle la llave sin que se dé cuenta.",
          next: "cap2_inicio",
          effect: { inteligencia: 2, honestidad: -2, confianza: -1 },
          addItems: ["llave_dorada"],
          setFlags: { robo_llave_adrian: true },
        },
        {
          label: "Exigirle que confiese todo.",
          next: "cap2_inicio",
          effect: { inteligencia: 1, honestidad: 1, confianza: -1 },
          addClues: ["adrian_miente_a_medias"],
          setFlags: { presiono_adrian: true },
        },
      ],
    },

    cap1_valeria: {
      chapterNumber: 1,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La prometida perfecta",
      tag: "Capítulo 1",
      place: "Salón principal",
      title: "Lágrimas de seda",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
      text: `Valeria está rodeada de invitados, pero parece completamente sola.

Llora en silencio.
Demasiado silencio.

—Mi padre iba a destruirnos a todos —susurra cuando te acercas—. A Adrián, a mí... y a ti también.

Te toma la mano.
Por un segundo no parece tu rival.
Parece alguien que lleva años pidiendo auxilio sin voz.`,
      choices: [
        {
          label: "Consolarla y escuchar su versión.",
          next: "cap2_inicio",
          effect: { confianza: 2, honestidad: 1 },
          setFlags: { valeria_confia: true },
          addClues: ["valeria_temía_a_su_padre"],
        },
        {
          label: "Preguntarle por qué mencionó tu nombre.",
          next: "cap2_inicio",
          effect: { inteligencia: 1, confianza: 1 },
          addClues: ["valeria_sabe_de_lucia"],
        },
        {
          label: "Acusarla de estar fingiendo.",
          next: "cap2_inicio",
          effect: { honestidad: -1, confianza: -2 },
          setFlags: { acuso_valeria_pronto: true },
        },
      ],
    },

    cap1_sirvientes: {
      chapterNumber: 1,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Los ojos invisibles de la mansión",
      tag: "Capítulo 1",
      place: "Pasillo de servicio",
      title: "Rumores tras la puerta",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
      text: `Dos sirvientes cuchichean detrás de una puerta.

Dicen que Don Esteban discutió con Valeria antes del baile.
Dicen que Adrián entró a la biblioteca minutos antes del disparo.
Y dicen algo peor:

La madre de Valeria no murió de enfermedad.
Murió después de beber de una copa servida por su esposo.`,
      choices: [
        {
          label: "Sobornar a los sirvientes para que hablen más.",
          next: "cap2_inicio",
          effect: { inteligencia: 2, honestidad: -2 },
          addClues: ["muerte_madre_valeria", "don_esteban_envenenador"],
          setFlags: { soborno_sirvientes: true },
        },
        {
          label: "Prometerles protección si dicen la verdad.",
          next: "cap2_inicio",
          effect: { honestidad: 2, confianza: 1 },
          addClues: ["muerte_madre_valeria"],
          setFlags: { protegio_sirvientes: true },
        },
      ],
    },

    cap2_inicio: {
      chapterNumber: 2,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Las primeras mentiras",
      tag: "Capítulo 2",
      place: "Galería de retratos",
      title: "La casa empieza a hablar",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
      text: `Mientras todos esperan a la policía, la mansión parece cerrarse sobre sí misma.

Los retratos de la familia De la Vega observan desde las paredes.

En uno de ellos, la madre de Valeria sostiene una rosa blanca.
En otro, Don Esteban aparece con la misma copa de cristal que viste rota en la biblioteca.

Hay tres caminos claros:
Valeria.
Adrián.
El ala oeste.

Pero el tiempo corre. Cuando llegue la policía, todo lo que ocultes también hablará por ti.`,
      choices: [
        {
          label: "Interrogar a Valeria en privado.",
          next: "cap2_valeria_privado",
          effect: { confianza: 1, inteligencia: 1 },
        },
        {
          label: "Buscar a Adrián y comparar sus versiones.",
          next: "cap2_adrian_version",
          effect: { confianza: 1, inteligencia: 1 },
        },
        {
          label: "Entrar al ala oeste.",
          next: "cap2_ala_oeste",
          effect: { inteligencia: 2, vida: -3 },
          requirements: {
            items: ["llave_dorada"],
          },
        },
        {
          label: "Forzar la puerta del ala oeste sin llave.",
          next: "cap2_ala_oeste_forzada",
          effect: { vida: -12, inteligencia: 1 },
        },
      ],
    },

    cap2_valeria_privado: {
      chapterNumber: 2,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Confesiones de una prometida",
      tag: "Capítulo 2",
      place: "Salón azul",
      title: "Valeria se quiebra",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80",
      text: `Valeria cierra la puerta.

—Mi padre no quería que me casara con Adrián. Quería vender la boda al mejor postor.

Luego baja la voz.

—Pero yo tampoco quería casarme por amor. Quería salvar a Adrián de él.

Su confesión no suena completa.
Hay afecto en su voz cuando dice tu nombre.
No parece odiarte por haber amado a Adrián.`,
      choices: [
        {
          label: "Preguntarle si estuvo en la biblioteca.",
          next: "cap2_valeria_biblioteca",
          effect: { inteligencia: 1, honestidad: 1 },
          addClues: ["valeria_estuvo_cerca_biblioteca"],
        },
        {
          label: "Preguntarle por la muerte de su madre.",
          next: "cap2_madre_valeria",
          effect: { inteligencia: 2, confianza: 1 },
          requirements: {
            clues: ["muerte_madre_valeria"],
          },
        },
        {
          label: "Aceptar su cercanía y ganarte su confianza.",
          next: "cap3_inicio",
          effect: { confianza: 2, honestidad: -1 },
          setFlags: { alianza_valeria: true },
        },
      ],
    },

    cap2_valeria_biblioteca: {
      chapterNumber: 2,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Una puerta entreabierta",
      tag: "Capítulo 2",
      place: "Salón azul",
      title: "La media verdad de Valeria",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
      text: `Valeria admite que entró a la biblioteca.

—Mi padre estaba vivo cuando lo vi. Pero estaba pálido. Sudaba. Apenas podía hablar.

Dice que discutieron.
Dice que él la amenazó con revelar algo sobre ti y Adrián.

Luego escuchó el disparo desde el pasillo.`,
      choices: [
        {
          label: "Creerle por ahora.",
          next: "cap3_inicio",
          effect: { confianza: 1, honestidad: 1 },
          addClues: ["valeria_afirma_victima_viva"],
        },
        {
          label: "Acusarla de manipularte.",
          next: "cap3_inicio",
          effect: { confianza: -2, inteligencia: 1 },
          setFlags: { desconfia_valeria: true },
        },
      ],
    },

    cap2_madre_valeria: {
      chapterNumber: 2,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La primera copa",
      tag: "Capítulo 2",
      place: "Salón azul",
      title: "La madre que también bebió",
      image:
        "https://images.unsplash.com/photo-1520637836862-4d197d17c92a?auto=format&fit=crop&w=1400&q=80",
      text: `Valeria deja de respirar por un instante.

—Mi madre no murió enferma. La mataron lentamente.

Te muestra una cicatriz antigua en su muñeca.

—Mi padre me obligó a callar. Esta noche iba a hacer lo mismo con Adrián... y contigo.

Ahora entiendes el odio de Valeria.
Pero el odio no siempre dispara un arma.`,
      choices: [
        {
          label: "Prometerle que revelarás la verdad de su madre.",
          next: "cap3_inicio",
          effect: { honestidad: 2, confianza: 1 },
          addClues: ["don_esteban_mato_madre_valeria"],
        },
        {
          label: "Usar su dolor para presionarla.",
          next: "cap3_inicio",
          effect: { honestidad: -2, inteligencia: 1 },
          setFlags: { manipulo_valeria: true },
        },
      ],
    },

    cap2_adrian_version: {
      chapterNumber: 2,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "El amante bajo sospecha",
      tag: "Capítulo 2",
      place: "Invernadero",
      title: "Adrián y la rosa negra",
      image:
        "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1400&q=80",
      text: `Adrián te espera en el invernadero.

—Don Esteban me citó en la biblioteca. Me ofreció dinero para dejarte.

Luego confiesa algo peor:

—Acepté verlo porque pensaba romper el compromiso con Valeria esta noche.

Dice que cuando entró, Don Esteban ya estaba convulsionando.
Después alguien disparó desde la sombra.`,
      choices: [
        {
          label: "Preguntarle por la llave dorada.",
          next: "cap2_llave_adrian",
          effect: { inteligencia: 1 },
          requirements: {
            items: ["llave_dorada"],
          },
        },
        {
          label: "Preguntarle si todavía te ama.",
          next: "cap2_amor_adrian",
          effect: { confianza: 2, honestidad: -1 },
        },
        {
          label: "Preguntarle quién estaba en la sombra.",
          next: "cap3_inicio",
          effect: { inteligencia: 2 },
          addClues: ["adrian_vio_sombra"],
        },
      ],
    },

    cap2_llave_adrian: {
      chapterNumber: 2,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Una llave que no era suya",
      tag: "Capítulo 2",
      place: "Invernadero",
      title: "La llave dorada",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
      text: `Adrián mira tu mano y entiende que tienes la llave.

—No era mía. Valeria me la dio. Dijo que si algo salía mal, debía abrir el ala oeste.

Si dice la verdad, Valeria preparó una salida.
Si miente, Adrián intenta entregarla.

Ambos escenarios te duelen.`,
      choices: [
        {
          label: "Ir al ala oeste con la llave.",
          next: "cap2_ala_oeste",
          effect: { inteligencia: 1 },
          addClues: ["valeria_dio_llave"],
        },
        {
          label: "Guardar la llave y fingir que no sabes nada.",
          next: "cap3_inicio",
          effect: { honestidad: -1, inteligencia: 1 },
          setFlags: { oculto_llave: true },
        },
      ],
    },

    cap2_amor_adrian: {
      chapterNumber: 2,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Amor como coartada",
      tag: "Capítulo 2",
      place: "Invernadero",
      title: "Lo que Adrián no puede negar",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80",
      text: `Adrián no responde de inmediato.

Luego te besa como alguien que no sabe si merece ser perdonado.

—Sí. Te amo. Pero amar no me vuelve inocente.

La frase te atraviesa.
Quizás lo amas.
Quizás eso te impide verlo claramente.`,
      choices: [
        {
          label: "Decidir que lo protegerás.",
          next: "cap3_inicio",
          effect: { confianza: 2, honestidad: -1 },
          setFlags: { proteger_adrian: true },
        },
        {
          label: "Decidir que la verdad será más importante.",
          next: "cap3_inicio",
          effect: { honestidad: 2, confianza: -1 },
          setFlags: { verdad_sobre_adrian: true },
        },
      ],
    },

    cap2_ala_oeste: {
      chapterNumber: 2,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La puerta que guarda a los muertos",
      tag: "Capítulo 2",
      place: "Ala oeste",
      title: "El cuarto sellado",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      text: `La llave abre una habitación cubierta por sábanas.

Dentro encuentras retratos de la madre de Valeria, cartas médicas y un libro de cuentas.

Don Esteban pagó durante años a un médico para falsificar certificados.

En una gaveta hay una ampolla vacía con una etiqueta rota: “cian...”`,
      choices: [
        {
          label: "Guardar la ampolla.",
          next: "cap3_inicio",
          effect: { inteligencia: 2, honestidad: 1 },
          addItems: ["ampolla_vacia"],
          addClues: ["veneno_confirmado", "certificados_falsos"],
        },
        {
          label: "Buscar más documentos antes de salir.",
          next: "cap3_inicio",
          effect: { inteligencia: 2, vida: -4 },
          addItems: ["libro_cuentas"],
          addClues: ["medico_sobornado", "certificados_falsos"],
        },
      ],
    },

    cap2_ala_oeste_forzada: {
      chapterNumber: 2,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Entrar tiene un precio",
      tag: "Capítulo 2",
      place: "Ala oeste",
      title: "La cerradura rota",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      text: `Fuerzas la puerta con un candelabro.

El golpe te lastima la muñeca, pero la puerta cede.

No encuentras todo, pero sí una fotografía: Don Esteban junto a un médico y una mujer enferma.

En el reverso hay una fecha.
La misma noche en que murió la madre de Valeria.`,
      choices: [
        {
          label: "Llevar la fotografía contigo.",
          next: "cap3_inicio",
          effect: { inteligencia: 1, vida: -3 },
          addItems: ["fotografia_medico"],
          addClues: ["muerte_madre_no_natural"],
        },
      ],
    },

    cap3_inicio: {
      chapterNumber: 3,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "El testamento secreto",
      tag: "Capítulo 3",
      place: "Despacho privado",
      title: "Todos tenían una razón",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
      text: `La tormenta golpea los ventanales.

En el despacho de Don Esteban encuentras una caja fuerte abierta.
Dentro no hay dinero.
Solo un testamento nuevo.

El documento cambia toda la herencia:
Valeria no recibiría nada.
Adrián sería acusado de fraude.
Y tú serías expuesta en los periódicos como amante y cómplice.

El crimen ya no parece una explosión de rabia.
Parece una ejecución planeada.`,
      choices: [
        {
          label: "Leer completo el testamento.",
          next: "cap3_testamento",
          effect: { inteligencia: 2, honestidad: 1 },
          addItems: ["testamento_nuevo"],
          addClues: ["todos_perdian_con_testamento"],
        },
        {
          label: "Buscar quién abrió la caja fuerte.",
          next: "cap3_caja_fuerte",
          effect: { inteligencia: 2 },
          addClues: ["caja_fuerte_abierta"],
        },
        {
          label: "Reunir a Adrián y Valeria para confrontarlos juntos.",
          next: "cap3_confrontacion",
          effect: { confianza: 1, honestidad: 1 },
          requirements: {
            minStats: { confianza: 2 },
          },
        },
        {
          label: "Ocultar el testamento para controlar la situación.",
          next: "cap3_control",
          effect: { honestidad: -3, inteligencia: 1 },
          addItems: ["testamento_oculto"],
          setFlags: { oculto_testamento: true },
        },
      ],
    },

    cap3_testamento: {
      chapterNumber: 3,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La herencia como arma",
      tag: "Capítulo 3",
      place: "Despacho privado",
      title: "La última crueldad de Don Esteban",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
      text: `El testamento no es solo legal.
Es cruel.

Don Esteban no quería ordenar su muerte.
Quería ordenar la vida de todos después de ella.

El documento menciona una cláusula secreta:
si Valeria era acusada de cualquier crimen, toda la fortuna pasaría a una fundación controlada por el médico familiar.

El médico también tenía un motivo.`,
      choices: [
        {
          label: "Investigar al médico familiar.",
          next: "cap3_medico",
          effect: { inteligencia: 2 },
          addClues: ["medico_ganaba_herencia"],
        },
        {
          label: "Confrontar a Valeria con el testamento.",
          next: "cap3_valeria_testamento",
          effect: { honestidad: 1, confianza: 1 },
        },
      ],
    },

    cap3_caja_fuerte: {
      chapterNumber: 3,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La mano que conocía la clave",
      tag: "Capítulo 3",
      place: "Despacho privado",
      title: "Números familiares",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=80",
      text: `La caja fuerte fue abierta con la combinación correcta.

La clave no era una fecha de nacimiento.
Era la fecha de muerte de la madre de Valeria.

Alguien que conocía ese dolor abrió la caja antes de que tú llegaras.

En el suelo encuentras una gota de cera roja.`,
      choices: [
        {
          label: "Relacionar la cera roja con el sobre de la biblioteca.",
          next: "cap3_conexion_cera",
          effect: { inteligencia: 2 },
          requirements: {
            clues: ["sobre_oculto"],
          },
          addClues: ["misma_cera_roja"],
        },
        {
          label: "Confrontar a Valeria por la combinación.",
          next: "cap3_valeria_testamento",
          effect: { inteligencia: 1 },
        },
        {
          label: "Buscar al médico familiar.",
          next: "cap3_medico",
          effect: { inteligencia: 1 },
        },
      ],
    },

    cap3_conexion_cera: {
      chapterNumber: 3,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "El sello de las mentiras",
      tag: "Capítulo 3",
      place: "Despacho privado",
      title: "La cera negra y la cera roja",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
      text: `La cera del sobre y la cera del despacho tienen la misma mezcla.

No fue una coincidencia.
Alguien preparó documentos, pistas y rutas falsas antes del crimen.

El asesinato empezó mucho antes del disparo.

Ahora tienes suficiente para una confrontación real.`,
      choices: [
        {
          label: "Reunir a todos en la biblioteca.",
          next: "cap4_inicio",
          effect: { inteligencia: 2, honestidad: 1 },
          addClues: ["crimen_premeditado"],
        },
      ],
    },

    cap3_medico: {
      chapterNumber: 3,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "El hombre que firmaba muertes",
      tag: "Capítulo 3",
      place: "Pasillo de servicio",
      title: "El médico familiar",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80",
      text: `Encuentras al doctor Salvatierra intentando salir por la puerta de servicio.

Lleva una maleta pequeña.

Dentro hay dinero, una receta falsa y una segunda ampolla.

—No entiende nada, señorita Herrera —dice—. En esta casa todos querían que Esteban muriera. Yo solo fui útil.

Su miedo parece real.
Pero también parece ensayado.`,
      choices: [
        {
          label: "Arrebatarle la maleta.",
          next: "cap4_inicio",
          effect: { vida: -5, inteligencia: 2 },
          addItems: ["maleta_medico"],
          addClues: ["segunda_ampolla", "receta_falsa"],
        },
        {
          label: "Ofrecerle protección si declara la verdad.",
          next: "cap4_inicio",
          effect: { honestidad: 2, inteligencia: 1 },
          addClues: ["medico_dispuesto_confesar"],
          setFlags: { medico_confiesa: true },
        },
        {
          label: "Amenazarlo para que culpe a Valeria.",
          next: "cap4_inicio",
          effect: { honestidad: -3, confianza: -1 },
          setFlags: { manipulo_medico: true },
        },
      ],
    },

    cap3_valeria_testamento: {
      chapterNumber: 3,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La hija desheredada",
      tag: "Capítulo 3",
      place: "Salón azul",
      title: "Valeria ante el testamento",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
      text: `Valeria lee el testamento sin sorpresa.

—Lo sabía —dice—. Por eso esta noche iba a escapar.

Entonces te muestra una carta que llevaba oculta en el corsé.

Es de Adrián.
Pero no es una carta de amor.
Es una promesa de fuga firmada por ambos.

Adrián y Valeria iban a huir juntos.
No como amantes.
Como prisioneros escapando del mismo carcelero.`,
      choices: [
        {
          label: "Creer que Valeria quería libertad, no dinero.",
          next: "cap4_inicio",
          effect: { confianza: 2, honestidad: 1 },
          addClues: ["valeria_y_adrian_planeaban_huir"],
        },
        {
          label: "Pensar que ambos te usaron.",
          next: "cap4_inicio",
          effect: { confianza: -2, inteligencia: 1 },
          setFlags: { lucia_se_siente_usada: true },
        },
      ],
    },

    cap3_confrontacion: {
      chapterNumber: 3,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Tres corazones contra una verdad",
      tag: "Capítulo 3",
      place: "Invernadero",
      title: "Adrián, Valeria y Lucía",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1400&q=80",
      text: `Reúnes a Adrián y Valeria en el invernadero.

Los dos se miran con culpa, pero no con amor.
No del modo que esperabas.

Valeria confiesa que sabía de ustedes.
Adrián confiesa que iba a huir con Valeria para protegerla, no para casarse.

Y tú entiendes algo doloroso:
quizás el triángulo nunca fue de deseo.
Fue de supervivencia.`,
      choices: [
        {
          label: "Aceptar una alianza entre los tres.",
          next: "cap4_inicio",
          effect: { confianza: 3, honestidad: 1 },
          setFlags: { alianza_tres: true },
          addClues: ["alianza_posible"],
        },
        {
          label: "Romper con ambos y seguir sola.",
          next: "cap4_inicio",
          effect: { honestidad: 2, confianza: -2 },
          setFlags: { lucia_sola: true },
        },
      ],
    },

    cap3_control: {
      chapterNumber: 3,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La verdad también puede ser una llave",
      tag: "Capítulo 3",
      place: "Despacho privado",
      title: "La dueña del secreto",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
      text: `Guardas el testamento.

Por primera vez en toda la noche, tienes poder real.

Puedes salvar a alguien.
Puedes hundir a todos.
Puedes vender la verdad al mejor postor.

La pregunta ya no es quién mató a Don Esteban.
La pregunta es qué harás con la respuesta.`,
      choices: [
        {
          label: "Usar el testamento para negociar con todos.",
          next: "cap4_inicio",
          effect: { inteligencia: 2, honestidad: -2 },
          setFlags: { lucia_busca_poder: true },
        },
      ],
    },

    cap4_inicio: {
      chapterNumber: 4,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "La verdad envenenada",
      tag: "Capítulo 4",
      place: "Biblioteca principal",
      title: "La reconstrucción del crimen",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80",
      text: `Reúnes a todos en la biblioteca.

La tormenta cae sobre la mansión como una sentencia.

Ahora sabes que el disparo no fue el inicio.
Fue el final de un plan.

Don Esteban fue envenenado primero.
La bala llegó después.
El testamento convirtió a todos en sospechosos.
La muerte de la madre de Valeria convirtió el crimen en venganza.

Pero todavía falta decidir qué verdad contarás.`,
      choices: [
        {
          label: "Exponer toda la verdad ante la policía.",
          next: "final_justicia_completa",
          effect: { honestidad: 3 },
          requirements: {
            minStats: { honestidad: 2, inteligencia: 4 },
            clues: ["posible_veneno"],
          },
        },
        {
          label: "Proteger a Valeria y culpar al médico.",
          next: "final_valeria_libre",
          effect: { confianza: 2, honestidad: -2 },
          requirements: {
            minStats: { confianza: 3 },
            clues: ["medico_ganaba_herencia"],
          },
        },
        {
          label: "Huir con Adrián antes de que llegue la policía.",
          next: "final_fuga_adrian",
          effect: { confianza: 2, honestidad: -2 },
          requirements: {
            minStats: { confianza: 4 },
          },
        },
        {
          label: "Usar las pruebas para controlar a todos.",
          next: "final_reina_mansion",
          effect: { honestidad: -4 },
          requirements: {
            items: ["testamento_oculto"],
          },
        },
        {
          label: "Confesar tu propia relación con Adrián y entregar las pruebas.",
          next: "final_lucia_redimida",
          effect: { honestidad: 4, confianza: -1 },
          requirements: {
            minStats: { honestidad: 3 },
          },
        },
      ],
    },

    final_justicia_completa: {
      chapterNumber: 4,
      headerTitle: "Final desbloqueado",
      headerSubtitle: "La verdad completa",
      tag: "Final",
      place: "Entrada de la mansión",
      title: "Final: Justicia bajo la tormenta",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80",
      text: `Entregas cada prueba.

La copa.
La ampolla.
El testamento.
Las cartas.
Los certificados falsos.

La policía descubre que Valeria disparó, pero también que Don Esteban había matado antes y que el médico ayudó a encubrirlo.

Nadie queda limpio.
Pero por primera vez, la casa De la Vega deja de vivir bajo una mentira.

Adrián no te perdona.
Valeria no te odia.
Y tú publicas la historia más dolorosa de tu vida.`,
      ending: "Justicia bajo la tormenta",
      choices: [],
    },

    final_valeria_libre: {
      chapterNumber: 4,
      headerTitle: "Final desbloqueado",
      headerSubtitle: "Una mentira piadosa",
      tag: "Final",
      place: "Carruaje nocturno",
      title: "Final: La libertad de Valeria",
      image:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1400&q=80",
      text: `Decides culpar al médico.

No es inocente.
Pero tampoco fue el único culpable.

Valeria escapa antes del amanecer. Antes de irse, besa tu mejilla y deja una rosa blanca en tu mano.

—No sé si me salvaste o me condenaste —susurra.

Quizás ambas cosas son ciertas.`,
      ending: "La libertad de Valeria",
      choices: [],
    },

    final_fuga_adrian: {
      chapterNumber: 4,
      headerTitle: "Final desbloqueado",
      headerSubtitle: "Amor contra la verdad",
      tag: "Final",
      place: "Estación al amanecer",
      title: "Final: Fuga de amantes",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
      text: `Huyes con Adrián antes de que llegue la policía.

En el tren, él toma tu mano.
Pero entre ustedes viaja todo lo que no dijeron.

Valeria queda atrás.
La verdad queda atrás.
El crimen queda atrás.

El amor sobrevive.
Pero no sabes si eso lo vuelve hermoso... o imperdonable.`,
      ending: "Fuga de amantes",
      choices: [],
    },

    final_reina_mansion: {
      chapterNumber: 4,
      headerTitle: "Final desbloqueado",
      headerSubtitle: "La verdad como corona",
      tag: "Final",
      place: "Despacho privado",
      title: "Final: Reina de la mansión",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
      text: `No entregas las pruebas.

Las organizas.

Cada carta.
Cada firma.
Cada secreto.

Cuando la policía llega, tú ya decidiste qué historia escucharán.

Adrián, Valeria y el médico entienden demasiado tarde que Don Esteban no dejó un heredero.

Dejó un trono vacío.

Y tú lo ocupaste.`,
      ending: "Reina de la mansión",
      choices: [],
    },

    final_lucia_redimida: {
      chapterNumber: 4,
      headerTitle: "Final desbloqueado",
      headerSubtitle: "La verdad también te acusa",
      tag: "Final",
      place: "Biblioteca principal",
      title: "Final: Lucía redimida",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
      text: `Antes de entregar las pruebas, confiesas tu propia relación con Adrián.

No lo haces por culpa.
Lo haces porque una verdad incompleta sigue siendo una mentira.

Pierdes reputación.
Pierdes a Adrián.
Pierdes la historia perfecta.

Pero salvas algo más difícil de conservar:

tu nombre frente al espejo.`,
      ending: "Lucía redimida",
      choices: [],
    },

    finalSinVida: {
      chapterNumber: 4,
      headerTitle: "Final desbloqueado",
      headerSubtitle: "La investigación terminó antes de tiempo",
      tag: "Final",
      place: "Mansión De la Vega",
      title: "Final: Sin fuerzas",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
      text: `Tu cuerpo y tu mente no resisten más.

La noche, las heridas, la presión y las mentiras te dejan sin fuerzas para seguir.

Cuando la policía llega, otros cuentan la historia por ti.

Y como siempre ocurre en la mansión De la Vega, quien cuenta la historia decide quién parece culpable.`,
      ending: "Final por vida agotada",
      choices: [],
    },
  },
};