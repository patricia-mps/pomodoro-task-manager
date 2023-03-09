import { FC } from 'react';
import Props from './Button.types';
import style from './Button.module.scss';

const Button: FC<Props> = ({
  className = '',
  color = 'light',
  dataTesteId = 'button',
  disabled = false,
  text,
  onClick,
}: Props): JSX.Element => (
  <button
    type="button"
    className={`${style.component} ${style[color]} ${className}`}
    onClick={onClick}
    disabled={disabled}
    data-testid={dataTesteId}
  >
    {text}
  </button>
);

export default Button;
