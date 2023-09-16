import styles from "./date.module.css"

/**
 * Компонент Date
 * @param {{
*          className: string;
*          othersProps: HTMLInputElement;
*        }} props - пропсы
*/
export const Date = (props) => {
  const { className, ...othersProps } = props;

  const inputCN = `${styles.input} ${className ? className : ""}`;

  return <input className={inputCN} type="datetime-local" {...othersProps} />
}