import { FC } from 'react';
import Props from './Tag.types';
import style from './Tag.module.scss';

const Tag: FC<Props> = ({ text, status }: Props): JSX.Element => (
  <span data-testid="tag" className={`${style.component} ${status && style[status]}`}>
    {text}
  </span>
);

export default Tag;
