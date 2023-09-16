import { useState, Children } from "react";
import styles from "./tabs.module.css";

/**
 * Компонент Tabs
 * @param {{
 *          children: ReactNode;
 *          spacing: number;
 *          className: string;
 *          active: number;
 *        }} props - пропсы
 */
export const Tabs = (props) => {
  const { children, className, spacing, active } = props;

  const [state, setState] = useState(active);

  const tabsCN = `${styles.tabs} ${className ? className : ''}`;

  const _children = Children.toArray(children);

  return (
    <ul style={{ gap: spacing }} className={tabsCN}>
      {_children.map((value, index) => {
        const tabCN = `${styles.li} ${state === index ? [styles.active] : ''}`;
         
        return (
          <li onClick={() => setState(index)} className={tabCN} key={index}>
            {value}
          </li>
        );
      })}
    </ul>
  );
};

export const Tab = ({ children, className }) => {
  const tabCN = `${styles.tab} ${className ? className : ''}`;

  return <div className={tabCN}>{children}</div>;
};
