import React from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import styles from "./register.module.scss";
import logo from "public/icons/logo.svg";
import Seo from "@/components/Seo/Seo";
import { useForm } from "react-hook-form";
import { Button, useToast } from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schemas/register";
import Link from "next/link";
import { Router, useRouter } from "next/router";

const Register = () => {
  const {
    register,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });
  const toast = useToast();
  const router = useRouter();

  const handleRegister = async () => {
    const formData = watch();
    try {
      await axios
        .post("http://localhost:4000/register", {
          ...formData,
          createdAt: new Date(),
        })
        .then((res) => {
          toast({
            title: res.data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          router.push("/login");
        });
    } catch (error) {
      console.error("Erro na solicitação:", error);
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        "Erro desconhecido";
      toast({
        title: errorMessage,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
              <Link href={"/login"}>
                <p className={styles.registerPageContentContainerSpanA}>
                  Faça login
                </p>
              </Link>
            </span>
          </div>
          <CustomInput
            label="Nome"
            type="text"
            placeholder="Nome completo"
            register={register}
            name="name"
            errors={errors}
          />

          <CustomInput
            label="Email"
            type="text"
            placeholder="Digite sua email"
            register={register}
            name="email"
            errors={errors}
          />

          <CustomInput
            label="Telefone"
            type="text"
            placeholder="Telefone com DDD"
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
              w={"100%"}
              size="md"
              onClick={onSubmit(handleRegister)}
              background={"blackAlpha.900"}
              color={"white"}
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
