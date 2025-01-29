import style from "./header.module.scss";

export default function Header() {
  return (
    <header className={style.nav_header}>
      <div className={style.container}>
        <div className={style.img_logo} role="img" aria-label="MercadoLibre Logo" />
        <div className={style.input} data-testid="search-icon">
          <input type="text" placeholder="Buscar..." />
        </div>
      </div>
    </header>
  );
}
