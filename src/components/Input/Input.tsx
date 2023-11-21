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
  const [isPassword, setIsPassword] = useState(false);
  return (
    <div>
      {label && <label className={styles.inputLabel}>{label}</label>}
      <InputGroup>
        <Input
          borderColor={errors?.[name] ? "red" : undefined}
          type={isPassword ? type : "text"}
          placeholder={placeholder}
          {...register(name, { required: true })}
        />
        {type === "password" && (
          <InputRightElement onClick={() => setIsPassword(!isPassword)}>
            {isPassword ? (
              <ViewOffIcon color="gray.500" />
            ) : (
              <ViewIcon color="gray.500" />
            )}
          </InputRightElement>
        )}
      </InputGroup>
      {errors[name] && (
        <p className={styles.errorMessage}>{errors[name].message}</p>
      )}
    </div>
  );
};

export default CustomInput;
