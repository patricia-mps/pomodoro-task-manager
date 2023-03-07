import { FC, memo } from 'react';
import style from './Header.module.scss';

const Header: FC = (): JSX.Element => (
  <header className={style.component} data-testid="header">
    <div className={style.component__text}>Pomodor task manager</div>
  </header>
);

export default memo(Header);
