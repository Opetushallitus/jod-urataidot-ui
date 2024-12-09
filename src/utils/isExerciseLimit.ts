export const isExerciseLimit = ({
  score,
  min,
  max,
}: {
  score: number;
  min: undefined | number;
  max: undefined | number;
}) => {
  const minIs = min === undefined || min <= score;
  const maxIs = max === undefined || score < max;

  return minIs && maxIs;
};
