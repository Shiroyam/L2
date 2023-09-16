import styles from "./input.module.css";

/**
 * Компонент Input
 * @param {{
*          className: string;
*          othersProps: HTMLInputElement;
*        }} props - пропсы
*/
export const Input = (props) => {
  const { className, ...othersProps } = props;

  const inputCN = `${styles.input} ${className ? className : ""}`;

  return <input className={inputCN} {...othersProps} />;
};
