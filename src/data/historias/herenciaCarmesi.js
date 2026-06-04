import { createStory } from "../storyFactory.js";

export const herenciaCarmesi = createStory({
  id: "la-herencia-carmesi",
  title: "La Herencia Carmesí",
  subtitle: "Una familia rota, una fortuna y un cadáver.",
  genre: "Drama criminal / Romance oscuro",
  status: "available",
  cover:
    "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1200&q=80",

  chaptersData: [
    {
      title: "El testamento",
      place: "Mansión Carmesí",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1200&q=80",
      text: `La familia Armenta se reúne para escuchar el testamento de Don Rodrigo.

Tú eres Clara Montes, abogada joven y antigua amante de Julián Armenta, el heredero favorito.

Pero antes de que el notario lea la última voluntad, una criada grita desde el segundo piso.

Don Rodrigo no murió durante la noche.

Fue asesinado.

Sobre su pecho hay una carta sellada con cera roja.`,
      choices: [
        {
          label: "Tomar la carta antes de que la familia la vea.",
          next: "cap2_inicio",
          effect: { inteligencia: 2, honestidad: -1 },
          addItems: ["carta_cera_roja"],
          addClues: ["carta_sobre_el_cadaver"],
        },
        {
          label: "Pedir que nadie toque la escena.",
          next: "cap2_inicio",
          effect: { honestidad: 2, confianza: 1 },
          addClues: ["escena_protegida"],
        },
        {
          label: "Observar la reacción de Julián.",
          next: "cap2_inicio",
          effect: { inteligencia: 1, confianza: 1 },
          addClues: ["julian_oculta_algo"],
        },
      ],
    },

    {
      title: "La habitación prohibida",
      place: "Segundo piso",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      text: `La habitación de Don Rodrigo está intacta.

Demasiado intacta.

No hay signos de pelea, pero la ventana está abierta y una cortina roja aparece rota.

En la mesa de noche encuentras una llave pequeña.

La criada asegura que esa habitación llevaba años cerrada para todos, excepto para una persona: Emilia, la hija menor.`,
      choices: [
        {
          label: "Guardar la llave pequeña.",
          next: "cap3_inicio",
          effect: { inteligencia: 1, honestidad: -1 },
          addItems: ["llave_pequena"],
          addClues: ["habitacion_abierta_por_dentro"],
        },
        {
          label: "Interrogar a la criada.",
          next: "cap3_inicio",
          effect: { inteligencia: 2, confianza: 1 },
          addClues: ["emilia_entraba_habitacion"],
        },
        {
          label: "Revisar la ventana abierta.",
          next: "cap3_inicio",
          effect: { vida: -2, inteligencia: 2 },
          addClues: ["cortina_roja_rota"],
        },
      ],
    },

    {
      title: "La amante escondida",
      place: "Jardín de invierno",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      text: `En el jardín de invierno encuentras a Isabel, la supuesta institutriz de la familia.

Llora frente a una rosa seca.

Cuando te ve, intenta esconder un medallón con el retrato de Don Rodrigo.

No era solo una empleada.

Era su amante.

Y tal vez la única persona que no quería su fortuna, sino su perdón.`,
      choices: [
        {
          label: "Prometerle protección si dice la verdad.",
          next: "cap4_inicio",
          effect: { honestidad: 2, confianza: 2 },
          addClues: ["isabel_amante_rodrigo"],
        },
        {
          label: "Amenazarla con revelar el romance.",
          next: "cap4_inicio",
          effect: { inteligencia: 1, honestidad: -2 },
          addClues: ["isabel_tiene_miedo"],
        },
        {
          label: "Robar el medallón.",
          next: "cap4_inicio",
          effect: { inteligencia: 1, honestidad: -2 },
          addItems: ["medallon_isabel"],
        },
      ],
    },

    {
      title: "La carta del difunto",
      place: "Biblioteca familiar",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      text: `La carta sellada contiene una confesión incompleta.

“Si muero esta noche, no busquen al asesino entre mis enemigos. Búsquenlo entre quienes me heredarán.”

La frase final está manchada de sangre.

Pero debajo del escritorio encuentras una segunda hoja.

En ella aparece tu nombre.`,
      choices: [
        {
          label: "Leer la hoja con tu nombre.",
          next: "cap5_inicio",
          effect: { inteligencia: 2, vida: -2 },
          addClues: ["clara_mencionada_testamento"],
        },
        {
          label: "Ocultar la hoja antes de que Julián la vea.",
          next: "cap5_inicio",
          effect: { honestidad: -2, confianza: 1 },
          addItems: ["hoja_oculta_clara"],
        },
        {
          label: "Entregar la carta al notario.",
          next: "cap5_inicio",
          effect: { honestidad: 2 },
          addClues: ["carta_entregada_notario"],
        },
      ],
    },

    {
      title: "El retrato manchado",
      place: "Galería familiar",
      image:
        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
      text: `En la galería familiar, un retrato antiguo tiene una mancha reciente.

Es sangre.

El cuadro muestra a Don Rodrigo junto a su primera esposa, una mujer que todos dicen que murió de fiebre.

Pero detrás del marco encuentras un certificado médico falso.

La muerte de Don Rodrigo no fue el primer crimen de esa casa.`,
      choices: [
        {
          label: "Guardar el certificado falso.",
          next: "cap6_inicio",
          effect: { inteligencia: 2, honestidad: 1 },
          addItems: ["certificado_falso"],
          addClues: ["primera_esposa_no_murio_fiebre"],
        },
        {
          label: "Preguntar a Emilia por su madre.",
          next: "cap6_inicio",
          effect: { confianza: 1, inteligencia: 1 },
          addClues: ["emilia_sabe_de_su_madre"],
        },
        {
          label: "Romper el marco para buscar más pruebas.",
          next: "cap6_inicio",
          effect: { vida: -3, inteligencia: 2 },
          addItems: ["foto_oculta"],
        },
      ],
    },

    {
      title: "El heredero falso",
      place: "Despacho del notario",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
      text: `El notario confiesa que el testamento fue cambiado dos días antes.

Julián iba a perderlo todo.

Pero hay algo peor: los documentos de nacimiento de Julián no coinciden.

El heredero favorito quizá no era hijo de Don Rodrigo.

Y Don Rodrigo lo descubrió la misma noche en que murió.`,
      choices: [
        {
          label: "Confrontar a Julián con los documentos.",
          next: "cap7_inicio",
          effect: { honestidad: 1, confianza: -1 },
          addClues: ["julian_no_es_hijo_legitimo"],
        },
        {
          label: "Ocultar la verdad para proteger a Julián.",
          next: "cap7_inicio",
          effect: { confianza: 2, honestidad: -2 },
          addItems: ["documentos_julian"],
        },
        {
          label: "Usar el secreto como ventaja.",
          next: "cap7_inicio",
          effect: { inteligencia: 2, honestidad: -2 },
          addClues: ["secreto_julian_controlable"],
        },
      ],
    },

    {
      title: "La cena del chantaje",
      place: "Comedor principal",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      text: `La familia cena en silencio mientras el cadáver aún espera en el segundo piso.

Entonces llega una nota anónima:

“Uno de ustedes mató por amor. Otro mató por dinero. El tercero solo terminó lo que todos deseaban.”

La nota no acusa a una persona.

Acusa a todos.

Y cuando levantas la mirada, Julián ya no está en su silla.`,
      choices: [
        {
          label: "Seguir a Julián.",
          next: "cap8_inicio",
          effect: { confianza: 1, vida: -2 },
          addClues: ["julian_huye_de_la_cena"],
        },
        {
          label: "Revisar quién dejó la nota.",
          next: "cap8_inicio",
          effect: { inteligencia: 2 },
          addClues: ["nota_anonima"],
        },
        {
          label: "Acusar a toda la familia.",
          next: "cap8_inicio",
          effect: { honestidad: 1, confianza: -2 },
        },
      ],
    },

    {
      title: "La confesión en el jardín",
      place: "Jardín cerrado",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
      text: `Encuentras a Julián en el jardín cerrado.

—Yo no lo maté —dice—. Pero fui a verlo esa noche.

Confiesa que Don Rodrigo iba a expulsarlo de la familia y revelar que no era su hijo.

Luego dice algo que te rompe:

—Yo iba a huir contigo, Clara. Antes de que todo esto ocurriera.

No sabes si te ama o si solo necesita una coartada.`,
      choices: [
        {
          label: "Creerle a Julián.",
          next: "cap9_inicio",
          effect: { confianza: 3, honestidad: -1 },
          addClues: ["julian_queria_huir"],
        },
        {
          label: "Decirle que la verdad importa más que el amor.",
          next: "cap9_inicio",
          effect: { honestidad: 3, confianza: -1 },
          addClues: ["clara_prioriza_verdad"],
        },
        {
          label: "Pedirle que confiese todo ante el notario.",
          next: "cap9_inicio",
          effect: { honestidad: 2, confianza: 1 },
        },
      ],
    },

    {
      title: "Sangre en la herencia",
      place: "Cripta familiar",
      image:
        "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80",
      text: `La última pista te lleva a la cripta familiar.

Allí encuentras una copa rota, igual a la que usaba la primera esposa de Don Rodrigo.

Isabel aparece detrás de ti.

—Él no merecía morir rápido —susurra—. Pero alguien se adelantó.

Entonces entiendes la verdad: hubo veneno, hubo chantaje y hubo una mano final.

El crimen fue compartido.`,
      choices: [
        {
          label: "Preguntar quién dio el golpe final.",
          next: "cap10_inicio",
          effect: { inteligencia: 2 },
          addClues: ["crimen_compartido"],
        },
        {
          label: "Acusar a Isabel.",
          next: "cap10_inicio",
          effect: { honestidad: 1, confianza: -1 },
          addClues: ["isabel_participo"],
        },
        {
          label: "Guardar silencio para proteger a Julián.",
          next: "cap10_inicio",
          effect: { confianza: 2, honestidad: -2 },
        },
      ],
    },

    {
      title: "La última firma",
      place: "Biblioteca privada",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
      text: `Todos vuelven a la biblioteca.

El notario espera.
La familia observa.
Julián no puede mirarte.
Isabel sostiene el medallón.
Emilia tiene las manos manchadas de tinta roja.

Ya sabes suficiente.

Don Rodrigo fue envenenado por años.
Esa noche alguien aceleró su muerte.
Y otro intentó usar el cadáver para cambiar la herencia.

Ahora debes decidir qué verdad sobrevivirá.`,
      choices: [
        {
          label: "Revelar toda la verdad y entregar las pruebas.",
          next: "final_verdadero",
          effect: { honestidad: 4, inteligencia: 2 },
          addClues: ["verdad_completa_herencia"],
        },
        {
          label: "Proteger a Julián y culpar a Isabel.",
          next: "final_secreto",
          effect: { confianza: 3, honestidad: -3 },
        },
        {
          label: "Usar los documentos para quedarte con el control legal.",
          next: "final_oscuro",
          effect: { inteligencia: 2, honestidad: -4 },
          addItems: ["control_legal_herencia"],
        },
      ],
    },
  ],
});