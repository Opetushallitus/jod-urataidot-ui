/**
 * Calculates a location of single point for a hexagon from origo
 * with given viweport size and angle. The origin is offset to diameter / 2
 */
export const calculateCirclePoint = (viewBox: number, radius: number, i: number) => {
  const angle = (2 * Math.PI * (6 - (6 - i) - 1.5)) / 6;
  const x = Math.cos(angle) * radius + viewBox / 2;
  const y = Math.sin(angle) * radius + viewBox / 2;

  return { x, y };
};

export const calcHexPath = (viewBox: number, radius: number) => {
  let path = '';

  for (let i = 0; i < 6; i++) {
    const { x, y } = calculateCirclePoint(viewBox, radius, i);

    path = path + `L${x.toFixed(3)},${y.toFixed(3)}`;
  }

  // add last point as path start and end on z
  return `M${path.slice(-(path.length - path.lastIndexOf('L') - 1))}` + path + 'z';
};

export const calcStatPath = (viewBox: number, stats: number[]) => {
  let path = '';

  for (let i = 0; i < 6; i++) {
    const { x, y } = calculateCirclePoint(viewBox, stats[i], i);

    path = path + `L${x.toFixed(3)},${y.toFixed(3)}`;
  }

  // add last point as path start and end on z
  return `M${path.slice(-(path.length - path.lastIndexOf('L') - 1))}` + path + 'z';
};
