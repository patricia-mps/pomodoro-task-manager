import { FC, useState } from 'react';
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
}: Props): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <section
      className={`${style.component} ${disabled && style.disabled} ${open && style.open} ${
        status && style[status]
      }`}
      data-testid="task"
    >
      <div className={style.component__title}>{title}</div>
      <div className={style.component__description}>{description}</div>
      {status && <Tag status={status} text={status} />}
      {status !== 'completed' && status !== 'started' && (
        <Button disabled={disabled} color="info" text="Start" onClick={onClickStart} />
      )}
      <Button
        className={style.component__buttonOpen}
        text={open ? '⌃' : '⌄'}
        onClick={() => setOpen(prev => !prev)}
      />
    </section>
  );
};

export default Task;
