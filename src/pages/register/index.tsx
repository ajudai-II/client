import React from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./register.module.scss";
import logo from "public/icons/logo.svg";
import Seo from "@/components/Seo/Seo";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

const schema = object({
  name: string()
    .required("Campo obrigatório")
    .min(3, "Nome deve conter no mínimo 3 caracteres"),
  email: string().email("Formato inválido").required("Campo obrigatório"),
  phone: string().required("Campo obrigatório"),
  cpf: string()
    .required("Campo obrigatório")
    .min(11, "CPF deve conter 11 caracteres")
    .max(11, "CPF deve conter 11 caracteres"),
  password: string()
    .required("Campo obrigatório")
    .min(8, "No mínimo 8 caracteres"),
});

const Register = () => {
  const {
    register,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleRegister = async () => {
    const formData = watch();
    try {
      await axios.post("http://localhost:4000/register", {
        ...formData,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  return (
    <main className={styles.registerPageMain}>
      <Seo title="Registro no Ajudaí" />
      <div className={styles.registerPageinputsBox}>
        <div className={styles.inputsBoxContainer}>
          <Image
            src={logo}
            alt="Ajudaí logo"
            className={styles.registerPageLogoImg}
          />
          <div className={styles.registerPageContentContainer}>
            <p className={styles.registerPageContentContainerP}>Criar conta</p>
            <span className={styles.registerPageContentContainerSpan}>
              <p className={styles.registerPageContentContainerSpanP}>
                Já tem conta?
              </p>
              <p className={styles.registerPageContentContainerSpanA}>
                Faça login
              </p>
            </span>
          </div>
          <CustomInput
            label="Nome"
            type="text"
            register={register}
            name="name"
            errors={errors}
          />

          <CustomInput
            label="Email"
            type="text"
            register={register}
            name="email"
            errors={errors}
          />

          <CustomInput
            label="Telefone"
            type="text"
            register={register}
            name="phone"
            errors={errors}
          />

          <CustomInput
            label="CPF"
            type="text"
            register={register}
            name="cpf"
            placeholder="CPF deve conter 11 caracteres"
            errors={errors}
          />

          <CustomInput
            label="Senha"
            type="password"
            register={register}
            name="password"
            placeholder="Senha com pelo menos letra maiúscula e caractere especial"
            errors={errors}
          />

          <div className={styles.registerPageRegisterButton}>
            <Button
              colorScheme="blackAlpha"
              size="md"
              onClick={onSubmit(handleRegister)}
            >
              Registrar
            </Button>
          </div>
          <p className={styles.registerPagePP}>Política de Privacidade</p>
        </div>
      </div>
    </main>
  );
};

export default Register;
