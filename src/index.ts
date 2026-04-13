// url-shortener-lite: in-memory URL shortener with custom aliases
const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export interface ShortLink {
  alias: string;
  url: string;
  createdAt: number;
  hits: number;
}

export class UrlShortener {
  private store = new Map<string, ShortLink>();
  constructor(private baseUrl = "https://short.ly/", private aliasLength = 6) {}

  private random(len: number): string {
    let s = "";
    for (let i = 0; i < len; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    return s;
  }

  private validateUrl(url: string): void {
    try {
      new URL(url);
    } catch {
      throw new Error("Invalid URL: " + url);
    }
  }

  shorten(url: string, customAlias?: string): ShortLink {
    this.validateUrl(url);
    if (customAlias) {
      if (!/^[A-Za-z0-9_-]{1,32}$/.test(customAlias)) throw new Error("Invalid alias");
      if (this.store.has(customAlias)) throw new Error("Alias already in use");
      const link = { alias: customAlias, url, createdAt: Date.now(), hits: 0 };
      this.store.set(customAlias, link);
      return link;
    }
    let alias = this.random(this.aliasLength);
    while (this.store.has(alias)) alias = this.random(this.aliasLength);
    const link = { alias, url, createdAt: Date.now(), hits: 0 };
    this.store.set(alias, link);
    return link;
  }

  resolve(alias: string): string | null {
    const link = this.store.get(alias);
    if (!link) return null;
    link.hits++;
    return link.url;
  }

  get(alias: string): ShortLink | undefined {
    return this.store.get(alias);
  }

  delete(alias: string): boolean {
    return this.store.delete(alias);
  }

  buildUrl(alias: string): string {
    return this.baseUrl + alias;
  }

  stats(): { total: number; totalHits: number } {
    let totalHits = 0;
    for (const l of this.store.values()) totalHits += l.hits;
    return { total: this.store.size, totalHits };
  }

  list(): ShortLink[] {
    return [...this.store.values()];
  }
}
