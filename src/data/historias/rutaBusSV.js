import { createStory } from "../storyFactory.js";

export const rutaBusSV = createStory({
  id: "ruta-bus-sv",
  title: "La Ruta del Dormilón",
  subtitle:
    "Un salvadoreño intenta llegar al trabajo y volver a casa sin dormirse, perder sus cosas o quedar colgado del bus.",
  genre: "Comedia / Vida diaria / Aventura urbana",
  status: "available",
  cover:
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",

  chaptersData: [
    {
      title: "Sale tarde de la casa",
      place: "Colonia Los Milagros",
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
      text: `Son las 6:15 de la mañana.

Mario despierta con el grito más temido de todo trabajador salvadoreño:

—¡Marioooo, ya vas tarde!

Su mamá golpea la puerta.

El bus pasa en quince minutos.

Mario tiene que salir con mochila, celular, billetera, audífonos y el desayuno envuelto en servilleta.

Pero todavía no encuentra los calcetines.

Y para rematar, el uniforme está medio arrugado.

El trabajo queda al otro lado de la ciudad.

Si pierde el primer bus, le toca ir colgado.`,
      choices: [
        {
          label: "Salir corriendo sin desayunar.",
          next: "cap2_inicio",
          effect: { vida: -4, inteligencia: 1 },
          addItems: ["mochila", "celular", "billetera"],
          addClues: ["salio_sin_desayunar"],
        },
        {
          label: "Llevar el desayuno en la mano aunque se vea raro.",
          next: "cap2_inicio",
          effect: { vida: 2, confianza: -1 },
          addItems: ["desayuno_envuelto", "mochila", "celular", "billetera"],
          addClues: ["desayuno_en_riesgo"],
        },
        {
          label: "Planchar rápido el uniforme.",
          next: "cap2_inicio",
          effect: { honestidad: 1, vida: -3 },
          addItems: ["mochila", "celular", "billetera"],
          addClues: ["salio_mas_tarde"],
        },
      ],
    },

    {
      title: "La parada llena",
      place: "Parada del punto",
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
      text: `Mario llega a la parada sudando como si ya hubiera trabajado ocho horas.

La parada está llena.

Hay estudiantes, vendedores, señoras con bolsas, un señor con una gallina en una caja y un cipote comiendo churros a las 6:30.

A lo lejos aparece el bus.

Pero viene lleno.

Lleno de verdad.

El cobrador grita:

—¡Hay espacio, hay espacio, pásese para atrás!

Claramente no hay espacio.`,
      choices: [
        {
          label: "Subirse como sea y quedar en la puerta.",
          next: "cap3_inicio",
          effect: { vida: -5, confianza: 2 },
          addClues: ["subio_en_la_puerta"],
        },
        {
          label: "Esperar el siguiente bus.",
          next: "cap3_inicio",
          effect: { vida: 1, honestidad: 1 },
          addClues: ["espera_otro_bus"],
        },
        {
          label: "Correr hasta la siguiente parada para ganar lugar.",
          next: "cap3_inicio",
          effect: { vida: -7, inteligencia: 2 },
          addClues: ["corrio_a_la_siguiente_parada"],
        },
      ],
    },

    {
      title: "Colgado del bus",
      place: "Ruta hacia el centro",
      image:
        "https://images.unsplash.com/photo-1531686264889-56fdcabd163f?auto=format&fit=crop&w=1200&q=80",
      text: `Mario termina en la puerta del bus.

Un pie dentro.
Medio cuerpo fuera.
La mochila presionada contra una señora que lo mira como si él hubiera inventado el tráfico.

El cobrador pasa cobrando como ninja.

—¿Va hasta dónde?

Mario intenta sacar la billetera, pero cada curva es una amenaza.

Si se descuida, pierde algo.

Si se duerme, pierde todo.

Y encima alguien puso música a todo volumen.`,
      choices: [
        {
          label: "Pagar rápido y guardar bien la billetera.",
          next: "cap4_inicio",
          effect: { inteligencia: 2, honestidad: 1 },
          addClues: ["pago_sin_perder_billetera"],
        },
        {
          label: "Sacar el celular para distraerse.",
          next: "cap4_inicio",
          effect: { inteligencia: -1, confianza: 1 },
          addClues: ["celular_en_riesgo"],
        },
        {
          label: "Cerrar los ojos solo un ratito.",
          next: "cap4_inicio",
          effect: { vida: 2, inteligencia: -2 },
          removeItems: ["desayuno_envuelto"],
          addClues: ["se_durmio_y_perdio_algo"],
        },
      ],
    },

    {
      title: "El sueño peligroso",
      place: "Asiento prestado",
      image:
        "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1200&q=80",
      text: `Una señora se baja y Mario consigue asiento.

Eso debería ser una bendición.

Pero no.

El asiento está justo junto a la ventana.
El aire entra suave.
La música se vuelve lejana.
El cansancio lo abraza.

Mario siente que solo va a cerrar los ojos por tres segundos.

Tres segundos salvadoreños.

Cuando despierta, el bus ya pasó dos paradas después de su trabajo.

El cobrador lo mira y dice:

—Joven, usted ya iba soñando con aguacates.`,
      choices: [
        {
          label: "Bajarse corriendo y caminar de regreso.",
          next: "cap5_inicio",
          effect: { vida: -8, honestidad: 1 },
          addClues: ["se_paso_del_trabajo"],
        },
        {
          label: "Pedirle al motorista que pare donde sea.",
          next: "cap5_inicio",
          effect: { confianza: 1, vida: -3 },
          addClues: ["bajada_de_emergencia"],
        },
        {
          label: "Hacerse el tranquilo y decir que ahí iba.",
          next: "cap5_inicio",
          effect: { honestidad: -2, confianza: 1 },
          addClues: ["fingio_que_no_se_paso"],
        },
      ],
    },

    {
      title: "Llegada al trabajo",
      place: "Entrada de la oficina",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      text: `Mario llega al trabajo.

Con la camisa medio salida.
El pelo como si peleó con el viento.
Y la dignidad en modo ahorro de batería.

El jefe está en la entrada.

—¿Otra vez tarde?

Mario revisa su mochila.

Tiene el celular.
Tiene la billetera.
Pero no está seguro de tener el desayuno.

Ni la paz.

Ahora debe inventar una explicación sin quedar peor.`,
      choices: [
        {
          label: "Decir la verdad: se quedó dormido en el bus.",
          next: "cap6_inicio",
          effect: { honestidad: 2, confianza: -1 },
          addClues: ["jefe_sabe_que_se_durmio"],
        },
        {
          label: "Decir que había tráfico pesado.",
          next: "cap6_inicio",
          effect: { honestidad: -1, inteligencia: 1 },
          addClues: ["excusa_del_trafico"],
        },
        {
          label: "Ofrecer quedarse diez minutos más tarde.",
          next: "cap6_inicio",
          effect: { honestidad: 1, confianza: 1 },
          addClues: ["prometio_compensar_tiempo"],
        },
      ],
    },

    {
      title: "Salida del trabajo",
      place: "Oficina al final del día",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      text: `Son las 5:05 de la tarde.

Mario sobrevivió al trabajo.

Pero ahora viene la segunda parte de la aventura:

volver a casa.

Está cansado, con hambre y con una sola misión:

no dormirse en el bus de regreso.

La mochila está más pesada.
El celular tiene poca batería.
La billetera sigue viva.

Pero afuera ya se escucha el tráfico.

Y en El Salvador, el tráfico de la tarde no perdona.`,
      choices: [
        {
          label: "Salir rápido antes de que se llene la ruta.",
          next: "cap7_inicio",
          effect: { inteligencia: 2, vida: -2 },
          addClues: ["salio_rapido_del_trabajo"],
        },
        {
          label: "Comprar una pupusa antes de irse.",
          next: "cap7_inicio",
          effect: { vida: 4, confianza: 1 },
          addItems: ["pupusa_en_bolsa"],
          addClues: ["olor_a_pupusa_en_el_bus"],
        },
        {
          label: "Quedarse platicando cinco minutos.",
          next: "cap7_inicio",
          effect: { confianza: 1, vida: -2 },
          addClues: ["salio_tarde_del_trabajo"],
        },
      ],
    },

    {
      title: "La ruta equivocada",
      place: "Terminal improvisada",
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
      text: `Mario ve un bus que parece ir hacia su colonia.

Parece.

El problema es que muchos buses se parecen cuando uno va cansado.

El cobrador grita algo que suena como su ruta, pero también podría ser cualquier otra cosa.

Mario sube.

Cinco minutos después nota que el bus gira hacia un lugar completamente distinto.

Una señora le dice:

—Ay joven, este no va para allá.

Mario mira por la ventana.

No reconoce nada.`,
      choices: [
        {
          label: "Bajarse en la siguiente parada.",
          next: "cap8_inicio",
          effect: { vida: -5, inteligencia: 1 },
          addClues: ["tomo_ruta_equivocada"],
        },
        {
          label: "Preguntar al cobrador si todavía puede conectar con otra ruta.",
          next: "cap8_inicio",
          effect: { confianza: 1, inteligencia: 2 },
          addClues: ["cobrador_da_consejo"],
        },
        {
          label: "Fingir que sí sabía y seguir sentado.",
          next: "cap8_inicio",
          effect: { honestidad: -2, vida: -3 },
          addClues: ["orgullo_lo_llevo_lejos"],
        },
      ],
    },

    {
      title: "La siesta fatal",
      place: "Bus de regreso",
      image:
        "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1200&q=80",
      text: `Mario por fin encuentra un bus que sí va para su casa.

Consigue asiento.

La pupusa huele rico.
La mochila está en sus piernas.
El celular vibra con un mensaje de su mamá:

“Comprá pan.”

Mario responde mentalmente:

“Sí.”

Pero no escribe nada.

El sueño vuelve.

Esta vez más fuerte.

Si se duerme, puede perder la pupusa, el pan, la parada o la poca dignidad que queda.`,
      choices: [
        {
          label: "Quedarse despierto contando paradas.",
          next: "cap9_inicio",
          effect: { inteligencia: 2, vida: -2 },
          addClues: ["conto_las_paradas"],
        },
        {
          label: "Dormirse abrazando la mochila.",
          next: "cap9_inicio",
          effect: { vida: 3, inteligencia: -2 },
          removeItems: ["pupusa_en_bolsa"],
          addClues: ["perdio_la_pupusa_por_dormido"],
        },
        {
          label: "Pedirle a una señora que le avise dónde bajarse.",
          next: "cap9_inicio",
          effect: { confianza: 2, honestidad: 1 },
          addClues: ["senora_lo_cuida"],
        },
      ],
    },

    {
      title: "El pan olvidado",
      place: "Tienda de la esquina",
      image:
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&q=80",
      text: `Mario baja del bus.

Por milagro, cerca de su colonia.

Entonces recuerda el mensaje de su mamá:

“Comprá pan.”

La tienda está abierta.
Pero hay fila.

Mario tiene poca energía, poca paciencia y una mochila que parece cargar ladrillos.

Si compra pan, llega bien a casa.
Si no compra, lo espera el juicio familiar.

Y su mamá no necesita pruebas para declarar culpable.`,
      choices: [
        {
          label: "Comprar pan aunque haya fila.",
          next: "cap10_inicio",
          effect: { honestidad: 2, vida: -2 },
          addItems: ["pan_frances"],
          addClues: ["compro_pan"],
        },
        {
          label: "Irse sin pan y esperar que nadie pregunte.",
          next: "cap10_inicio",
          effect: { honestidad: -3, confianza: -1 },
          addClues: ["olvido_el_pan"],
        },
        {
          label: "Comprar pan y una gaseosa para recuperar energía.",
          next: "cap10_inicio",
          effect: { vida: 3, inteligencia: 1 },
          addItems: ["pan_frances", "gaseosa"],
          addClues: ["se_recupero_con_gaseosa"],
        },
      ],
    },

    {
      title: "Regreso a casa",
      place: "Casa de Mario",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      text: `Mario llega a casa.

Abre la puerta lentamente.

Su mamá está en la sala.

—¿Y el pan?

Mario siente que todo el viaje se resume en esa pregunta.

Revisa la mochila.
Revisa las bolsas.
Revisa su alma.

El día empezó con una carrera hacia el trabajo y terminó con una misión más difícil:

sobrevivir al transporte público sin perder cosas, sueño ni dignidad.

Ahora solo queda decidir cómo contar la historia.`,
      choices: [
        {
          label: "Contar toda la verdad del viaje.",
          next: "final_verdadero",
          effect: { honestidad: 4, confianza: 1 },
          addClues: ["mario_confiesa_todo"],
        },
        {
          label: "Inventar que el bus tuvo la culpa de todo.",
          next: "final_secreto",
          effect: { honestidad: -2, inteligencia: 1 },
          addClues: ["culpo_al_bus"],
        },
        {
          label: "Decir que mañana se va en Uber aunque no tenga dinero.",
          next: "final_oscuro",
          effect: { confianza: 2, honestidad: -1 },
          addClues: ["promesa_imposible_de_uber"],
        },
      ],
    },
  ],
});