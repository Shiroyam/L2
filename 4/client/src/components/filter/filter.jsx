import { Button, Tab, Tabs } from "../../ui";
import { useState } from "react";
import arrow from "../../assets/arrow.svg";
import styles from "./filter.module.css";

export const Filter = ({ sort, setSort }) => {
  const [sortActiveId, setSortActiveId] = useState(sort[0].id);

  const handleChangeSort = (id, asc) => {
    const newSort = sort.map((sort) => {
      sort.active = false

      if (sort.id === id) {
        sort.asc = !asc
        sort.active = true
      }

      return sort
    })

    setSortActiveId(id)
    setSort(newSort)
  }

  return (
    <section className={styles.filter}>
      <div className={styles.sort}>
        <div>сортировка:</div>
        <Tabs active={sortActiveId}>
          {sort.map(({ id, name, asc }) => {
            const arrowCN = `${asc ? styles.top : styles.bottom}`;

            return (
              <Tab key={id}>
                <Button
                  onClick={() => handleChangeSort(id, asc)}
                  variant="default"
                  className={styles["btn-sort"]}
                >
                  {name} <img className={arrowCN} src={arrow} />
                </Button>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};
