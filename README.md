# AstroChart

![GitHub release](https://img.shields.io/github/v/release/AstroDraw/AstroChart?style=flat-square)

A free and open-source TypeScript library for generating SVG charts to display planets in astrology. It does not calculate any positions of the planets in Universe.

- Pure TypeScript implementation without dependencies.
- SVG graphics.
- Tested code.

## Example:

<img width="764" alt="Chart wheel with transits" src="https://github.com/AstroDraw/AstroChart/blob/main/doc/images/transits.png?raw=true">

## Documentation
A documentation is in progress, please checkout [website](https://astrodraw.github.io/).

### Geometry: Zodiac systems (equal12/true12/true13)

You can choose how zodiac segments are drawn using the `GEOMETRY` setting:

```ts
import Chart from './project/src/chart'
import default_settings from './project/src/settings'

// Choose a zodiac system: 'equal12' | 'true12' | 'true13'
const settings = {
  ...default_settings,
  GEOMETRY: { zodiac_system: 'true13' }
}

const chart = new Chart('chart-root', 800, 800, settings)
chart.radix({
  planets: { Sun: [12], Moon: [123] },
  cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
})
```

- `equal12` keeps 12×30° segments (current behavior)
- `true12` uses constellation spans with Ophiuchus merged into Scorpio (12 signs)
- `true13` uses constellation spans with Ophiuchus as a separate segment (13 signs)

If you want full control, you can pass explicit segments:

```ts
const settings = {
  ...default_settings,
  GEOMETRY: {
    zodiac: {
      segments: [
        { id: 'Aries', start_deg: 0, end_deg: 25 },
        // ... your segments that sum to 360°
      ]
    }
  }
}
```

## Contribution
Contribution is always welcome. You can contribute in different ways:
 - Start or participate in the [discussions](https://github.com/AstroDraw/AstroChart/discussions)
 - Check opened issues, or improve our documentation
 - Open [an issue](https://github.com/AstroDraw/AstroChart/issues) to report a bug or give some enchancement idea
 - Open a PR with bug fixes or new features. To avoid rework, if is not small, is always good to open an issue to discuss before.

## Support
Do you want to support the development of AstroChart? Here is some ways:

Is your project using? Please [comment here](https://github.com/AstroDraw/AstroChart/discussions/48) so we can share nice projects that are using.

A nice way to support is sharing this project with other people.

Also, if you are a company consider sponsoring the project or [buying me a coffee](https://ko-fi.com/afucher)
