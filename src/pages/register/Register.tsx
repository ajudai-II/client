import LoginRegisterHeader from "@/components/LoginRegisterHeader/LoginRegisterHeader";
import axios from "axios";
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import styles from "./register.module.scss";
import Input from "@/components/Input/Input";
import Image from "next/image";
import { Button } from "@chakra-ui/react";

const Register = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    await axios
      .post("https://localhost:3000/register/register", {
        userName: name,
        userEmail: email,
        userPhoneNumber: phoneNumber,
        userCpf: cpf,
        userPassword: password,
        createdAt: new Date(),
      })
      .then(() => {
        setName("");
        setPhoneNumber("");
        setPassword("");
        setCPF("");
      });
  };

  return (
    <main className={styles.registerPageMain}>
      <LoginRegisterHeader>
        <Image
          src={logo}
          alt="Ajudaí logo"
          className={styles.registerPageLogoImg}
        />
      </LoginRegisterHeader>

      <div className={styles.registerPageinputsBox}>
        <div className={styles.inputsBoxContainer}>
          <div className={styles.registerPageDesktopContentContainer}>
            <p className={styles.registerPageDesktopContentContainerP}>
              Criar conta
            </p>
            <span className={styles.registerPageDesktopContentContainerSpan}>
              <p className={styles.registerPageDesktopContentContainerSpanP}>
                Já tem conta?
              </p>
              <p className={styles.registerPageDesktopContentContainerSpanA}>
                Faça login
              </p>
            </span>
          </div>

          {error && <p className={styles.registerPageErrorP}>{errorMessage}</p>}
          <Input
            error={error}
            value={name}
            type={"text"}
            label="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            error={error}
            value={email}
            type={"text"}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            error={error}
            type={"number"}
            value={phoneNumber}
            label="Telefone"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            error={error}
            value={cpf}
            type={"text"}
            label="CPF"
            onChange={(e) => setCPF(e.target.value)}
            placeholder="CPF deve conter 11 caracteres"
          />
          <Input
            error={error}
            value={password}
            type="password"
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha deve conter pelo menos uma letra maiúscula e caractere especial"
          />
          <div className={styles.registerCheckbox}>
            <input type="checkbox" id="registerCheckbox"></input>
            <label htmlFor="registerCheckbox">
              Concordo com os termos de uso
            </label>
          </div>
          <div className={styles.registerPageRegisterButton}>
            <Button
              colorScheme="blackAlpha"
              size="md"
              onClick={() => handleRegister()}
            >
              Registrar
            </Button>
          </div>
          <p className={styles.registerPagePP}>Política de Privacidade</p>
          <span
            className={styles.registerPageDesktopContentContainerSpanMobile}
          >
            <p
              className={styles.registerPageDesktopContentContainerSpanPMobile}
            >
              Já tem conta?
            </p>
            <p
              className={styles.registerPageDesktopContentContainerSpanAMobile}
            >
              Faça login
            </p>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Register;
