export const ProgressBar = ({ percentage = 0 }: { percentage: number }) => {
  return (
    <div
      role="progressbar"
      aria-label="todo"
      aria-valuemin={0}
      aria-valuemax={100}
      className="z-100 absolute h-1 w-full"
    >
      <div className="h-1 rounded-full bg-primary transition-all duration-300" style={{ width: `${percentage}%` }} />
    </div>
  );
};
