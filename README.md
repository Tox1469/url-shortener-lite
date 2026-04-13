[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/url-shortener-lite/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/url-shortener-lite/actions)
[![License](https://img.shields.io/github/license/Tox1469/url-shortener-lite?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/url-shortener-lite?style=flat-square)](https://github.com/Tox1469/url-shortener-lite/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/url-shortener-lite?style=flat-square)](https://github.com/Tox1469/url-shortener-lite/stargazers)

---

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