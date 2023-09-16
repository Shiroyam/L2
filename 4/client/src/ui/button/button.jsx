import styles from "./button.module.css";

/**
 * Компонент Button
 * @param {{
 *          className: string; 
 *          variant: "filled" | "default"; 
 *          children: ReactNode; 
 *          rightIcon: ReactNode;
 *          leftIcon: ReactNode;
 *          othersProps: ButtonHTMLAttributes;
 *        }} props - пропсы
 */
export const Button = (props) => {
  const {
    className,
    variant = "filled",
    children,
    rightIcon,
    leftIcon,
    ...othersProps
  } = props;

  const buttonCN = `${styles.button} ${styles[variant]} ${className ? className : ''}`

  return (
    <button className={buttonCN} {...othersProps}>
      {leftIcon ? <span className={styles["icon-left"]}>{leftIcon}</span> : null}
        
      {children}

      {rightIcon ?  <span className={styles["icon-right"]}>{rightIcon}</span>: null}
    </button>
  );
};
