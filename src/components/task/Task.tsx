import { FC } from 'react';
import Props from './Task.types';
import Button from '../button';
import Tag from '../tag';
import style from './Task.module.scss';

const Task: FC<Props> = ({
  title,
  description,
  status,
  disabled = false,
  onClickStart,
}: Props): JSX.Element => (
  <section
    className={`${style.component} ${disabled && style.disabled} ${status && style[status]}`}
    data-testid="task"
  >
    <div className={style.component__title}>{title}</div>
    <div className={style.component__description}>{description}</div>
    {status && <Tag status={status} text={status} />}
    <Button disabled={disabled} color="success" text="start" onClick={onClickStart} />
  </section>
);

export default Task;
