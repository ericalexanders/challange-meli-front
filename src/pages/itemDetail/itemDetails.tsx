import { useParams } from "react-router-dom";
import { useGetItemsDetails } from "@/services/itemsServices";

import style from "./itemDetails.module.scss";
import { formatPrice } from "@/utils";

export default function ItemDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetItemsDetails(id as string);
  return (
    <section className={style.container}>
      {isLoading && <p className={style.text_center}>Loading...</p>}
      {!isLoading && data !== null && (
        <div className={style.item}>
          <div>
            <picture className={style.carousel}>
              {data?.item.pictures.map((picture, i) => (
                <div
                  key={i.toString()}
                  className={style.img}
                  style={{
                    backgroundImage: `url(${picture.secure_url})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ))}
            </picture>
            <div>
              <div className={style.isMobile}>
                <h2 className={style.item_title}>{data?.item.title}</h2>
                <p className={style.item_price}>
                  $ {formatPrice(data?.item.price.amount)},{data?.item.price.decimals}
                </p>
              </div>
              <h2>Descripción del producto</h2>
              <p className={style.item_description}>{data?.item.description}</p>
            </div>
          </div>
          <div className={style.item_details}>
            <div className={style.isDesktop}>
              <h2 className={style.item_title}>{data?.item.title}</h2>
              <p className={style.item_price}>
                $ {formatPrice(data?.item.price.amount)},{data?.item.price.decimals}
              </p>
            </div>
            <button type="button">Comprar</button>
          </div>
        </div>
      )}
    </section>
  );
}
