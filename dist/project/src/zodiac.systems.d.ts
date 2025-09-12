export type ZodiacSystem = 'equal12' | 'true12' | 'true13';
export declare const DEFAULT_ZODIAC_SYSTEM: ZodiacSystem;
export type Segment = {
    id: string;
    start_deg: number;
    end_deg: number;
};
/**
 * Génère les segments pour un système donné.
 * Si le système est inconnu, fallback sur equal12.
 */
export declare function segmentsForSystem(system: ZodiacSystem): Segment[];
