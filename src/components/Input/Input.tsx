import React, { useState } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
import styles from "./input.module.scss";
import { UseFormRegister } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: HTMLInputTypeAttribute;
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  errors?: any;
}

const CustomInput: React.FC<IInput> = ({
  label,
  type,
  name,
  register,
  placeholder,
  errors,
}) => {
  return (
    <div>
      {label && <label className={styles.inputLabel}>{label}</label>}
      <Input
        borderColor={errors?.[name] ? "red" : undefined}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: true })}
      />
      {errors[name] && (
        <p className={styles.errorMessage}>{errors[name].message}</p>
      )}
    </div>
  );
};

export default CustomInput;
