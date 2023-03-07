import { FC } from 'react';
import style from './Homepage.module.scss';

const Homepage: FC = (): JSX.Element => {
  return (
    <section className={style.component} data-testid="homepage">
      <div className={style.component__left}></div>
      <div className={style.component__right}></div>
    </section>
  );
};

export default Homepage;
