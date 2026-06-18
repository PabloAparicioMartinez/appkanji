export type AnimeCategory = 'partícula' | 'vocabulario' | 'gramática'

export interface AnimeEntry {
  jp: string
  reading?: string
  category: AnimeCategory
  meaning: string
  example?: string
}

export const ANIME_DATA: AnimeEntry[] = [
  // ── PARTÍCULAS / FINALES DE FRASE ──────────────────────────────────────
  {
    jp: 'ぜ',
    category: 'partícula',
    meaning: 'Partícula final masculina e informal. Añade énfasis o determinación.',
    example: '行くぜ！ → ¡Vamos!',
  },
  {
    jp: 'ぞ',
    category: 'partícula',
    meaning: 'Partícula final masculina, más enfática y fuerte que ぜ. Puede sonar amenazante.',
    example: '覚えてろぞ → Ya te acordarás.',
  },
  {
    jp: 'だぜ',
    category: 'partícula',
    meaning: 'Afirmación masculina informal y enfática. Combina だ (cópula) + ぜ.',
    example: '俺が一番だぜ → Yo soy el mejor.',
  },
  {
    jp: 'だぞ',
    category: 'partícula',
    meaning: 'Afirmación masculina muy enfática, más fuerte que だぜ. Puede sonar casi como una amenaza.',
    example: '逃がさないだぞ → No te voy a dejar escapar.',
  },
  {
    jp: '～な',
    category: 'partícula',
    meaning: 'Al final de frase: (1) prohibición informal "no hagas X"; (2) exclamación emotiva o de nostalgia masculina.',
    example: '行くな！ → ¡No vayas! / きれいだな → Qué bonito...',
  },
  {
    jp: 'さ',
    category: 'partícula',
    meaning: 'Partícula suavizante o relleno de pausa. Hace la frase menos directa. Informal.',
    example: 'まあ、そういうことさ → Bueno, así son las cosas.',
  },
  {
    jp: 'かい',
    category: 'partícula',
    meaning: 'Partícula interrogativa masculina e informal. Más suave que か.',
    example: 'お前もそう思うかい？ → ¿Tú también piensas eso?',
  },
  {
    jp: 'の',
    category: 'partícula',
    meaning: 'Pregunta informal, frecuente en habla femenina o infantil. También explicativo: "es que...".',
    example: 'どこに行くの？ → ¿Adónde vas?',
  },
  {
    jp: 'わ',
    category: 'partícula',
    meaning: 'Partícula final femenina que suaviza afirmaciones. En dialecto Kansai también la usan los hombres.',
    example: 'そうじゃないわ → Eso no es así.',
  },
  {
    jp: 'もん',
    category: 'partícula',
    meaning: 'Justificación o queja con tono infantil o femenino. Forma contraída de もの.',
    example: 'だって怖いんだもん → Es que me da miedo.',
  },
  {
    jp: 'かな',
    category: 'partícula',
    meaning: 'Pregunta o duda para uno mismo. "¿Será que...?", "Me pregunto si...".',
    example: 'うまくいくかな… → ¿Saldrá bien...?',
  },
  {
    jp: 'だと？',
    category: 'partícula',
    meaning: 'Repetir algo con sorpresa, incredulidad o indignación. Muy frecuente en anime de acción y shonen.',
    example: 'お前が負けた、だと？ → ¿Que tú has perdido?',
  },

  // ── VOCABULARIO ─────────────────────────────────────────────────────────
  {
    jp: 'ヤツ',
    reading: 'やつ',
    category: 'vocabulario',
    meaning: '"Tipo", "individuo". Informal y a veces despectivo. Entre amigos puede usarse con afecto.',
    example: 'あのヤツは強い → Ese tipo es fuerte.',
  },
  {
    jp: '野郎',
    reading: 'やろう',
    category: 'vocabulario',
    meaning: '"Tío", "tipo". Masculino y brusco. Puede ser insultante según el contexto.',
    example: 'このやろう！ → ¡Maldito seas!',
  },
  {
    jp: '貴様',
    reading: 'きさま',
    category: 'vocabulario',
    meaning: '"Tú" extremadamente agresivo e insultante. Históricamente era formal; ahora solo se usa para insultar.',
  },
  {
    jp: 'てめえ',
    category: 'vocabulario',
    meaning: '"Tú" muy vulgar e insultante. Más agresivo que お前. Viene de 手前 (temae).',
    example: 'てめえ、何しやがった！ → ¡Tú, qué demonios has hecho!',
  },
  {
    jp: 'バカ',
    category: 'vocabulario',
    meaning: 'Idiota, tonto. El insulto más habitual. Varía de cariñoso a ofensivo según el tono y la relación.',
  },
  {
    jp: 'うるさい',
    category: 'vocabulario',
    meaning: '"Cállate", "eres un pesado". Literalmente "ruidoso". Respuesta muy común de enfado o impaciencia.',
  },
  {
    jp: 'うざい',
    category: 'vocabulario',
    meaning: '"Eres molesto/insoportable". Más fuerte que うるさい. Forma reducida de うざったい.',
  },
  {
    jp: 'やばい',
    category: 'vocabulario',
    meaning: 'Originalmente "peligroso" o "estoy en un lío". Coloquialmente "alucinante", "brutal" (positivo o negativo).',
    example: 'これやばい！ → ¡Esto está brutal! / ¡Esto es un problema!',
  },
  {
    jp: 'めっちゃ',
    category: 'vocabulario',
    meaning: 'Intensificador informal: "muchísimo", "súper". Origen en dialecto Kansai. めちゃ es variante algo más suave.',
    example: 'めっちゃ強い → Fortísimo.',
  },
  {
    jp: 'ガチ',
    category: 'vocabulario',
    meaning: '"En serio", "de verdad". De ガチンコ (combate real sin trampa). ガチで = en serio.',
    example: 'ガチで言ってる？ → ¿Lo dices en serio?',
  },
  {
    jp: 'くそ',
    category: 'vocabulario',
    meaning: '"Mierda". Exclamación de frustración o rabia. くそっ es más enfático. También prefijo intensificador: くそ強い.',
    example: 'くそっ、また負けた → Mierda, he vuelto a perder.',
  },
  {
    jp: 'チッ',
    category: 'vocabulario',
    meaning: 'Chasquido de lengua. Señal de irritación, impaciencia o desprecio. Se escribe en katakana para imitarlo.',
  },
  {
    jp: 'やれやれ',
    category: 'vocabulario',
    meaning: '"Vaya, vaya", "ay, Dios". Expresión de resignación, cansancio o exasperación. Típica de personajes estoicos.',
  },
  {
    jp: 'ふん',
    category: 'vocabulario',
    meaning: '"Hmph". Expresión de desprecio, indiferencia o superioridad. Típica de personajes orgullosos o antagonistas.',
  },
  {
    jp: 'なめるな',
    category: 'vocabulario',
    meaning: '"No me subestimes", "no te la des". Literalmente "no me lamas". Muy frecuente en confrontaciones.',
    example: 'なめるな！ → ¡No me subestimes!',
  },
  {
    jp: '化け物',
    reading: 'バケモノ',
    category: 'vocabulario',
    meaning: '"Monstruo", "aberración". Se usa para alguien increíblemente poderoso o que no parece humano.',
    example: 'こいつは化け物だ → Este tipo es un monstruo.',
  },
  {
    jp: 'やつ（奴）',
    reading: 'やつ',
    category: 'vocabulario',
    meaning: '"Cosa" o "eso". Forma informal de referirse a un objeto. Distinto de ヤツ (persona).',
    example: 'その奴をくれ → Dame eso.',
  },

  // ── GRAMÁTICA / PATRONES ────────────────────────────────────────────────
  {
    jp: '～てやる',
    category: 'gramática',
    meaning: 'Hacer algo con determinación propia o para fastidiar a alguien. Tono decidido, agresivo o desafiante.',
    example: '絶対勝ってやる！ → ¡Os voy a ganar seguro!',
  },
  {
    jp: '～くせに',
    category: 'gramática',
    meaning: '"A pesar de ser solo..." Reprocha una contradicción de forma despectiva. Nunca neutro.',
    example: '子供のくせに生意気だ → Siendo un crío y encima con esas actitudes.',
  },
  {
    jp: '～わけがない',
    category: 'gramática',
    meaning: '"No hay manera de que...", imposibilidad rotunda desde el punto de vista del hablante.',
    example: 'あいつが負けるわけがない → No hay manera de que ese pierda.',
  },
  {
    jp: '～に決まっている',
    category: 'gramática',
    meaning: '"Está claro que...", "seguro que...". Certeza subjetiva y enfática.',
    example: '嘘に決まってる → Está claro que es mentira.',
  },
  {
    jp: '～ものか',
    category: 'gramática',
    meaning: '"¡De ninguna manera!" Negación enfática y retórica. Expresa que algo es impensable para el hablante.',
    example: '負けるものか！ → ¡No voy a perder de ninguna manera!',
  },
  {
    jp: '～はずだ',
    category: 'gramática',
    meaning: '"Se supone que...", "debería ser así". Expectativa lógica basada en razonamiento, no en certeza.',
    example: 'もう着いているはずだ → Ya debería haber llegado.',
  },
  {
    jp: '～っていうか',
    category: 'gramática',
    meaning: '"O sea", "más bien". Corrige o matiza lo que se acaba de decir. Forma coloquial de というか.',
    example: 'すごい、っていうかヤバい → Increíble, o sea, brutal.',
  },
  {
    jp: '～てみせる',
    category: 'gramática',
    meaning: '"Te voy a demostrar que...", "ya verás que sí". Determinación de probar algo ante alguien.',
    example: '絶対守ってみせる → Te demostraré que te protejo.',
  },
  {
    jp: '～じゃないか',
    category: 'gramática',
    meaning: 'Reconocimiento o descubrimiento: "¡pero si es...!", "resulta que...". También reproche suave.',
    example: 'お前じゃないか！ → ¡Pero si eres tú!',
  },
  {
    jp: '～だけど（文末）',
    category: 'gramática',
    meaning: '"Pero..." al final de frase sin concluir. Deja implícito el resto, suavizando o esperando respuesta del interlocutor.',
    example: '行きたいんだけど… → Es que quiero ir, pero...',
  },
  {
    jp: '～てたまるか',
    category: 'gramática',
    meaning: '"¡No puedo soportar...!", "¡ni hablar de...!" Rechazo total y enfático. Más fuerte que ～ものか.',
    example: 'こんなところで死んでたまるか！ → ¡No pienso morir en un lugar como este!',
  },
  {
    jp: '～というものだ',
    category: 'gramática',
    meaning: 'Define lo que "verdaderamente es" algo. Afirmación categórica sobre la naturaleza de las cosas.',
    example: 'これが本物の力というものだ → A esto se le llama poder de verdad.',
  },
]
