export const herenciaCarmesi = {
    id: "herencia-carmesi",
    title: "La Herencia Carmesí",
    subtitle: "Una familia rota, una fortuna y un cadáver",
    genre: "Drama criminal / Romance oscuro",
    status: "available",
    cover:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    startScene: "inicio",
  
    scenes: {
      inicio: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "Una mansión, una herencia y una muerte sospechosa",
        tag: "Capítulo 1",
        place: "Hacienda Montenegro",
        title: "La lectura del testamento",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
        text: `Elena Montenegro regresa a la hacienda familiar después de siete años.
  
  Su padre ha muerto, y todos los herederos fueron llamados para escuchar el testamento.
  
  Pero antes de iniciar la lectura, el abogado de la familia aparece muerto en el despacho.
  
  Sobre la mesa hay una copa de vino, una carta quemada y una frase escrita con tinta roja:
  
  “La herencia no pertenece a los vivos.”`,
        choices: [
          {
            label: "Revisar el despacho antes de que todos entren.",
            next: "despacho",
            effect: { misterio: 2, valor: 1 },
          },
          {
            label: "Buscar a Mateo, tu antiguo amor.",
            next: "mateo",
            effect: { confianza: 1 },
          },
          {
            label: "Interrogar a tu hermana Clara.",
            next: "clara",
            effect: { misterio: 1, odio: 1 },
          },
          {
            label: "Pedir que nadie salga de la hacienda.",
            next: "encierro",
            effect: { valor: 2 },
          },
        ],
      },
  
      despacho: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "La escena del crimen",
        tag: "Capítulo 2",
        place: "Despacho del abogado",
        title: "La copa manchada",
        image:
          "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
        text: `El despacho está frío.
  
  El abogado yace junto al escritorio, con una mano sobre el testamento cerrado.
  
  En el suelo encuentras un anillo antiguo con el escudo Montenegro.
  
  También descubres que la copa de vino tiene un olor amargo.
  
  No fue una muerte natural.
  Alguien lo envenenó antes de que revelara la verdad.`,
        choices: [
          {
            label: "Tomar el anillo como prueba.",
            next: "anillo",
            effect: { misterio: 2 },
          },
          {
            label: "Abrir el testamento en secreto.",
            next: "testamento",
            effect: { valor: 1, odio: 1 },
          },
          {
            label: "Buscar a Mateo para pedir ayuda.",
            next: "mateo",
            effect: { confianza: 1 },
          },
          {
            label: "Acusar públicamente a la familia.",
            next: "encierro",
            effect: { valor: 2, odio: 1 },
          },
        ],
      },
  
      mateo: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "El amor que nunca se cerró",
        tag: "Capítulo 2",
        place: "Caballerizas",
        title: "Mateo bajo la lluvia",
        image:
          "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80",
        text: `Encuentras a Mateo en las caballerizas.
  
  Fue tu primer amor, pero tu padre lo expulsó de la hacienda cuando descubrió su relación contigo.
  
  Ahora trabaja para la familia como administrador.
  
  —Elena, tienes que irte —te dice—. Esta casa no solo guarda secretos. Los cobra.
  
  Su voz tiembla. Aún te ama. Pero también parece tener miedo.`,
        choices: [
          {
            label: "Pedirle que te diga todo lo que sabe.",
            next: "confesionMateo",
            effect: { confianza: 2, misterio: 1 },
          },
          {
            label: "Besarlo y confiar en él.",
            next: "pactoMateo",
            effect: { confianza: 2 },
          },
          {
            label: "Sospechar de él por su pasado con tu padre.",
            next: "sospechaMateo",
            effect: { odio: 1, misterio: 1 },
          },
          {
            label: "Volver al despacho sin decir nada.",
            next: "despacho",
            effect: { misterio: 1 },
          },
        ],
      },
  
      clara: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "La hermana que sonríe demasiado",
        tag: "Capítulo 2",
        place: "Salón principal",
        title: "Clara y la copa vacía",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
        text: `Clara está sentada junto al piano, con una copa de vino intacta.
  
  —Siempre fuiste la favorita —dice sin mirarte—. Incluso cuando te fuiste.
  
  Asegura que el abogado quería cambiar el testamento.
  También dice que Mateo fue visto entrando al despacho antes de la muerte.
  
  No sabes si intenta ayudarte...
  o empujarte hacia una mentira.`,
        choices: [
          {
            label: "Preguntarle por el anillo familiar.",
            next: "anillo",
            effect: { misterio: 2 },
          },
          {
            label: "Acusarla de querer la herencia.",
            next: "rupturaClara",
            effect: { odio: 2 },
          },
          {
            label: "Creerle y buscar a Mateo.",
            next: "mateo",
            effect: { confianza: 1 },
          },
          {
            label: "Revisar su habitación.",
            next: "habitacionClara",
            effect: { misterio: 2, valor: 1 },
          },
        ],
      },
  
      encierro: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "Nadie abandona la hacienda",
        tag: "Capítulo 2",
        place: "Vestíbulo",
        title: "Las puertas cerradas",
        image:
          "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1400&q=80",
        text: `Ordenas cerrar la hacienda.
  
  Los herederos se miran con odio.
  Clara ríe.
  Mateo baja la mirada.
  Tu tío Esteban exige que se lea el testamento de inmediato.
  
  Entonces una criada grita desde el pasillo:
  
  —¡Alguien quemó los archivos del abogado!
  
  El asesino no solo mató.
  También está borrando pruebas.`,
        choices: [
          {
            label: "Correr hacia los archivos quemados.",
            next: "archivos",
            effect: { valor: 1, misterio: 2 },
          },
          {
            label: "Leer el testamento frente a todos.",
            next: "testamento",
            effect: { valor: 2 },
          },
          {
            label: "Seguir a Mateo en silencio.",
            next: "confesionMateo",
            effect: { misterio: 1 },
          },
          {
            label: "Revisar la habitación de Clara.",
            next: "habitacionClara",
            effect: { misterio: 1 },
          },
        ],
      },
  
      anillo: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "Una joya que acusa a todos",
        tag: "Capítulo 3",
        place: "Galería familiar",
        title: "El anillo Montenegro",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=80",
        text: `El anillo pertenece a la línea principal de la familia.
  
  Tu padre lo usaba siempre, pero tras su muerte desapareció.
  
  Si estaba en el despacho, alguien lo dejó como mensaje.
  
  Clara dice que era tuyo por derecho.
  Mateo dice que tu padre se lo entregó antes de morir.
  
  Dos versiones.
  Una sola verdad.`,
        choices: [
          {
            label: "Confrontar a Mateo por el anillo.",
            next: "confesionMateo",
            effect: { misterio: 1, confianza: 1 },
          },
          {
            label: "Confrontar a Clara.",
            next: "rupturaClara",
            effect: { odio: 1, misterio: 1 },
          },
          {
            label: "Abrir el testamento.",
            next: "testamento",
            effect: { valor: 1 },
          },
          {
            label: "Guardar el anillo y ocultarlo.",
            next: "finalPoder",
            effect: { odio: 2 },
          },
        ],
      },
  
      testamento: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "La fortuna cambia de manos",
        tag: "Capítulo 3",
        place: "Despacho",
        title: "El nombre imposible",
        image:
          "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
        text: `Abres el testamento.
  
  La fortuna no será para Clara.
  Tampoco para tu tío Esteban.
  
  Todo queda a nombre de Mateo.
  
  Pero no como empleado.
  Como hijo legítimo de tu padre.
  
  Tu antiguo amor era también el secreto más grande de la familia.`,
        choices: [
          {
            label: "Buscar a Mateo y exigir explicación.",
            next: "confesionMateo",
            effect: { misterio: 2, odio: 1 },
          },
          {
            label: "Ocultar el testamento para proteger la herencia.",
            next: "finalSilencio",
            effect: { odio: 2 },
          },
          {
            label: "Mostrar el testamento frente a todos.",
            next: "verdadFinal",
            effect: { valor: 2 },
          },
          {
            label: "Buscar a Clara antes de que lo descubra.",
            next: "clara",
            effect: { misterio: 1 },
          },
        ],
      },
  
      confesionMateo: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "La sangre también miente",
        tag: "Capítulo 4",
        place: "Capilla privada",
        title: "El hijo escondido",
        image:
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80",
        text: `Mateo confiesa la verdad.
  
  Tu padre era también el suyo.
  Por eso lo mantuvo cerca, pero nunca lo reconoció públicamente.
  
  —El abogado iba a revelar todo esta noche —dice—. Pero cuando llegué al despacho, ya estaba muerto.
  
  Te toma la mano.
  
  —Yo no lo maté, Elena. Pero si todos saben quién soy, Clara me destruirá.`,
        choices: [
          {
            label: "Creer en Mateo y protegerlo.",
            next: "pactoMateo",
            effect: { confianza: 2 },
          },
          {
            label: "Entregarlo como sospechoso.",
            next: "finalJusticia",
            effect: { valor: 2, odio: 1 },
          },
          {
            label: "Buscar a Clara con la verdad.",
            next: "verdadFinal",
            effect: { misterio: 2 },
          },
          {
            label: "Proponer huir juntos con el testamento.",
            next: "finalFuga",
            effect: { confianza: 1, odio: 1 },
          },
        ],
      },
  
      pactoMateo: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "Amar también puede ser un crimen",
        tag: "Capítulo 4",
        place: "Capilla privada",
        title: "Juramento bajo velas",
        image:
          "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80",
        text: `Decides creer en Mateo.
  
  No sabes si lo haces por la verdad o por el recuerdo de lo que fueron.
  
  Él promete ayudarte a descubrir al asesino.
  Pero también te pide algo:
  
  —Si todo se derrumba, huye conmigo.
  
  La casa cruje como si escuchara la promesa.`,
        choices: [
          {
            label: "Aceptar huir si la verdad los condena.",
            next: "finalFuga",
            effect: { confianza: 2 },
          },
          {
            label: "Resolver el asesinato primero.",
            next: "verdadFinal",
            effect: { valor: 1, misterio: 1 },
          },
          {
            label: "Traicionar a Mateo para recuperar la herencia.",
            next: "finalPoder",
            effect: { odio: 2 },
          },
          {
            label: "Confrontar a Clara juntos.",
            next: "verdadFinal",
            effect: { confianza: 1, misterio: 1 },
          },
        ],
      },
  
      sospechaMateo: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "El amor se vuelve duda",
        tag: "Capítulo 3",
        place: "Caballerizas",
        title: "Una mirada rota",
        image:
          "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1400&q=80",
        text: `Le dices a Mateo que no confías en él.
  
  Su rostro cambia.
  
  —Entonces nunca me amaste de verdad —responde.
  
  Antes de irse, deja caer una frase:
  
  —Pregúntale a Clara qué hizo con el veneno de tu madre.
  
  Luego desaparece hacia la capilla.`,
        choices: [
          {
            label: "Seguir a Mateo.",
            next: "confesionMateo",
            effect: { misterio: 1 },
          },
          {
            label: "Buscar a Clara inmediatamente.",
            next: "clara",
            effect: { odio: 1 },
          },
          {
            label: "Investigar los archivos quemados.",
            next: "archivos",
            effect: { misterio: 2 },
          },
          {
            label: "Llamar a las autoridades.",
            next: "finalJusticia",
            effect: { valor: 2 },
          },
        ],
      },
  
      habitacionClara: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "El tocador de una heredera",
        tag: "Capítulo 3",
        place: "Habitación de Clara",
        title: "Perfume y veneno",
        image:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
        text: `En la habitación de Clara encuentras un frasco pequeño escondido dentro de una caja de joyas.
  
  Huele igual que la copa del abogado.
  
  También encuentras cartas donde Clara acusa a tu padre de arruinar la familia al reconocer a un hijo secreto.
  
  Ahora sabes que Clara tenía motivo, acceso y veneno.`,
        choices: [
          {
            label: "Confrontar a Clara.",
            next: "verdadFinal",
            effect: { misterio: 2, valor: 1 },
          },
          {
            label: "Ocultar la prueba para negociar con ella.",
            next: "finalPoder",
            effect: { odio: 2 },
          },
          {
            label: "Llevar el frasco a las autoridades.",
            next: "finalJusticia",
            effect: { valor: 2 },
          },
          {
            label: "Contarle todo a Mateo.",
            next: "pactoMateo",
            effect: { confianza: 1 },
          },
        ],
      },
  
      archivos: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "Lo quemado también deja rastros",
        tag: "Capítulo 3",
        place: "Archivo familiar",
        title: "Cenizas del pasado",
        image:
          "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1400&q=80",
        text: `Los archivos arden, pero logras rescatar una carpeta.
  
  Dentro hay documentos de nacimiento, cartas antiguas y una prueba definitiva:
  
  Mateo es hijo de tu padre.
  
  También hay una nota escrita por Clara:
  
  “Prefiero verlo todo arder antes que compartir lo que es mío.”`,
        choices: [
          {
            label: "Mostrar los documentos a todos.",
            next: "verdadFinal",
            effect: { valor: 2, misterio: 1 },
          },
          {
            label: "Guardar los documentos para ti.",
            next: "finalPoder",
            effect: { odio: 2 },
          },
          {
            label: "Buscar a Mateo.",
            next: "confesionMateo",
            effect: { confianza: 1 },
          },
          {
            label: "Buscar a Clara.",
            next: "clara",
            effect: { misterio: 1 },
          },
        ],
      },
  
      rupturaClara: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "La sangre no perdona",
        tag: "Capítulo 3",
        place: "Salón principal",
        title: "La hermana enemiga",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80",
        text: `Clara deja de fingir.
  
  —Tú te fuiste. Yo me quedé enterrada en esta casa —dice—. No tienes derecho a volver y juzgarme.
  
  Su odio no parece improvisado.
  Parece una herida alimentada durante años.
  
  Antes de irse, rompe una copa contra el suelo.`,
        choices: [
          {
            label: "Seguirla hasta su habitación.",
            next: "habitacionClara",
            effect: { misterio: 2 },
          },
          {
            label: "Leer el testamento.",
            next: "testamento",
            effect: { valor: 1 },
          },
          {
            label: "Buscar a Mateo.",
            next: "mateo",
            effect: { confianza: 1 },
          },
          {
            label: "Provocarla hasta que confiese.",
            next: "verdadFinal",
            effect: { odio: 1, valor: 1 },
          },
        ],
      },
  
      verdadFinal: {
        headerTitle: "Historia / enunciado",
        headerSubtitle: "La verdad familiar sale a la luz",
        tag: "Capítulo final",
        place: "Salón principal",
        title: "La heredera y el bastardo",
        image:
          "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1400&q=80",
        text: `Reúnes a todos en el salón.
  
  El testamento revela que Mateo era hijo legítimo del patriarca.
  Los documentos confirman que heredaría la fortuna.
  
  Clara rompe en llanto, pero no niega nada.
  
  Ella envenenó al abogado para impedir la lectura.
  Después quemó los archivos para borrar a Mateo de la historia familiar.
  
  Ahora debes decidir qué hacer con la verdad.`,
        choices: [
          {
            label: "Entregar a Clara a la justicia.",
            next: "finalJusticia",
            effect: { valor: 2 },
          },
          {
            label: "Encubrir a Clara para salvar el apellido.",
            next: "finalSilencio",
            effect: { odio: 1 },
          },
          {
            label: "Huir con Mateo y dejar la herencia atrás.",
            next: "finalFuga",
            effect: { confianza: 2 },
          },
          {
            label: "Usar la verdad para quedarte con todo.",
            next: "finalPoder",
            effect: { odio: 2 },
          },
        ],
      },
  
      finalJusticia: {
        headerTitle: "Final desbloqueado",
        headerSubtitle: "La verdad ante todos",
        tag: "Final",
        place: "Entrada de la hacienda",
        title: "Final: Justicia Carmesí",
        image:
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80",
        text: `Entregas las pruebas.
  
  Clara es arrestada.
  Mateo recibe el apellido que le fue negado.
  La hacienda deja de ser un símbolo de poder y se convierte en una escena de duelo.
  
  La justicia llega tarde.
  Pero llega.`,
        ending: "Final justo",
      },
  
      finalFuga: {
        headerTitle: "Final desbloqueado",
        headerSubtitle: "Amor lejos de la herencia",
        tag: "Final",
        place: "Camino rural",
        title: "Final: Fuga con Mateo",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
        text: `Decides huir con Mateo.
  
  La fortuna, el apellido y la mansión quedan atrás.
  No sabes si el amor sobrevivirá a tanta mentira, pero por primera vez nadie decide por ustedes.
  
  La herencia se pierde.
  La libertad no.`,
        ending: "Final romántico",
      },
  
      finalSilencio: {
        headerTitle: "Final desbloqueado",
        headerSubtitle: "La familia antes que la verdad",
        tag: "Final",
        place: "Despacho cerrado",
        title: "Final: Silencio Familiar",
        image:
          "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
        text: `Ocultas la verdad.
  
  Clara no cae.
  Mateo nunca es reconocido.
  El abogado se convierte en otra muerte convenientemente olvidada.
  
  La hacienda sigue en pie.
  Pero ahora tú sabes que sus paredes respiran culpa.`,
        ending: "Final oscuro",
      },
  
      finalPoder: {
        headerTitle: "Final desbloqueado",
        headerSubtitle: "Quien tiene la verdad, manda",
        tag: "Final",
        place: "Despacho del patriarca",
        title: "Final: Dueña de la Herencia",
        image:
          "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
        text: `Guardas las pruebas.
  
  Ni Clara, ni Mateo, ni la ley reciben toda la verdad.
  Solo tú.
  
  Con los documentos en tu poder, todos deberán negociar contigo.
  
  La herencia no fue para el más inocente.
  Fue para quien supo jugar mejor.`,
        ending: "Final de poder",
      },
    },
  };