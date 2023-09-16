import styles from "./checkbox.module.css";

/**
 * Компонент Checkbox
 * @param {{
 *          id: number;
 *          className: string;
 *          othersProps: HTMLInputElement;
 *        }} props - пропсы
 */
export const Checkbox = (props) => {
  const { className, id, ...othersProps } = props;

  const inputCN = `${styles.checkbox} ${className ? className : ""}`;

  return <input id={id} className={inputCN} type="checkbox" {...othersProps} />;
};
