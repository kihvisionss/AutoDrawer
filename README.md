# AutoDrawer Bookmarklet Tool 🖌️

A JavaScript bookmarklet tool that lets you **upload an image**, see a **preview on your mouse**, and **click to draw** the image onto any webpage in black and white.

> Created by [Kih](https://github.com/kihvisionss)

---

## 🔧 Features

- 🖼️ Upload any image file (PNG, JPG, etc.)
- 👁️ Live preview follows your mouse
- 🖱️ Click to draw the image directly onto the screen (black & white mode)
- 🧩 Works as a browser bookmarklet
- 🟣 Inspired by Blooket-style GUIs

---

## 🚀 How to Use

### 1. **Create a Bookmarklet**

Make a bookmark with this code as the URL:

```javascript
javascript:(function(){
  const script = document.createElement('script');
  script.src = 'https://raw.githubusercontent.com/yourusername/autodrawer/main/autodrawer.js';
  document.body.appendChild(script);
})();
