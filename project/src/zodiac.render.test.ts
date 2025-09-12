import Radix from './radix'
import SVG from './svg'
import default_settings from './settings'

describe('Radix render with non-equal zodiac segments', () => {
  test('true13 renders 13 colored sectors and ⛎ text for Ophiuchus', () => {
    document.body.innerHTML = '<div id="chart"></div>'

    const settings = {
      ...default_settings,
      GEOMETRY: { zodiac_system: 'true13' as const }
    }

    const data = {
      planets: { Sun: [0] },
      cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
    }

    const paper = new SVG('chart', 400, 400, settings)
    const radix = new Radix(paper, 200, 200, 180, data, settings)
    radix.drawUniverse()

    const wrapperId = '#chart-astrology-radix-signs'
    const wrapper = document.querySelector(wrapperId)
    expect(wrapper).not.toBeNull()

    const sectorPaths = document.querySelectorAll(`${wrapperId} > path[id^="chart-astrology-radix-signs-"]`)
    expect(sectorPaths.length).toBe(13)

    const textNodes = Array.from(document.querySelectorAll(`${wrapperId} text`))
    const hasOphiuchus = textNodes.some(node => (node.textContent || '').includes('\u26CE'))
    expect(hasOphiuchus).toBe(true)
  })
})


