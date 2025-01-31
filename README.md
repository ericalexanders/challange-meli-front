# Mercado Libre Challenge (FRONT)

### React + TypeScript + Vite + Tanstact/react-query + Biome + Vitest + Testing-library

Se usa Biomejs para el linter y el formateo del código.
Asi también vitest para los test unitarios.

Copmandos:

Modo desarrollo: `npm run dev`

Correr tests: `npm run test`

Coverage: `npm run coverage`

Linter: `npm run biome:lint`

Formater(prettier): `biome:format` 

>Cabe mencionar que se configuró un setting local de vscode para que verifique Biome en tiempo real (carpeta .vscode)

> También se configuró lefthook para poder ejecutar tareas antes de un commit en git (Corroborando linter y tests).

## Consideraciones de performance y optimización

El uso de un ref en cuanta de un estado para el valor del input de búsqueda, para evitar renderizados innecesarios (Uncontrolled Components).

```js
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = (inputRef.current as unknown as HTMLInputElement)?.value.trim();
    if (query) {
      navigate(`/items?search=${encodeURIComponent(query)}&limit=4`);
    }
  };

  return (
    ...
    <input
      ref={inputRef}
      type="text"
      placeholder="Buscar..."
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      onClick={(e) => e.stopPropagation()}
      aria-label="Buscar productos"
    />
  )
```

- A su vez se usa react-query para manejar los requests y estados del servidor (optimiza cache y refetch en caso de error, entre otras cosas). Se crea la función que realiza el fetch y se la usa en un hook. Ejemplo:

```js
// services/itemServices.ts

// mas codigo...
const getItems = async (query: Partial<SearchQuery>) => {
  const { search, ...rest } = query;
  const response = await Axios.get("/items", {
    params: {
      q: search,
      ...rest,
    },
  });
  return response.data;
};

export const useGetItems = (searchQuery: Partial<SearchQuery>): UseQueryResult<DataResponse> => {
  return useQuery({
    queryKey: ["items", searchQuery],
    queryFn: () => getItems(searchQuery),
    enabled: !!searchQuery.search,
  });
};
```
