export const SCENE_TIMES = {
  SCENE_1_START: 0,
  SCENE_2_START: 35,
  SCENE_3_START: 66,
  SCENE_4_START: 101,
  SCENE_5_START: 151,
  SCENE_6_START: 196,
} as const;

export function getSceneFromTime(time: number): number {
  if (time >= SCENE_TIMES.SCENE_6_START) return 6;
  if (time >= SCENE_TIMES.SCENE_5_START) return 5;
  if (time >= SCENE_TIMES.SCENE_4_START) return 4;
  if (time >= SCENE_TIMES.SCENE_3_START) return 3;
  if (time >= SCENE_TIMES.SCENE_2_START) return 2;
  return 1;
}

export const SCENE_LABELS: Record<number, string> = {
  1: "El Encuentro",
  2: "El Tejido del Destino",
  3: "El Impresionismo",
  4: "La Huella Permanente",
  5: "La Encrucijada",
  6: "El Cierre",
};
