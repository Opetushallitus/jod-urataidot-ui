interface TitleProps {
  value: string;
}

export const Title = ({ value }: TitleProps) => {
  return <title>{`${value}`}</title>;
};
