const rippleCanvas = document.getElementById("ripples");
const rctx = rippleCanvas.getContext("2d");
let w, h;

function resize() {
  w = rippleCanvas.width = window.innerWidth;
  h = rippleCanvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Clean Cursor Ripple Effect
let ripples = [];

window.addEventListener("mousemove", (e) => {
  ripples.push({ x: e.clientX, y: e.clientY, r: 0 });
});

function drawRipples() {
  rctx.clearRect(0, 0, w, h);

  ripples.forEach((rp) => {
    rp.r += 2.2;
    rctx.beginPath();
    rctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
    rctx.strokeStyle = `hsl(${(rp.r * 2) % 360}, 90%, 60%)`;
    rctx.globalAlpha = Math.max(0, 0.35 - rp.r / 260);
    rctx.lineWidth = 3;
    rctx.stroke();
  });

  ripples = ripples.filter((rp) => rp.r < 260);
}

function animate() {
  drawRipples();
  requestAnimationFrame(animate);
}

animate();
