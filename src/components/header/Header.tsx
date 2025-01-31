import { useRef } from "react";
import style from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = (inputRef.current as unknown as HTMLInputElement)?.value.trim();
    if (query) {
      navigate(`/items?search=${encodeURIComponent(query)}&limit=4`);
    }
  };

  return (
    <header className={style.nav_header}>
      <div className={style.container}>
        <Link
          to="/"
          onClick={() => {
            const inputElement = inputRef.current as unknown as HTMLInputElement;
            inputElement.value = "";
          }}
        >
          <div className={style.img_logo} role="img" aria-label="MercadoLibre Logo" />
        </Link>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div className={style.input} data-testid="search-icon" onClick={handleSearch}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar..."
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onClick={(e) => e.stopPropagation()}
            aria-label="Buscar productos"
          />
        </div>
      </div>
    </header>
  );
}
