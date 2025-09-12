import default_settings from "./settings";
import Zodiac from "./zodiac";
import { segmentsForSystem, EQUAL12_SEGMENTS, TRUE12_SEGMENTS, TRUE13_SEGMENTS } from "./zodiac";

describe('getSign', () => {
  const cusps = [296, 350, 30, 56, 75, 94, 116, 170, 210, 236, 255, 274];
  var reporter = new Zodiac( cusps );
  test.each([
    [0, 1],
    [30, 2],
    [270, 10],
    [359, 12],
    [361, 1],
  ])('should return correct sign', (point, expected) => {
    expect( reporter.getSign( point ) ).toBe( expected );
  })
})

test.each([
  [-1, true],
  [1, false],
])('should return retrograde if speed is negative', (speed, expected) => {
  const cusps = [296, 350, 30, 56, 75, 94, 116, 170, 210, 236, 255, 274];
  const zodiac = new Zodiac( cusps );

  expect(zodiac.isRetrograde(speed)).toBe(expected);
})

test.each([
  [274, 12],
  [296, 12],
  [296.1, 1],
  [350, 2],
  [359, 2],
  [0, 2],
  [361, 2],
  [29.9, 2],
  [30, 3],
])('getHouseNumber [1] %i', (house, expected) => {
  const cusps = [296.1, 350, 30, 56, 75, 94, 116, 170, 210, 236, 255, 274];
  const zodiac = new Zodiac( cusps );

  expect(zodiac.getHouseNumber(house)).toBe(expected);
})

test.each([
  [248.58, 12],
  [265, 12],
  [265.7, 1],
  [307.65, 2],
  [353.4, 3],
  [0, 3],
  [361, 3],
  [26.87, 4],
])('getHouseNumber [2] %i', (house, expected) => {
  const cusps = [265.6850555442075,307.6441825689919,353.38796689506074,26.86890880306794,50.191811553503044,68.57049261566578,85.6850555442075,127.64418256899188,173.3879668950608,206.8689088030679,230.19181155350307,248.5704926156658];
  const zodiac = new Zodiac( cusps );

  expect(zodiac.getHouseNumber(house)).toBe(expected);
}) 
									
test.each([
  [266.1234, "266° 7' 24"],
  [0.1234, "0° 7' 24"],
  [360.1234, "360° 7' 24"],
  [266.3251184363515, "266° 19' 30"],
])('toDMS %i', (angle, expected) => {
  const cusps = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  const zodiac = new Zodiac( cusps );

  expect(zodiac.toDMS(angle)).toBe(expected);
}) 

describe('dignities', () => {
  const cusps = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  const reporter = new Zodiac( cusps );	
  test('Sun', () => {            
    expect( reporter.getDignities( {name:"Sun", position:120} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );
    expect( reporter.getDignities( {name:"Sun", position:300} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
    expect( reporter.getDignities( {name:"Sun", position:150} )).toStrictEqual([default_settings.DIGNITIES_FALL] );
    expect( reporter.getDignities( {name:"Sun", position:18} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );					
    expect( reporter.getDignities( {name:"Sun", position:0}, [{"name":"Sun", "position":0, "orbit":2}] )).toStrictEqual([default_settings.DIGNITIES_EXALTATION, default_settings.DIGNITIES_EXACT_EXALTATION] );
  })

  test('Moon', () => {
    expect( reporter.getDignities( {name:"Moon", position:90} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );
    expect( reporter.getDignities( {name:"Moon", position:270} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
    expect( reporter.getDignities( {name:"Moon", position:210} )).toStrictEqual([default_settings.DIGNITIES_FALL] );					
    expect( reporter.getDignities( {name:"Moon", position:30} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );					
    expect( reporter.getDignities( {name:"Moon", position:32}, [{"name":"Moon", "position":33, "orbit":2}] )).toStrictEqual([default_settings.DIGNITIES_EXALTATION, default_settings.DIGNITIES_EXACT_EXALTATION] );
  })

  test('Mercury', () => {
    expect( reporter.getDignities( {name:"Mercury", position:60} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );									
    expect( reporter.getDignities( {name:"Mercury", position:240} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
    expect( reporter.getDignities( {name:"Mercury", position:330} )).toStrictEqual([default_settings.DIGNITIES_FALL] );					
    expect( reporter.getDignities( {name:"Mercury", position:150} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );
    expect( reporter.getDignities( {name:"Mercury", position:156}, [{"name":"Mercury", "position":155, "orbit":2}] )).toStrictEqual([default_settings.DIGNITIES_EXALTATION, default_settings.DIGNITIES_EXACT_EXALTATION] );
  })

  test('Venus', () => {
    expect( reporter.getDignities( {name:"Venus", position:30} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );									
    expect( reporter.getDignities( {name:"Venus", position:180} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );

    expect( reporter.getDignities( {name:"Venus", position:0} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
    expect( reporter.getDignities( {name:"Venus", position:210} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );

    expect( reporter.getDignities( {name:"Venus", position:150} )).toStrictEqual([default_settings.DIGNITIES_FALL] );					

    expect( reporter.getDignities( {name:"Venus", position:330} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );
    expect( reporter.getDignities( {name:"Venus", position:357.987}, [{"name":"Venus", "position":357, "orbit":2}] )).toStrictEqual([default_settings.DIGNITIES_EXALTATION, default_settings.DIGNITIES_EXACT_EXALTATION] );
  })

  test('Mars', () => {

    expect( reporter.getDignities( {name:"Mars", position:0} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );									
    expect( reporter.getDignities( {name:"Mars", position:210} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );
   
    expect( reporter.getDignities( {name:"Mars", position:30} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
    expect( reporter.getDignities( {name:"Mars", position:180} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
   
    expect( reporter.getDignities( {name:"Mars", position:90} )).toStrictEqual([default_settings.DIGNITIES_FALL] );					
   
    expect( reporter.getDignities( {name:"Mars", position:270} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );
    expect( reporter.getDignities( {name:"Mars", position:298}, [{"name":"Mars", "position":298, "orbit":2}] )).toStrictEqual([default_settings.DIGNITIES_EXALTATION, default_settings.DIGNITIES_EXACT_EXALTATION] );
  })

  test('Jupiter', () => {
    expect( reporter.getDignities( {name:"Jupiter", position:240} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );									
    expect( reporter.getDignities( {name:"Jupiter", position:330} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );

    expect( reporter.getDignities( {name:"Jupiter", position:60} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
    expect( reporter.getDignities( {name:"Jupiter", position:150} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );

    expect( reporter.getDignities( {name:"Jupiter", position:270} )).toStrictEqual([default_settings.DIGNITIES_FALL] );					

    expect( reporter.getDignities( {name:"Jupiter", position:90} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );
    expect( reporter.getDignities( {name:"Jupiter", position:105}, [{"name":"Jupiter", "position":105, "orbit":2}] )).toStrictEqual([default_settings.DIGNITIES_EXALTATION, default_settings.DIGNITIES_EXACT_EXALTATION] );
  })

  test('Saturn', () => {
    expect( reporter.getDignities( {name:"Saturn", position:300} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );
   
    expect( reporter.getDignities( {name:"Saturn", position:90} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
    expect( reporter.getDignities( {name:"Saturn", position:120} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
   
    expect( reporter.getDignities( {name:"Saturn", position:0} )).toStrictEqual([default_settings.DIGNITIES_FALL] );					
   
    expect( reporter.getDignities( {name:"Saturn", position:180} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );
    expect( reporter.getDignities( {name:"Saturn", position:201}, [{"name":"Saturn", "position":201, "orbit":2}] )).toStrictEqual([default_settings.DIGNITIES_EXALTATION, default_settings.DIGNITIES_EXACT_EXALTATION] );
  })

  test('Uranus', () => {
    expect( reporter.getDignities( {name:"Uranus", position:300} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );
    expect( reporter.getDignities( {name:"Uranus", position:120} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
    expect( reporter.getDignities( {name:"Uranus", position:30} )).toStrictEqual([default_settings.DIGNITIES_FALL] );					
    expect( reporter.getDignities( {name:"Uranus", position:210} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );					
    expect( reporter.getDignities( {name:"Uranus", position:218}, [{"name":"Uranus", "position":218, "orbit":2}] )).toStrictEqual([default_settings.DIGNITIES_EXALTATION, default_settings.DIGNITIES_EXACT_EXALTATION] );
  })

  test('Neptune', () => {
    expect( reporter.getDignities( {name:"Neptune", position:330} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );
    expect( reporter.getDignities( {name:"Neptune", position:150} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );
    expect( reporter.getDignities( {name:"Neptune", position:60} )).toStrictEqual([default_settings.DIGNITIES_FALL] );
    expect( reporter.getDignities( {name:"Neptune", position:300} )).toStrictEqual([default_settings.DIGNITIES_FALL] );
        
    expect( reporter.getDignities( {name:"Neptune", position:120} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );					
    expect( reporter.getDignities( {name:"Neptune", position:240} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );
    expect( reporter.getDignities( {name:"Neptune", position:241}, [{"name":"Neptune", "position":241, "orbit":2}] )).toStrictEqual([default_settings.DIGNITIES_EXALTATION, default_settings.DIGNITIES_EXACT_EXALTATION] );
  })

  test('Pluto', () => {
    expect( reporter.getDignities( {name:"Pluto", position:210} )).toStrictEqual([default_settings.DIGNITIES_RULERSHIP] );
    expect( reporter.getDignities( {name:"Pluto", position:30} )).toStrictEqual([default_settings.DIGNITIES_DETRIMENT] );					
    expect( reporter.getDignities( {name:"Pluto", position:180} )).toStrictEqual([default_settings.DIGNITIES_FALL] );																						
    expect( reporter.getDignities( {name:"Pluto", position:0} )).toStrictEqual([default_settings.DIGNITIES_EXALTATION] );
    expect( reporter.getDignities( {name:"Pluto", position:18}, [{"name":"Pluto", "position":18, "orbit":2}] )).toStrictEqual([default_settings.DIGNITIES_EXALTATION, default_settings.DIGNITIES_EXACT_EXALTATION] );
  })
})

describe('segmentsForSystem', () => {
  function widthSum(segments: { start_deg: number; end_deg: number }[]): number {
    return segments.reduce((acc, s) => acc + (s.end_deg - s.start_deg), 0)
  }

  test('equal12 -> 12 x 30° spanning 0..360', () => {
    const segs = segmentsForSystem('equal12')
    expect(segs.length).toBe(12)
    expect(widthSum(segs)).toBe(360)
    expect(segs[0].start_deg).toBe(0)
    expect(segs[11].end_deg).toBe(360)
    segs.forEach(s => expect(s.end_deg - s.start_deg).toBe(30))
    expect(segs).toStrictEqual(EQUAL12_SEGMENTS)
  })

  test('true12 -> 12 signs, Scorpio includes Ophiuchus (28°), no Ophiuchus id', () => {
    const segs = segmentsForSystem('true12')
    expect(segs.length).toBe(12)
    expect(widthSum(segs)).toBe(360)
    expect(segs.some(s => s.id === 'Ophiuchus')).toBe(false)
    const scorpio = segs.find(s => s.id === 'Scorpio')!
    expect(scorpio.end_deg - scorpio.start_deg).toBe(28)
    expect(segs).toStrictEqual(TRUE12_SEGMENTS)
  })

  test('true13 -> 13 signs, includes Ophiuchus (18°), Scorpio is 10°', () => {
    const segs = segmentsForSystem('true13')
    expect(segs.length).toBe(13)
    expect(widthSum(segs)).toBe(360)
    const ophiuchus = segs.find(s => s.id === 'Ophiuchus')!
    const scorpio = segs.find(s => s.id === 'Scorpio')!
    expect(ophiuchus != null).toBe(true)
    expect(ophiuchus.end_deg - ophiuchus.start_deg).toBe(18)
    expect(scorpio.end_deg - scorpio.start_deg).toBe(10)
    expect(segs).toStrictEqual(TRUE13_SEGMENTS)
  })
})
