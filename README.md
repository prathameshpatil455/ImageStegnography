# 🕵️‍♂️ Image Steganography Web App

A privacy-focused web application that allows users to **hide secret text messages within images** using steganography techniques, all processed client-side in the browser. Built with **ReactJS**, **TailwindCSS**, and **shadcn/ui**, this tool offers a sleek, responsive UI with robust encryption and decryption logic.

---

## 🌐 Live Demo

🔗 [Try it Now](https://image-stegnography.netlify.app/)

---

## 🚀 Features

### ✨ Encode (Encrypt + Embed)
- Upload an image (`.png`, `.jpg`, etc.)
- Input a **secret message** to be embedded
- Encrypts and hides the text inside the image using steganography
- Download the new image with the hidden data

### 🔓 Decode (Extract + Decrypt)
- Upload the stego-image (previously downloaded)
- Automatically extracts and decrypts the hidden message
- Secure and accurate retrieval

### 🛡️ All in Browser
- No server, no data storage—**100% client-side**
- Uses browser-native APIs for encryption and file handling

### 💻 Tech Highlights
- Built with **ReactJS** for responsive SPA structure
- **TailwindCSS** for modern utility-first styling
- **shadcn/ui** for clean, accessible component design
- Custom **crypto logic** for safe message encryption and retrieval

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| ReactJS | Frontend framework |
| TailwindCSS | Styling and layout |
| shadcn/ui | UI components |
| Custom Crypto | Message encryption/decryption |
| HTML5 Canvas | Image pixel manipulation |

---

## Development

**Requirements:** [Node.js](https://nodejs.org/) (LTS recommended) and [pnpm](https://pnpm.io/) (see `packageManager` in `package.json`; [Corepack](https://nodejs.org/api/corepack.html) can install the pinned version).

```bash
pnpm install
pnpm dev
```

The dev server prints a local URL (typically `http://localhost:5173`).

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Typecheck and production build (`dist/`) |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | Run ESLint |

**CI:** Pushing or opening a pull request against `main` or `master` runs lint and production build on GitHub Actions (`.github/workflows/ci.yml`).

**Deployment:** The live site is hosted on [Netlify](https://www.netlify.com/); connect the repo there and use install command `pnpm install` and build command `pnpm build` (or rely on Netlify’s detection when `pnpm-lock.yaml` is present).

---

