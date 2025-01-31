import { useSearchParams, Link } from "react-router-dom";
import { useGetItems } from "@/services/itemsServices";

import style from "./items.module.scss";
import { formatPrice } from "@/utils";

export default function Items() {
  const [searchParams] = useSearchParams();
  const searchQuery = Object.fromEntries(searchParams.entries());

  const { data, isLoading } = useGetItems(searchQuery);

  return (
    <section className={style.container}>
      {isLoading && <p className={style.text_center}>Loading...</p>}
      {!isLoading &&
        data?.items.map((item) => (
          <Link key={item.id} className={style.card} to={`/items/${item.id}`}>
            <picture>
              <img src={item.picture} alt={item.title} />
            </picture>
            <div className={style.cardContent}>
              <p>
                {item.price.currency} $ {formatPrice(item.price.amount)},{item.price.decimals}
              </p>
              <h3>{item.title}</h3>
            </div>
          </Link>
        ))}
    </section>
  );
}
