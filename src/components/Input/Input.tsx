import React from "react";
import { HTMLInputTypeAttribute } from 'react';
import styles from "./input.module.scss";

interface IInput {
  label: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  type: HTMLInputTypeAttribute;
  error?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
}

const Input: React.FC<IInput> = ({
  label,
  onChange,
  type,
  error,
  value,
  name,
  placeholder,
}) => {
  const inputClasses = `${styles.inputComponentInput}`;
  return (
    <div className={styles.inputComponentDiv}>
      <p
        className={
          error ? styles.inputComponentLabelError : styles.inputComponentLabel
        }
      >
        {label}
      </p>
      <input
        value={value}
        name={name}
        className={inputClasses}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default Input;
