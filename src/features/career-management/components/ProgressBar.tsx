export const ProgressBar = ({ percentage = 0 }: { percentage: number }) => {
  return (
    <div
      role="progressbar"
      aria-label="todo"
      aria-valuemin={0}
      aria-valuemax={100}
      className="absolute z-100 h-2 w-full"
    >
      <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }} />
    </div>
  );
};
