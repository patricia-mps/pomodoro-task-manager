import { FC, memo } from 'react';
import style from './Footer.module.scss';
import GitHubIcon from '../../assets/img/github-icon.png';
import LinkedInIcon from '../../assets/img/linkedin-icon.png';

const Footer: FC = (): JSX.Element => (
  <footer className={style.component} data-testid="footer">
    <div className={style.component__text}>Developed by Patrícia Silva</div>
    <div className={style.component__icons}>
      <a
        href="https://github.com/patricia-mps"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        aria-label="github link"
      >
        <img src={GitHubIcon} alt="github icon" />
      </a>
      <a
        href="https://www.linkedin.com/in/patriciapsilva/"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        aria-label="linkedin link"
      >
        <img src={LinkedInIcon} alt="linkedin icon" />
      </a>
    </div>
  </footer>
);

export default memo(Footer);
