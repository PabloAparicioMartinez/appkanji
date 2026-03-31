/**
 * Renderiza una lectura kun con soporte para okurigana.
 * Si contiene un punto (.), la parte antes es raíz, después es okurigana.
 *
 * Ejemplo: 'まな.ぶ' → "まな" (normal) + "ぶ" (gris, pequeño)
 */
export function KunReading({ reading }: { reading: string }) {
  if (!reading.includes('.')) {
    return <span>{reading}</span>
  }

  const [root, okurigana] = reading.split('.')
  return (
    <span>
      {root}
      <span style={{
        color: 'var(--text3)',
        marginLeft: '0.08em',
      }}>
        {okurigana}
      </span>
    </span>
  )
}

/**
 * Renderiza múltiples lecturas kun separadas por el delimiter.
 * Usa KunReading para cada una.
 */
export function KunReadingList({
  readings,
  limit,
  delimiter = '・',
}: {
  readings: string[]
  limit?: number
  delimiter?: string
}) {
  const slice = limit ? readings.slice(0, limit) : readings
  return (
    <span>
      {slice.map((reading, i) => (
        <span key={i}>
          {i > 0 && delimiter}
          <KunReading reading={reading} />
        </span>
      ))}
    </span>
  )
}
