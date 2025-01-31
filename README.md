# Mercado Libre Challange (FRONT)

### React + TypeScript + Vite + Tanstact/react-query + Biome + Vitest + Testing-library

Se usa Biomejs para el linter y el formateo del código.
Asi también vitest para los test unitarios.

Copmandos:

Modo desarrollo: `npm run dev`
Correr test: `npm run test`
Coverage: `npm run coverage`
Linter: `npm run biome:lint`
Formter(prettier): `biome:format` 

>Cabe mencionar que se configuró un setting local cd vsCode para que verifique Biome en tiempo real.

> Tambien se configuró lefthook para poder ejecutar tareas antes de un commit en git (Corroborando linter y tests).

## Consideraciones de performance y optimización

El uso de un ref en cuanta de un estado par al balor del input de busqueda, para evitar renderizados inecesarios.

- Configure the top-level `parserOptions` property like this:

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

- A su vez se usa react-query para manejar los estados del servidor (optimizar cache y refetch en caso de error). Se crea la funcion que realiza el fetch y se la usa en un hook.

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
