import { normalizeGeometry, DEFAULT_ZODIAC_SYSTEM } from './chart'
import { EQUAL12_SEGMENTS, TRUE12_SEGMENTS, TRUE13_SEGMENTS } from './zodiac'

describe('normalizeGeometry', () => {
  test('back-compat: undefined geometry -> default system equal12 and segments EQUAL12', () => {
    const result = normalizeGeometry()
    expect(result.system).toBe(DEFAULT_ZODIAC_SYSTEM)
    expect(result.segments).toStrictEqual(EQUAL12_SEGMENTS)
  })

  test('explicit system equal12 without segments -> EQUAL12', () => {
    const result = normalizeGeometry({ zodiac_system: 'equal12' })
    expect(result.system).toBe('equal12')
    expect(result.segments).toStrictEqual(EQUAL12_SEGMENTS)
  })

  test('explicit system true12 without segments -> TRUE12', () => {
    const result = normalizeGeometry({ zodiac_system: 'true12' })
    expect(result.system).toBe('true12')
    expect(result.segments).toStrictEqual(TRUE12_SEGMENTS)
  })

  test('explicit system true13 without segments -> TRUE13', () => {
    const result = normalizeGeometry({ zodiac_system: 'true13' })
    expect(result.system).toBe('true13')
    expect(result.segments).toStrictEqual(TRUE13_SEGMENTS)
  })

  test('explicit custom segments take precedence even if system provided', () => {
    const custom = [
      { id: 'A', start_deg: 0, end_deg: 100 },
      { id: 'B', start_deg: 100, end_deg: 360 }
    ]
    const result = normalizeGeometry({ zodiac_system: 'true13', zodiac: { segments: custom } })
    expect(result.system).toBe('true13')
    expect(result.segments).toStrictEqual(custom)
  })

  test('custom segments without system -> defaults to DEFAULT_ZODIAC_SYSTEM but keeps segments', () => {
    const custom = [
      { id: 'X', start_deg: 0, end_deg: 180 },
      { id: 'Y', start_deg: 180, end_deg: 360 }
    ]
    const result = normalizeGeometry({ zodiac: { segments: custom } })
    expect(result.system).toBe(DEFAULT_ZODIAC_SYSTEM)
    expect(result.segments).toStrictEqual(custom)
  })
})
