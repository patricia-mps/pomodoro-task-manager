import { FC } from 'react';
import Task from '../../components/task';
import style from './Homepage.module.scss';

const Homepage: FC = (): JSX.Element => {
  return (
    <section className={style.component} data-testid="homepage">
      <div></div>
      <div className={style.component__content}></div>
    </section>
  );
};

export default Homepage;
