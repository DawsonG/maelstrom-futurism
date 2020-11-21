export function snapToGrid(physicalXY: Array<number>): [number, number] {
  const snappedX = Math.round(physicalXY[0] / 32) * 32;
  const snappedY = Math.round(physicalXY[1] / 32) * 32;
  return [snappedX, snappedY];
}
