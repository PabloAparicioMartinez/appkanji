import type { CompoundWord, JLPTLevel } from './types'

const LEVEL_COLORS: Record<JLPTLevel, string> = {
  N5: 'var(--n5)', N4: 'var(--n4)', N3: 'var(--n3)',
  N2: 'var(--n2)', N1: 'var(--n1)',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px', borderRadius: 8, border: 'none',
  background: '#F4F4F1', color: 'var(--text)', fontSize: 14,
  fontFamily: 'inherit', outline: 'none',
}

interface Props {
  words: CompoundWord[]
  onChange: (words: CompoundWord[]) => void
  defaultLevel: JLPTLevel
}

export default function WordsEditor({ words, onChange, defaultLevel }: Props) {
  function updateWord(i: number, patch: Partial<CompoundWord>) {
    onChange(words.map((w, idx) => (idx === i ? { ...w, ...patch } : w)))
  }
  function removeWord(i: number) {
    onChange(words.filter((_, idx) => idx !== i))
  }
  function addWord() {
    onChange([...words, { w: '', f: '', m: '', l: defaultLevel }])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {words.map((w, i) => (
        <div
          key={i}
          style={{
            background: '#e5e5e2', borderRadius: 12, padding: 10,
            display: 'flex', flexDirection: 'column', gap: 6,
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              value={w.w}
              onChange={e => updateWord(i, { w: e.target.value })}
              placeholder="Palabra"
              autoCapitalize="none"
              autoCorrect="off"
              className="font-jp-serif"
              style={inputStyle}
            />
            <button
              onClick={() => removeWord(i)}
              aria-label="Eliminar palabra"
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: '#d9d9d6', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                style={{ color: 'var(--text)' }}>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <input
            value={w.f}
            onChange={e => updateWord(i, { f: e.target.value })}
            placeholder="Furigana"
            autoCapitalize="none"
            autoCorrect="off"
            className="font-jp-serif"
            style={inputStyle}
          />
          <input
            value={w.m}
            onChange={e => updateWord(i, { m: e.target.value })}
            placeholder="Significado"
            autoCapitalize="none"
            autoCorrect="off"
            style={inputStyle}
          />
          <div style={{ display: 'flex', gap: 4 }}>
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map(lvl => {
              const color = LEVEL_COLORS[lvl]
              const active = w.l === lvl
              return (
                <button
                  key={lvl}
                  onClick={() => updateWord(i, { l: lvl })}
                  style={{
                    flex: 1, padding: '5px 0', borderRadius: 16,
                    fontSize: 11, fontWeight: 600, letterSpacing: '0.03em',
                    fontFamily: 'inherit',
                    border: active ? '1.5px solid transparent' : `1.5px solid ${color}`,
                    background: active ? color : 'transparent',
                    color: active ? '#fff' : color,
                    opacity: 0.8, cursor: 'pointer',
                  }}
                >
                  {lvl}
                </button>
              )
            })}
          </div>
        </div>
      ))}
      <button
        onClick={addWord}
        style={{
          width: '100%', padding: '10px', borderRadius: 10,
          background: 'transparent',
          border: '1.5px dashed var(--border)',
          color: 'var(--text2)', fontSize: 13, fontWeight: 600,
          fontFamily: 'inherit', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Añadir palabra
      </button>
    </div>
  )
}

export function sanitizeEditedWords(words: CompoundWord[]): CompoundWord[] {
  return words
    .map(w => ({ w: w.w.trim(), f: w.f.trim(), m: w.m.trim(), l: w.l }))
    .filter(w => w.w.length > 0)
}
