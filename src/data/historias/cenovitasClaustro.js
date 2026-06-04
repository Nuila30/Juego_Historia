import { createStory } from "../storyFactory.js";

export const cenovitasClaustro = createStory({
  id: "cenovitas-del-claustro-rojo",
  title: "Cenovitas del Claustro Rojo",
  subtitle:
    "Una periodista investiga una orden prohibida donde el deseo, la culpa y la memoria abren puertas imposibles.",
  genre: "Horror / Misterio / Romance oscuro",
  status: "available",
  cover:
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80",

  chaptersData: [
    {
      title: "La caja bajo el altar",
      place: "Monasterio de San Damián",
      image:
        "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80",
      text: `Llegas al monasterio después de recibir una carta sin remitente.

Dentro solo había una frase escrita con tinta roja:

“Si quieres saber qué le ocurrió a Gabriel, busca la caja bajo el altar.”

Gabriel fue tu antiguo amor.
Desapareció hace siete años mientras investigaba una orden conocida como los Cenovitas del Claustro Rojo.

Ahora estás frente al altar roto.

Debajo de la piedra central hay una ranura en forma de cruz.

El aire huele a cera vieja, humedad y flores muertas.`,
      choices: [
        {
          label: "Levantar la piedra del altar y buscar la caja.",
          next: "cap2_inicio",
          effect: { vida: -5, inteligencia: 2 },
          addItems: ["caja_negra"],
          addClues: ["ranura_bajo_el_altar", "caja_bajo_el_altar"],
        },
        {
          label: "Revisar primero los símbolos del monasterio.",
          next: "cap2_inicio",
          effect: { inteligencia: 2, honestidad: 1 },
          addClues: ["simbolos_cenovitas", "advertencia_en_latin"],
        },
        {
          label: "Gritar el nombre de Gabriel en la nave principal.",
          next: "cap2_inicio",
          effect: { vida: -3, confianza: 1 },
          addClues: ["eco_responde_con_su_voz"],
        },
      ],
    },

    {
      
        title: "El pasillo de los susurros",
        place: "Pasillo subterráneo",
        image:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
      text: `El altar se abre lentamente.

Debajo aparece una escalera angosta que baja hacia un pasillo imposible.

Las paredes están cubiertas de nombres.

Algunos parecen escritos con tinta.
Otros parecen arañados desde dentro de la piedra.

Entre ellos encuentras uno que te deja sin aire:

Gabriel M.

Debajo de su nombre hay una frase:

“Prometió amor. Pagó con memoria.”

La caja negra vibra en tu mano.`,
      choices: [
        {
          label: "Tocar el nombre de Gabriel.",
          next: "cap3_inicio",
          effect: { vida: -5, confianza: 1 },
          addClues: ["gabriel_pago_con_memoria", "nombre_en_la_pared"],
        },
        {
          label: "Fotografiar los nombres antes de avanzar.",
          next: "cap3_inicio",
          effect: { inteligencia: 2, honestidad: 1 },
          addItems: ["foto_de_los_nombres"],
          addClues: ["lista_de_deudores"],
        },
        {
          label: "Ignorar los nombres y seguir la vibración de la caja.",
          next: "cap3_inicio",
          effect: { inteligencia: 1, vida: -2 },
          addClues: ["la_caja_guia_el_camino"],
        },
      ],
    },

    {
      title: "La puerta sin bisagras",
      place: "Umbral del claustro inferior",
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
      text: `El pasillo termina frente a una puerta de piedra.

No tiene bisagras.
No tiene cerradura.
No tiene manija.

Solo una inscripción:

“El deseo llama. La culpa abre. El amor condena.”

Cuando acercas la caja negra, sus líneas cambian de forma.

No parece un objeto.

Parece una pregunta esperando una respuesta.`,
      choices: [
        {
          label: "Abrir la caja negra.",
          next: "cap4_inicio",
          effect: { vida: -10, inteligencia: 2 },
          addItems: ["caja_abierta"],
          addClues: ["la_caja_abre_puertas"],
        },
        {
          label: "Confesar en voz alta que aún amas a Gabriel.",
          next: "cap4_inicio",
          effect: { honestidad: 2, confianza: 2 },
          addClues: ["la_puerta_responde_al_amor"],
        },
        {
          label: "Mentir y decir que Gabriel ya no significa nada.",
          next: "cap4_inicio",
          effect: { honestidad: -2, vida: -6 },
          addClues: ["la_puerta_detecta_mentiras"],
        },
      ],
    },

    {
      title: "La orden de la carne eterna",
      place: "Cripta del Claustro Rojo",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      text: `La puerta desaparece.

Al otro lado hay una cripta iluminada por velas rojas.

Cuatro figuras te esperan alrededor de un círculo pintado en el suelo.

No puedes ver sus rostros.
Pero sientes que te miran desde todos lados.

—No venimos por tu vida —dice una voz.

—Venimos por lo que todavía amas —susurra otra.

En el centro del círculo está Gabriel.

Vivo.

Pero no completo.`,
      choices: [
        {
          label: "Correr hacia Gabriel.",
          next: "cap5_inicio",
          effect: { vida: -8, confianza: 2 },
          addClues: ["gabriel_sigue_vivo"],
        },
        {
          label: "Preguntar qué precio exige la orden.",
          next: "cap5_inicio",
          effect: { inteligencia: 2, honestidad: 1 },
          addClues: ["la_orden_negocia_recuerdos"],
        },
        {
          label: "Amenazar con revelar la existencia del claustro.",
          next: "cap5_inicio",
          effect: { vida: -6, confianza: -1 },
          addClues: ["la_orden_no_teme_a_los_vivos"],
        },
      ],
    },

    {
      title: "El recuerdo robado",
      place: "Círculo rojo",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
      text: `Gabriel abre los ojos.

Por un segundo parece el mismo de antes.

Luego susurra:

—Lucía... no debiste recordarme.

Las figuras inclinan la cabeza.

Una de ellas revela la verdad:

Gabriel pidió conocer quién mató a su hermana.
A cambio entregó el recuerdo de su amor más puro.

Tú.

Por eso desapareció.

No porque dejó de amarte.

Sino porque olvidó cómo hacerlo.`,
      choices: [
        {
          label: "Aceptar el dolor del recuerdo y seguir escuchando.",
          next: "cap6_inicio",
          effect: { vida: -8, confianza: 2, honestidad: 1 },
          addClues: ["gabriel_entrego_tu_recuerdo"],
        },
        {
          label: "Rechazar la explicación de la orden.",
          next: "cap6_inicio",
          effect: { confianza: -1, inteligencia: 1 },
          addClues: ["lucia_duda_de_la_orden"],
        },
        {
          label: "Preguntar por la hermana de Gabriel.",
          next: "cap6_inicio",
          effect: { inteligencia: 2 },
          addClues: ["hermana_de_gabriel_fue_asesinada"],
        },
      ],
    },

    {
      title: "La hermana del agua negra",
      place: "Pozo del monasterio",
      image:
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=80",
      text: `La orden te conduce hasta un pozo dentro del monasterio.

El agua es negra.

En la superficie ves una imagen que no pertenece al presente.

Una joven corre por el claustro.
Lleva el mismo medallón que Gabriel usaba.

Alguien la empuja al pozo.

Pero la mano que la empuja no es de un extraño.

Es de un sacerdote del monasterio.

La orden no mató a la hermana de Gabriel.

La orden guardó el secreto.`,
      choices: [
        {
          label: "Tomar agua del pozo como prueba.",
          next: "cap7_inicio",
          effect: { vida: -6, inteligencia: 2 },
          addItems: ["frasco_de_agua_negra"],
          addClues: ["pozo_guarda_recuerdos"],
        },
        {
          label: "Preguntar por el sacerdote.",
          next: "cap7_inicio",
          effect: { inteligencia: 2, honestidad: 1 },
          addClues: ["sacerdote_asesino"],
        },
        {
          label: "Cerrar el pozo y negarte a mirar más.",
          next: "cap7_inicio",
          effect: { vida: 3, confianza: -1 },
          addClues: ["lucia_temio_la_verdad"],
        },
      ],
    },

    {
      title: "El sacerdote sin nombre",
      place: "Archivo oculto",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
      text: `El archivo oculto del monasterio contiene diarios, cartas y confesiones.

El sacerdote que mató a la hermana de Gabriel no murió.

Se unió a la orden para evitar el castigo.

Allí cambió su nombre.
Cambió su rostro.
Cambió su cuerpo.

Pero no pudo cambiar su culpa.

Una figura cubierta con velo rojo se acerca.

—Al fin entiendes —dice—. Gabriel no vino a salvar a su hermana. Vino a condenarme.`,
      choices: [
        {
          label: "Arrancar el velo de la figura.",
          next: "cap8_inicio",
          effect: { vida: -8, inteligencia: 2 },
          addClues: ["uno_de_los_cenovitas_es_el_sacerdote"],
        },
        {
          label: "Pedir justicia por la hermana de Gabriel.",
          next: "cap8_inicio",
          effect: { honestidad: 2, confianza: 1 },
          addClues: ["lucia_exige_justicia"],
        },
        {
          label: "Ofrecer un trato a la figura.",
          next: "cap8_inicio",
          effect: { inteligencia: 1, honestidad: -2 },
          addClues: ["lucia_negocia_con_la_orden"],
        },
      ],
    },

    {
      title: "La memoria de Gabriel",
      place: "Sala de los pactos",
      image:
        "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1200&q=80",
      text: `La orden coloca la caja negra entre tú y Gabriel.

—Podemos devolverle la memoria —dice una voz.

—Pero todo recuerdo devuelto debe ser pagado.

Gabriel te mira sin reconocerte del todo.

Pero sus ojos tiemblan cuando dices su nombre.

Aún queda algo de él.

No amor completo.
No memoria completa.

Una grieta.

Y a veces una grieta basta para romper una prisión.`,
      choices: [
        {
          label: "Entregar un recuerdo feliz para devolverle parte de su memoria.",
          next: "cap9_inicio",
          effect: { vida: -5, confianza: 3, honestidad: 2 },
          addClues: ["lucia_entrego_un_recuerdo"],
        },
        {
          label: "Negarte a pagar otro precio.",
          next: "cap9_inicio",
          effect: { honestidad: 2, confianza: -1 },
          addClues: ["lucia_rechaza_el_pacto"],
        },
        {
          label: "Intentar engañar a la caja con un recuerdo falso.",
          next: "cap9_inicio",
          effect: { inteligencia: 2, honestidad: -3, vida: -6 },
          addClues: ["la_caja_castiga_mentiras"],
        },
      ],
    },

    {
      title: "La puerta final",
      place: "Corazón del claustro",
      image:
        "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80",
      text: `El claustro comienza a cambiar.

Las paredes se abren como si fueran respiraciones lentas.

La puerta final aparece frente a ti.

Detrás está la salida.

También está la verdad completa.

Gabriel puede salir contigo.
Pero si lo hace, el sacerdote escapará también.

La orden ofrece tres caminos:

Salvar a Gabriel.
Condenar al sacerdote.
O cerrar el claustro contigo dentro.`,
      choices: [
        {
          label: "Intentar salvar a Gabriel primero.",
          next: "cap10_inicio",
          effect: { confianza: 3, honestidad: -1 },
          addClues: ["lucia_prioriza_a_gabriel"],
        },
        {
          label: "Buscar la forma de condenar al sacerdote.",
          next: "cap10_inicio",
          effect: { inteligencia: 3, honestidad: 2 },
          addClues: ["lucia_busca_justicia"],
        },
        {
          label: "Aceptar que quizá no todos pueden salir.",
          next: "cap10_inicio",
          effect: { honestidad: 3, vida: -4 },
          addClues: ["lucia_acepta_el_sacrificio"],
        },
      ],
    },

    {
      title: "El último pacto",
      place: "Altar del Claustro Rojo",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
      text: `La caja negra se abre por última vez.

Gabriel recuerda tu nombre.

No todo.

No cada beso.
No cada promesa.
No cada herida.

Pero recuerda lo suficiente para llorar.

El sacerdote intenta cruzar la puerta final.

La orden observa.

Ahora la decisión es tuya:

Puedes salvar a Gabriel y dejar que una parte de la verdad se pierda.

Puedes cerrar el claustro y condenar al sacerdote para siempre.

O puedes usar la caja y convertirte en la nueva guardiana del secreto.`,
      choices: [
        {
          label: "Salvar a Gabriel y escapar juntos.",
          next: "final_secreto",
          effect: { confianza: 4, honestidad: -2 },
          addClues: ["gabriel_escapa"],
        },
        {
          label: "Cerrar el claustro y condenar al sacerdote.",
          next: "final_verdadero",
          effect: { honestidad: 4, inteligencia: 2 },
          addClues: ["sacerdote_condenado"],
        },
        {
          label: "Tomar la caja y convertirte en guardiana.",
          next: "final_oscuro",
          effect: { inteligencia: 2, honestidad: -4 },
          addItems: ["caja_negra_guardiana"],
        },
      ],
    },
  ],
});