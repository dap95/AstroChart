// project/src/zodiac.systems.ts

export type ZodiacSystem = 'equal12' | 'true12' | 'true13'

export const DEFAULT_ZODIAC_SYSTEM: ZodiacSystem = 'equal12'

export type Segment = { id: string; start_deg: number; end_deg: number }

/**
 * Segments "égaux" 12×30°
 */
function equal12 (): Segment[] {
  const order = [
    'aries','taurus','gemini','cancer','leo','virgo',
    'libra','scorpio','sagittarius','capricorn','aquarius','pisces'
  ]
  return order.map((id, i) => ({
    id,
    start_deg: i * 30,
    end_deg: (i + 1) * 30
  }))
}

/**
 * Tailles "réalistes" des constellations IAU en degrés écliptiques,
 * avec Ophiuchus séparé (true13).
 * NB: valeurs approximatives usuelles; la somme fait 360.
 */
function true13 (): Segment[] {
  const lengths = [
    ['aries',       25],
    ['taurus',      37],
    ['gemini',      28],
    ['cancer',      20],
    ['leo',         36],
    ['virgo',       44],
    ['libra',       23],
    ['scorpio',      7],
    ['ophiuchus',   18],
    ['sagittarius', 32],
    ['capricorn',   28],
    ['aquarius',    25],
    ['pisces',      37], // ajusté pour total = 360
  ] as Array<[string, number]>

  let acc = 0
  return lengths.map(([id, span]) => {
    const s = acc
    const e = acc + span
    acc = e
    return { id, start_deg: s, end_deg: e }
  })
}

/**
 * "true12" = vraies tailles mais Scorpion = Scorpion + Ophiuchus
 */
function true12 (): Segment[] {
  const base = true13()
  const merged: Segment[] = []
  const carry = 0

  for (const seg of base) {
    const start = seg.start_deg - carry
    if (seg.id === 'ophiuchus') {
      // on saute Ophiuchus: on l'ajoute au Scorpion précédent
      const last = merged[merged.length - 1]
      last.end_deg = seg.end_deg - carry
      continue
    }
    merged.push({ id: seg.id === 'scorpio' ? 'scorpio' : seg.id, start_deg: start, end_deg: seg.end_deg - carry })
  }

  return merged
}

/**
 * Génère les segments pour un système donné.
 * Si le système est inconnu, fallback sur equal12.
 */
export function segmentsForSystem (system: ZodiacSystem): Segment[] {
  switch (system) {
    case 'true13': return true13()
    case 'true12': return true12()
    case 'equal12':
    default:       return equal12()
  }
}
