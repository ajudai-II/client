import { useState } from 'react';
import styles from './login.module.scss';
import Button from '../../components/button/Button';
import logo from '../../assets/logo.svg';
import LoginRegisterHeader from '../../components/loginRegisterHeader/LoginRegisterHeader';
import Image from 'next/image';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <main className={styles.loginPageMain}>
      <LoginRegisterHeader>
        <Image src={logo} alt="Ajudaí logo" className={styles.loginPageLogoImg} />
      </LoginRegisterHeader>

      <div className={styles.loginPageinputsBox}>
        <div className={styles.inputsBoxContainer}>
          <div className={styles.loginPageDesktopContentContainer}>
            <p className={styles.loginPageDesktopContentContainerP}>Bem vindo(a)</p>
            <span className={styles.loginPageDesktopContentContainerSpan}>
              <p className={styles.loginPageDesktopContentContainerSpanP}>Não tem uma conta?</p>
              <p className={styles.loginPageDesktopContentContainerSpanA}>
                Abra uma
              </p>
            </span>
          </div>

          {isError && <p className={styles.loginPageErrorP}>{errorMessage}</p>}
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={email} />
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" value={password} />
          <p className={styles.loginPageForgetPasswordP}>Esqueci minha senha</p>
          <div className={styles.loginPageLoginButton}>
            <Button size="medium" disabled={false} rounded label="Login" />
          </div>
          <span className={styles.loginPageDesktopContentContainerSpanMobile}>
            <p className={styles.loginPageDesktopContentContainerSpanPMobile}>Não tem uma conta?</p>
            <p className={styles.loginPageDesktopContentContainerSpanAMobile}>
              Abra uma
            </p>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Login;
