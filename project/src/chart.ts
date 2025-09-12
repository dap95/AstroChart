import default_settings from './settings' 
import type { Settings } from './settings'
import Radix from './radix'
import type { AstroData } from './radix'
import SVG from './svg'
import { getPointPosition } from './utils'
import type { ZodiacSegment, ZodiacSystem } from './zodiac'
import { segmentsForSystem, DEFAULT_ZODIAC_SYSTEM } from './zodiac'
/**
 * Displays astrology charts.
 *
 * @class
 * @public
 * @constructor
 * @param {String} elementId - root DOMElement
 * @param {int} width
 * @param {int} height
 * @param {Object} settings
 */

class Chart {
  paper: SVG
  cx: number
  cy: number
  radius: number
  settings: Settings
  constructor (elementId: string, width: number, height: number, settings?: Partial<Settings>) {
    const chartSettings = default_settings
    if (settings != null) {
      Object.assign(chartSettings, settings)
      if (!('COLORS_SIGNS' in settings)) chartSettings.COLORS_SIGNS = [default_settings.COLOR_ARIES, default_settings.COLOR_TAURUS, default_settings.COLOR_GEMINI, default_settings.COLOR_CANCER, default_settings.COLOR_LEO, default_settings.COLOR_VIRGO, default_settings.COLOR_LIBRA, default_settings.COLOR_SCORPIO, default_settings.COLOR_SAGITTARIUS, default_settings.COLOR_CAPRICORN, default_settings.COLOR_AQUARIUS, default_settings.COLOR_PISCES]
    }

    if ((elementId !== '') && (document.getElementById(elementId) == null)) {
      const paper = document.createElement('div')
      paper.setAttribute('id', elementId)
      document.body.appendChild(paper)
    }

    this.paper = new SVG(elementId, width, height, chartSettings)
    this.cx = this.paper.width / 2
    this.cy = this.paper.height / 2
    this.radius = this.paper.height / 2 - chartSettings.MARGIN
    this.settings = chartSettings
  }

  /**
 * Display radix horoscope
 *
 * @param {Object} data
 * @example
 *  {
 *    "points":{"Moon":[0], "Sun":[30],  ... },
 *    "cusps":[300, 340, 30, 60, 75, 90, 116, 172, 210, 236, 250, 274]
 *  }
 *
 * @return {Radix} radix
 */
  radix (data: AstroData): Radix {
    const radix = new Radix(this.paper, this.cx, this.cy, this.radius, data, this.settings)

    radix.drawBg()
    radix.drawUniverse()
    radix.drawRuler()
    radix.drawPoints()
    radix.drawCusps()
    radix.drawAxis()
    radix.drawCircles()

    return radix
  }

  /**
   * Scale chart
   *
   * @param {int} factor
   */
  scale (factor: number): void {
    this.paper.root.setAttribute('transform', 'translate(' + (-this.cx * (factor - 1)) + ',' + (-this.cy * (factor - 1)) + ') scale(' + factor + ')')
  }

  /**
   * Draw the symbol on the axis.
   * For debug only.
   *
   */
  calibrate (): Chart {
    let positions
    let circle
    let line
    const startRadius = 60

    const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Chiron', 'Lilith', 'NNode']

    for (let planet = 0; planet < planets.length; planet++) {
      positions = getPointPosition(this.cx, this.cy, this.radius * 2, planet * 30, this.settings)

      line = this.paper.line(this.cx, this.cy, positions.x, positions.y)
      line.setAttribute('stroke', this.settings.LINE_COLOR)
      this.paper.root.appendChild(line)

      circle = this.paper.circle(this.cx, this.cy, startRadius + startRadius * planet)
      circle.setAttribute('stroke', this.settings.LINE_COLOR)
      circle.setAttribute('stroke-width', '1')
      this.paper.root.appendChild(circle)
    }

    for (let n = 0, ln = planets.length; n < ln; n++) {
      const radius = startRadius + startRadius * n

      for (let i = 0; i < 12; i++) {
        positions = getPointPosition(this.cx, this.cy, radius, i * 30, this.settings)

        circle = this.paper.circle(positions.x, positions.y, this.settings.COLLISION_RADIUS * this.settings.SYMBOL_SCALE)
        circle.setAttribute('stroke', 'red')
        circle.setAttribute('stroke-width', '1')
        this.paper.root.appendChild(circle)

        this.paper.root.appendChild(this.paper.getSymbol(planets[n], positions.x, positions.y))
      }
    }

    return this
  }
}

export default Chart

// Geometry normalization utilities
export interface GeometryZodiac {
  segments?: ZodiacSegment[]
}

export interface GeometryOptions {
  zodiac_system?: ZodiacSystem
  zodiac?: GeometryZodiac
  zodiac_offset_deg?: number
}

export interface NormalizedGeometry {
  system: ZodiacSystem
  segments: ZodiacSegment[]
  offset_deg: number
}

export function normalizeGeometry (geometry?: GeometryOptions | null): NormalizedGeometry {
  const hasCustomSegments = geometry != null && geometry.zodiac != null && Array.isArray(geometry.zodiac.segments) && geometry.zodiac.segments.length > 0
  if (hasCustomSegments) {
    // Do not alter explicitly provided segments
    return {
      system: (geometry != null && geometry.zodiac_system != null) ? geometry.zodiac_system : DEFAULT_ZODIAC_SYSTEM,
      segments: geometry!.zodiac!.segments as ZodiacSegment[],
      offset_deg: geometry?.zodiac_offset_deg != null ? Number(geometry.zodiac_offset_deg) : 0
    }
  }

  const system = (geometry != null && geometry.zodiac_system != null) ? geometry.zodiac_system : DEFAULT_ZODIAC_SYSTEM
  const segments = segmentsForSystem(system)
  return { system, segments, offset_deg: geometry?.zodiac_offset_deg != null ? Number(geometry.zodiac_offset_deg) : 0 }
}

export { DEFAULT_ZODIAC_SYSTEM }
