# url-shortener-lite

Encurtador de URLs em memória, com suporte a alias customizado, contagem de hits e validação de URL.

## Instalação

```bash
npm install url-shortener-lite
```

## Uso

```ts
import { UrlShortener } from "url-shortener-lite";

const s = new UrlShortener("https://tox.io/");
const link = s.shorten("https://example.com/some/long/path");
console.log(s.buildUrl(link.alias));

s.shorten("https://anthropic.com", "claude");
s.resolve("claude"); // https://anthropic.com
```

## API

- `new UrlShortener(baseUrl?, aliasLength?)`
- `shorten(url, customAlias?)` — cria link curto
- `resolve(alias)` — retorna URL e incrementa hits
- `get(alias)` / `delete(alias)` / `list()` / `stats()`
- `buildUrl(alias)` — URL completa

## Licença

MIT
