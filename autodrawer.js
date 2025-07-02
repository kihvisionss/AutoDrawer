
(function () {
  // Check for existing UI
  if (document.getElementById("autoDrawerGUI")) return;

  // Create main container
  const gui = document.createElement("div");
  gui.id = "autoDrawerGUI";
  gui.style.cssText = `
    position: fixed;
    top: 100px;
    left: 100px;
    background: #4b0082;
    color: white;
    padding: 10px;
    border-radius: 10px;
    z-index: 999999;
    width: 300px;
    font-family: sans-serif;
  `;
  gui.innerHTML = \`
    <h3 style="margin-top:0;">AutoDrawer</h3>
    <input type="file" id="fileInput" accept="image/*" />
    <p>Click anywhere to draw image (B&W)</p>
    <button id="closeGUI">❌</button>
  \`;
  document.body.appendChild(gui);

  // Close button
  document.getElementById("closeGUI").onclick = () => gui.remove();

  let imageBitmap = null;

  // Load file
  document.getElementById("fileInput").addEventListener("change", async function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Convert to black and white
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const avg = (imgData.data[i] + imgData.data[i+1] + imgData.data[i+2]) / 3;
      imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = avg > 128 ? 255 : 0;
    }
    ctx.putImageData(imgData, 0, 0);

    imageBitmap = await createImageBitmap(canvas);
    document.body.style.cursor = "crosshair";

    // Add click handler to draw
    document.onclick = function drawImage(e) {
      if (!imageBitmap) return;
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCanvas.style.position = "absolute";
      tempCanvas.style.left = e.pageX + "px";
      tempCanvas.style.top = e.pageY + "px";
      tempCanvas.style.pointerEvents = "none";
      tempCanvas.style.zIndex = 99999;
      tempCanvas.getContext("2d").drawImage(imageBitmap, 0, 0);
      document.body.appendChild(tempCanvas);
    };
  });
})();
