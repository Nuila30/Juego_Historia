import { createStory } from "../storyFactory.js";

export const ultimoBaile = createStory({
  id: "el-ultimo-baile",
  title: "El Último Baile",
  subtitle:
    "Una bailarina desaparece durante una gala y todos sus amantes tienen algo que ocultar.",
  genre: "Misterio / Romance",
  status: "available",
  cover:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",

  chaptersData: [
    {
      title: "La gala de máscaras",
      place: "Gran Teatro Aurora",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      text: `El Gran Teatro Aurora abre sus puertas para la gala más importante del año.

Tú eres Elena Vidal: periodista cultural, invitada de último minuto y antigua amiga de Camila Ríos, la bailarina principal.

Camila debía cerrar la noche con una presentación privada llamada “El Último Baile”.

Pero cuando las luces bajan y la música inicia, ella no aparece.

En su lugar, cae del techo una máscara blanca manchada de sangre.

El público cree que es parte del espectáculo.

Tú sabes que no lo es.

Antes de desaparecer, Camila te dejó una nota:

“Si no salgo al escenario, busca mi camerino. No confíes en quien aplauda primero.”`,
      choices: [
        {
          label: "Ir directamente al camerino de Camila.",
          next: "cap2_inicio",
          effect: {
            inteligencia: 2,
            vida: -2,
          },
          addClues: ["nota_de_camila", "mascara_con_sangre"],
          addItems: ["nota_de_camila"],
        },
        {
          label: "Observar quién aplaudió primero.",
          next: "cap2_inicio",
          effect: {
            inteligencia: 1,
            confianza: 1,
          },
          addClues: ["aplauso_sospechoso"],
        },
        {
          label: "Buscar al director del teatro.",
          next: "cap2_inicio",
          effect: {
            confianza: 1,
            honestidad: 1,
          },
          addClues: ["director_nervioso"],
        },
      ],
    },

    {
      title: "La bailarina desaparecida",
      place: "Camerino principal",
      image:
        "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80",
      text: `El camerino de Camila está abierto.

Dentro hay maquillaje regado, flores pisoteadas y un espejo roto.

Sobre la mesa encuentras tres objetos:

Un anillo de compromiso.
Una carta perfumada.
Una zapatilla de ballet con la cinta cortada.

En el espejo, escrito con labial rojo, lees:

“Ella eligió bailar con el muerto.”

Alguien quiso que la desaparición pareciera una escena teatral.

Pero hay algo real en el desorden.

El miedo.`,
      choices: [
        {
          label: "Guardar la carta perfumada.",
          next: "cap3_inicio",
          effect: {
            inteligencia: 2,
            honestidad: -1,
          },
          addItems: ["carta_perfumada"],
          addClues: ["carta_en_camerino"],
        },
        {
          label: "Examinar el anillo de compromiso.",
          next: "cap3_inicio",
          effect: {
            inteligencia: 1,
            confianza: 1,
          },
          addItems: ["anillo_de_camila"],
          addClues: ["camila_estaba_comprometida"],
        },
        {
          label: "Revisar la zapatilla cortada.",
          next: "cap3_inicio",
          effect: {
            inteligencia: 2,
            vida: -1,
          },
          addItems: ["zapatilla_cortada"],
          addClues: ["sabotaje_en_el_baile"],
        },
      ],
    },

    {
      title: "El camerino cerrado",
      place: "Pasillo tras bambalinas",
      image:
        "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80",
      text: `El pasillo detrás del escenario está casi vacío.

Casi.

Desde un camerino cerrado escuchas una respiración agitada.

La puerta tiene una cerradura antigua y una marca reciente, como si alguien hubiera intentado forzarla desde dentro.

Una voz de hombre susurra:

—No debió volver. Camila no debió volver.

Reconoces la voz.

Es Darío Montes, primer bailarín del teatro y antiguo amante de Camila.

Pero cuando golpeas la puerta, todo queda en silencio.`,
      choices: [
        {
          label: "Forzar la puerta del camerino.",
          next: "cap4_inicio",
          effect: {
            vida: -5,
            inteligencia: 2,
          },
          addClues: ["dario_encerrado", "camerino_forzado"],
        },
        {
          label: "Hablar con Darío sin abrir la puerta.",
          next: "cap4_inicio",
          effect: {
            confianza: 2,
            honestidad: 1,
          },
          addClues: ["dario_teme_a_camila"],
        },
        {
          label: "Buscar la llave en la oficina del director.",
          next: "cap4_inicio",
          effect: {
            inteligencia: 1,
          },
          addClues: ["llave_en_direccion"],
        },
      ],
    },

    {
      title: "El amante del palco",
      place: "Palco privado",
      image:
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80",
      text: `En el palco privado encuentras a Sebastián Aldana, empresario y prometido oficial de Camila.

No parece preocupado.

Tiene una copa en la mano y una sonrisa demasiado tranquila.

—Camila siempre quiso llamar la atención —dice—. Tal vez esta es otra de sus funciones.

Pero en su saco ves una mancha de maquillaje blanco.

El mismo maquillaje de la máscara que cayó sobre el escenario.

Sebastián nota que lo viste.

Y por primera vez deja de sonreír.`,
      choices: [
        {
          label: "Acusarlo de saber dónde está Camila.",
          next: "cap5_inicio",
          effect: {
            honestidad: 2,
            confianza: -1,
          },
          addClues: ["sebastian_manchado_maquillaje"],
        },
        {
          label: "Fingir que no viste la mancha.",
          next: "cap5_inicio",
          effect: {
            inteligencia: 2,
            honestidad: -1,
          },
          addClues: ["sebastian_no_sabe_que_lo_viste"],
        },
        {
          label: "Robar discretamente su copa.",
          next: "cap5_inicio",
          effect: {
            inteligencia: 1,
            honestidad: -2,
          },
          addItems: ["copa_de_sebastian"],
          addClues: ["copa_sospechosa"],
        },
      ],
    },

    {
      title: "La nota perfumada",
      place: "Sala de ensayo",
      image:
        "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
      text: `La carta perfumada está escrita con una caligrafía elegante.

“Camila, esta noche no bailes. Si subes al escenario, todos sabrán lo que hicimos.”

No tiene firma.

Pero el perfume es familiar.

Lo oliste antes en el camerino de la coreógrafa principal: Aurora Beltrán.

Aurora fue maestra de Camila.
También fue la persona que la trajo de vuelta al teatro después de tres años desaparecida.

¿Por qué alguien traería de vuelta a una mujer solo para amenazarla?`,
      choices: [
        {
          label: "Confrontar a Aurora con la carta.",
          next: "cap6_inicio",
          effect: {
            honestidad: 2,
            inteligencia: 1,
          },
          addClues: ["aurora_envio_carta"],
        },
        {
          label: "Guardar la carta y seguir investigando.",
          next: "cap6_inicio",
          effect: {
            inteligencia: 2,
            honestidad: -1,
          },
          addItems: ["carta_perfumada_oculta"],
        },
        {
          label: "Preguntar a los bailarines sobre Aurora.",
          next: "cap6_inicio",
          effect: {
            confianza: 1,
            inteligencia: 1,
          },
          addClues: ["aurora_controla_compania"],
        },
      ],
    },

    {
      title: "El vals de los sospechosos",
      place: "Salón de ensayo",
      image:
        "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80",
      text: `Aurora reúne a los bailarines y exige que la gala continúe.

—El teatro no se detiene por una ausencia —dice.

Pero todos están pálidos.

Darío evita mirar a Sebastián.
Sebastián evita mirar a Aurora.
Aurora evita mirar el escenario.

Entonces un violinista aparece con una partitura nueva.

En la primera página está escrito:

“El vals se baila en cuatro: la víctima, el amante, el comprador y la sombra.”

Camila conocía un secreto de todos.

Y alguien decidió callarla antes del último movimiento.`,
      choices: [
        {
          label: "Revisar la partitura nueva.",
          next: "cap7_inicio",
          effect: {
            inteligencia: 2,
          },
          addItems: ["partitura_del_vals"],
          addClues: ["mensaje_del_vals"],
        },
        {
          label: "Interrogar a Darío frente a todos.",
          next: "cap7_inicio",
          effect: {
            honestidad: 1,
            confianza: -1,
          },
          addClues: ["dario_reacciona_al_vals"],
        },
        {
          label: "Hablar a solas con Aurora.",
          next: "cap7_inicio",
          effect: {
            confianza: 1,
            inteligencia: 1,
          },
          addClues: ["aurora_oculta_el_pasado"],
        },
      ],
    },

    {
      title: "La sombra tras el telón",
      place: "Escenario principal",
      image:
        "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80",
      text: `Mientras revisas el escenario, ves una silueta moverse tras el telón.

Corres hacia ella.

La sombra deja caer una pulsera rota.

La reconoces por las fotografías de prensa.

Era de Camila.

En el borde del escenario hay marcas de arrastre que conducen hacia una trampilla oculta.

El teatro tiene un nivel inferior.

Y alguien llevó a Camila hacia abajo mientras todos miraban hacia arriba.`,
      choices: [
        {
          label: "Abrir la trampilla y bajar.",
          next: "cap8_inicio",
          effect: {
            vida: -6,
            inteligencia: 2,
          },
          addItems: ["pulsera_rota"],
          addClues: ["camila_llevada_abajo"],
        },
        {
          label: "Buscar ayuda antes de bajar.",
          next: "cap8_inicio",
          effect: {
            confianza: 1,
            honestidad: 1,
          },
          addClues: ["trampilla_oculta"],
        },
        {
          label: "Cerrar la trampilla y seguir a la sombra.",
          next: "cap8_inicio",
          effect: {
            inteligencia: 1,
            honestidad: -1,
          },
          addClues: ["sombra_conoce_el_teatro"],
        },
      ],
    },

    {
      title: "El secreto del director",
      place: "Oficina del director",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      text: `El director del teatro, Ernesto Luján, guarda una caja fuerte detrás de un cartel antiguo.

Dentro encuentras contratos, fotografías y una denuncia que nunca llegó a la policía.

Hace tres años, Camila acusó al teatro de encubrir la muerte de otra bailarina: Inés Mar.

El caso fue cerrado como accidente.

Pero Camila no desapareció por capricho.

Huyó porque sabía que Inés fue asesinada.

Y esta noche volvió para revelar el nombre del culpable.`,
      choices: [
        {
          label: "Guardar la denuncia de Inés.",
          next: "cap9_inicio",
          effect: {
            inteligencia: 2,
            honestidad: 1,
          },
          addItems: ["denuncia_de_ines"],
          addClues: ["ines_fue_asesinada"],
        },
        {
          label: "Confrontar al director.",
          next: "cap9_inicio",
          effect: {
            honestidad: 2,
            confianza: -1,
          },
          addClues: ["director_encubrio_crimen"],
        },
        {
          label: "Ocultar la denuncia para negociar después.",
          next: "cap9_inicio",
          effect: {
            inteligencia: 1,
            honestidad: -3,
          },
          addItems: ["denuncia_oculta"],
        },
      ],
    },

    {
      title: "La caída final",
      place: "Nivel inferior del teatro",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      text: `El nivel inferior huele a humedad, polvo y flores marchitas.

Allí encuentras a Camila.

Está viva.

Débil, atada a una silla, pero viva.

—No fue Sebastián —susurra—. Él compró mi silencio, pero no intentó matarme.

Antes de que pueda decir más, las luces se apagan.

Una voz desde la oscuridad dice:

—Siempre fuiste mejor desaparecida, Camila.

Aurora aparece con una pistola pequeña en la mano.`,
      choices: [
        {
          label: "Proteger a Camila.",
          next: "cap10_inicio",
          effect: {
            vida: -10,
            honestidad: 2,
          },
          addClues: ["camila_viva", "aurora_armada"],
        },
        {
          label: "Intentar razonar con Aurora.",
          next: "cap10_inicio",
          effect: {
            confianza: 2,
            inteligencia: 1,
          },
          addClues: ["aurora_no_quiere_matar"],
        },
        {
          label: "Usar la denuncia de Inés para detenerla.",
          next: "cap10_inicio",
          effect: {
            inteligencia: 3,
            honestidad: 1,
          },
          addClues: ["aurora_relacionada_con_ines"],
        },
      ],
    },

    {
      title: "El baile de la verdad",
      place: "Escenario principal",
      image:
        "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80",
      text: `Camila vuelve al escenario.

No para bailar.

Para hablar.

El público guarda silencio mientras ella revela la verdad:

Inés no murió por accidente.
Aurora la empujó durante un ensayo.
El director encubrió el crimen.
Sebastián pagó para comprar silencio.
Darío supo demasiado y calló por miedo.

Todos tenían una parte de culpa.

Pero solo Aurora intentó repetir la historia con Camila.

La música empieza otra vez.

Esta vez no es para una función.

Es para decidir qué harás con la verdad.`,
      choices: [
        {
          label: "Exponer a todos ante la policía y la prensa.",
          next: "final_verdadero",
          effect: {
            honestidad: 4,
            inteligencia: 2,
          },
          addClues: ["verdad_completa_ultimo_baile"],
        },
        {
          label: "Proteger a Camila y dejar que solo Aurora cargue con todo.",
          next: "final_secreto",
          effect: {
            confianza: 3,
            honestidad: -2,
          },
          addClues: ["camila_protegida"],
        },
        {
          label: "Usar las pruebas para controlar el futuro del teatro.",
          next: "final_oscuro",
          effect: {
            inteligencia: 2,
            honestidad: -4,
          },
          addItems: ["archivo_secreto_del_teatro"],
        },
      ],
    },
  ],
});