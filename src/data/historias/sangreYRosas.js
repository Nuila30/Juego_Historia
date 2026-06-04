import { createStory } from "../storyFactory.js";

export const sangreYRosas = createStory({
  id: "sangre-y-rosas",
  title: "Sangre y Rosas",
  subtitle:
    "Un crimen en una mansión, amantes ocultos y una verdad peligrosa.",
  genre: "Asesinato / Romance / Misterio",
  status: "available",
  cover:
    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",

  chaptersData: [
    {
      title: "La noche del crimen",
      place: "Mansión De la Vega",
      image:
        "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
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
          next: "cap2_inicio",
          effect: {
            inteligencia: 2,
            vida: -3,
          },
          addClues: ["escena_crimen_intacta", "rosa_roja_aplastada"],
          addItems: ["nota_del_baile"],
        },
        {
          label: "Buscar a Adrián en los jardines.",
          next: "cap2_inicio",
          effect: {
            confianza: 2,
            inteligencia: 1,
          },
          addClues: ["adrian_desaparecio"],
        },
        {
          label: "Quedarte con Valeria y observar su reacción.",
          next: "cap2_inicio",
          effect: {
            honestidad: 1,
            confianza: 1,
          },
          addClues: ["valeria_no_llora_realmente"],
        },
      ],
    },

    {
      title: "Las primeras mentiras",
      place: "Biblioteca principal",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      text: `La biblioteca huele a pólvora, vino dulce y madera vieja.

Don Esteban yace junto al escritorio. Tiene una herida de bala, pero su rostro parece demasiado sereno para una muerte violenta.

En su mano derecha hay un trozo de encaje rojo.
En la mesa hay una copa rota.
Bajo el escritorio encuentras un sobre sellado con cera negra.

En la puerta, alguien dejó una huella de barro fresco.

Todo parece apuntar a Adrián.

Demasiado fácil.
Demasiado preparado.`,
      choices: [
        {
          label: "Examinar la copa rota.",
          next: "cap3_inicio",
          effect: {
            inteligencia: 2,
            vida: -2,
          },
          addClues: ["olor_almendras", "copa_sospechosa"],
          addItems: ["fragmento_de_copa"],
        },
        {
          label: "Guardar el encaje rojo en secreto.",
          next: "cap3_inicio",
          effect: {
            inteligencia: 1,
            honestidad: -1,
          },
          addItems: ["encaje_rojo"],
          addClues: ["encaje_en_mano_victima"],
        },
        {
          label: "Abrir el sobre de cera negra.",
          next: "cap3_inicio",
          effect: {
            inteligencia: 1,
            honestidad: -1,
          },
          addItems: ["sobre_cera_negra"],
          addClues: ["don_esteban_ocultaba_algo"],
        },
      ],
    },

    {
      title: "El testamento secreto",
      place: "Despacho privado",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1200&q=80",
      text: `En el despacho de Don Esteban encuentras una caja fuerte abierta.

Dentro no hay dinero.

Solo un testamento nuevo.

El documento cambia toda la herencia:
Valeria no recibiría nada.
Adrián sería acusado de fraude.
Y tú serías expuesta en los periódicos como amante y cómplice.

El crimen ya no parece una explosión de rabia.

Parece una ejecución planeada.

Pero la caja fuerte fue abierta con la combinación correcta.

Alguien de la familia llegó aquí antes que tú.`,
      choices: [
        {
          label: "Leer completo el testamento.",
          next: "cap4_inicio",
          effect: {
            inteligencia: 2,
            honestidad: 1,
          },
          addItems: ["testamento_nuevo"],
          addClues: ["todos_perdian_con_testamento"],
        },
        {
          label: "Ocultar el testamento para usarlo después.",
          next: "cap4_inicio",
          effect: {
            inteligencia: 1,
            honestidad: -3,
          },
          addItems: ["testamento_oculto"],
          addClues: ["lucia_controla_una_prueba"],
        },
        {
          label: "Buscar quién abrió la caja fuerte.",
          next: "cap4_inicio",
          effect: {
            inteligencia: 2,
          },
          addClues: ["caja_fuerte_abierta"],
        },
      ],
    },

    {
      title: "La verdad envenenada",
      place: "Ala oeste",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      text: `El ala oeste de la mansión lleva años cerrada.

La llave que encontraste encaja perfectamente.

Dentro hay retratos cubiertos por sábanas, cartas médicas y una vieja botella sin etiqueta.

Entre los papeles aparece el nombre de la madre de Valeria.

Todos dijeron que murió por una enfermedad.

Pero los certificados médicos fueron falsificados.

Don Esteban pudo haber matado antes.

Y si Valeria lo sabía, su motivo no era dinero.

Era venganza.`,
      choices: [
        {
          label: "Guardar los certificados falsos.",
          next: "cap5_inicio",
          effect: {
            inteligencia: 2,
            honestidad: 1,
          },
          addItems: ["certificados_falsos"],
          addClues: ["madre_valeria_fue_envenenada"],
        },
        {
          label: "Buscar más pruebas en la habitación.",
          next: "cap5_inicio",
          effect: {
            inteligencia: 2,
            vida: -4,
          },
          addItems: ["botella_sin_etiqueta"],
          addClues: ["veneno_antiguo"],
        },
        {
          label: "Cerrar la habitación y no decir nada todavía.",
          next: "cap5_inicio",
          effect: {
            honestidad: -1,
            confianza: 1,
          },
          addClues: ["lucia_oculta_ala_oeste"],
        },
      ],
    },

    {
      title: "La rosa blanca",
      place: "Jardín cerrado",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
      text: `En el jardín cerrado encuentras a Valeria.

No está llorando.

Está enterrando una rosa blanca bajo los arbustos.

Cuando te ve, no intenta escapar.

—Mi madre amaba las rosas blancas —dice—. Mi padre las mandó arrancar después de su muerte.

Valeria sabe que encontraste algo.

También sabe que tú amaste a Adrián.

Por primera vez no parece tu rival.

Parece una mujer cansada de sobrevivir.`,
      choices: [
        {
          label: "Preguntarle directamente si mató a su padre.",
          next: "cap6_inicio",
          effect: {
            honestidad: 2,
            confianza: -1,
          },
          addClues: ["valeria_no_niega_el_odio"],
        },
        {
          label: "Prometerle que descubrirás la verdad de su madre.",
          next: "cap6_inicio",
          effect: {
            confianza: 2,
            honestidad: 1,
          },
          addClues: ["valeria_empieza_a_confiar"],
        },
        {
          label: "Usar su dolor para presionarla.",
          next: "cap6_inicio",
          effect: {
            inteligencia: 1,
            honestidad: -2,
          },
          addClues: ["valeria_se_siente_amenazada"],
        },
      ],
    },

    {
      title: "El médico familiar",
      place: "Pasillo de servicio",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
      text: `El doctor Salvatierra intenta salir por la puerta de servicio.

Lleva una maleta pequeña.

Dentro hay dinero, recetas falsas y una segunda ampolla.

—No entiende nada, señorita Herrera —dice—. En esta casa todos querían que Esteban muriera. Yo solo fui útil.

Su miedo parece real.

Pero también parece ensayado.

Si el médico ayudó, alguien le pagó.

Y si alguien le pagó, el asesinato fue preparado mucho antes del baile.`,
      choices: [
        {
          label: "Arrebatarle la maleta.",
          next: "cap7_inicio",
          effect: {
            vida: -5,
            inteligencia: 2,
          },
          addItems: ["maleta_medico"],
          addClues: ["segunda_ampolla", "receta_falsa"],
        },
        {
          label: "Ofrecerle protección si declara la verdad.",
          next: "cap7_inicio",
          effect: {
            honestidad: 2,
            inteligencia: 1,
          },
          addClues: ["medico_dispuesto_a_confesar"],
        },
        {
          label: "Amenazarlo para que culpe a Valeria.",
          next: "cap7_inicio",
          effect: {
            honestidad: -3,
            confianza: -1,
          },
          addClues: ["lucia_manipula_al_medico"],
        },
      ],
    },

    {
      title: "El baile de los culpables",
      place: "Salón principal",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      text: `La música vuelve a sonar.

No porque alguien quiera celebrar.

Sino porque la familia De la Vega necesita fingir normalidad hasta que llegue la policía.

Todos bailan con miedo.

Valeria evita mirar a Adrián.
Adrián evita mirarte a ti.
El médico evita mirar a todos.

Entonces aparece una nota bajo una copa intacta:

“Uno mató por amor.
Uno mató por venganza.
Uno mató por dinero.
Pero solo uno disparó.”

La pregunta ya no es quién quería muerto a Don Esteban.

La pregunta es quién se atrevió a terminarlo.`,
      choices: [
        {
          label: "Seguir a Adrián cuando abandona el salón.",
          next: "cap8_inicio",
          effect: {
            confianza: 1,
            vida: -2,
          },
          addClues: ["adrian_huye_del_baile"],
        },
        {
          label: "Interrogar a Valeria durante el baile.",
          next: "cap8_inicio",
          effect: {
            inteligencia: 1,
            confianza: 1,
          },
          addClues: ["valeria_conoce_la_nota"],
        },
        {
          label: "Mostrar la nota a todos.",
          next: "cap8_inicio",
          effect: {
            honestidad: 2,
            confianza: -2,
          },
          addItems: ["nota_del_baile_culpables"],
        },
      ],
    },

    {
      title: "La confesión de Valeria",
      place: "Invernadero",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      text: `Valeria te espera en el invernadero.

—Yo quise matarlo muchas veces —confiesa—. Pero cuando entré a la biblioteca, mi padre ya estaba muriendo.

Dice que lo vio sudando, pálido, aferrado a la copa.

Después escuchó pasos.

Y luego el disparo.

—Yo no lo envenené, Lucía. Pero tampoco intenté salvarlo.

Su confesión no la vuelve inocente.

Solo humana.`,
      choices: [
        {
          label: "Creerle y pedirle que declare eso ante la policía.",
          next: "cap9_inicio",
          effect: {
            confianza: 2,
            honestidad: 2,
          },
          addClues: ["valeria_no_disparo"],
        },
        {
          label: "Acusarla de decir solo media verdad.",
          next: "cap9_inicio",
          effect: {
            inteligencia: 2,
            confianza: -1,
          },
          addClues: ["valeria_oculta_algo_mas"],
        },
        {
          label: "Prometer protegerla si te cuenta todo.",
          next: "cap9_inicio",
          effect: {
            confianza: 3,
            honestidad: -1,
          },
          addClues: ["pacto_con_valeria"],
        },
      ],
    },

    {
      title: "Adrián desaparece",
      place: "Establo trasero",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
      text: `Encuentras a Adrián preparando un caballo en el establo.

Tiene sangre seca en la manga.

No es suya.

—Lucía, si me quedo, me van a culpar —dice—. Y quizá tengan razón.

Entonces te muestra el arma.

No la disparó, asegura.

La encontró junto al cuerpo y la escondió por miedo.

Pero el arma tiene sus huellas.

Y tú debes decidir si todavía puedes amar a alguien que siempre esconde la verdad demasiado tarde.`,
      choices: [
        {
          label: "Quitarle el arma y llevarlo de vuelta.",
          next: "cap10_inicio",
          effect: {
            honestidad: 2,
            confianza: -1,
          },
          addItems: ["arma_con_huellas"],
          addClues: ["adrian_oculto_el_arma"],
        },
        {
          label: "Ayudarlo a escapar.",
          next: "cap10_inicio",
          effect: {
            confianza: 3,
            honestidad: -3,
          },
          addClues: ["lucia_ayuda_adrian"],
        },
        {
          label: "Preguntarle si todavía te ama antes de decidir.",
          next: "cap10_inicio",
          effect: {
            confianza: 2,
            inteligencia: 1,
          },
          addClues: ["adrian_aun_ama_lucia"],
        },
      ],
    },

    {
      title: "Sangre y Rosas",
      place: "Biblioteca principal",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
      text: `Reúnes a todos en la biblioteca.

La tormenta cae sobre la mansión como una sentencia.

Ahora sabes que el disparo no fue el inicio.

Fue el final de un plan.

Don Esteban fue envenenado primero.
La bala llegó después.
El testamento convirtió a todos en sospechosos.
La muerte de la madre de Valeria convirtió el crimen en venganza.

Adrián ocultó el arma.
Valeria ocultó su odio.
El médico ocultó el veneno.
Y tú ocultaste partes de ti misma durante toda la noche.

Ahora debes decidir qué verdad sobrevivirá.`,
      choices: [
        {
          label: "Exponer toda la verdad ante la policía.",
          next: "final_verdadero",
          effect: {
            honestidad: 4,
            inteligencia: 2,
          },
          addClues: ["verdad_completa_sangre_y_rosas"],
        },
        {
          label: "Proteger a Valeria y culpar al médico.",
          next: "final_secreto",
          effect: {
            confianza: 3,
            honestidad: -3,
          },
          addClues: ["valeria_protegida"],
        },
        {
          label: "Usar las pruebas para controlar a todos.",
          next: "final_oscuro",
          effect: {
            inteligencia: 2,
            honestidad: -4,
          },
          addItems: ["archivo_de_pruebas_de_la_vega"],
        },
      ],
    },
  ],
});