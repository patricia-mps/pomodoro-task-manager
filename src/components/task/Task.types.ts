interface Props {
  title?: string;
  description?: string;
  status?: 'started' | 'stopped' | 'completed';
  disabled?: boolean;
  onClickStart(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default Props;
