interface Props {
  className?: string;
  color?: 'success' | 'info' | 'warning' | 'danger' | 'light';
  dataTesteId?: string;
  disabled?: boolean;
  text: string;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default Props;
