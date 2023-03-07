interface Props {
  title?: string;
  description?: string;
  status?: 'started' | 'stopped' | 'completed' | 'canceled';
  disabled?: boolean;
  onClickStart(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default Props;
