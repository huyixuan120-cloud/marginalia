# 📝 Guida alla Pubblicazione su Marginalia

## Sistema di Content Management (MDX)

Marginalia utilizza un sistema di pubblicazione basato su file **MDX** (Markdown + JSX). Ogni nuovo articolo è semplicemente un file `.mdx` nella cartella `content/essays/`.

---

## 🗂️ Struttura Directory

```
marginalia/
├── content/
│   └── essays/
│       ├── benvenuto-su-marginalia.mdx
│       ├── digital-minimalism.mdx
│       ├── deep-ecology.mdx
│       └── [il-tuo-nuovo-saggio].mdx
```

---

## ✍️ Come Pubblicare un Nuovo Articolo

### Passo 1: Crea il File MDX

Crea un nuovo file nella cartella `content/essays/` con un nome descrittivo in kebab-case:

```bash
content/essays/il-mio-nuovo-saggio.mdx
```

**Regole per il nome:**
- Usa solo lettere minuscole
- Separa le parole con trattini `-`
- Evita caratteri speciali, spazi o numeri all'inizio
- Esempi buoni: `elogio-della-lentezza.mdx`, `digital-minimalism.mdx`
- Esempi da evitare: `Nuovo Saggio.mdx`, `2024-articolo.mdx`

### Passo 2: Aggiungi il Frontmatter

Ogni file MDX **DEVE** iniziare con un blocco di metadati (frontmatter) racchiuso tra `---`:

```mdx
---
title: "Il Titolo del Tuo Saggio"
subtitle: "Un sottotitolo opzionale che approfondisce il tema"
date: "2025-12-18"
category: "Filosofia"
author: "Il Tuo Nome"
excerpt: "Una breve descrizione di 1-2 righe che apparirà come anteprima sulla homepage e nelle card."
image: "https://images.unsplash.com/photo-xxxxx?w=1200&auto=format&fit=crop"
readTime: "8 min"
featured: false
---
```

### Passo 3: Scrivi il Contenuto

Dopo il frontmatter, scrivi il contenuto usando **Markdown**:

```markdown
## Introduzione

Il primo paragrafo del tuo saggio...

### Sottosezione

Continua con il tuo contenuto. Puoi usare:

- **Grassetto** e *corsivo*
- Liste puntate
- [Link esterni](https://esempio.com)
- Citazioni
- Codice

> Una citazione importante

## Conclusione

Il paragrafo finale...
```

---

## 🎨 Campi del Frontmatter Spiegati

| Campo | Obbligatorio | Tipo | Descrizione |
|-------|--------------|------|-------------|
| `title` | ✅ Sì | String | Il titolo principale del saggio |
| `subtitle` | ❌ No | String | Sottotitolo opzionale |
| `date` | ✅ Sì | String (YYYY-MM-DD) | Data di pubblicazione |
| `category` | ✅ Sì | String | **DEVE** essere una delle categorie esistenti |
| `author` | ✅ Sì | String | Nome dell'autore |
| `excerpt` | ✅ Sì | String | Breve descrizione (max 2 righe) |
| `image` | ✅ Sì | String (URL) | URL dell'immagine di copertina |
| `readTime` | ❌ No | String | Tempo di lettura stimato (es. "8 min") |
| `featured` | ❌ No | Boolean | Se `true`, appare come hero sulla homepage |

### ⚠️ Categorie Valide

Il campo `category` **DEVE** corrispondere esattamente a una delle seguenti:

- `Economia`
- `Storia`
- `Società`
- `Geopolitica`
- `Filosofia`
- `Tecnologia`

**Attenzione:** Le categorie sono case-sensitive. `Filosofia` ✅ funziona, `filosofia` ❌ non funziona.

---

## 🖼️ Gestione Immagini

### Opzione 1: Immagini Esterne (Unsplash)

Usa URL di Unsplash con parametri ottimizzati:

```
https://images.unsplash.com/photo-[ID]?w=1200&auto=format&fit=crop
```

**Come trovare immagini su Unsplash:**
1. Vai su [unsplash.com](https://unsplash.com)
2. Cerca un'immagine pertinente
3. Clicca sull'immagine
4. Copia l'URL e aggiungi `?w=1200&auto=format&fit=crop`

### Opzione 2: Immagini Locali

Metti le immagini in `public/images/essays/`:

```
public/images/essays/mia-immagine.jpg
```

Poi usa il path relativo nel frontmatter:

```yaml
image: "/images/essays/mia-immagine.jpg"
```

---

## 📋 Template Completo

Copia questo template per iniziare un nuovo saggio:

```mdx
---
title: "Il Titolo del Saggio"
subtitle: "Un sottotitolo descrittivo"
date: "2025-12-18"
category: "Filosofia"
author: "Il Tuo Nome"
excerpt: "Una descrizione breve e accattivante che invita alla lettura. Massimo due righe."
image: "https://images.unsplash.com/photo-xxxxx?w=1200&auto=format&fit=crop"
readTime: "7 min"
featured: false
---

## Introduzione

Inizia con un'introduzione che cattura l'attenzione e introduce il tema centrale.

## Corpo del Saggio

### Prima Sezione

Sviluppa la tua argomentazione in modo chiaro e strutturato.

### Seconda Sezione

Continua l'esplorazione del tema con esempi, riferimenti e riflessioni.

## Conclusione

Chiudi con una sintesi o un'apertura verso ulteriori riflessioni.

---

*Nota finale o crediti opzionali*
```

---

## 🚀 Processo di Pubblicazione

1. **Crea il file MDX** in `content/essays/`
2. **Aggiungi frontmatter** e contenuto
3. **Salva il file**
4. **Il sito si aggiorna automaticamente!**

Non serve toccare il codice, compilare nulla o fare deploy manualmente. Il sistema legge automaticamente tutti i file `.mdx` e li mostra nel sito.

### Dove Appare il Nuovo Articolo?

- **Homepage** → Nella griglia "Latest Essays" (ordinati per data)
- **Pagina Categoria** → Nella sezione corrispondente alla `category` specificata
- **Hero Homepage** → Solo se `featured: true` nel frontmatter

---

## 🔍 Verifica

Dopo aver creato un nuovo file MDX, verifica che funzioni:

1. Vai su `http://localhost:3000`
2. Controlla che l'articolo appaia nella homepage
3. Clicca sulla categoria corrispondente e verifica che sia lì
4. Clicca sull'articolo per aprire la pagina completa

Se non appare:
- Verifica che il file sia in `content/essays/`
- Controlla che l'estensione sia `.mdx`
- Assicurati che il frontmatter sia valido (racchiuso tra `---`)
- Controlla che la `category` corrisponda esattamente a una delle 6 categorie

---

## 💡 Best Practices

### Titoli Efficaci
- Usa titoli chiari e descrittivi
- Evita clickbait o sensazionalismo
- Lunghezza ideale: 4-8 parole

### Excerpt Accattivanti
- Scrivi 1-2 frasi che sintetizzano il valore del saggio
- Usa un tono che invita alla lettura profonda
- Evita spoiler della conclusione

### Scelta Immagini
- Scegli immagini di alta qualità (minimo 1200px larghezza)
- Preferisci immagini pertinenti al tema ma non troppo letterali
- Evita immagini con testo sovrapposto

### Struttura del Contenuto
- Usa intestazioni `##` e `###` per organizzare il testo
- Paragrafi brevi (3-5 righe) per leggibilità
- Usa liste, citazioni e formattazione per variare il ritmo

---

## 🛠️ Troubleshooting

**Problema:** L'articolo non appare sul sito
- **Soluzione:** Controlla la console del browser per errori. Assicurati che il frontmatter sia valido YAML.

**Problema:** L'immagine non si carica
- **Soluzione:** Verifica che l'URL sia corretto e accessibile. Prova ad aprirlo in una nuova tab.

**Problema:** L'articolo appare nella categoria sbagliata
- **Soluzione:** Controlla che la `category` nel frontmatter corrisponda esattamente (maiuscole/minuscole) a una delle 6 categorie.

---

## 📚 Risorse Utili

- **Markdown Guide:** https://www.markdownguide.org/basic-syntax/
- **Unsplash (Immagini gratis):** https://unsplash.com
- **YAML Validator:** https://www.yamllint.com/

---

**Buona scrittura! 📖**
