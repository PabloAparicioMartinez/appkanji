export type AnimeCategory = 'partícula' | 'vocabulario' | 'gramática'

export interface AnimeExample {
  jp: string
  furigana?: string
  es: string
}

export interface AnimeEntry {
  jp: string
  reading?: string
  category: AnimeCategory
  meaning: string
  examples: AnimeExample[]
}

export const ANIME_DATA: AnimeEntry[] = [
  {
    jp: 'よ',
    category: 'partícula',
    meaning: '«¡Oye! / Te digo que… / ¡Escucha!»\nPartícula afirmativa que informa o enfatiza algo que el oyente no sabe o no cree. Puede sonar confiada, advertidora o insistente según el tono. En anime aparece en declaraciones importantes, promesas y advertencias.',
    examples: [
      { jp: '俺が守るよ。', furigana: '[俺|おれ]が[守|まも]るよ。', es: 'Te voy a proteger, ¿de acuerdo?' },
      { jp: '知ってるよ！', furigana: '[知|し]ってるよ！', es: '¡Ya lo sé!' },
      { jp: '大丈夫だよ。', furigana: '[大丈夫|だいじょうぶ]だよ。', es: 'Estarás bien, de verdad.' },
    ],
  },
  {
    jp: 'ね / ねえ',
    category: 'partícula',
    meaning: '«¿Verdad? / ¿No? / Oye…»\nPartícula que busca acuerdo o confirmación del oyente; también suaviza afirmaciones. En su forma larga ねえ / ねー funciona como llamada de atención ("oye, escucha"). Muy común en personajes femeninos pero lo usan todos los géneros.',
    examples: [
      { jp: 'そうだね、そう思う。', es: 'Tiene razón, yo también lo creo.' },
      { jp: 'いいね！', es: '¡Qué bien! / ¡Me gusta!' },
      { jp: 'ねえ、聞いてる？', furigana: 'ねえ、[聞|き]いてる？', es: 'Oye, ¿me estás escuchando?' },
    ],
  },
  {
    jp: 'の',
    category: 'partícula',
    meaning: '«¿De verdad? / Es que… (explicación suave)»\nDos funciones: (1) pregunta suave e informal, típica del habla femenina e infantil; (2) uso explicativo que da contexto emocional y suaviza la afirmación. の suaviza y humaniza la frase. En pregunta sube la entonación; en afirmación la baja.',
    examples: [
      { jp: 'どこへ行くの？', furigana: 'どこへ[行|い]くの？', es: '¿Adónde vas?' },
      { jp: '怖かったの。', furigana: '[怖|こわ]かったの。', es: 'Es que estaba asustada.' },
      { jp: '本当に知らないの？', furigana: '[本当|ほんとう]に[知|し]らないの？', es: '¿De verdad que no lo sabes?' },
    ],
  },
  {
    jp: 'って',
    category: 'partícula',
    meaning: '«Dijo que… / Eso de… / ¿Que…?»\nPartícula coloquial multiuso: cita lo que alguien dijo, marca el tema del que se habla o repite con sorpresa algo recién oído. Versión casual de という/と. Omnipresente en el habla espontánea del anime.',
    examples: [
      { jp: '行くって言ったろ！', furigana: '[行|い]くって[言|い]ったろ！', es: '¡Dije que iba a ir!' },
      { jp: 'これって本物？', furigana: 'これって[本物|ほんもの]？', es: 'Esto… ¿es de verdad?' },
      { jp: '無理って何だよ！', furigana: '[無理|むり]って[何|なん]だよ！', es: '¿Cómo que imposible?' },
    ],
  },
  {
    jp: 'やばい',
    category: 'vocabulario',
    meaning: '«¡Brutal! / ¡Fatal! / ¡Qué pasada!»\nOriginalmente "peligroso / estar en un lío". Hoy es el intensificador coloquial por excelencia, positivo o negativo según el tono. やばすぎる = "demasiado brutal". También como adjetivo (やばい状況 = "situación peligrosa"). Una de las palabras más versátiles del japonés moderno.',
    examples: [
      { jp: 'やばい、遅刻する！', furigana: 'やばい、[遅刻|ちこく]する！', es: '¡Fatal, voy a llegar tarde!' },
      { jp: 'それやばすぎる。', es: 'Eso está a otro nivel.' },
      { jp: 'やばい、あいつ強い。', furigana: 'やばい、あいつ[強|つよ]い。', es: 'Madre mía, ese tipo es fuerte.' },
    ],
  },
  {
    jp: 'バカ',
    category: 'vocabulario',
    meaning: '«¡Idiota! / ¡Tonto!»\nEl insulto más frecuente del japonés coloquial. La gravedad varía enormemente con el tono: desde cariñoso (バカ、心配したんだぞ) hasta genuinamente insultante. En el habla tsundere puede ser una muestra de afecto disfrazado.',
    examples: [
      { jp: 'バカ！', es: '¡Idiota!' },
      { jp: 'バカ、心配したんだぞ！', furigana: 'バカ、[心配|しんぱい]したんだぞ！', es: '¡Imbécil, estaba preocupado por ti!' },
      { jp: 'そんなバカな話があるか！', es: '¡No puede ser tan absurdo!' },
    ],
  },
  {
    jp: 'くそ',
    category: 'vocabulario',
    meaning: '«¡Mierda! / ¡Rayos!»\nExclamación de frustración o rabia. くそっ enfatiza el enfado. Como prefijo intensificador: くそ強い = "fortísimo", くそ野郎 = "maldito tipo". La primera exclamación de frustración que aprende cualquier estudiante de anime.',
    examples: [
      { jp: 'くそっ、逃げやがった！', furigana: 'くそっ、[逃|に]げやがった！', es: '¡Maldita sea, se ha escapado!' },
      { jp: 'くそ、なんで俺だけ！', furigana: 'くそ、なんで[俺|おれ]だけ！', es: '¡Rayos, por qué solo a mí!' },
      { jp: 'あいつくそ強い。', furigana: 'あいつくそ[強|つよ]い。', es: 'Ese tío es bestialmente fuerte.' },
    ],
  },
  {
    jp: 'マジ',
    category: 'vocabulario',
    meaning: '«¿En serio? / De verdad / ¡No me lo creo!»\nColoquial para "de verdad / en serio". Abreviatura de 本当に. マジで？= "¿de verdad?"; マジで言ってる = "lo digo en serio". Más casual que ガチ. Omnipresente en el japonés juvenil y en todo tipo de anime contemporáneo.',
    examples: [
      { jp: 'マジで？信じられない！', furigana: 'マジで？[信|しん]じられない！', es: '¿En serio? ¡No me lo puedo creer!' },
      { jp: 'マジで言ってるのか？', es: '¿Lo dices en serio?' },
      { jp: 'マジで強い、あいつ。', furigana: 'マジで[強|つよ]い、あいつ。', es: 'De verdad que es fuerte, ese tipo.' },
    ],
  },
  {
    jp: 'うるさい',
    category: 'vocabulario',
    meaning: '«¡Cállate! / ¡Qué pesado!»\nLiteralmente "ruidoso". La respuesta más habitual ante alguien molesto que no para de hablar. Más suave y quejoso que 黙れ (que es una orden fría). En boca de un tsundere puede ser una muestra de afecto disfrazado.',
    examples: [
      { jp: 'うるさい！黙れ！', furigana: 'うるさい！[黙|だま]れ！', es: '¡Cállate! ¡Silencio!' },
      { jp: 'うるさいな、わかってるよ。', es: 'Qué pesado, ya lo sé.' },
      { jp: 'うるさいっ！好きなわけないじゃん！', furigana: 'うるさいっ！[好|す]きなわけないじゃん！', es: '¡Cállate! ¡No es que me gustes ni nada!' },
    ],
  },
  {
    jp: 'すごい / すごっ',
    category: 'vocabulario',
    meaning: '«¡Increíble! / ¡Alucinante! / ¡Flipante!»\nExclamación de asombro ante algo impresionante. Una de las palabras más frecuentes del japonés coloquial. すごっ es la forma corta espontánea. すごすぎる añade "brutal de verdad". También como modificador: すごく (enormemente).',
    examples: [
      { jp: 'すごい！なんだあれ！', es: '¡Increíble! ¡Pero qué es eso!' },
      { jp: 'すごっ、信じられない。', furigana: 'すごっ、[信|しん]じられない。', es: 'Dios mío, no me lo puedo creer.' },
      { jp: 'それすごすぎる！', es: '¡Eso está a otro nivel!' },
    ],
  },
  {
    jp: '～てしまう / ～ちゃう',
    category: 'gramática',
    meaning: '«Acabar haciendo / Sin querer… / Se me fue de las manos»\nIndica que algo ocurrió de forma no intencionada, accidental o lamentable. ～ちゃう / ～じゃう son las formas coloquiales contraídas. En anime expresa arrepentimiento, situaciones fuera de control o consecuencias irreversibles.',
    examples: [
      { jp: '死んでしまう！', furigana: '[死|し]んでしまう！', es: '¡Me va a matar / va a morir!' },
      { jp: '言ってしまった、まずい。', furigana: '[言|い]ってしまった、まずい。', es: 'Lo he dicho sin querer, qué lío.' },
      { jp: 'やっちゃった、どうしよう。', es: 'Lo he hecho sin pensar, ¿qué hago ahora?' },
    ],
  },
  {
    jp: '～んだ / ～なんだ',
    category: 'gramática',
    meaning: '«Es que… / Lo que pasa es que… / ¡Tengo que!»\nLa cópula explicativa por excelencia. んだ añade "razón de fondo / explicación" a lo que se dice. En declaraciones enfáticas crea un fuerte sentido de determinación. 俺がやるんだ = "soy yo quien lo hará (y tiene sentido que así sea)".',
    examples: [
      { jp: '俺が守るんだ！', furigana: '[俺|おれ]が[守|まも]るんだ！', es: '¡Seré yo quien te proteja!' },
      { jp: 'そういうことなんだよ。', es: 'Eso es exactamente lo que pasa, ¿lo entiendes?' },
      { jp: '行かなきゃならないんだ。', furigana: '[行|い]かなきゃならないんだ。', es: 'Tengo que irme, no hay alternativa.' },
    ],
  },
  {
    jp: '～なきゃ / ～なければ',
    category: 'gramática',
    meaning: '«Tengo que… / Hay que… (urgencia)»\nContracción coloquial de ～なければならない (obligación). En anime aparece en momentos de urgencia o cuando el personaje cae en la cuenta de su deber. ～なければ sola suena aún más desnuda y dramática.',
    examples: [
      { jp: '行かなきゃ！', furigana: '[行|い]かなきゃ！', es: '¡Tengo que irme!' },
      { jp: '強くならなきゃ。', furigana: '[強|つよ]くならなきゃ。', es: 'Tengo que volverme más fuerte.' },
      { jp: 'やらなきゃだめだ、今しかない。', furigana: 'やらなきゃだめだ、[今|いま]しかない。', es: 'Hay que hacerlo, es ahora o nunca.' },
    ],
  },
  {
    jp: '～てくれ / ～てくれよ',
    category: 'gramática',
    meaning: '«Hazme el favor de… / Por favor… (ruego masculino emocional)»\nPide un favor con tono emocional o urgente. てくれ es directo y masculino; ～てくれよ añade cierto tono de desesperación o súplica. Muy frecuente en momentos de tensión máxima. Más personal y emocional que ～てください.',
    examples: [
      { jp: '諦めないでくれ！', furigana: '[諦|あきら]めないでくれ！', es: '¡Por favor, no te rindas!' },
      { jp: '死なないでくれよ。', furigana: '[死|し]なないでくれよ。', es: 'Por favor, no te mueras.' },
      { jp: '信じてくれ、頼む。', furigana: '[信|しん]じてくれ、[頼|たの]む。', es: 'Confía en mí, te lo pido.' },
    ],
  },
  {
    jp: 'はあ？',
    category: 'vocabulario',
    meaning: '«¿Cómo? / ¿Perdona? / ¿Qué has dicho?»\nExclamación de incredulidad, confusión o irritación. El tono lo transforma todo: sorpresa neutra (↑), indignación (↗ aguda). Es una interjección con mucha carga emocional, frecuente como primera reacción ante algo absurdo o inesperado.',
    examples: [
      { jp: 'はあ？何それ。', es: '¿Qué? ¿De qué hablas?' },
      { jp: 'はあ？俺が悪いの？', furigana: 'はあ？[俺|おれ]が[悪|わる]いの？', es: '¿Perdona? ¿La culpa es mía?' },
      { jp: 'はあ？もう一回言ってみろ。', furigana: 'はあ？もう[一回|いっかい][言|い]ってみろ。', es: '¿Qué? Repite eso si te atreves.' },
    ],
  },
  {
    jp: 'おい',
    category: 'vocabulario',
    meaning: '«¡Oye! / ¡Eh! / ¡Tú!»\nLlamada de atención brusca y masculina. Según el tono va del aviso amistoso a la increpación. おいおい = "oye, oye…" (incredulidad o reproche). Muy frecuente para interpelar a alguien de golpe.',
    examples: [
      { jp: 'おい、待てよ。', furigana: 'おい、[待|ま]てよ。', es: '¡Eh, espera!' },
      { jp: 'おいおい、マジかよ。', furigana: 'おいおい、マジかよ。', es: 'Oye, oye… ¿en serio?' },
      { jp: 'おい、大丈夫か？', furigana: 'おい、[大丈夫|だいじょうぶ]か？', es: 'Eh, ¿estás bien?' },
    ],
  },
  {
    jp: 'だろ',
    category: 'partícula',
    meaning: '«¿Verdad? / ¿No te parece? / Obvio»\nForma contraída de だろう. El hablante asume que el oyente comparte su opinión o que algo es evidente. En tono agresivo puede sonar a "¿acaso no lo sabes?". En tono suave, busca acuerdo. Muy masculino e informal.',
    examples: [
      { jp: '当たり前だろ！', furigana: '[当|あ]たり[前|まえ]だろ！', es: '¡Es obvio, hombre!' },
      { jp: 'わかるだろ！', es: '¡Es evidente, ¿no?!' },
      { jp: 'そう思うだろ？', furigana: 'そう[思|おも]うだろ？', es: '¿Tú también lo piensas, verdad?' },
    ],
  },
  {
    jp: 'お前',
    reading: 'おまえ',
    category: 'vocabulario',
    meaning: '«Tú / Oye tú (brusco o familiar)»\nPronombre de segunda persona masculino y brusco, aunque también se usa entre amigos cercanos con afecto. Según el tono va de la confrontación al cariño. お前ら = "vosotros". Omnipresente en boca de protagonistas y rivales.',
    examples: [
      { jp: 'お前、誰だ？', furigana: 'お[前|まえ]、[誰|だれ]だ？', es: '¿Tú quién eres?' },
      { jp: 'お前のことは俺が守る。', furigana: 'お[前|まえ]のことは[俺|おれ]が[守|まも]る。', es: 'A ti te protegeré yo.' },
      { jp: 'お前らには負けない！', furigana: 'お[前|まえ]らには[負|ま]けない！', es: '¡A vosotros no os pienso perder!' },
    ],
  },
  {
    jp: 'かな',
    category: 'partícula',
    meaning: '«¿Será que…? / Me pregunto si…»\nPregunta o duda dirigida a uno mismo, no a un interlocutor. Refleja incertidumbre, preocupación velada o esperanza. Una de las partículas más melancólicas, frecuente en monólogos y escenas de anticipación o introspección.',
    examples: [
      { jp: 'うまくいくかな…', es: '¿Saldrá bien, me pregunto…?' },
      { jp: '彼は来るかな。', furigana: '[彼|かれ]は[来|く]るかな。', es: 'Me pregunto si él vendrá.' },
      { jp: '俺でいいのかな。', furigana: '[俺|おれ]でいいのかな。', es: '¿Seré suficiente, me pregunto?' },
    ],
  },
  {
    jp: 'なあ',
    category: 'partícula',
    meaning: '«Ojalá… / Qué… / Sí que…»\nPartícula de reflexión o deseo con tono nostálgico, melancólico o admirativo. Típica de monólogos y momentos de introspección. A veces expresa un deseo no realizado. Exclusivamente masculina o neutra; las mujeres usan ねえ en lugar.',
    examples: [
      { jp: '強くなりたいなあ。', furigana: '[強|つよ]くなりたいなあ。', es: 'Ojalá pudiera volverme más fuerte…' },
      { jp: 'いいなあ、うらやましい。', es: 'Qué suerte tiene, le envidio.' },
      { jp: 'そうだなあ…どうしよう。', es: 'Pues sí… qué hago.' },
    ],
  },
  {
    jp: 'よね',
    category: 'partícula',
    meaning: '«¿Verdad que sí? / Tiene que ser así, ¿no?»\nCombinación de よ + ね. El hablante afirma algo (よ) y busca confirmación (ね). Implica que está bastante seguro pero necesita validación. Muy común en situaciones de tensión donde se confirma una deducción importante.',
    examples: [
      { jp: 'そうだよね？', es: 'Es así, ¿verdad?' },
      { jp: 'お前も感じたよね。', furigana: 'お[前|まえ]も[感|かん]じたよね。', es: 'Tú también lo notaste, ¿a que sí?' },
      { jp: '怪しいよね、あいつ。', furigana: '[怪|あや]しいよね、あいつ。', es: 'Ese tipo es sospechoso, ¿verdad?' },
    ],
  },
  {
    jp: 'じゃん',
    category: 'partícula',
    meaning: '«¡Pues claro! / ¡Obvio! / ¿No ves?»\nContraído de じゃないか. Muy coloquial, de origen en el dialecto de Yokohama. Se usa para señalar algo obvio o para reaccionar con sorpresa positiva. Muy frecuente en anime contemporáneos y comedias.',
    examples: [
      { jp: 'できるじゃん！', es: '¡Pues sí que puedes, ves!' },
      { jp: 'それじゃん！', es: '¡Ahí está! ¡Eso mismo!' },
      { jp: 'いいじゃん、行こうよ。', furigana: 'いいじゃん、[行|い]こうよ。', es: 'Está bien, ¡vamos!' },
    ],
  },
  {
    jp: 'かよ',
    category: 'partícula',
    meaning: '«¿Pero qué…? / ¡¿En serio?!»\nPartícula interrogativa coloquial y masculina que expresa incredulidad, sorpresa o decepción. Más informal y a veces despectiva que か. Frecuente como reacción ante algo inesperado, ridículo o decepcionante.',
    examples: [
      { jp: 'マジかよ！', es: '¡¿Pero en serio?!' },
      { jp: 'それだけかよ…', es: '¿Solo eso? Vaya decepción.' },
      { jp: 'お前でもできるのかよ！', furigana: 'お[前|まえ]でもできるのかよ！', es: '¡¿Hasta tú eres capaz?!' },
    ],
  },
  {
    jp: 'ぜ',
    category: 'partícula',
    meaning: '«¡Vamos! / ¡Sí! / ¡Lo haré!»\nPartícula final masculina e informal que añade determinación, entusiasmo o ligero desafío. Más suave y enérgica que ぞ. Muy común en protagonistas shonen que hablan con confianza. No se usa en el habla femenina estándar.',
    examples: [
      { jp: '行くぜ！', furigana: '[行|い]くぜ！', es: '¡Vamos!' },
      { jp: '俺がやるぜ！', furigana: '[俺|おれ]がやるぜ！', es: '¡Lo haré yo!' },
      { jp: '絶対に勝つぜ！', furigana: '[絶対|ぜったい]に[勝|か]つぜ！', es: '¡Voy a ganar seguro!' },
    ],
  },
  {
    jp: 'ぞ',
    category: 'partícula',
    meaning: '«¡Cuidado! / ¡Lo haré! (amenaza firme)»\nPartícula final masculina más fuerte y amenazante que ぜ. Señal de advertencia, desafío o resolución extrema. Típica de villanos, guerreros y personajes con autoridad. El tono puede variar de advertencia seria a amenaza directa.',
    examples: [
      { jp: '行くぞ！', furigana: '[行|い]くぞ！', es: '¡Allá vamos!' },
      { jp: '俺は本気だぞ。', furigana: '[俺|おれ]は[本気|ほんき]だぞ。', es: 'Hablo en serio, ¿entendido?' },
      { jp: '次は許さないぞ。', furigana: '[次|つぎ]は[許|ゆる]さないぞ。', es: 'La próxima vez no perdonaré.' },
    ],
  },
  {
    jp: '～な',
    category: 'partícula',
    meaning: '«¡No hagas X! / Qué… (reflexión)»\nDos usos opuestos: (1) prohibición informal al final del verbo diccionario: "¡no lo hagas!" — directo y masculino; (2) partícula de nostalgia, admiración o emoción al final de una afirmación. Muy frecuente en monólogos y momentos de reflexión o añoranza.',
    examples: [
      { jp: '来るな！', furigana: '[来|く]るな！', es: '¡No vengas!' },
      { jp: '強くなったな…', furigana: '[強|つよ]くなったな…', es: 'Has crecido, ¿eh?…' },
      { jp: 'あの頃は楽しかったな。', furigana: 'あの[頃|ころ]は[楽|たの]しかったな。', es: 'Qué buenos tiempos aquellos.' },
    ],
  },
  {
    jp: 'さ',
    category: 'partícula',
    meaning: '«Pues / Ya ves / Qué le vamos a hacer»\nPartícula suavizante o relleno de pausa que hace la frase menos directa y más relajada o fatalista. El hablante añade さ cuando concluye algo que da por sentado o asume compartido. Muy informal, común en monólogos internos y personajes cínicos.',
    examples: [
      { jp: '知ってるさ。', es: 'Ya lo sé, claro.' },
      { jp: 'どうせ無理さ。', es: 'De todas formas, es imposible, ya ves.' },
      { jp: 'そういうことさ。', es: 'Así son las cosas.' },
    ],
  },
  {
    jp: 'やめろ',
    category: 'vocabulario',
    meaning: '«¡Para! / ¡Déjalo! / ¡Basta!»\nOrden directa y masculina de detenerse. やめて es la versión más suave o femenina, casi una súplica. En anime aparece tanto en peleas ("¡para!") como en ruegos desesperados.',
    examples: [
      { jp: 'やめろ！それ以上やるな！', furigana: 'やめろ！それ[以上|いじょう]やるな！', es: '¡Para! ¡No sigas!' },
      { jp: 'もうやめてくれ…！', furigana: 'もうやめてくれ…！', es: '¡Para ya, por favor…!' },
      { jp: 'やめろと言ったはずだ。', furigana: 'やめろと[言|い]ったはずだ。', es: 'Te dije que pararas.' },
    ],
  },
  {
    jp: '絶対',
    reading: 'ぜったい',
    category: 'vocabulario',
    meaning: '«Absolutamente / De ninguna manera / Seguro que»\nAdverbio de énfasis total. 絶対に + afirmativo = determinación absoluta; 絶対に + negativo = rotunda negación. 絶対に負けない = "jamás perderé". El intensificador favorito del protagonista shonen en momentos de clímax.',
    examples: [
      { jp: '絶対に負けない！', furigana: '[絶対|ぜったい]に[負|ま]けない！', es: '¡Jamás voy a perder!' },
      { jp: '絶対に助けてみせる！', furigana: '[絶対|ぜったい]に[助|たす]けてみせる！', es: '¡Te salvaré sin falta!' },
      { jp: '絶対に許さない。', furigana: '[絶対|ぜったい]に[許|ゆる]さない。', es: 'Jamás te perdonaré.' },
    ],
  },
  {
    jp: '覚悟',
    reading: 'かくご',
    category: 'vocabulario',
    meaning: '«¡Prepárate! / Resignación ante lo inevitable»\nDos caras: (1) amenaza: 覚悟しろ = "prepárate para lo que viene"; (2) resolución propia: 覚悟を決める = "asumir las consecuencias y actuar". Concepto central en el anime de acción: implica haber aceptado el precio de lo que se va a hacer.',
    examples: [
      { jp: '覚悟しろ！', furigana: '[覚悟|かくご]しろ！', es: '¡Prepárate para las consecuencias!' },
      { jp: '覚悟はできているか？', furigana: '[覚悟|かくご]はできているか？', es: '¿Estás preparado para afrontar esto?' },
      { jp: '俺は覚悟を決めた。', furigana: '[俺|おれ]は[覚悟|かくご]を[決|き]めた。', es: 'He tomado mi decisión, pase lo que pase.' },
    ],
  },
  {
    jp: '本気',
    reading: 'ほんき',
    category: 'vocabulario',
    meaning: '«En serio / Con todas las fuerzas / Sin contenerse»\n"Mente/intención real". Indica que algo no es un juego. 本気を出す = "sacar el verdadero poder". 本気か？= "¿vas en serio?". En batallas, 本気 señala el momento en que el personaje deja de contenerse.',
    examples: [
      { jp: '本気でかかってこい！', furigana: '[本気|ほんき]でかかってこい！', es: '¡Atácame con todo lo que tienes!' },
      { jp: '本気か？冗談じゃないのか？', furigana: '[本気|ほんき]か？[冗談|じょうだん]じゃないのか？', es: '¿Hablas en serio? ¿No es una broma?' },
      { jp: '俺、本気出すよ。', furigana: '[俺|おれ]、[本気|ほんき][出|だ]すよ。', es: 'Voy a sacar mi verdadero poder.' },
    ],
  },
  {
    jp: 'よし',
    category: 'vocabulario',
    meaning: '«¡Vale! / ¡Bien! / ¡Allá voy!»\nInterjección de decisión o ánimo justo antes de actuar. よし、行くぞ = "bien, ¡vamos!". Repetida (よしよし) sirve para calmar o consolar. Marca el instante de pasar a la acción con energía.',
    examples: [
      { jp: 'よし、行くぞ！', furigana: 'よし、[行|い]くぞ！', es: '¡Bien, allá vamos!' },
      { jp: 'よし、これで完璧だ。', furigana: 'よし、これで[完璧|かんぺき]だ。', es: 'Perfecto, así queda impecable.' },
      { jp: 'よしよし、もう泣くな。', furigana: 'よしよし、もう[泣|な]くな。', es: 'Venga, venga, ya no llores.' },
    ],
  },
  {
    jp: 'やった',
    category: 'vocabulario',
    meaning: '«¡Lo logré! / ¡Bien! / ¡Toma ya!»\nExclamación de alegría por un éxito o una buena noticia. やったー！alarga la celebración; やったぜ le da un punto masculino. De las reacciones positivas más frecuentes en todo tipo de anime.',
    examples: [
      { jp: 'やった！勝った！', furigana: 'やった！[勝|か]った！', es: '¡Bien! ¡Hemos ganado!' },
      { jp: 'やったー！ついにできた！', furigana: 'やったー！ついにできた！', es: '¡Toma ya! ¡Por fin lo logré!' },
      { jp: 'やったな、よくやった！', furigana: 'やったな、よくやった！', es: '¡Lo conseguiste, bien hecho!' },
    ],
  },
  {
    jp: 'さあ',
    category: 'vocabulario',
    meaning: '«¡Vamos! / Bueno… / Pues no sé»\nInterjección de varios usos: anima a actuar (さあ、行こう = "venga, vamos"), marca una pausa al pensar, o expresa que no se sabe algo (さあ？= "ni idea"). Muy frecuente al iniciar una acción o al esquivar una pregunta.',
    examples: [
      { jp: 'さあ、行こう！', furigana: 'さあ、[行|い]こう！', es: '¡Venga, vamos!' },
      { jp: 'さあ、どうかな。', furigana: 'さあ、どうかな。', es: 'Bueno… ¿quién sabe?' },
      { jp: 'さあ？知らないな。', furigana: 'さあ？[知|し]らないな。', es: '¿Yo? Ni idea.' },
    ],
  },
  {
    jp: 'まあ',
    category: 'vocabulario',
    meaning: '«Bueno… / En fin / Vaya»\nInterjección suavizante o de resignación moderada. まあまあ calma a alguien ("tranquilo, tranquilo") o significa "más o menos". Introduce una concesión o rebaja la tensión de lo que se va a decir.',
    examples: [
      { jp: 'まあ、いいか。', furigana: 'まあ、いいか。', es: 'Bueno, qué más da.' },
      { jp: 'まあまあ、落ち着いて。', furigana: 'まあまあ、[落|お]ち[着|つ]いて。', es: 'Venga, venga, cálmate.' },
      { jp: 'まあ、そういうことだ。', furigana: 'まあ、そういうことだ。', es: 'En fin, así están las cosas.' },
    ],
  },
  {
    jp: 'まさか',
    category: 'vocabulario',
    meaning: '«¡No puede ser! / ¿Acaso…?»\nExpresa incredulidad total ante algo inesperado. まさか solo = "no puede ser / imposible"; まさか〜なんて = "que de verdad fuera a…". Una de las palabras más dramáticas del vocabulario anime. Frecuente en momentos de revelación y giros de trama.',
    examples: [
      { jp: 'まさか、生きてたのか！', furigana: 'まさか、[生|い]きてたのか！', es: '¡Imposible, estaba vivo!' },
      { jp: 'まさか…お前が裏切ったのか？', furigana: 'まさか…お[前|まえ]が[裏切|うらぎ]ったのか？', es: 'No puede ser… ¿me traicionaste tú?' },
      { jp: 'まさかこんな結末になるとは。', furigana: 'まさかこんな[結末|けつまつ]になるとは。', es: 'Jamás habría imaginado este final.' },
    ],
  },
  {
    jp: '～かもしれない / ～かも',
    category: 'gramática',
    meaning: '«Quizá / A lo mejor / Puede que»\nExpresa posibilidad o conjetura. かもしれない es la forma completa; かも sola es la abreviación coloquial. Suaviza afirmaciones o introduce dudas inquietantes en momentos de tensión.',
    examples: [
      { jp: '死ぬかもしれない。', furigana: '[死|し]ぬかもしれない。', es: 'Puede que muera.' },
      { jp: '罠かも。', furigana: '[罠|わな]かも。', es: 'A lo mejor es una trampa.' },
      { jp: 'もう間に合わないかもしれない。', furigana: 'もう[間|ま]に[合|あ]わないかもしれない。', es: 'Quizá ya no lleguemos a tiempo.' },
    ],
  },
  {
    jp: 'しまった',
    category: 'vocabulario',
    meaning: '«¡Mierda! / ¡Metí la pata! / ¡Qué error!»\nExclamación al darse cuenta de un error o de algo que ha salido mal. Marca el instante de caer en la cuenta. Más ligero que くそ; es el "¡vaya!" del descuido.',
    examples: [
      { jp: 'しまった、忘れてた！', furigana: 'しまった、[忘|わす]れてた！', es: '¡Mierda, se me olvidó!' },
      { jp: 'しまった、罠だ！', furigana: 'しまった、[罠|わな]だ！', es: '¡Maldición, es una trampa!' },
      { jp: 'しまった…油断した。', furigana: 'しまった…[油断|ゆだん]した。', es: 'Vaya… me confié.' },
    ],
  },
  {
    jp: 'ひどい',
    category: 'vocabulario',
    meaning: '«¡Qué cruel! / ¡Eso es horrible! / ¡Qué injusto!»\nExpresa que algo es injusto, cruel o terrible. ひどすぎる intensifica la indignación. Frecuente en momentos de traición, injusticia o trato desconsiderado. Puede dicho con rabia o con llanto.',
    examples: [
      { jp: 'ひどい！そんなのあり？', es: '¡Eso es cruel! ¿Cómo pueden hacer eso?' },
      { jp: 'ひどすぎる、信じられない。', furigana: 'ひどすぎる、[信|しん]じられない。', es: 'Esto es demasiado cruel, no me lo creo.' },
      { jp: 'そんなひどいことを言うな。', furigana: 'そんなひどいことを[言|い]うな。', es: 'No digas cosas tan crueles.' },
    ],
  },
  {
    jp: 'ありえない',
    category: 'vocabulario',
    meaning: '«¡Imposible! / ¡Inconcebible! / ¡No puede ser!»\nLiteralmente "no puede existir/darse". Expresa que algo es completamente inaceptable o increíble. ありえなさすぎる es la versión intensificada. Aparece en todos los géneros de anime, desde comedias hasta dramas.',
    examples: [
      { jp: 'ありえない！なんで！', es: '¡Imposible! ¡¿Por qué?!' },
      { jp: 'こんなのありえない。', es: 'Algo así no puede estar pasando.' },
      { jp: 'ありえなさすぎて笑えない。', furigana: 'ありえなさすぎて[笑|わら]えない。', es: 'Es tan inconcebible que ni me hace gracia.' },
    ],
  },
  {
    jp: 'なるほど',
    category: 'vocabulario',
    meaning: '«Ya veo / Ajá / Tiene sentido»\nMuestra que se ha entendido algo o que las piezas encajan. なるほど、そういうことか = "ya veo, así que era eso". Frecuente en deducciones y explicaciones, con tono de comprensión repentina.',
    examples: [
      { jp: 'なるほど、そういうことか。', furigana: 'なるほど、そういうことか。', es: 'Ya veo, así que era eso.' },
      { jp: 'なるほど、考えたな。', furigana: 'なるほど、[考|かんが]えたな。', es: 'Vaya, lo has pensado bien.' },
      { jp: 'なるほどね、納得した。', furigana: 'なるほどね、[納得|なっとく]した。', es: 'Ajá, ahora lo entiendo.' },
    ],
  },
  {
    jp: 'やっぱり / やっぱ',
    category: 'vocabulario',
    meaning: '«Como me imaginaba / Al final / Después de todo»\nConfirma que algo coincide con lo esperado o que se vuelve a una idea previa. やっぱ es la forma corta y casual. やっぱりやめる = "al final lo dejo". Frecuentísima en reflexiones y decisiones.',
    examples: [
      { jp: 'やっぱり、お前か。', furigana: 'やっぱり、お[前|まえ]か。', es: 'Como me imaginaba: eras tú.' },
      { jp: 'やっぱりやめておく。', furigana: 'やっぱりやめておく。', es: 'Al final mejor lo dejo.' },
      { jp: 'やっぱ無理だよ。', furigana: 'やっぱ[無理|むり]だよ。', es: 'Después de todo, es imposible.' },
    ],
  },
  {
    jp: '確かに',
    reading: 'たしかに',
    category: 'vocabulario',
    meaning: '«Desde luego / Cierto / Tienes razón»\nReconoce que algo es verdad o acertado. 確かに、その通りだ = "cierto, así es". También "con seguridad" (確かに見た = "lo vi sin duda"). Frecuente al conceder un punto en una discusión o deducción.',
    examples: [
      { jp: '確かに、その通りだ。', furigana: '[確|たし]かに、その[通|とお]りだ。', es: 'Cierto, así es.' },
      { jp: '確かにこの目で見た。', furigana: '[確|たし]かにこの[目|め]で[見|み]た。', es: 'Lo vi con mis propios ojos, sin duda.' },
      { jp: '確かに強い、だが…。', furigana: '[確|たし]かに[強|つよ]い、だが…。', es: 'Es fuerte, desde luego, pero…' },
    ],
  },
  {
    jp: '仕方ない',
    reading: 'しかたない',
    category: 'vocabulario',
    meaning: '«No hay remedio / Qué le vamos a hacer / Ni modo»\nAceptación resignada de una situación sin solución. しょうがない es la variante más coloquial. Una de las expresiones más "japonesas" en términos culturales. A veces esconde emociones más profundas bajo apariencia de resignación.',
    examples: [
      { jp: '仕方ない、行くか。', furigana: '[仕方|しかた]ない、[行|い]くか。', es: 'No hay remedio, vamos.' },
      { jp: 'しょうがないな…', es: 'Qué le vamos a hacer…' },
      { jp: '仕方ないだろ、他に選択肢がない。', furigana: '[仕方|しかた]ないだろ、[他|ほか]に[選択肢|せんたくし]がない。', es: 'No hay opción, no nos queda otra.' },
    ],
  },
  {
    jp: 'まったく',
    category: 'vocabulario',
    meaning: '«De verdad… / Madre mía / Hay que ver»\nExpresión de exasperación resignada ante algo molesto. まったく、お前は… = "de verdad, contigo no puedo…". Como adverbio también significa "completamente" (まったく分からない). Frecuente en quien regaña con cariño.',
    examples: [
      { jp: 'まったく、世話が焼ける。', furigana: 'まったく、[世話|せわ]が[焼|や]ける。', es: 'De verdad, das un trabajo…' },
      { jp: 'まったく、しょうがないな。', furigana: 'まったく、しょうがないな。', es: 'Madre mía, qué remedio.' },
      { jp: 'まったく分からない。', furigana: 'まったく[分|わ]からない。', es: 'No entiendo absolutamente nada.' },
    ],
  },
  {
    jp: 'ごめん / ごめんね',
    category: 'vocabulario',
    meaning: '«Perdón / Lo siento / Perdona»\nDisculpa informal y cotidiana, más ligera que すみません. ごめんね añade cariño o suaviza; ごめんなさい es algo más formal. Frecuente entre amigos y familia, y en disculpas emotivas.',
    examples: [
      { jp: 'ごめん、遅れた。', furigana: 'ごめん、[遅|おく]れた。', es: 'Perdón, llego tarde.' },
      { jp: 'ごめんね、心配かけて。', furigana: 'ごめんね、[心配|しんぱい]かけて。', es: 'Lo siento, te hice preocupar.' },
      { jp: '本当にごめん。', furigana: '[本当|ほんとう]にごめん。', es: 'Lo siento de verdad.' },
    ],
  },
  {
    jp: 'とにかく',
    category: 'vocabulario',
    meaning: '«En fin / El caso es que / Sea como sea»\nAdverbio que deja de lado los detalles para ir a lo esencial o urgente. とにかく逃げろ = "tú huye, lo demás da igual". Frecuente para zanjar una discusión o priorizar la acción inmediata.',
    examples: [
      { jp: 'とにかく逃げろ！', furigana: 'とにかく[逃|に]げろ！', es: '¡Sea como sea, huye!' },
      { jp: 'とにかく落ち着け。', furigana: 'とにかく[落|お]ち[着|つ]け。', es: 'El caso es que te calmes.' },
      { jp: '理由はとにかく、行くぞ。', furigana: '[理由|りゆう]はとにかく、[行|い]くぞ。', es: 'Las razones aparte; vamos.' },
    ],
  },
  {
    jp: '甘い',
    reading: 'あまい',
    category: 'vocabulario',
    meaning: '«¡Qué ingenuo! / ¡Demasiado blando! / ¡Candoroso!»\nLiteralmente "dulce", pero en contexto de combate o estrategia significa "demasiado blando o ingenuo". El rival señala una debilidad táctica o de carácter. Clásico en batallas de anime donde el antagonista critica la ingenuidad del protagonista.',
    examples: [
      { jp: '甘い！', furigana: '[甘|あま]い！', es: '¡Qué ingenuo!' },
      { jp: 'その考えは甘い。', furigana: 'その[考|かんが]えは[甘|あま]い。', es: 'Ese planteamiento es demasiado candoroso.' },
      { jp: '甘いな、まだまだだ。', furigana: '[甘|あま]いな、まだまだだ。', es: 'Eso es de novato; te queda mucho camino.' },
    ],
  },
  {
    jp: 'さすが',
    category: 'vocabulario',
    meaning: '«¡Eres el mejor! / Cómo no / Típico de ti»\nReconoce que algo está a la altura de lo esperado, casi siempre como elogio admirado. さすがだな = "no esperaba menos de ti". Con に (さすがに) significa "hasta para…". Muy frecuente al alabar a un compañero o rival.',
    examples: [
      { jp: 'さすがだ、お前は強い。', furigana: 'さすがだ、お[前|まえ]は[強|つよ]い。', es: 'No esperaba menos: eres fuerte.' },
      { jp: 'さすが先輩！', furigana: 'さすが[先輩|せんぱい]！', es: '¡Así se hace, senpai!' },
      { jp: 'さすがにそれは無理だ。', furigana: 'さすがにそれは[無理|むり]だ。', es: 'Hasta para mí eso es imposible.' },
    ],
  },
  {
    jp: '黙れ',
    reading: 'だまれ',
    category: 'vocabulario',
    meaning: '«¡Cállate! / ¡Silencio! (orden directa)»\nMandato de callar extremadamente directo y agresivo. Más brusco que うるさい (que expresa molestia). 黙れ es una orden fría y autoritaria, típica de antagonistas o personajes en posición de poder.',
    examples: [
      { jp: '黙れ！', furigana: '[黙|だま]れ！', es: '¡Cállate!' },
      { jp: '黙れ、貴様には関係ない。', furigana: '[黙|だま]れ、[貴様|きさま]には[関係|かんけい]ない。', es: 'Cállate, a ti no te incumbe.' },
      { jp: '黙れと言っている！', furigana: '[黙|だま]れと[言|い]っている！', es: '¡Te estoy diciendo que te calles!' },
    ],
  },
  {
    jp: '許さない',
    reading: 'ゆるさない',
    category: 'vocabulario',
    meaning: '«No te lo perdonaré / No lo voy a tolerar»\nDeclaración de ira y resolución, una de las frases más icónicas del anime. 許さん es la variante más ruda y arcaica. Se grita ante una traición, una injusticia o el daño a un ser querido.',
    examples: [
      { jp: 'お前だけは許さない！', furigana: 'お[前|まえ]だけは[許|ゆる]さない！', es: '¡A ti no te lo perdonaré jamás!' },
      { jp: '仲間を傷つけるやつは許さない。', furigana: '[仲間|なかま]を[傷|きず]つけるやつは[許|ゆる]さない。', es: 'No perdono a quien hiere a mis compañeros.' },
      { jp: '絶対に許さんぞ。', furigana: '[絶対|ぜったい]に[許|ゆる]さんぞ。', es: 'No pienso perdonarte, te lo aseguro.' },
    ],
  },
  {
    jp: '死ね',
    reading: 'しね',
    category: 'vocabulario',
    meaning: '«¡Muérete! / ¡Vas a morir!»\nMaldición o amenaza extremadamente violenta, imperativo de 死ぬ. Marca el odio o la furia máxima; muy frecuente en villanos y en peleas a muerte. Fuera de la ficción es un insulto gravísimo.',
    examples: [
      { jp: '死ね！', furigana: '[死|し]ね！', es: '¡Muérete!' },
      { jp: 'お前なんか死ね。', furigana: 'お[前|まえ]なんか[死|し]ね。', es: 'Ojalá te murieras.' },
      { jp: '死ねっ、化け物め！', furigana: '[死|し]ねっ、[化|ば]け[物|もの]め！', es: '¡Muere, monstruo!' },
    ],
  },
  {
    jp: 'くらえ',
    category: 'vocabulario',
    meaning: '«¡Toma! / ¡Chúpate esa! / ¡Recibe esto!»\nGrito al lanzar un ataque: literalmente "trágate esto". Acompaña golpes y técnicas especiales. これでもくらえ！= "¡toma ya!". Emblemático de las escenas de combate del shonen.',
    examples: [
      { jp: 'くらえ！', furigana: 'くらえ！', es: '¡Toma esto!' },
      { jp: '必殺技をくらえ！', furigana: '[必殺技|ひっさつわざ]をくらえ！', es: '¡Recibe mi técnica final!' },
      { jp: 'これでもくらえ！', furigana: 'これでもくらえ！', es: '¡Chúpate esta!' },
    ],
  },
  {
    jp: '任せろ',
    reading: 'まかせろ',
    category: 'vocabulario',
    meaning: '«¡Déjamelo a mí! / ¡Cuenta conmigo! / ¡Yo me encargo!»\nDeclaración de que el hablante se hará cargo de la situación. Transmite confianza y sentido de responsabilidad. Muy frecuente en momentos heroicos donde el protagonista asume el control.',
    examples: [
      { jp: '俺に任せろ！', furigana: '[俺|おれ]に[任|まか]せろ！', es: '¡Déjamelo a mí!' },
      { jp: '任せろ！絶対に守ってみせる。', furigana: '[任|まか]せろ！[絶対|ぜったい]に[守|まも]ってみせる。', es: '¡Déjamelo a mí! Te protegeré sin falta.' },
      { jp: 'こっちに任せてくれ。', furigana: 'こっちに[任|まか]せてくれ。', es: 'Déjanoslo a nosotros.' },
    ],
  },
  {
    jp: '頑張れ',
    reading: 'がんばれ',
    category: 'vocabulario',
    meaning: '«¡Ánimo! / ¡Tú puedes! / ¡No te rindas!»\nAnimación a alguien para que se esfuerce o aguante. 頑張れ es imperativo (animas a otro); 頑張ります es la promesa propia. Una de las expresiones más emblemáticas del anime en momentos de clímax. Suele ir acompañada de lágrimas o gritos del equipo.',
    examples: [
      { jp: '頑張れ！絶対負けるな！', furigana: '[頑張|がんば]れ！[絶対|ぜったい][負|ま]けるな！', es: '¡Ánimo! ¡No pierdas bajo ningún concepto!' },
      { jp: '頑張ってくれ、信じてるから。', furigana: '[頑張|がんば]ってくれ、[信|しん]じてるから。', es: 'Hazlo lo mejor que puedas, confío en ti.' },
      { jp: '頑張れよ、お前ならできる。', furigana: '[頑張|がんば]れよ、お[前|まえ]ならできる。', es: '¡Venga, tú puedes con esto!' },
    ],
  },
  {
    jp: '助けて',
    reading: 'たすけて',
    category: 'vocabulario',
    meaning: '«¡Socorro! / ¡Ayúdame! / ¡Ayuda!»\nGrito de auxilio. 助けて！= "¡socorro!"; 助けてくれ es la variante masculina. Momento de máxima vulnerabilidad que suele desencadenar la entrada heroica del protagonista.',
    examples: [
      { jp: '助けて！', furigana: '[助|たす]けて！', es: '¡Socorro!' },
      { jp: '誰か助けてくれ！', furigana: '[誰|だれ]か[助|たす]けてくれ！', es: '¡Que alguien me ayude!' },
      { jp: '助けに来たぞ。', furigana: '[助|たす]けに[来|き]たぞ。', es: 'He venido a salvarte.' },
    ],
  },
  {
    jp: '嫌だ',
    reading: 'いやだ',
    category: 'vocabulario',
    meaning: '«¡No! / ¡No quiero! / ¡Me niego!»\nRechazo emocional, a veces infantil y otras desesperado. いやだ、行かないで = "no, no te vayas". Más visceral que だめ. Frecuente en escenas de pérdida, miedo o capricho; el tono va del berrinche al desgarro.',
    examples: [
      { jp: '嫌だ、行かないで！', furigana: '[嫌|いや]だ、[行|い]かないで！', es: '¡No! ¡No te vayas!' },
      { jp: '絶対に嫌だ。', furigana: '[絶対|ぜったい]に[嫌|いや]だ。', es: 'Me niego en redondo.' },
      { jp: 'もう嫌だ…！', furigana: 'もう[嫌|いや]だ…！', es: '¡Ya no puedo más…!' },
    ],
  },
  {
    jp: 'どうした',
    category: 'vocabulario',
    meaning: '«¿Qué pasa? / ¿Qué te ocurre? / ¿Y eso?»\nPregunta por lo que le sucede a alguien. どうした？= "¿qué te pasa?"; どうしたんだ suaviza o pide explicación. Frecuente al notar que un compañero está raro, herido o demasiado callado.',
    examples: [
      { jp: 'どうした、大丈夫か？', furigana: 'どうした、[大丈夫|だいじょうぶ]か？', es: '¿Qué pasa? ¿Estás bien?' },
      { jp: 'どうしたんだ、急に。', furigana: 'どうしたんだ、[急|きゅう]に。', es: '¿Y eso, así de repente?' },
      { jp: 'どうした、それだけか？', furigana: 'どうした、それだけか？', es: '¿Qué pasa, eso es todo?' },
    ],
  },
  {
    jp: 'だめ / ダメ',
    category: 'vocabulario',
    meaning: '«No / No vale / Imposible / No sirve»\nNiega permiso o posibilidad: だめだ = "no se puede / no sirve". También "estar acabado" (もうだめだ = "ya no hay nada que hacer"). Una de las negativas más frecuentes y versátiles del habla coloquial.',
    examples: [
      { jp: 'だめだ、間に合わない。', furigana: 'だめだ、[間|ま]に[合|あ]わない。', es: 'Imposible, no llegamos.' },
      { jp: '諦めちゃだめだ！', furigana: '[諦|あきら]めちゃだめだ！', es: '¡No te puedes rendir!' },
      { jp: 'もうだめだ…！', furigana: 'もうだめだ…！', es: '¡Ya no hay nada que hacer…!' },
    ],
  },
  {
    jp: '待て / 待って',
    reading: 'まて / まって',
    category: 'vocabulario',
    meaning: '«¡Espera! / ¡Para! / ¡Aguarda!»\n待て es la orden masculina y brusca; 待って es más suave o femenina (un ruego). 待ってくれ añade súplica. Frecuente para detener a alguien que se marcha o que ataca.',
    examples: [
      { jp: '待て！どこへ行く！', furigana: '[待|ま]て！どこへ[行|い]く！', es: '¡Espera! ¿Adónde vas?' },
      { jp: '待って、置いていかないで。', furigana: '[待|ま]って、[置|お]いていかないで。', es: 'Espera, no me dejes atrás.' },
      { jp: 'ちょっと待て、話を聞け。', furigana: 'ちょっと[待|ま]て、[話|はなし]を[聞|き]け。', es: 'Espera un momento, escúchame.' },
    ],
  },
  {
    jp: '来い',
    reading: 'こい',
    category: 'vocabulario',
    meaning: '«¡Ven! / ¡Acércate! / ¡A por mí!»\nImperativo brusco de 来る. かかって来い = "¡atácame!", un desafío clásico de combate. También como llamada (こっちへ来い = "ven aquí"). Exclusivamente masculino y enérgico.',
    examples: [
      { jp: 'かかって来い！', furigana: 'かかって[来|こ]い！', es: '¡Ven a por mí!' },
      { jp: 'こっちへ来い。', furigana: 'こっちへ[来|こ]い。', es: 'Ven aquí.' },
      { jp: '来い、相手になってやる。', furigana: '[来|こ]い、[相手|あいて]になってやる。', es: 'Ven, te daré pelea.' },
    ],
  },
  {
    jp: '～てやる',
    category: 'gramática',
    meaning: '«Lo haré (¡para que veas!) / Te demostraré»\nRealizar algo con determinación desafiante, para fastidiar a alguien o demostrar algo. 勝ってやる = "¡ganaré para que lo veas!". El tono puede ser vengativo, desafiante o simplemente muy decidido. Muy marcado como masculino e informal. Clásico del shonen.',
    examples: [
      { jp: '絶対に勝ってやる！', furigana: '[絶対|ぜったい]に[勝|か]ってやる！', es: '¡Voy a ganar, ya verás!' },
      { jp: 'お前を見返してやる！', furigana: 'お[前|まえ]を[見返|みかえ]してやる！', es: '¡Te demostraré que estabas equivocado!' },
      { jp: 'どんな手を使ってでも倒してやる。', furigana: 'どんな[手|て]を[使|つか]ってでも[倒|たお]してやる。', es: 'Te derrotaré cueste lo que cueste.' },
    ],
  },
  {
    jp: '～わけがない',
    category: 'gramática',
    meaning: '«No hay manera de que… / Es imposible que»\nNiega rotundamente algo desde la lógica del hablante. わけ = "razón/lógica"; がない = "no existe". 負けるわけがない = "no existe razón alguna por la que yo pierda". Más categórico que はずがない.',
    examples: [
      { jp: '俺が負けるわけがない！', furigana: '[俺|おれ]が[負|ま]けるわけがない！', es: '¡Yo no puedo perder, es imposible!' },
      { jp: 'そんなことができるわけがない。', es: 'Algo así es completamente imposible.' },
      { jp: 'お前に俺が倒せるわけがない。', furigana: 'お[前|まえ]に[俺|おれ]が[倒|たお]せるわけがない。', es: 'No hay forma de que tú puedas vencerme.' },
    ],
  },
  {
    jp: '～はずだ',
    category: 'gramática',
    meaning: '«Se supone que… / Debería (por lógica)»\nExpectativa basada en razonamiento previo, no en certeza. はず = "expectativa razonada". Si la realidad contradice el はず, el hablante queda desconcertado. Muy frecuente en deducciones y planes en anime de acción o misterio.',
    examples: [
      { jp: 'もう来ているはずだ。', furigana: 'もう[来|き]ているはずだ。', es: 'Debería haber llegado ya.' },
      { jp: 'こっちが有利なはずなのに。', furigana: 'こっちが[有利|ゆうり]なはずなのに。', es: 'Deberíamos tener ventaja, y sin embargo…' },
      { jp: 'あいつが犯人のはずがない。', furigana: 'あいつが[犯人|はんにん]のはずがない。', es: 'No puede ser que él sea el culpable.' },
    ],
  },
  {
    jp: '～つもり',
    category: 'gramática',
    meaning: '«Tengo intención de / Pienso… / Me creía que…»\nExpresa una intención firme (勝つつもりだ = "pienso ganar") o una creencia que puede no coincidir con la realidad (やったつもり = "creía haberlo hecho"). Frecuente en declaraciones de propósito y en malentendidos.',
    examples: [
      { jp: '絶対に勝つつもりだ。', furigana: '[絶対|ぜったい]に[勝|か]つつもりだ。', es: 'Tengo toda la intención de ganar.' },
      { jp: '殺すつもりか？', furigana: '[殺|ころ]すつもりか？', es: '¿Es que piensas matarme?' },
      { jp: 'やったつもりだった。', furigana: 'やったつもりだった。', es: 'Creía que lo había hecho.' },
    ],
  },
  {
    jp: '～ところだった',
    category: 'gramática',
    meaning: '«Por poco / Estuve a punto de / Casi…»\nIndica que algo estuvo a punto de ocurrir y se evitó por los pelos. 死ぬところだった = "por poco me muero". Frecuente tras un peligro esquivado, con tono de alivio o de susto.',
    examples: [
      { jp: '危ない、死ぬところだった。', furigana: '[危|あぶ]ない、[死|し]ぬところだった。', es: 'Por poco me mato.' },
      { jp: 'もう少しで負けるところだった。', furigana: 'もう[少|すこ]しで[負|ま]けるところだった。', es: 'Estuve a punto de perder.' },
      { jp: '危うく信じるところだった。', furigana: '[危|あや]うく[信|しん]じるところだった。', es: 'Casi me lo creo.' },
    ],
  },
  {
    jp: '～じゃないか',
    category: 'gramática',
    meaning: '«¡Pero si es…! / ¡Claro que…! / ¿Por qué no…?»\nReconocer algo que se acaba de descubrir o recordar. También sirve para reprochar suavemente, señalar la obviedad o proponer algo. やればできるじゃないか = "¿ves? Sí que puedes".',
    examples: [
      { jp: 'お前じゃないか！', furigana: 'お[前|まえ]じゃないか！', es: '¡Pero si eres tú! ¡Cuánto tiempo!' },
      { jp: 'やればできるじゃないか。', es: '¿Ves? Sí que eres capaz cuando quieres.' },
      { jp: '一緒に行こうじゃないか。', furigana: '[一緒|いっしょ]に[行|い]こうじゃないか。', es: '¿Por qué no vamos juntos?' },
    ],
  },
  {
    jp: '～に決まっている',
    reading: '～にきまっている',
    category: 'gramática',
    meaning: '«Está claro que… / Seguro que… (convicción personal)»\nCerteza subjetiva muy enfática basada en la intuición o lógica del hablante. 決まる = "estar decidido/claro". No es una afirmación objetiva sino la convicción personal. Frecuente en detectives, estrategas y personajes que razonan en voz alta.',
    examples: [
      { jp: 'あいつが犯人に決まっている。', furigana: 'あいつが[犯人|はんにん]に[決|き]まっている。', es: 'Ese es el culpable, tengo la certeza.' },
      { jp: 'うまくいくに決まってる！', furigana: 'うまくいくに[決|き]まってる！', es: '¡Está clarísimo que va a salir bien!' },
      { jp: 'そんなの嘘に決まってる。', furigana: 'そんなの[嘘|うそ]に[決|き]まってる。', es: 'Eso tiene que ser una mentira, seguro.' },
    ],
  },
  {
    jp: '～べきだ / ～べきじゃない',
    category: 'gramática',
    meaning: '«Debería / No debería (obligación moral)»\nExpresa obligación moral o lo que se considera correcto. べきだ = "debería (y es lo correcto)"; べきじゃない = "no debería". Más categórico y moral que ～なきゃ. Frecuente cuando un personaje juzga la conducta de otro.',
    examples: [
      { jp: 'お前が謝るべきだ。', furigana: 'お[前|まえ]が[謝|あやま]るべきだ。', es: 'Eres tú quien debería disculparse.' },
      { jp: 'そんなことするべきじゃない。', es: 'No deberías hacer algo así.' },
      { jp: '守るべき人がいる。', furigana: '[守|まも]るべき[人|ひと]がいる。', es: 'Hay personas que debo proteger.' },
    ],
  },
  {
    jp: '～しかない',
    category: 'gramática',
    meaning: '«No hay más que / Solo queda / No me queda otra»\nLimita las opciones a una sola. やるしかない = "no queda otra que hacerlo"; 信じるしかない = "solo puedo confiar". Frecuente en momentos de decisión forzada, con determinación resignada.',
    examples: [
      { jp: 'もうやるしかない！', furigana: 'もうやるしかない！', es: '¡Ya no queda otra que hacerlo!' },
      { jp: '前に進むしかない。', furigana: '[前|まえ]に[進|すす]むしかない。', es: 'Solo queda avanzar.' },
      { jp: '信じるしかないだろ。', furigana: '[信|しん]じるしかないだろ。', es: 'No nos queda más que confiar, ¿no?' },
    ],
  },
  {
    jp: '～ろ（命令形）',
    category: 'gramática',
    meaning: '«¡Haz…! (imperativo brusco)»\nForma imperativa directa y masculina del verbo: 見ろ (¡mira!), やめろ, 逃げろ, 来い. Suena tajante, autoritaria o agresiva. Omnipresente en órdenes y gritos de combate; el habla cortés y femenina la evita.',
    examples: [
      { jp: 'よく見ろ！', furigana: 'よく[見|み]ろ！', es: '¡Mira bien!' },
      { jp: '早く逃げろ！', furigana: '[早|はや]く[逃|に]げろ！', es: '¡Huye, rápido!' },
      { jp: '立て、まだ戦えるだろ。', furigana: '[立|た]て、まだ[戦|たたか]えるだろ。', es: 'Levántate, aún puedes luchar.' },
    ],
  },
  {
    jp: 'めっちゃ',
    category: 'vocabulario',
    meaning: '«Súper / Muchísimo / Increíblemente»\nIntensificador informal de origen kansai. めちゃ es la variante ligeramente más suave. Equivalente a すごく pero con más energía coloquial. Ha trascendido el dialecto kansai y hoy es de uso nacional en el registro informal.',
    examples: [
      { jp: 'めっちゃ強い！', furigana: 'めっちゃ[強|つよ]い！', es: '¡Fortísimo!' },
      { jp: 'めっちゃ好きやん！', furigana: 'めっちゃ[好|す]きやん！', es: '¡Me gusta mogollón!' },
      { jp: 'めっちゃくちゃだ。', es: 'Esto es un caos absoluto.' },
    ],
  },
  {
    jp: 'ガチ',
    category: 'vocabulario',
    meaning: '«En serio / Sin trampa / De verdad de la buena»\nDe ガチンコ (combate real sin amañar). Más coloquial y juvenil que マジ. ガチ勝負 = "combate totalmente real". Como prefijo: ガチ怖い = "de verdad da miedo". Muy extendido en el anime moderno.',
    examples: [
      { jp: 'ガチで言ってる？', es: '¿Lo dices de verdad? ¿Sin broma?' },
      { jp: 'ガチ勝負しようぜ！', furigana: 'ガチ[勝負|しょうぶ]しようぜ！', es: '¡Hagamos una lucha de verdad!' },
      { jp: 'ガチで強すぎる。', furigana: 'ガチで[強|つよ]すぎる。', es: 'En serio, es demasiado poderoso.' },
    ],
  },
  {
    jp: 'だぜ',
    category: 'partícula',
    meaning: '«(Soy/Es) [afirmación masculina enérgica]»\nCombinación de だ (cópula) + ぜ. Variante enfática e informal de だ. 俺が一番だぜ = "soy el número uno". Más cargado de personalidad que だ solo. Exclusivamente masculino e informal.',
    examples: [
      { jp: '俺が一番だぜ！', furigana: '[俺|おれ]が[一番|いちばん]だぜ！', es: '¡El número uno soy yo!' },
      { jp: 'これで終わりだぜ。', es: 'Aquí se acaba todo.' },
      { jp: '俺の勝ちだぜ！', furigana: '[俺|おれ]の[勝|か]ちだぜ！', es: '¡La victoria es mía!' },
    ],
  },
  {
    jp: 'だぞ',
    category: 'partícula',
    meaning: '«(Es/Será) [advertencia o énfasis masculino]»\nCombinación de だ + ぞ. Más amenazante y enfático que だぜ. これが最後だぞ = "es la última advertencia". Puede usarse también como énfasis amistoso entre compañeros. Siempre masculino.',
    examples: [
      { jp: 'これが最後だぞ。', furigana: 'これが[最後|さいご]だぞ。', es: 'Esta es la última vez que te lo digo.' },
      { jp: '忘れるなよ、約束だぞ。', furigana: '[忘|わす]れるなよ、[約束|やくそく]だぞ。', es: 'No lo olvides, es una promesa.' },
      { jp: '気をつけろよ、危険だぞ。', furigana: '[気|き]をつけろよ、[危険|きけん]だぞ。', es: 'Ten cuidado, es peligroso.' },
    ],
  },
  {
    jp: 'だと？',
    category: 'partícula',
    meaning: '«¿Qué? / ¿Has dicho que…?»\nRepite lo que se acaba de escuchar con total incredulidad o indignación. Típico de personajes que no pueden creer lo que oyen. 俺が負けた、だと？ = "¿que yo he perdido?". Muy dramático. Muy frecuente en clímaxes y giros de trama.',
    examples: [
      { jp: '俺が負けた、だと？', furigana: '[俺|おれ]が[負|ま]けた、だと？', es: '¿Qué has dicho? ¿Que yo he perdido?' },
      { jp: '逃げた、だと！？', furigana: '[逃|に]げた、だと！？', es: '¿Que se ha escapado?!' },
      { jp: '仲間を裏切った、だと？', furigana: '[仲間|なかま]を[裏切|うらぎ]った、だと？', es: '¿Que traicionó a sus compañeros?' },
    ],
  },
  {
    jp: 'とか',
    category: 'partícula',
    meaning: '«Cosas como… / O algo así / Por ejemplo»\nLista ejemplos de forma vaga o suaviza una afirmación dejándola imprecisa. 死ぬとか言うな = "no digas cosas como morirse". Muy coloquial; añade vaguedad o cierto desdén.',
    examples: [
      { jp: '死ぬとか言うなよ。', furigana: '[死|し]ぬとか[言|い]うなよ。', es: 'No digas eso de "me muero".' },
      { jp: '疲れたとか言ってられない。', furigana: '[疲|つか]れたとか[言|い]ってられない。', es: 'No es momento de andar diciendo que estoy cansado.' },
      { jp: '好きとか嫌いとか関係ない。', furigana: '[好|す]きとか[嫌|きら]いとか[関係|かんけい]ない。', es: 'Que si me gusta, que si no… eso da igual.' },
    ],
  },
  {
    jp: 'こそ',
    category: 'partícula',
    meaning: '«Precisamente / Esta vez sí / Justo…»\nResalta enfáticamente la palabra anterior: "es esto y no otra cosa". 今度こそ = "esta vez sí, de verdad". こちらこそ = "lo mismo digo". Frecuente en declaraciones de determinación renovada tras un fracaso.',
    examples: [
      { jp: '今度こそ勝つ！', furigana: '[今度|こんど]こそ[勝|か]つ！', es: '¡Esta vez sí que voy a ganar!' },
      { jp: '今だからこそ言える。', furigana: '[今|いま]だからこそ[言|い]える。', es: 'Justo por ser ahora, puedo decirlo.' },
      { jp: 'お前こそ強くなったな。', furigana: 'お[前|まえ]こそ[強|つよ]くなったな。', es: 'Eres tú quien se ha hecho fuerte.' },
    ],
  },
  {
    jp: 'もん / もの（文末）',
    category: 'partícula',
    meaning: '«Es que… (me justifico)»\nContraído de もの. Añade una justificación o excusa con tono infantil, defensivo o femenino. だって怖いんだもん = "es que me da miedo". Implica que el hablante siente que tiene una razón legítima aunque suene a capricho.',
    examples: [
      { jp: 'だって怖いんだもん。', furigana: 'だって[怖|こわ]いんだもん。', es: 'Es que me da miedo, ¿qué quieres que le haga?' },
      { jp: '知らないもん、そんなこと。', es: 'No lo sé, eso no es asunto mío.' },
      { jp: '好きじゃないもん！', furigana: '[好|す]きじゃないもん！', es: '¡Es que no me gusta ni nada!' },
    ],
  },
  {
    jp: 'し',
    category: 'partícula',
    meaning: '«Además… / Y también… / Y encima»\nPartícula enumerativa que lista razones o características, a menudo en serie. Cada し añade un motivo o hecho. Cuando se usa solo al final da tono de "y además eso". Frecuente en personajes que acumulan quejas o razones.',
    examples: [
      { jp: '強いし、かっこいいし。', furigana: '[強|つよ]いし、かっこいいし。', es: 'Es que es fuerte, y encima está bueno...' },
      { jp: '嘘つくし、信用できないし。', furigana: '[嘘|うそ]つくし、[信用|しんよう]できないし。', es: 'Encima miente y no se le puede confiar.' },
      { jp: 'だって怖いし、痛いし…', furigana: 'だって[怖|こわ]いし、[痛|いた]いし…', es: 'Es que da miedo, y encima duele...' },
    ],
  },
  {
    jp: 'だって',
    category: 'partícula',
    meaning: '«Es que… / Porque… / ¡Pero si incluso tú!»\nFunción dual: (1) conector causal con tono de queja o excusa ("es que…") — muy infantil o vulnerable; (2) partícula inclusiva "incluso" (お前だって = incluso tú). Muy frecuente en personajes jóvenes o en momentos de vulnerabilidad.',
    examples: [
      { jp: 'だって怖いんだもん。', furigana: 'だって[怖|こわ]いんだもん。', es: '¡Es que me da miedo!' },
      { jp: 'だって仕方ないじゃん！', furigana: 'だって[仕方|しかた]ないじゃん！', es: '¡Es que no hay otra, qué quieres que haga!' },
      { jp: 'お前だってそう思うだろ。', furigana: 'お[前|まえ]だってそう[思|おも]うだろ。', es: 'Incluso tú lo piensas, ¿verdad?' },
    ],
  },
  {
    jp: 'ったら / ってば',
    category: 'partícula',
    meaning: '«¡[Nombre]! / ¡Que te digo que! / ¡Oye!»\nSe usan para insistir o llamar la atención de alguien que no responde. ったら va tras nombres o pronombres para expresar exasperación. ってば insiste en algo ya dicho. Tono siempre irritado o desesperado.',
    examples: [
      { jp: 'もう！ったら！', es: '¡Que sí, hombre! ¡Por favor!' },
      { jp: '聞いてってば！', furigana: '[聞|き]いてってば！', es: '¡Que me escuches, te digo!' },
      { jp: '待ってってば！', furigana: '[待|ま]ってってば！', es: '¡Que esperes, por favor!' },
    ],
  },
  {
    jp: 'てめえ',
    category: 'vocabulario',
    meaning: '«¡Tú (insulto)! / ¡Maldito!»\nForma muy vulgar e insultante de "tú". Más agresivo que お前. Procede de 手前 (antiguo pronombre respetuoso degradado). Señala que la situación ha escalado severamente. En anime de acción, marca el momento en que el personaje pierde la calma.',
    examples: [
      { jp: 'てめえ、何しやがる！', es: '¡Tú, maldito, qué te crees que haces!' },
      { jp: 'てめえだけは許さない。', furigana: 'てめえだけは[許|ゆる]さない。', es: 'A ti en particular no te perdono.' },
      { jp: 'てめえが全部悪い！', furigana: 'てめえが[全部|ぜんぶ][悪|わる]い！', es: '¡La culpa es tuya, maldito!' },
    ],
  },
  {
    jp: 'うざい',
    category: 'vocabulario',
    meaning: '«¡Eres insoportable! / ¡Qué pesado!»\nForma reducida de うざったい. Expresa hartazgo e irritación profunda, más fuerte que うるさい. うざすぎ = "absolutamente insoportable". Muy coloquial y moderno. Frecuente en tsundere hacia el protagonista.',
    examples: [
      { jp: 'うざい、あっち行け！', es: '¡Eres un plomo, lárgate!' },
      { jp: 'うざすぎ、マジで。', es: 'Eres verdaderamente insoportable.' },
      { jp: 'うるさいし、うざいし！', es: '¡Eres pesado y encima insoportable!' },
    ],
  },
  {
    jp: 'なめるな',
    category: 'vocabulario',
    meaning: '«¡No me subestimes! / ¿Quién te has creído?»\nLiteralmente "no me lamas" → no me menosprecies. La forma coloquial なめんな es más agresiva. Clásico de personajes que se sienten despreciados y quieren demostrar su valía.',
    examples: [
      { jp: 'なめるな！', es: '¡No me subestimes!' },
      { jp: 'なめんな、俺を誰だと思ってる！', furigana: 'なめんな、[俺|おれ]を[誰|だれ]だと[思|おも]ってる！', es: '¡No me faltes el respeto! ¿Quién crees que soy?' },
      { jp: '子供だからってなめるな。', furigana: '[子供|こども]だからってなめるな。', es: 'No me subestimes por ser un niño.' },
    ],
  },
  {
    jp: 'ガキ',
    category: 'vocabulario',
    meaning: '«Mocoso / Crío / Renacuajo»\nForma despectiva o ruda de referirse a un niño o a alguien inmaduro. ガキのくせに = "para ser un crío…". Puede ser insultante o cariñosamente brusco. Frecuente en personajes mayores o rudos.',
    examples: [
      { jp: 'ガキは引っ込んでろ。', furigana: 'ガキは[引|ひ]っ[込|こ]んでろ。', es: 'Tú, mocoso, no te metas.' },
      { jp: 'ガキのくせに生意気だ。', furigana: 'ガキのくせに[生意気|なまいき]だ。', es: 'Para ser un crío, qué descarado.' },
      { jp: 'まだガキだな、お前は。', furigana: 'まだガキだな、お[前|まえ]は。', es: 'Sigues siendo un niño.' },
    ],
  },
  {
    jp: 'ちくしょう',
    category: 'vocabulario',
    meaning: '«¡Maldita sea! / ¡Rayos!»\nExclamación de frustración, rabia o decepción ante algo que sale mal. Menos vulgar que くそ pero más expresivo y dramático. En anime aparece en momentos de derrota o cuando algo sale inesperadamente mal.',
    examples: [
      { jp: 'ちくしょう、なんで！', es: '¡Maldita sea, por qué!' },
      { jp: 'ちくしょう…もう少しだったのに。', es: 'Rayos… me faltó tan poco.' },
      { jp: 'ちくしょう！待ってろよ！', furigana: 'ちくしょう！[待|ま]ってろよ！', es: '¡Maldición! ¡Ya me las pagarás!' },
    ],
  },
  {
    jp: '当たり前',
    reading: 'あたりまえ',
    category: 'vocabulario',
    meaning: '«¡Pues claro! / Es lo normal / Faltaría más»\nAlgo evidente o que se da por sentado. 当たり前だろ = "¡es obvio!". También "lo natural o correcto": 助けるのが当たり前. Muy frecuente en respuestas tajantes y declaraciones de principios.',
    examples: [
      { jp: '当たり前だろ！', furigana: '[当|あ]たり[前|まえ]だろ！', es: '¡Pues claro que sí!' },
      { jp: '仲間を助けるのは当たり前だ。', furigana: '[仲間|なかま]を[助|たす]けるのは[当|あ]たり[前|まえ]だ。', es: 'Ayudar a los compañeros es lo natural.' },
      { jp: 'そんなの当たり前じゃん。', furigana: 'そんなの[当|あ]たり[前|まえ]じゃん。', es: 'Eso es de cajón, ¿no?' },
    ],
  },
  {
    jp: '関係ない',
    reading: 'かんけいない',
    category: 'vocabulario',
    meaning: '«No te incumbe / No tiene nada que ver / Da igual»\nNiega cualquier relación o relevancia. お前には関係ない = "a ti no te importa". También para desmarcarse: 俺には関係ない. Frecuente en personajes que rechazan ayuda o cierran una conversación.',
    examples: [
      { jp: 'お前には関係ない。', furigana: 'お[前|まえ]には[関係|かんけい]ない。', es: 'Esto a ti no te incumbe.' },
      { jp: '過去なんて関係ない。', furigana: '[過去|かこ]なんて[関係|かんけい]ない。', es: 'El pasado da igual.' },
      { jp: '年齢は関係ないだろ。', furigana: '[年齢|ねんれい]は[関係|かんけい]ないだろ。', es: 'La edad no tiene nada que ver.' },
    ],
  },
  {
    jp: '化け物',
    reading: 'ばけもの',
    category: 'vocabulario',
    meaning: '«¡Monstruo! / ¡Aberración! / ¡Bestia!»\n化ける = transformarse; 物 = cosa. Tanto para criaturas sobrenaturales literales como para alguien con poder que supera lo humano. La reacción más común ante un rival inesperadamente poderoso. En shonen, recibir este apelativo puede ser un cumplido involuntario.',
    examples: [
      { jp: '化け物め！', furigana: '[化|ば]け[物|もの]め！', es: '¡Monstruo!' },
      { jp: 'こいつ、化け物か？', furigana: 'こいつ、[化|ば]け[物|もの]か？', es: '¿Este tío es un monstruo o qué?' },
      { jp: '化け物みたいな強さだ。', furigana: '[化|ば]け[物|もの]みたいな[強|つよ]さだ。', es: 'Tiene una fuerza de monstruo.' },
    ],
  },
  {
    jp: '仲間',
    reading: 'なかま',
    category: 'vocabulario',
    meaning: '«Compañeros / Los míos / El equipo»\nPersonas con quienes compartes un camino y un propósito. En el anime shonen este concepto es casi sagrado: la razón de luchar, el valor del grupo. 仲間を守る = proteger a los compañeros. 仲間じゃない = negación devastadora de pertenencia.',
    examples: [
      { jp: '仲間は絶対に守る！', furigana: '[仲間|なかま]は[絶対|ぜったい]に[守|まも]る！', es: '¡A mis compañeros los protejo cueste lo que cueste!' },
      { jp: '俺たちは仲間だろ！', furigana: '[俺|おれ]たちは[仲間|なかま]だろ！', es: '¡Somos compañeros, ¿no?!' },
      { jp: '仲間を傷つけるやつは許さない。', furigana: '[仲間|なかま]を[傷|きず]つけるやつは[許|ゆる]さない。', es: 'Quien lastime a mis compañeros no será perdonado.' },
    ],
  },
  {
    jp: '最強',
    reading: 'さいきょう',
    category: 'vocabulario',
    meaning: '«El más fuerte / Invencible / El absoluto»\n最 (máximo) + 強 (fuerza). El objetivo final del antagonista y la descripción del rival más poderoso. En anime shonen el protagonista suele alcanzar la 最強 al final. 俺が最強だ = declaración de dominio total.',
    examples: [
      { jp: '俺が最強だ！', furigana: '[俺|おれ]が[最強|さいきょう]だ！', es: '¡El más fuerte soy yo!' },
      { jp: '最強の敵が現れた。', furigana: '[最強|さいきょう]の[敵|てき]が[現|あらわ]れた。', es: 'Ha aparecido el enemigo más poderoso.' },
      { jp: 'まだまだ最強には程遠い。', furigana: 'まだまだ[最強|さいきょう]には[程遠|ほどとお]い。', es: 'Todavía estoy muy lejos de ser el más fuerte.' },
    ],
  },
  {
    jp: '全力',
    reading: 'ぜんりょく',
    category: 'vocabulario',
    meaning: '«Con todas las fuerzas / Al máximo / Sin reservas»\n全 (total) + 力 (fuerza). 全力で = "con todo lo que tengo". 全力を出す = "sacar todas las fuerzas". El sinónimo de esfuerzo absoluto. Opuesto de 手加減 (contenerse). En batallas climáticas siempre aparece.',
    examples: [
      { jp: '全力でかかってこい！', furigana: '[全力|ぜんりょく]でかかってこい！', es: '¡Atácame con todo lo que tienes!' },
      { jp: '全力で戦う！', furigana: '[全力|ぜんりょく]で[戦|たたか]う！', es: '¡Voy a luchar con todas mis fuerzas!' },
      { jp: '全力を出してもまだ足りない。', furigana: '[全力|ぜんりょく]を[出|だ]してもまだ[足|た]りない。', es: 'Ni con todo mi poder es suficiente.' },
    ],
  },
  {
    jp: 'ヤツ',
    category: 'vocabulario',
    meaning: '«Tipo / Fulano / Ese»\nPalabra informal para referirse a una persona (especialmente a terceros). En singular (あのヤツ) puede ser neutral o ligeramente despectivo. En anime sirve para referirse a rivales o personas sin nombrarlas directamente.',
    examples: [
      { jp: 'あのヤツ、強い。', furigana: 'あのヤツ、[強|つよ]い。', es: 'Ese tipo es fuerte.' },
      { jp: 'ヤツは何者だ？', furigana: 'ヤツは[何者|なにもの]だ？', es: '¿Quién demonios es ese?' },
      { jp: 'いいヤツじゃないか。', es: 'No parece mal tipo, la verdad.' },
    ],
  },
  {
    jp: '別に',
    reading: 'べつに',
    category: 'vocabulario',
    meaning: '«En realidad no / Da igual / Qué va»\n"Nada en particular / no especialmente". A menudo dicho por personajes tsundere para negar que les importa algo cuando sí les importa. 別に～わけじゃない es el clásico tsundere. También puede expresar indiferencia genuina.',
    examples: [
      { jp: '別に、お前のことなんか心配してないし！', furigana: '[別|べつ]に、お[前|まえ]のことなんか[心配|しんぱい]してないし！', es: '¡No es que me preocupara por ti ni nada!' },
      { jp: '別にいいよ、どうでも。', furigana: '[別|べつ]にいいよ、どうでも。', es: 'Me da igual, en serio.' },
      { jp: '別に…好きなわけじゃないから。', furigana: '[別|べつ]に…[好|す]きなわけじゃないから。', es: 'No es que me gustes ni nada...' },
    ],
  },
  {
    jp: '覚えてろ',
    reading: 'おぼえてろ',
    category: 'vocabulario',
    meaning: '«¡Me las pagarás! / ¡Ya te acordarás de esto!»\nAmenaza clásica del que se retira derrotado pero promete venganza. 覚えてろよ = "no lo olvidaré… y tú tampoco". Frase emblemática del villano o matón que huye, casi siempre al batirse en retirada.',
    examples: [
      { jp: '覚えてろ！', furigana: '[覚|おぼ]えてろ！', es: '¡Me las pagarás!' },
      { jp: '今日のこと、覚えてろよ。', furigana: '[今日|きょう]のこと、[覚|おぼ]えてろよ。', es: 'Te acordarás de lo de hoy.' },
      { jp: '覚えてろ、次は容赦しない。', furigana: '[覚|おぼ]えてろ、[次|つぎ]は[容赦|ようしゃ]しない。', es: 'Recuérdalo: la próxima no habrá piedad.' },
    ],
  },
  {
    jp: '容赦しない',
    reading: 'ようしゃしない',
    category: 'vocabulario',
    meaning: '«No tendré piedad / Sin contemplaciones»\n容赦 = clemencia. 容赦しない = "no perdonaré, iré con todo"; 容赦なく = "sin piedad". Frecuente antes de un ataque serio o como advertencia de que ya no habrá contención.',
    examples: [
      { jp: '次は容赦しない。', furigana: '[次|つぎ]は[容赦|ようしゃ]しない。', es: 'La próxima vez no habrá piedad.' },
      { jp: '敵には容赦しない。', furigana: '[敵|てき]には[容赦|ようしゃ]しない。', es: 'Con el enemigo no tengo clemencia.' },
      { jp: '容赦なく叩きのめす。', furigana: '[容赦|ようしゃ]なく[叩|たた]きのめす。', es: 'Te haré pedazos sin contemplaciones.' },
    ],
  },
  {
    jp: 'どけ',
    category: 'vocabulario',
    meaning: '«¡Quítate! / ¡Apártate! / ¡Fuera de mi camino!»\nOrden brusca de apartarse, imperativo de どく. Tono agresivo o urgente. Frecuente cuando un personaje avanza decidido y alguien se interpone en su camino.',
    examples: [
      { jp: 'どけ！邪魔だ。', furigana: 'どけ！[邪魔|じゃま]だ。', es: '¡Quítate! Estorbas.' },
      { jp: 'そこをどけ。', furigana: 'そこをどけ。', es: 'Apártate de ahí.' },
      { jp: 'どけ、俺がやる。', furigana: 'どけ、[俺|おれ]がやる。', es: 'Aparta, ya lo hago yo.' },
    ],
  },
  {
    jp: 'させない',
    category: 'vocabulario',
    meaning: '«No te lo permitiré / No voy a dejar que…»\nCausativo negativo de する: "no dejaré que pase / que lo hagas". そんなことはさせない = "no permitiré algo así". Declaración heroica de frustrar el plan del enemigo, frecuente en intervenciones decisivas.',
    examples: [
      { jp: 'そんなことはさせない！', furigana: 'そんなことはさせない！', es: '¡No permitiré algo así!' },
      { jp: '好きにはさせない。', furigana: '[好|す]きにはさせない。', es: 'No te dejaré hacer lo que quieras.' },
      { jp: '誰にも邪魔させない。', furigana: '[誰|だれ]にも[邪魔|じゃま]させない。', es: 'No dejaré que nadie estorbe.' },
    ],
  },
  {
    jp: '二度と',
    reading: 'にどと',
    category: 'vocabulario',
    meaning: '«Nunca más / Jamás otra vez»\n二度 (dos veces) + と; siempre acompaña a un verbo negativo. 二度と会わない = "no volveré a verte". Refuerza una ruptura o un juramento definitivo. Frecuente en despedidas dramáticas y promesas.',
    examples: [
      { jp: '二度と来るな！', furigana: '[二度|にど]と[来|く]るな！', es: '¡No vuelvas nunca más!' },
      { jp: '二度と間違えない。', furigana: '[二度|にど]と[間違|まちが]えない。', es: 'No me equivocaré jamás otra vez.' },
      { jp: '二度とお前を離さない。', furigana: '[二度|にど]とお[前|まえ]を[離|はな]さない。', es: 'Nunca más te dejaré ir.' },
    ],
  },
  {
    jp: '卑怯',
    reading: 'ひきょう',
    category: 'vocabulario',
    meaning: '«¡Cobarde! / ¡Eso es jugar sucio!»\n卑怯 = vil, rastrero, sin honor. Reproche clásico cuando el rival usa trucos o ataca por la espalda. 卑怯者 = "cobarde". Concepto central en el código de honor del anime de acción.',
    examples: [
      { jp: '卑怯だぞ！', furigana: '[卑怯|ひきょう]だぞ！', es: '¡Eso es jugar sucio!' },
      { jp: '卑怯者め！', furigana: '[卑怯|ひきょう][者|もの]め！', es: '¡Maldito cobarde!' },
      { jp: '卑怯な手を使うな。', furigana: '[卑怯|ひきょう]な[手|て]を[使|つか]うな。', es: 'No recurras a artimañas.' },
    ],
  },
  {
    jp: '構わない',
    reading: 'かまわない',
    category: 'vocabulario',
    meaning: '«No me importa / Da igual / Adelante»\n構う = preocuparse por / hacer caso. 構わない = "no me importa, no pasa nada"; 私に構うな = "no te preocupes por mí". Frecuente al aceptar un riesgo o al rechazar la ayuda de otros.',
    examples: [
      { jp: '死んでも構わない。', furigana: '[死|し]んでも[構|かま]わない。', es: 'No me importa morir.' },
      { jp: '俺のことは構うな。', furigana: '[俺|おれ]のことは[構|かま]うな。', es: 'No te preocupes por mí.' },
      { jp: '構わない、続けろ。', furigana: '[構|かま]わない、[続|つづ]けろ。', es: 'No pasa nada, continúa.' },
    ],
  },
  {
    jp: 'ふざけるな',
    category: 'vocabulario',
    meaning: '«¡Para ya! / ¡Deja de bromear! / ¡Esto no tiene gracia!»\nExpresa enfado ante algo inaceptable o que parece una burla. ふざけんな es la versión más colérica y contraída. Se usa cuando alguien actúa de forma irresponsable o cuando algo parece una broma de mal gusto.',
    examples: [
      { jp: 'ふざけるな！', es: '¡Para de una vez!' },
      { jp: 'ふざけんな、本気で言ってるのか！', furigana: 'ふざけんな、[本気|ほんき]で[言|い]ってるのか！', es: '¡Corta ya! ¿De verdad lo dices en serio?' },
      { jp: 'ふざけるな、これは遊びじゃない！', furigana: 'ふざけるな、これは[遊|あそ]びじゃない！', es: '¡Para el juego! ¡Esto no es broma!' },
    ],
  },
  {
    jp: 'いい加減にしろ',
    reading: 'いいかげんにしろ',
    category: 'vocabulario',
    meaning: '«¡Ya basta! / ¡Para de una vez! / ¡Que te estás pasando!»\nExpresión de hartazgo absoluto ante un comportamiento que ha durado demasiado. Indica que el hablante ha llegado al límite de su paciencia. いい加減にして es la versión más suave.',
    examples: [
      { jp: 'いい加減にしろ！', furigana: 'いい[加減|かげん]にしろ！', es: '¡Ya está bien! ¡Hasta aquí!' },
      { jp: 'もういい加減にして。', furigana: 'もういい[加減|かげん]にして。', es: 'Por favor, para de una vez.' },
      { jp: 'いい加減にしろよ、うんざりだ。', furigana: 'いい[加減|かげん]にしろよ、うんざりだ。', es: 'Ya basta, estoy harto.' },
    ],
  },
  {
    jp: '気にするな',
    reading: 'きにするな',
    category: 'vocabulario',
    meaning: '«No te preocupes / No le des vueltas / Olvídalo»\nConsuelo o consejo para que alguien no se tome algo a pecho. 気にすんな es la contracción coloquial. Frecuente tras errores o fracasos del protagonista cuando un compañero intenta reconfortarle.',
    examples: [
      { jp: '気にするな、次があるから。', furigana: '[気|き]にするな、[次|つぎ]があるから。', es: 'No te preocupes, habrá una próxima vez.' },
      { jp: 'そんなこと気にするな。', furigana: 'そんなこと[気|き]にするな。', es: 'No le des vueltas a eso.' },
      { jp: '気にするな、俺がいる。', furigana: '[気|き]にするな、[俺|おれ]がいる。', es: 'No te preocupes, aquí estoy yo.' },
    ],
  },
  {
    jp: 'すまない / すまん',
    category: 'vocabulario',
    meaning: '«Lo siento / Perdona (registro masculino)»\nPetición de disculpa masculina e informal. Más directa y menos elaborada que ごめんなさい. すまん es la versión aún más coloquial, típica de hombres de pocas palabras. Frecuente en personajes que admiten sus errores sin ser expresivos.',
    examples: [
      { jp: 'すまない、俺のせいだ。', furigana: 'すまない、[俺|おれ]のせいだ。', es: 'Lo siento, fue culpa mía.' },
      { jp: 'すまん、待たせた。', furigana: 'すまん、[待|ま]たせた。', es: 'Perdona, te hice esperar.' },
      { jp: 'すまなかった…守れなかった。', furigana: 'すまなかった…[守|まも]れなかった。', es: 'Lo siento tanto… no pude protegerte.' },
    ],
  },
  {
    jp: '冗談',
    reading: 'じょうだん',
    category: 'vocabulario',
    meaning: '«¡Es broma! / ¡No puede ser en serio!»\n冗談だろ！= "¡Es broma, verdad!". 冗談じゃない = "¡No es ninguna broma!". Frecuente en momentos de revelación dramática o sorpresa extrema ante algo que parece absurdo.',
    examples: [
      { jp: '冗談だろ！？', furigana: '[冗談|じょうだん]だろ！？', es: '¡Es una broma, verdad?!' },
      { jp: '冗談じゃない！本気だ！', furigana: '[冗談|じょうだん]じゃない！[本気|ほんき]だ！', es: '¡No es ninguna broma! ¡Hablo en serio!' },
      { jp: '冗談にしてもひどすぎる。', furigana: '[冗談|じょうだん]にしてもひどすぎる。', es: 'Incluso como broma, eso es una crueldad.' },
    ],
  },
  {
    jp: '諦めるな',
    reading: 'あきらめるな',
    category: 'vocabulario',
    meaning: '«¡No te rindas! / ¡Sigue adelante!»\nOrden directa de no abandonar la lucha o el esfuerzo. Una de las frases más emblemáticas del anime shonen. Puede ser gritado por el protagonista o por sus compañeros en el momento de máxima dificultad.',
    examples: [
      { jp: '諦めるな！まだ終わってない！', furigana: '[諦|あきら]めるな！まだ[終|お]わってない！', es: '¡No te rindas! ¡Aún no ha acabado!' },
      { jp: '絶対に諦めるな！', furigana: '[絶対|ぜったい]に[諦|あきら]めるな！', es: '¡No te rindas bajo ningún concepto!' },
      { jp: '諦めないでくれ、まだ間に合う。', furigana: '[諦|あきら]めないでくれ、まだ[間|ま]に[合|あ]う。', es: 'No lo dejes, aún estamos a tiempo.' },
    ],
  },
  {
    jp: '逃げるな',
    reading: 'にげるな',
    category: 'vocabulario',
    meaning: '«¡No huyas! / ¡Enfrenta las cosas!»\nOrden de no abandonar o enfrentarse a la realidad. Puede ser literal (en combate) o figurado (afrontar responsabilidades o miedos). Muy frecuente en anime de acción y de desarrollo de personaje.',
    examples: [
      { jp: '逃げるな！戦え！', furigana: '[逃|に]げるな！[戦|たたか]え！', es: '¡No huyas! ¡Lucha!' },
      { jp: '現実から逃げるな。', furigana: '[現実|げんじつ]から[逃|に]げるな。', es: 'No huyas de la realidad.' },
      { jp: '逃げるな、向き合え。', furigana: '[逃|に]げるな、[向|む]き[合|あ]え。', es: 'No huyas; enfréntate a ello.' },
    ],
  },
  {
    jp: 'ちゃんと',
    category: 'vocabulario',
    meaning: '«Como es debido / Bien / Correctamente»\nAdverbio que indica hacerlo bien, de forma correcta o responsable. Contiene una implicación de que sin ちゃんと las cosas se harían mal. ちゃんとしろ = "compórtate bien / haz las cosas en serio". Muy coloquial y frecuente en regaños.',
    examples: [
      { jp: 'ちゃんと食べろ。', furigana: 'ちゃんと[食|た]べろ。', es: 'Come bien, como es debido.' },
      { jp: 'ちゃんと話せ！', furigana: 'ちゃんと[話|はな]せ！', es: '¡Habla claro, de una vez!' },
      { jp: 'ちゃんとしてくれ、頼む。', furigana: 'ちゃんとしてくれ、[頼|たの]む。', es: 'Por favor, compórtate como es debido.' },
    ],
  },
  {
    jp: '嘘つき',
    reading: 'うそつき',
    category: 'vocabulario',
    meaning: '«¡Mentiroso! / ¡Embustero!»\nInsulto directo que acusa a alguien de mentir. Más enfático que 嘘をつくな (no mientas). Muy dramático cuando se grita con emoción. Frecuente en momentos de traición o revelación de secretos, a menudo acompañado de llanto.',
    examples: [
      { jp: '嘘つき！', furigana: '[嘘|うそ]つき！', es: '¡Mentiroso!' },
      { jp: '嘘つき、信じてたのに！', furigana: '[嘘|うそ]つき、[信|しん]じてたのに！', es: '¡Mentiroso! ¡Confiaba en ti!' },
      { jp: '嘘つきは嫌いだ。', furigana: '[嘘|うそ]つきは[嫌|きら]いだ。', es: 'No soporto a los mentirosos.' },
    ],
  },
  {
    jp: '～ものか',
    category: 'gramática',
    meaning: '«¡Ni hablar! / ¡De ninguna manera! / ¿Acaso yo haría eso?»\nNegación retórica muy fuerte. Es una pregunta retórica que se responde sola: "¿acaso (lo haría)?". 負けるものか = "¿yo perder? ¡jamás!". Más formal que ～てたまるか pero igualmente enfático.',
    examples: [
      { jp: '負けるものか！', furigana: '[負|ま]けるものか！', es: '¿Yo perder? ¡Jamás!' },
      { jp: '死ぬものか、まだやることがある。', furigana: '[死|し]ぬものか、まだやることがある。', es: '¿Morir yo? Todavía me queda por hacer.' },
      { jp: '諦めるものか！', furigana: '[諦|あきら]めるものか！', es: '¡Ni en sueños me rindo!' },
    ],
  },
  {
    jp: '～くせに',
    category: 'gramática',
    meaning: '«Para lo que eres / Siendo solo… / Y encima»\nReprocha una contradicción con tono despectivo. 子供のくせに = "siendo un crío y actuando así". Siempre implica crítica o menosprecio. Uno de los sufijos más dañinos emocionalmente del japonés coloquial.',
    examples: [
      { jp: '子供のくせに生意気だ！', furigana: '[子供|こども]のくせに[生意気|なまいき]だ！', es: 'Para ser un crío, qué arrogante.' },
      { jp: '弱いくせに偉そうに。', furigana: '[弱|よわ]いくせに[偉|えら]そうに。', es: 'Siendo tan débil y dándose tanto aire.' },
      { jp: '知らないくせに口出すな。', furigana: '[知|し]らないくせに[口出|くちだ]すな。', es: 'No te metas, que no sabes nada.' },
    ],
  },
  {
    jp: '～てみせる',
    category: 'gramática',
    meaning: '«Te voy a demostrar que… / Lo haré delante de todos»\nDeclaración pública de que se logrará algo ante testigos. Añade la idea de demostración hacia alguien. 勝ってみせる = "ganaré y te lo demostraré". Más fuerte que ～てやる porque implica un receptor del logro.',
    examples: [
      { jp: '絶対に勝ってみせる！', furigana: '[絶対|ぜったい]に[勝|か]ってみせる！', es: '¡Ganaré y te lo voy a demostrar!' },
      { jp: '俺が守ってみせる！', furigana: '[俺|おれ]が[守|まも]ってみせる！', es: '¡Seré yo quien te proteja, ya lo verás!' },
      { jp: '強くなってみせる！', furigana: '[強|つよ]くなってみせる！', es: '¡Me voy a volver fuerte, te lo juro!' },
    ],
  },
  {
    jp: '～に違いない',
    reading: '～にちがいない',
    category: 'gramática',
    meaning: '«Sin duda… / Seguro que… (convicción deductiva)»\nConvicción basada en indicios, más fuerte que はずだ. 違いない = "no puede ser incorrecto". Típico del detective o del personaje que hace deducciones en voz alta. Muy frecuente en anime de misterio y thrillers.',
    examples: [
      { jp: 'あいつが犯人に違いない。', furigana: 'あいつが[犯人|はんにん]に[違|ちが]いない。', es: 'Sin duda ese es el culpable.' },
      { jp: '罠に違いない、気をつけろ。', furigana: '[罠|わな]に[違|ちが]いない、[気|き]をつけろ。', es: 'Seguro que es una trampa, cuidado.' },
      { jp: 'あそこに隠れているに違いない。', furigana: 'あそこに[隠|かく]れているに[違|ちが]いない。', es: 'Sin duda se está escondiendo ahí.' },
    ],
  },
  {
    jp: '～せいで',
    category: 'gramática',
    meaning: '«Por culpa de / Debido a (negativo)»\nAtribuye un resultado negativo a una causa, con reproche. お前のせいだ = "es culpa tuya". Opuesto de おかげで (gracias a). Muy frecuente en escenas de acusación o de lamento.',
    examples: [
      { jp: '油断したせいで負けた。', furigana: '[油断|ゆだん]したせいで[負|ま]けた。', es: 'Perdí por confiarme.' },
      { jp: 'お前のせいだ！', furigana: 'お[前|まえ]のせいだ！', es: '¡Es culpa tuya!' },
      { jp: '俺のせいで、みんなが…。', furigana: '[俺|おれ]のせいで、みんなが…。', es: 'Por mi culpa, todos…' },
    ],
  },
  {
    jp: '～ようとする',
    category: 'gramática',
    meaning: '«Intentar / Tratar de / Estar a punto de»\nExpresa el intento o el inicio inminente de una acción. 逃げようとする = "intentar huir". Frecuente para describir esfuerzos o acciones interrumpidas en pleno desarrollo.',
    examples: [
      { jp: '逃げようとする者は逃がさない。', furigana: '[逃|に]げようとする[者|もの]は[逃|に]がさない。', es: 'A quien intente huir no lo dejaré escapar.' },
      { jp: '立ち上がろうとした。', furigana: '[立|た]ち[上|あ]がろうとした。', es: 'Intentó ponerse en pie.' },
      { jp: '何をしようとしている？', furigana: '[何|なに]をしようとしている？', es: '¿Qué es lo que intentas hacer?' },
    ],
  },
  {
    jp: '～ずに',
    category: 'gramática',
    meaning: '«Sin (hacer)… / En vez de»\nForma negativa adverbial: 何も言わずに = "sin decir nada". Más formal y literaria que ～ないで. 諦めずに = "sin rendirse". Frecuente en narración y al describir cómo se actúa (o se deja de actuar).',
    examples: [
      { jp: '何も言わずに去った。', furigana: '[何|なに]も[言|い]わずに[去|さ]った。', es: 'Se marchó sin decir nada.' },
      { jp: '諦めずに戦え。', furigana: '[諦|あきら]めずに[戦|たたか]え。', es: 'Lucha sin rendirte.' },
      { jp: '振り向かずに走った。', furigana: '[振|ふ]り[向|む]かずに[走|はし]った。', es: 'Corrió sin mirar atrás.' },
    ],
  },
  {
    jp: '～さえ',
    category: 'gramática',
    meaning: '«Ni siquiera / Incluso / Con tal de que»\nResalta un caso extremo (名前さえ知らない = "ni siquiera sé su nombre") o, con ～さえ～ば, una única condición suficiente (君さえいれば = "con que estés tú, basta"). Frecuente en momentos emotivos o de carencia.',
    examples: [
      { jp: '名前さえ知らない。', furigana: '[名前|なまえ]さえ[知|し]らない。', es: 'Ni siquiera sé su nombre.' },
      { jp: '君さえいればいい。', furigana: '[君|きみ]さえいればいい。', es: 'Con que estés tú, me basta.' },
      { jp: '立つことさえできない。', furigana: '[立|た]つことさえできない。', es: 'Ni siquiera puedo ponerme en pie.' },
    ],
  },
  {
    jp: '～っていうか',
    category: 'gramática',
    meaning: '«O sea / Más bien / Es que…»\nCorrector o matizador coloquial de lo que se acaba de decir o pensar. というか es la forma estándar; っていうか es la versión informal. Muy frecuente en el habla espontánea de anime contemporáneo para reformular o aclarar.',
    examples: [
      { jp: 'すごいっていうか、ヤバい。', es: 'O sea, increíble, o más bien brutal.' },
      { jp: '怖いっていうか、信じられない。', furigana: '[怖|こわ]いっていうか、[信|しん]じられない。', es: 'O sea, no es que dé miedo… es que no me lo creo.' },
      { jp: 'っていうか、それ本当？', furigana: 'っていうか、それ[本当|ほんとう]？', es: 'O sea, ¿eso es verdad?' },
    ],
  },
  {
    jp: '～ても',
    category: 'gramática',
    meaning: '«Aunque / Incluso si… / Pase lo que pase»\nCondicional concesivo: "aunque X ocurra / incluso si X". 死んでも = "aunque muera". Muy frecuente en declaraciones de determinación absoluta. Se combina con 何があっても (pase lo que pase) o 誰が来ても (venga quien venga).',
    examples: [
      { jp: '死んでも諦めない！', furigana: '[死|し]んでも[諦|あきら]めない！', es: '¡Aunque muera, no me rindo!' },
      { jp: 'どうなっても守ってみせる。', furigana: 'どうなっても[守|まも]ってみせる。', es: 'Pase lo que pase, te protegeré.' },
      { jp: '何があっても一緒にいる。', furigana: '[何|なに]があっても[一緒|いっしょ]にいる。', es: 'Pase lo que pase, estaré a tu lado.' },
    ],
  },
  {
    jp: '～たって',
    category: 'gramática',
    meaning: '«Aunque… / Por más que… (coloquial)»\nVersión coloquial de ～ても. 泣いたって何も変わらない = "aunque llores, nada cambia". Muy frecuente en el habla informal del anime para expresar resignación o desafío.',
    examples: [
      { jp: '泣いたって何も変わらない。', furigana: '[泣|な]いたって[何|なに]も[変|か]わらない。', es: 'Por mucho que llores, nada cambia.' },
      { jp: '謝ったって遅い。', furigana: '[謝|あやま]ったって[遅|おそ]い。', es: 'Aunque te disculpes, ya es tarde.' },
      { jp: '何回やったって同じだ。', furigana: '[何回|なんかい]やったって[同|おな]じだ。', es: 'Lo intentes las veces que lo intentes, es igual.' },
    ],
  },
  {
    jp: '～なんて',
    category: 'gramática',
    meaning: '«Que… (incredulidad) / Algo como… / Alguien como»\nExpresa incredulidad, desprecio o sorpresa ante algo. お前が負けるなんて = "que tú hayas perdido (es increíble)". También minimiza: 俺なんて = "alguien como yo (insignificante)". Muy versátil y presente en todo tipo de anime.',
    examples: [
      { jp: 'お前が負けるなんて信じられない。', furigana: 'お[前|まえ]が[負|ま]けるなんて[信|しん]じられない。', es: 'No me puedo creer que tú hayas perdido.' },
      { jp: '泣くなんて思わなかった。', furigana: '[泣|な]くなんて[思|おも]わなかった。', es: 'Nunca pensé que fueras a llorar.' },
      { jp: '俺なんてどうせ関係ない。', furigana: '[俺|おれ]なんてどうせ[関係|かんけい]ない。', es: 'Total, alguien como yo no importa de todas formas.' },
    ],
  },
  {
    jp: '～どころか',
    category: 'gramática',
    meaning: '«Lejos de… / Ni mucho menos / Al contrario»\nNiega una expectativa y la lleva al extremo opuesto. 勝つどころか手も足も出ない = "lejos de ganar, no puedo ni moverme". Enfatiza un contraste fuerte entre lo esperado y la realidad.',
    examples: [
      { jp: '勝つどころか、手も足も出ない。', furigana: '[勝|か]つどころか、[手|て]も[足|あし]も[出|で]ない。', es: 'Lejos de ganar, no puedo ni moverme.' },
      { jp: '休むどころじゃない。', furigana: '[休|やす]むどころじゃない。', es: 'No estoy para descansos, ni mucho menos.' },
      { jp: '感謝どころか、恨まれた。', furigana: '[感謝|かんしゃ]どころか、[恨|うら]まれた。', es: 'En vez de agradecérmelo, me guardó rencor.' },
    ],
  },
  {
    jp: '～きれない',
    category: 'gramática',
    meaning: '«No poder del todo / No dar abasto para»\nDe ～きる (hacer algo por completo); ～きれない = "no poder terminar o aguantar del todo". 信じきれない = "no acabo de creérmelo"; 数えきれない = "innumerables". Expresa que algo desborda la capacidad.',
    examples: [
      { jp: '信じきれない。', furigana: '[信|しん]じきれない。', es: 'No acabo de creérmelo.' },
      { jp: '数えきれないほどの敵だ。', furigana: '[数|かぞ]えきれないほどの[敵|てき]だ。', es: 'Son enemigos incontables.' },
      { jp: '守りきれなかった。', furigana: '[守|まも]りきれなかった。', es: 'No pude protegerlo del todo.' },
    ],
  },
  {
    jp: '～とは',
    category: 'gramática',
    meaning: '«¡Quién iba a pensar que…! / Eso de…»\nExpresa asombro o indignación ante algo inesperado (まさか負けるとは = "jamás pensé que perdería"). También define o cita un término (友情とは = "lo que es la amistad"). Frecuente en exclamaciones dramáticas y sentencias reflexivas.',
    examples: [
      { jp: 'まさか負けるとは。', furigana: 'まさか[負|ま]けるとは。', es: 'Jamás pensé que perdería.' },
      { jp: 'お前が裏切るとは。', furigana: 'お[前|まえ]が[裏切|うらぎ]るとは。', es: 'Que tú me traicionaras…' },
      { jp: '強さとは何かを学んだ。', furigana: '[強|つよ]さとは[何|なに]かを[学|まな]んだ。', es: 'Aprendí qué es la verdadera fuerza.' },
    ],
  },
  {
    jp: '～から（文末）',
    category: 'gramática',
    meaning: '«…porque / …te lo prometo / …confía en mí»\nから al final de frase da una razón o promesa implícita sin desarrollarla. 大丈夫だから = "estarás bien (confía en mí)". 俺がいるから = "no te preocupes, estoy yo". Muy efectivo emocionalmente en escenas de consuelo o promesas.',
    examples: [
      { jp: '大丈夫だから。', furigana: '[大丈夫|だいじょうぶ]だから。', es: 'Estarás bien, de verdad.' },
      { jp: '俺がいるから怖くない。', furigana: '[俺|おれ]がいるから[怖|こわ]くない。', es: 'No tienes miedo; estoy yo aquí.' },
      { jp: '諦めないでくれ、必ず助けるから。', furigana: '[諦|あきら]めないでくれ、[必|かなら]ず[助|たす]けるから。', es: 'No lo dejes, seguro que te salvo.' },
    ],
  },
  {
    jp: '～てはいられない',
    category: 'gramática',
    meaning: '«No puedo quedarme así / No me puedo permitir seguir»\nIndica que la situación obliga a actuar: no es posible continuar en el mismo estado pasivo. 泣いてはいられない = "no puedo quedarme llorando". Expresa urgencia y determinación de pasar a la acción.',
    examples: [
      { jp: '泣いてはいられない！行くぞ！', furigana: '[泣|な]いてはいられない！[行|い]くぞ！', es: '¡No puedo quedarme llorando! ¡Vamos!' },
      { jp: 'こうしてはいられない。', es: 'No me puedo quedar aquí parado.' },
      { jp: '落ち込んでばかりはいられない。', furigana: '[落|お]ち[込|こ]んでばかりはいられない。', es: 'No me puedo permitir seguir deprimido.' },
    ],
  },
  {
    jp: '～そうだ（様態）',
    category: 'gramática',
    meaning: '«Parece que… / Tiene pinta de… (observación directa)»\nSufijo que expresa apariencia basada en la observación inmediata. 強そう = "parece fuerte (lo veo ahora)". Diferente de らしい (basado en información externa). Muy frecuente al evaluar rivales o describir situaciones.',
    examples: [
      { jp: '強そうなやつだ。', furigana: '[強|つよ]そうなやつだ。', es: 'Ese tipo tiene pinta de ser fuerte.' },
      { jp: 'これ、やばそう。', es: 'Esto pinta muy mal.' },
      { jp: '勝てそうもない…', furigana: '[勝|か]てそうもない…', es: 'No parece que vaya a poder ganar…' },
    ],
  },
  {
    jp: '～やがる',
    category: 'gramática',
    meaning: '«Ese maldito [verbo] / Cómo se atreve a…»\nSufijo verbal despectivo que añade rabia o desprecio hacia quien realiza la acción. 逃げやがった = "se ha escapado el muy…". Exclusivamente masculino y coloquial. Muy frecuente en personajes airados. Nunca en habla formal.',
    examples: [
      { jp: '逃げやがった！', furigana: '[逃|に]げやがった！', es: '¡Se ha escapado el muy cobarde!' },
      { jp: '何しやがる！', furigana: '[何|なに]しやがる！', es: '¡¿Qué te crees que haces?!' },
      { jp: 'やりやがったな…', es: 'El muy... lo ha hecho.' },
    ],
  },
  {
    jp: '～みたいだ / ～みたいな',
    category: 'gramática',
    meaning: '«Como / Parece que / Tipo»\nComparativo coloquial equivalente a ～ようだ pero más informal. みたいな se usa como muletilla intensificadora en el habla moderna. 死にそうみたいな顔 = "cara de estar muriéndose". Muy frecuente en anime contemporáneo.',
    examples: [
      { jp: '幽霊みたいだ。', furigana: '[幽霊|ゆうれい]みたいだ。', es: 'Parece un fantasma.' },
      { jp: '夢みたいな話だ。', furigana: '[夢|ゆめ]みたいな[話|はなし]だ。', es: 'Parece una historia de sueños.' },
      { jp: '本当のことみたいだな。', furigana: '[本当|ほんとう]のことみたいだな。', es: 'Parece que es la verdad.' },
    ],
  },
  {
    jp: 'なんか',
    category: 'partícula',
    meaning: '«Como que… / Algo así / Alguien como yo»\nUso coloquial múltiple: (1) suaviza o difumina lo que se dice ("algo como…"); (2) partícula de autocrítica (俺なんか = alguien como yo, sin valor); (3) relleno de pausa. Omnipresente en el habla espontánea de anime moderno.',
    examples: [
      { jp: 'なんか変な感じがする。', furigana: 'なんか[変|へん]な[感|かん]じがする。', es: 'Hay algo raro, no sé por qué.' },
      { jp: '俺なんかじゃ無理だ。', furigana: '[俺|おれ]なんかじゃ[無理|むり]だ。', es: 'Para alguien como yo es imposible.' },
      { jp: 'なんか、ありがとう。', es: 'Pues... gracias.' },
    ],
  },
  {
    jp: 'へえ',
    category: 'vocabulario',
    meaning: '«Vaya / Anda / ¿Ah, sí?»\nInterjección de interés o leve sorpresa ante algo nuevo. へえ、知らなかった = "vaya, no lo sabía". Alargada (へえー) muestra más admiración o, con tono plano, desinterés irónico.',
    examples: [
      { jp: 'へえ、すごいじゃん。', furigana: 'へえ、すごいじゃん。', es: 'Vaya, qué bien, ¿no?' },
      { jp: 'へえ、そうなんだ。', furigana: 'へえ、そうなんだ。', es: 'Ah, ¿sí? No lo sabía.' },
      { jp: 'へえ…面白いね。', furigana: 'へえ…[面白|おもしろ]いね。', es: 'Anda… qué interesante.' },
    ],
  },
  {
    jp: 'わ',
    category: 'partícula',
    meaning: '«(Afirmación femenina suave / decisión tranquila)»\nPartícula final femenina que suaviza afirmaciones o añade certeza tranquila. En habla estándar es exclusivamente femenina. En kansai también la usan hombres con entonación diferente. 行くわ = "me voy (lo tengo decidido, sin duda)".',
    examples: [
      { jp: '行くわ。', furigana: '[行|い]くわ。', es: 'Me voy. (decisión firme, femenina)' },
      { jp: 'やっぱりそうだったわ。', es: 'Al final era como pensaba.' },
      { jp: 'もう知らないわ。', furigana: 'もう[知|し]らないわ。', es: 'Allá tú, me desentiendo.' },
    ],
  },
  {
    jp: 'かしら',
    category: 'partícula',
    meaning: '«¿Será…? / Me pregunto… (femenino)»\nEquivalente femenino de かな. Expresa duda o pregunta dirigida a uno mismo con tono suave y elegante. Típico de personajes femeninos adultos o refinados. Los hombres usan かな.',
    examples: [
      { jp: '本当かしら。', furigana: '[本当|ほんとう]かしら。', es: '¿Será verdad, me pregunto…?' },
      { jp: '彼、来るかしら。', furigana: '[彼|かれ]、[来|く]るかしら。', es: '¿Vendrá él, quién sabe…?' },
      { jp: 'どうしたのかしら。', furigana: 'どうしたのかしら。', es: '¿Qué le habrá pasado…?' },
    ],
  },
  {
    jp: 'かい',
    category: 'partícula',
    meaning: '«¿No? / ¿Verdad? (pregunta afable)»\nPartícula interrogativa masculina e informal pero amable y suave. Más cálida que か. Típica de personajes mayores, maestros o de carácter tranquilo. 大丈夫かい？= "¿estás bien?" — suena mucho más cálido que 大丈夫か？.',
    examples: [
      { jp: '大丈夫かい？', furigana: '[大丈夫|だいじょうぶ]かい？', es: '¿Estás bien, chico?' },
      { jp: '一人でできるかい？', furigana: '[一人|ひとり]でできるかい？', es: '¿Podrás tú solo?' },
      { jp: '怖くないかい？', furigana: '[怖|こわ]くないかい？', es: '¿No tienes miedo?' },
    ],
  },
  {
    jp: 'っす',
    category: 'partícula',
    meaning: '«Sí / Es… (cortés pero relajado)»\nContracción muy casual de です, típica del habla masculina juvenil, deportistas y kohai despreocupados. Mantiene cierta cortesía pero suena relajado. Se pega a adjetivos y nombres: いいっす = "está bien".',
    examples: [
      { jp: '大丈夫っす！', furigana: '[大丈夫|だいじょうぶ]っす！', es: '¡Todo bien, jefe!' },
      { jp: 'マジっすか！', furigana: 'マジっすか！', es: '¿En serio, tío?' },
      { jp: '自分、やるっす。', furigana: '[自分|じぶん]、やるっす。', es: 'Yo me encargo, sí.' },
    ],
  },
  {
    jp: 'とも',
    category: 'partícula',
    meaning: '«¡Por supuesto! / Claro que sí / Desde luego»\nAñade un énfasis afirmativo rotundo a una respuesta. いいとも = "¡claro que sí!". Suena seguro y a veces algo teatral o anticuado. Frecuente en personajes confiados o de aire maduro.',
    examples: [
      { jp: 'いいとも！', furigana: 'いいとも！', es: '¡Por supuesto que sí!' },
      { jp: '行くとも、約束したからな。', furigana: '[行|い]くとも、[約束|やくそく]したからな。', es: 'Claro que iré, lo prometí.' },
      { jp: '当然だとも。', furigana: '[当然|とうぜん]だとも。', es: 'Faltaría más.' },
    ],
  },
  {
    jp: 'や（関西弁）',
    category: 'partícula',
    meaning: '«Sí / Es… (forma kansai de だ)»\nEquivalente kansai de だ / だよ. Forma parte del dialecto de Osaka y Kioto. En anime identifica a personajes del Kansai, a menudo cómicos o de carácter fuerte. Suele ir con わ y ちゃう (forma kansai de 違う).',
    examples: [
      { jp: 'そうや！知ってたやろ。', furigana: 'そうや！[知|し]ってたやろ。', es: '¡Pues sí! Ya lo sabías, ¿a que sí?' },
      { jp: 'ちゃうわ！違う違う。', furigana: 'ちゃうわ！[違|ちが]う[違|ちが]う。', es: '¡No no no! Eso no es así.' },
      { jp: '知らんがな、俺に言うな。', furigana: '[知|し]らんがな、[俺|おれ]に[言|い]うな。', es: 'Yo qué sé, no me cuentes a mí.' },
    ],
  },
  {
    jp: 'やん',
    category: 'partícula',
    meaning: '«¿No? / ¡Pues claro! (kansai)»\nEquivalente kansai de じゃない / じゃん. Busca acuerdo o señala lo obvio con sabor de Osaka. ええやん = "¡está bien, ¿no?!". Identifica a personajes del Kansai, a menudo cómicos.',
    examples: [
      { jp: 'ええやん、別に。', furigana: 'ええやん、[別|べつ]に。', es: 'Está bien, ¿no? No pasa nada.' },
      { jp: 'できるやん！', furigana: 'できるやん！', es: '¡Pues sí que puedes!' },
      { jp: '知らんやん、そんなん。', furigana: '[知|し]らんやん、そんなん。', es: 'Yo qué sé, eso no lo sé.' },
    ],
  },
  {
    jp: 'やれやれ',
    category: 'vocabulario',
    meaning: '«Vaya, vaya / Qué le vamos a hacer / Qué cruz»\nExclamación de resignación, cansancio o exasperación tranquila. El personaje ve algo como un problema pero lo acepta con filosofía. Icónico en personajes estoicos y cínicos. Asociado a personajes tipo Kakashi, Zoro o similares.',
    examples: [
      { jp: 'やれやれ、また始まった。', es: 'Vaya, vaya... ya están otra vez.' },
      { jp: 'やれやれ、仕方ないな。', furigana: 'やれやれ、[仕方|しかた]ないな。', es: 'Qué le vamos a hacer, supongo.' },
      { jp: 'やれやれ、世話が焼けるな。', furigana: 'やれやれ、[世話|せわ]が[焼|や]けるな。', es: 'Qué cruz, siempre dando trabajo.' },
    ],
  },
  {
    jp: 'ふん',
    category: 'vocabulario',
    meaning: '«Hmph / Bah / (resoplido de desdén)»\nOnomatopeya de desdeño o superioridad. El personaje descarta algo con desdén sin molestarse en responder de verdad. Muy característico de antagonistas orgullosos, personajes tsundere y figuras de autoridad.',
    examples: [
      { jp: 'ふん、面白い。', furigana: 'ふん、[面白|おもしろ]い。', es: 'Hmph, interesante.' },
      { jp: 'ふん、その程度か。', furigana: 'ふん、その[程度|ていど]か。', es: 'Bah, ¿solo eso?' },
      { jp: 'ふん、勝手にしろ。', furigana: 'ふん、[勝手|かって]にしろ。', es: 'Hmph, haz lo que quieras.' },
    ],
  },
  {
    jp: '野郎',
    reading: 'やろう',
    category: 'vocabulario',
    meaning: '«Tipo / Maldito / Fulano (rudo)»\nPalabra masculina y ruda para referirse a una persona. 野 (campo/salvaje) + 郎 (hombre). Puede ser insultante o simplemente rudo según el contexto. 野郎ども = "¡todos vosotros!". En anime de piratas, yakuza y acción es prácticamente constante.',
    examples: [
      { jp: 'この野郎！', furigana: 'この[野郎|やろう]！', es: '¡Maldito tipo!' },
      { jp: '野郎ども、かかれ！', furigana: '[野郎|やろう]ども、かかれ！', es: '¡A por ellos, chicos!' },
      { jp: 'あの野郎、逃げやがった。', furigana: 'あの[野郎|やろう]、[逃|に]げやがった。', es: 'El muy canalla se escapó.' },
    ],
  },
  {
    jp: '貴様',
    reading: 'きさま',
    category: 'vocabulario',
    meaning: '«¡Tú (insulto extremo)! / ¡Sinvergüenza!»\nHistóricamente era un pronombre muy respetuoso. Hoy es extremadamente agresivo e insultante — su uso implica máxima hostilidad. Solo aparece en confrontaciones extremas o en boca de villanos muy arrogantes. Más dramático que てめえ.',
    examples: [
      { jp: '貴様、何をした！', furigana: '[貴様|きさま]、[何|なに]をした！', es: '¡Tú! ¿Qué has hecho?!' },
      { jp: '貴様だけは許さん。', furigana: '[貴様|きさま]だけは[許|ゆる]さん。', es: 'A ti en particular no te perdono.' },
      { jp: '貴様が俺を倒せるとでも？', furigana: '[貴様|きさま]が[俺|おれ]を[倒|たお]せるとでも？', es: '¿De verdad crees que puedes vencerme?' },
    ],
  },
  {
    jp: 'うそだろ',
    category: 'vocabulario',
    meaning: '«¡No puede ser! / ¡Esto es mentira!»\nContracción coloquial de うそだろう. Reacción de shock e incredulidad. Más espontáneo y coloquial que まさか. Puede expresar shock positivo (¡increíble!) o negativo (¡esto no puede estar pasando!).',
    examples: [
      { jp: 'うそだろ、あいつが負けた？', furigana: 'うそだろ、あいつが[負|ま]けた？', es: '¡No puede ser! ¿Ese perdió?' },
      { jp: 'うそだろ…信じられない。', furigana: 'うそだろ…[信|しん]じられない。', es: 'Imposible… no me lo creo.' },
      { jp: 'うそだろ！？最高じゃん！', es: '¡No me lo creo! ¡Es genial!' },
    ],
  },
  {
    jp: '余裕',
    reading: 'よゆう',
    category: 'vocabulario',
    meaning: '«Sin esfuerzo / Tengo margen / Fácil»\n余 (sobrante) + 裕 (holgura). 余裕だ = "lo tengo controlado, sin problema". 余裕がない = "estoy al límite". En anime suele ser señal de confianza excesiva antes de que la situación se complique — presagio dramático frecuente.',
    examples: [
      { jp: '余裕だ、問題ない。', furigana: '[余裕|よゆう]だ、[問題|もんだい]ない。', es: 'Pan comido, sin problema.' },
      { jp: '余裕じゃん、楽勝だ。', furigana: '[余裕|よゆう]じゃん、[楽勝|らくしょう]だ。', es: 'Qué fácil, lo tengo superado.' },
      { jp: '余裕なんてない、本気でやれ。', furigana: '[余裕|よゆう]なんてない、[本気|ほんき]でやれ。', es: 'No hay margen de holgura; hazlo en serio.' },
    ],
  },
  {
    jp: '無駄',
    reading: 'むだ',
    category: 'vocabulario',
    meaning: '«Inútil / En vano / No sirve de nada»\n無 (nada) + 駄 (inútil). El villano clásico usa 無駄だ para desestimar cualquier esfuerzo del protagonista. 無駄じゃない = "no es en vano". Muy asociado a antagonistas fríos y calculadores.',
    examples: [
      { jp: '無駄だ、諦めろ。', furigana: '[無駄|むだ]だ、[諦|あきら]めろ。', es: 'Es inútil, ríndete.' },
      { jp: '無駄な抵抗はやめろ。', furigana: '[無駄|むだ]な[抵抗|ていこう]はやめろ。', es: 'Deja de resistirte, no sirve de nada.' },
      { jp: 'この努力は無駄じゃなかった。', furigana: 'この[努力|どりょく]は[無駄|むだ]じゃなかった。', es: 'Este esfuerzo no fue en vano.' },
    ],
  },
  {
    jp: '一体',
    reading: 'いったい',
    category: 'vocabulario',
    meaning: '«¿Qué demonios…? / ¿Cómo diablos…?»\nIntensificador de preguntas. 一体何が起きてる？= "¿qué demonios está pasando?". Siempre precede a una pregunta WH (qué, quién, por qué, cómo). Expresa confusión total o indignación. Muy dramático en situaciones de caos.',
    examples: [
      { jp: '一体何が起きてるんだ！', furigana: '[一体|いったい][何|なに]が[起|お]きてるんだ！', es: '¡¿Qué demonios está pasando?!' },
      { jp: 'お前は一体何者だ？', furigana: 'お[前|まえ]は[一体|いったい][何者|なにもの]だ？', es: '¿Quién demonios eres tú?' },
      { jp: '一体どこまで強いんだ。', furigana: '[一体|いったい]どこまで[強|つよ]いんだ。', es: '¿Hasta dónde llega tu fuerza?' },
    ],
  },
  {
    jp: '参った',
    reading: 'まいった',
    category: 'vocabulario',
    meaning: '«Me rindo / Me has ganado / Vaya lío»\nDe 参る (forma humilde de ir → rendirse). Admitir la derrota con honestidad o con humor. En combate es la señal de rendición. 参ったな = "vaya aprieto". Puede ser serio (derrota genuina) o aliviado (situación difícil superada).',
    examples: [
      { jp: '参った、お前の勝ちだ。', furigana: '[参|まい]った、お[前|まえ]の[勝|か]ちだ。', es: 'Me rindo, la victoria es tuya.' },
      { jp: '参ったな、どうするか。', furigana: '[参|まい]ったな、どうするか。', es: 'Vaya lío, ¿qué hacemos?' },
      { jp: '参った、完全にやられた。', furigana: '[参|まい]った、[完全|かんぜん]にやられた。', es: 'Me has ganado, me has destrozado.' },
    ],
  },
  {
    jp: 'チッ',
    category: 'vocabulario',
    meaning: '«Tss / Pff (chasquido de lengua)»\nOnomatopeya del chasquido de lengua. Señal de irritación, impaciencia o desprecio. Puede ser claramente audible (animado) o escrito para indicar la actitud del personaje. Típico en antagonistas y personajes bruscos.',
    examples: [
      { jp: 'チッ、逃げやがった。', furigana: 'チッ、[逃|に]げやがった。', es: 'Tss, se escapó el muy...' },
      { jp: 'チッ、面倒なやつだ。', furigana: 'チッ、[面倒|めんどう]なやつだ。', es: 'Pff, qué tipo tan molesto.' },
      { jp: 'チッ、うまくいかない。', es: 'Tss, nada sale como debería.' },
    ],
  },
  {
    jp: 'かわいそう',
    category: 'vocabulario',
    meaning: '«¡Pobrecito! / Qué pena / Qué lástima»\nExpresión de compasión o lástima. Puede ser sincera o condescendiente según el contexto. En boca del villano puede sonar a burla. かわいそうに = "pobrecito / qué pena". Frecuente en momentos de vulnerabilidad o derrota ajena.',
    examples: [
      { jp: 'かわいそうに…', es: 'Qué pena... pobrecito.' },
      { jp: 'かわいそうなやつだ。', es: 'Es un pobre desgraciado.' },
      { jp: 'そんなのかわいそうだろ。', es: 'Eso es muy triste, ¿no te parece?' },
    ],
  },
  {
    jp: 'ざまあ / ざまを見ろ',
    category: 'vocabulario',
    meaning: '«¡Bien merecido! / ¡Te lo mereces! / ¡Eso te pasa!»\nExclamación de satisfacción ante el fracaso merecido de otro. ざまを見ろ / ざまあみろ son las formas completas. Muy informal, nunca en habla formal. Frecuente como reacción victoriosa tras derrotar a un rival.',
    examples: [
      { jp: 'ざまあ！', es: '¡Bien merecido te está!' },
      { jp: 'ざまを見ろ！', furigana: 'ざまを[見|み]ろ！', es: '¡Ahí lo tienes! ¡Te lo mereces!' },
      { jp: 'ざまあみろ、自業自得だ。', furigana: 'ざまあみろ、[自業自得|じごうじとく]だ。', es: '¡Te lo buscaste tú solo!' },
    ],
  },
  {
    jp: '勝手にしろ',
    reading: 'かってにしろ',
    category: 'vocabulario',
    meaning: '«Haz lo que quieras / Allá tú / Ya me cansé»\nDeclaración de abandono o indiferencia ante las acciones de otro. Implica que el hablante se desentiende completamente. Puede sonar agresivo o resignado. Frecuente en discusiones donde uno de los personajes se rinde o se ofende.',
    examples: [
      { jp: '勝手にしろ！', furigana: '[勝手|かって]にしろ！', es: '¡Haz lo que te dé la gana!' },
      { jp: 'もう勝手にしろよ。', furigana: 'もう[勝手|かって]にしろよ。', es: 'Ya, haz lo que quieras.' },
      { jp: '知らん、勝手にしろ。', furigana: '[知|し]らん、[勝手|かって]にしろ。', es: 'Allá tú, no es mi problema.' },
    ],
  },
  {
    jp: 'どうせ',
    category: 'vocabulario',
    meaning: '«De todas formas / Total… / Al final»\nExpresa fatalismo o resignación: "pase lo que pase, al final es así". どうせ～だろ = "seguro que de todas formas…". Frecuente en personajes pesimistas o con baja autoestima. どうせ俺なんか es una construcción muy anime.',
    examples: [
      { jp: 'どうせ無理だ。', furigana: 'どうせ[無理|むり]だ。', es: 'De todas formas, es imposible.' },
      { jp: 'どうせ俺なんか関係ない。', furigana: 'どうせ[俺|おれ]なんか[関係|かんけい]ない。', es: 'Al final, alguien como yo no tiene importancia.' },
      { jp: 'どうせ何をやっても変わらない。', furigana: 'どうせ[何|なに]をやっても[変|か]わらない。', es: 'Haga lo que haga, nada va a cambiar.' },
    ],
  },
  {
    jp: 'なんでもない',
    category: 'vocabulario',
    meaning: '«No es nada / Olvídalo / No pasa nada»\nRespuesta que minimiza o niega algo. Se usa para esquivar una pregunta, ocultar emociones o fingir que todo está bien. Clásica respuesta de personajes que intentan esconder sus sentimientos o no quieren preocupar a los demás.',
    examples: [
      { jp: 'なんでもない。', es: 'No es nada, tranquilo.' },
      { jp: 'あ、なんでもないから気にしないで。', furigana: 'あ、なんでもないから[気|き]にしないで。', es: 'Ah, olvídalo, no le des vueltas.' },
      { jp: 'なんでもない、ちょっと疲れただけ。', furigana: 'なんでもない、ちょっと[疲|つか]れただけ。', es: 'No pasa nada, solo estoy un poco cansado.' },
    ],
  },
  {
    jp: 'ほっとけ / ほっといて',
    category: 'vocabulario',
    meaning: '«¡Déjame en paz! / ¡No te metas!»\nContraído de 放っておけ. Pide que no interfieran. Tono desde irritado hasta suplicante. Frecuente cuando el personaje quiere resolver algo solo o cuando rechaza la compasión de otros.',
    examples: [
      { jp: 'ほっとけ！', es: '¡Déjame en paz!' },
      { jp: 'ほっといてくれ。', es: 'Por favor, déjame estar.' },
      { jp: '俺のことはほっとけ。', furigana: '[俺|おれ]のことはほっとけ。', es: 'No te metas en mis asuntos.' },
    ],
  },
  {
    jp: '調子に乗るな',
    reading: 'ちょうしにのるな',
    category: 'vocabulario',
    meaning: '«¡No te pases! / ¡No te creas tanto! / ¡Para los pies!»\n調子に乗る = "engreírse / subírsele a la cabeza". Advierte a alguien que se ha dejado llevar por el éxito o la arrogancia. Muy frecuente cuando el antagonista se confía o cuando un aliado se vuelve imprudente.',
    examples: [
      { jp: '調子に乗るな！', furigana: '[調子|ちょうし]に[乗|の]るな！', es: '¡No te creas tanto!' },
      { jp: '調子に乗ってんじゃないよ。', furigana: '[調子|ちょうし]に[乗|の]ってんじゃないよ。', es: 'Para los pies, que te estás pasando.' },
      { jp: '勝ったからって調子に乗るな。', furigana: '[勝|か]ったからって[調子|ちょうし]に[乗|の]るな。', es: 'No te infles por haber ganado.' },
    ],
  },
  {
    jp: '邪魔するな',
    reading: 'じゃまするな',
    category: 'vocabulario',
    meaning: '«¡No me estorbes! / ¡No te interpongas!»\n邪魔 = obstáculo/estorbo. Ordena que nadie interrumpa o interfiera. Muy frecuente en escenas de batalla o momentos de determinación máxima. Tono siempre serio y decidido.',
    examples: [
      { jp: '邪魔するな！', furigana: '[邪魔|じゃま]するな！', es: '¡No te interpongas!' },
      { jp: '邪魔するな、俺の前から消えろ。', furigana: '[邪魔|じゃま]するな、[俺|おれ]の[前|まえ]から[消|き]えろ。', es: 'No me estorbes; desaparece de mi vista.' },
      { jp: '邪魔するやつは容赦しない。', furigana: '[邪魔|じゃま]するやつは[容赦|ようしゃ]しない。', es: 'No tendré piedad con quien me estorbe.' },
    ],
  },
  {
    jp: '～だけど（文末）',
    category: 'gramática',
    meaning: '«…pero / …aunque (frase incompleta)»\nDeja la frase incompleta intencionadamente. El hablante sugiere el resto sin decirlo, esperando que el oyente entienda. 好きだけど… = "me gustas, pero…". Muy frecuente en personajes que tienen dificultad para expresar sentimientos directamente.',
    examples: [
      { jp: '行きたいけど…', furigana: '[行|い]きたいけど…', es: 'Quiero ir, pero…' },
      { jp: '好きだけど、言えない。', furigana: '[好|す]きだけど、[言|い]えない。', es: 'Me gustas, pero no puedo decírtelo.' },
      { jp: '一人でできるけど…', furigana: '[一人|ひとり]でできるけど…', es: 'Puedo hacerlo solo, pero...' },
    ],
  },
  {
    jp: '～てたまるか',
    category: 'gramática',
    meaning: '«¡Ni hablar de! / ¡No pienso! / ¿Acaso aguantaré?»\nRechazo visceral e inapelable. たまる = poder aguantar / soportar. ～てたまるか = "¿acaso soportaré hacer X? ¡jamás!". Más emocional y cargado que ～ものか. Casi siempre gritado en momentos de resistencia extrema.',
    examples: [
      { jp: '負けてたまるか！', furigana: '[負|ま]けてたまるか！', es: '¡Como si fuera a perder!' },
      { jp: '死んでたまるか、まだ終わってない！', furigana: '[死|し]んでたまるか、まだ[終|お]わってない！', es: '¡Morir yo, jamás! ¡Esto no ha acabado!' },
      { jp: '諦めてたまるか！', furigana: '[諦|あきら]めてたまるか！', es: '¿Rendirme? ¡Ni en sueños!' },
    ],
  },
  {
    jp: '～まい',
    category: 'gramática',
    meaning: '«No volveré a… / Jamás (volitivo negativo solemne)»\nNegación volitiva: decisión firme de no hacer algo. 二度と泣くまい = "no volveré a llorar nunca más". Arcaizante y dramático, frecuente en juramentos internos tras una pérdida o derrota.',
    examples: [
      { jp: '二度と泣くまい。', furigana: '[二度|にど]と[泣|な]くまい。', es: 'No volveré a llorar nunca más.' },
      { jp: '同じ過ちは繰り返すまい。', furigana: '[同|おな]じ[過|あやま]ちは[繰|く]り[返|かえ]すまい。', es: 'No repetiré el mismo error.' },
      { jp: '二度と負けまいと誓った。', furigana: '[二度|にど]と[負|ま]けまいと[誓|ちか]った。', es: 'Juró no volver a perder.' },
    ],
  },
  {
    jp: '～というものだ',
    category: 'gramática',
    meaning: '«A eso se le llama / Eso es lo que es / Así es»\nDefine la esencia de algo con tono sentencioso o filosófico. これが本物の力というものだ = "a esto se le llama poder de verdad". Frecuente en personajes que imparten lecciones o en revelaciones donde se define la verdadera naturaleza de algo.',
    examples: [
      { jp: 'これが本物の力というものだ。', furigana: 'これが[本物|ほんもの]の[力|ちから]というものだ。', es: 'A esto se le llama poder de verdad.' },
      { jp: 'これが友情というものだ。', furigana: 'これが[友情|ゆうじょう]というものだ。', es: 'Eso es la amistad de verdad.' },
      { jp: '人間とはそういうものだ。', furigana: '[人間|にんげん]とはそういうものだ。', es: 'Así son los seres humanos.' },
    ],
  },
  {
    jp: '～ずにはいられない',
    category: 'gramática',
    meaning: '«No puedo evitar / No puedo dejar de»\nAcción compulsiva e involuntaria. ～ずに = "sin hacer X"; はいられない = "no puede estar sin hacerlo". 笑わずにはいられない = "es imposible no reírme". Indica que la emoción o el impulso es más fuerte que la voluntad.',
    examples: [
      { jp: '笑わずにはいられない。', furigana: '[笑|わら]わずにはいられない。', es: 'Es imposible no reírme.' },
      { jp: '涙が出ずにはいられなかった。', furigana: '[涙|なみだ]が[出|で]ずにはいられなかった。', es: 'No pude evitar que se me saltaran las lágrimas.' },
      { jp: '戦わずにはいられない。', furigana: '[戦|たたか]わずにはいられない。', es: 'No puedo dejar de luchar.' },
    ],
  },
  {
    jp: '～ことだ',
    category: 'gramática',
    meaning: '«Lo mejor es… / Hay que… (consejo)»\nDa un consejo o señala lo que conviene hacer. 諦めないことだ = "lo importante es no rendirse". Tono sentencioso, de quien aconseja desde la experiencia. Frecuente en maestros y mentores.',
    examples: [
      { jp: '諦めないことだ。', furigana: '[諦|あきら]めないことだ。', es: 'Lo importante es no rendirse.' },
      { jp: '焦らないことだ。', furigana: '[焦|あせ]らないことだ。', es: 'Lo mejor es no precipitarse.' },
      { jp: '自分を信じることだ。', furigana: '[自分|じぶん]を[信|しん]じることだ。', es: 'Hay que creer en uno mismo.' },
    ],
  },
  {
    jp: '～てでも',
    category: 'gramática',
    meaning: '«Aunque tenga que… / Cueste lo que cueste»\nExpresa sacrificio extremo para lograr algo. "Haré X aunque sea necesario hacer Y (algo difícil o malo)". 死んででも守る = "te protegeré aunque cueste la vida". El nivel de sacrificio implícito define la intensidad del momento.',
    examples: [
      { jp: '死んででも守ってみせる。', furigana: '[死|し]んででも[守|まも]ってみせる。', es: 'Te protegeré aunque me cueste la vida.' },
      { jp: 'どんな手を使ってでも勝つ。', furigana: 'どんな[手|て]を[使|つか]ってでも[勝|か]つ。', es: 'Ganaré cueste lo que cueste.' },
      { jp: '血を流してでも前に進む。', furigana: '[血|ち]を[流|なが]してでも[前|まえ]に[進|すす]む。', es: 'Avanzaré aunque sangre.' },
    ],
  },
  {
    jp: '～ぬ（古語）',
    category: 'gramática',
    meaning: '«No (arcaico / solemne)»\nNegación arcaica equivalente a ～ない. Le da tono solemne, antiguo o poético. En anime aparece en contextos de samurai, fantasy medieval, o para dar gravedad especial a la negación. 許さぬ suena mucho más amenazador y formal que 許さない.',
    examples: [
      { jp: '許さぬ！', furigana: '[許|ゆる]さぬ！', es: '¡No lo perdonaré! (con gravedad solemne)' },
      { jp: '我は負けぬ。', furigana: '[我|われ]は[負|ま]けぬ。', es: 'No seré derrotado.' },
      { jp: '死ぬまで戦いを止めぬ。', furigana: '[死|し]ぬまで[戦|たたか]いを[止|と]めぬ。', es: 'No cesaré en la lucha hasta morir.' },
    ],
  },
  {
    jp: '～っけ',
    category: 'gramática',
    meaning: '«¿Cómo era? / ¿No era que…?»\nPartícula de recuperación de memoria. El hablante intenta recordar algo que ya sabía. なんだっけ？= "¿cómo era / cómo se llamaba?". Tono siempre distraído o nostálgico. Frecuente en comedias y escenas cotidianas.',
    examples: [
      { jp: 'あれ、名前なんだっけ？', furigana: 'あれ、[名前|なまえ]なんだっけ？', es: 'Oye, ¿cómo se llamaba aquello?' },
      { jp: '昨日何食べたっけ。', furigana: '[昨日|きのう][何|なに][食|た]べたっけ。', es: '¿Qué comí ayer, me pregunto?' },
      { jp: 'ここって前に来たっけ？', furigana: 'ここって[前|まえ]に[来|き]たっけ？', es: '¿Habíamos venido aquí antes?' },
    ],
  },
  {
    jp: '～たばかり',
    category: 'gramática',
    meaning: '«Acabar de… / Recién…»\nIndica que una acción terminó hace muy poco. 始まったばかりだ = "acaba de empezar". Frecuente para señalar que aún queda mucho ("esto no ha hecho más que empezar").',
    examples: [
      { jp: '戦いは始まったばかりだ。', furigana: '[戦|たたか]いは[始|はじ]まったばかりだ。', es: 'La batalla no ha hecho más que empezar.' },
      { jp: '来たばかりなのに。', furigana: '[来|き]たばかりなのに。', es: 'Y eso que acabo de llegar.' },
      { jp: '覚えたばかりの技だ。', furigana: '[覚|おぼ]えたばかりの[技|わざ]だ。', es: 'Es una técnica que acabo de aprender.' },
    ],
  },
  {
    jp: '～ばよかった',
    category: 'gramática',
    meaning: '«Debería haber… / Ojalá hubiera…»\nArrepentimiento por no haber hecho algo en el pasado. ～ばよかった = "ojalá hubiera hecho X". Muy frecuente en momentos de reflexión, derrota o pérdida. Puede ir acompañado de llanto o silencio. Uno de los lamentos más comunes en anime de drama.',
    examples: [
      { jp: '言えばよかった。', furigana: '[言|い]えばよかった。', es: 'Debería haberlo dicho.' },
      { jp: 'もっと早く来ればよかった。', furigana: 'もっと[早|はや]く[来|く]ればよかった。', es: 'Ojalá hubiera llegado antes.' },
      { jp: '諦めなければよかった。', furigana: '[諦|あきら]めなければよかった。', es: 'No debería haberme rendido.' },
    ],
  },
  {
    jp: '～わけだ',
    category: 'gramática',
    meaning: '«O sea que… / Así que… / Entonces es que»\nSaca una conclusión lógica de lo que se ha explicado. じゃあ、お前が犯人というわけだ = "entonces eres tú el culpable". Muy frecuente en anime de misterio en momentos de revelación. En boca del antagonista puede sonar a amenaza fría.',
    examples: [
      { jp: 'そういうわけか…なるほど。', es: 'O sea que era así… ya entiendo.' },
      { jp: 'じゃあ、お前が犯人というわけだ。', furigana: 'じゃあ、お[前|まえ]が[犯人|はんにん]というわけだ。', es: 'Entonces eres tú el culpable.' },
      { jp: 'だから来なかったというわけだ。', furigana: 'だから[来|こ]なかったというわけだ。', es: 'Así que por eso no viniste.' },
    ],
  },
  {
    jp: '～に過ぎない',
    reading: '～にすぎない',
    category: 'gramática',
    meaning: '«No es más que… / Simplemente / Solo»\nMinimiza o pone en perspectiva algo. これはただの始まりに過ぎない = "esto no es más que el principio". Muy frecuente en villanos que minimizan los logros del protagonista, o en momentos de revelación humillante.',
    examples: [
      { jp: 'これはただの始まりに過ぎない。', furigana: 'これはただの[始|はじ]まりに[過|す]ぎない。', es: 'Esto no es más que el principio.' },
      { jp: '俺はただの人間に過ぎない。', furigana: '[俺|おれ]はただの[人間|にんげん]に[過|す]ぎない。', es: 'No soy más que un simple ser humano.' },
      { jp: 'お前の力はまだ入り口に過ぎない。', furigana: 'お[前|まえ]の[力|ちから]はまだ[入|い]り[口|ぐち]に[過|す]ぎない。', es: 'Tu poder apenas está en la entrada.' },
    ],
  },
  {
    jp: '～ざるを得ない',
    reading: '～ざるをえない',
    category: 'gramática',
    meaning: '«No me queda más remedio que / Me veo obligado a»\nObligación impuesta por las circunstancias, sin alternativa. 戦わざるを得ない = "no me queda más que luchar". Tono formal y grave; frecuente cuando un personaje actúa a su pesar.',
    examples: [
      { jp: '戦わざるを得ない。', furigana: '[戦|たたか]わざるを[得|え]ない。', es: 'No me queda más remedio que luchar.' },
      { jp: '認めざるを得ない。', furigana: '[認|みと]めざるを[得|え]ない。', es: 'Me veo obligado a admitirlo.' },
      { jp: '引き下がらざるを得なかった。', furigana: '[引|ひ]き[下|さ]がらざるを[得|え]なかった。', es: 'No tuve más opción que retirarme.' },
    ],
  },
  {
    jp: '～ものだ（懐古）',
    category: 'gramática',
    meaning: '«Solía… / Así son las cosas / Eso sí que es…»\nUso nostálgico: 昔はよく遊んだものだ = "antes solíamos jugar mucho". También expresa verdad universal: 苦しい時こそ強くなるものだ = "es en los momentos difíciles cuando uno se fortalece". Tono reflexivo y maduro, frecuente en personajes mayores.',
    examples: [
      { jp: '昔はよく来たものだ。', furigana: '[昔|むかし]はよく[来|き]たものだ。', es: 'Antes veníamos aquí a menudo.' },
      { jp: '人は変わるものだ。', furigana: '[人|ひと]は[変|か]わるものだ。', es: 'Así es la gente; siempre cambia.' },
      { jp: '苦しい時こそ成長するものだ。', furigana: '[苦|くる]しい[時|とき]こそ[成長|せいちょう]するものだ。', es: 'Es justo en los momentos difíciles cuando uno crece.' },
    ],
  },
  {
    jp: '～っぽい',
    category: 'gramática',
    meaning: '«Tiene pinta de / -ero/-osa / Como de»\nSufijo coloquial que indica semejanza o características que sugieren algo. 子供っぽい = "infantil". 嘘っぽい = "parece mentira". Más informal que ～みたいだ. Muy usado en opiniones y descripciones en anime contemporáneo.',
    examples: [
      { jp: 'それ嘘っぽい。', furigana: 'それ[嘘|うそ]っぽい。', es: 'Eso me suena a mentira.' },
      { jp: '子供っぽいな。', furigana: '[子供|こども]っぽいな。', es: 'Qué infantil, la verdad.' },
      { jp: 'あいつ悪者っぽい。', furigana: 'あいつ[悪者|わるもの]っぽい。', es: 'Ese tiene pinta de ser el malo.' },
    ],
  },
  {
    jp: '～にしても',
    category: 'gramática',
    meaning: '«Aunque sea… / Incluso contando con eso / Aun así»\nConcede un punto pero señala que algo sigue siendo problemático o excesivo. 冗談にしてもひどい = "incluso como broma, es terrible". Más elaborado y reflexivo que ～ても. Frecuente en personajes que razonan en voz alta.',
    examples: [
      { jp: '冗談にしてもひどすぎる。', furigana: '[冗談|じょうだん]にしてもひどすぎる。', es: 'Incluso como broma, eso es demasiado cruel.' },
      { jp: '負けるにしても全力で戦う。', furigana: '[負|ま]けるにしても[全力|ぜんりょく]で[戦|たたか]う。', es: 'Aunque vaya a perder, lucharé con todo.' },
      { jp: 'そうにしても、許せない。', furigana: 'そうにしても、[許|ゆる]せない。', es: 'Aunque así sea, no puedo perdonarlo.' },
    ],
  },
]
