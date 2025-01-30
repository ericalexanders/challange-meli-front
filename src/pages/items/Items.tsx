import { useSearchParams } from "react-router-dom";
import { useGetItems } from "@/services/itemsServices";

import style from "./items.module.scss";

export default function Items() {
  const [searchParams] = useSearchParams();
  const searchQuery = Object.fromEntries(searchParams.entries());

  const { data, isLoading, error } = useGetItems(searchQuery);

  return (
    <section className={style.container}>
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        data?.items.map((item) => (
          <div key={item.id} className={style.card}>
            <img src={item.picture} alt={item.title} />
            <div className={style.cardContent}>
              <h3>{item.title}</h3>
              <p>
                {item.price.currency} {item.price.amount}
              </p>
            </div>
          </div>
        ))}
    </section>
  );
}
