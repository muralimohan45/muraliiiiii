/* =====================  EDIT YOUR MESSAGES HERE  ===================== */
const CONFIG = {
  name: "Muralii",
  from: "Your Friend",
  gems: [
    { icon: "★", color: "#ffd23f", title: "The Gold of Friendship",
      text: "Money buys things. Friendship buys memories.\nAnd somehow you made me the richest person in every room we ever shared." },
    { icon: "☺", color: "#ff4fa3", title: "The Ruby of Laughter",
      text: "Some people make life louder. You make it lighter.\nMay this year laugh so hard at your problems that they pack up and leave." },
    { icon: "♥", color: "#7dff6b", title: "The Emerald of Loyalty",
      text: "Seasons change, people drift, but you stay.\nA friend like you is never found twice in one lifetime." },
    { icon: "✦", color: "#29e0ff", title: "The Sapphire of Destiny",
      text: "The stars are not waiting above you, they are waiting for you.\nGo and take your sky this year, Murali." }
  ],
  jerseyName: "MURALI", jerseyNo: "45",
  wishes: [
    "Health: may your body be strong and your mind stay calm.",
    "Wealth: may your pocket grow heavier than your excuses.",
    "Success: may every door you knock on open before you finish knocking.",
    "TRAP! It was just air. Murali owes everyone a treat now. 🍕",
    "Love: may you always be surrounded by people who feel like home.",
    "Peace: may your phone battery and your patience both last all day.",
    "Adventure: may this year take you somewhere you have never been.",
    "Luck: may even the red lights turn green when you arrive."
  ],
  finalNote: "You are not just a friend, you are a chapter of my life I would never skip.\nMay this year be your richest one yet.\nThe treasure is yours, and the party is on you! 😄"
};
/* ==================================================================== */

const $ = id => document.getElementById(id);
document.title = "The Treasury of " + CONFIG.name;
document.querySelectorAll(".nm").forEach(e => e.textContent = CONFIG.name);
const PAL = ["#ff4fa3", "#29e0ff", "#ffd23f", "#7dff6b", "#ff8a3d", "#8b5cff"];
const rnd = (a, b) => a + Math.random() * (b - a);

/* ---------- sound ---------- */
let ac;
function tone(f, d = .12, type = "triangle", v = .06, delay = 0, f2) {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + delay;
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g).connect(ac.destination); o.start(t); o.stop(t + d);
  } catch (e) {}
}
const chime = () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .35, "sine", .07, i * .09));
const fanfare = () => [523, 523, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, .3, "triangle", .08, i * .14));
const pop = () => { tone(900, .08, "square", .08, 0, 120); };
const squeak = () => tone(500, .5, "sawtooth", .07, 0, 90);
const siren = () => { tone(500, .25, "square", .05, 0, 900); tone(900, .25, "square", .05, .25, 500); };

/* ---------- particles ---------- */
const cv = $("fx"), cx = cv.getContext("2d");
let W, H, parts = [];
const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
addEventListener("resize", resize); resize();
function burst(x, y, n = 60) {
  for (let i = 0; i < n; i++) {
    const a = rnd(0, 6.283), s = rnd(2, 8);
    parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2, g: .12, r: rnd(2, 5), c: PAL[(Math.random() * 6) | 0], life: 1, decay: rnd(.008, .018), kind: "spark", rot: 0, vr: 0 });
  }
}
function confetti(n = 140) {
  for (let i = 0; i < n; i++) parts.push({ x: rnd(0, W), y: rnd(-250, -10), vx: rnd(-1.5, 1.5), vy: rnd(2, 5), g: .04, r: rnd(4, 9),
    c: PAL[(Math.random() * 6) | 0], life: 1, decay: .003, kind: "conf", rot: 0, vr: rnd(.1, .3) });
}
function frame() {
  cx.clearRect(0, 0, W, H);
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= p.decay;
    if (p.life <= 0 || p.y > H + 40) { parts.splice(i, 1); continue; }
    cx.save(); cx.globalAlpha = Math.max(p.life, 0); cx.translate(p.x, p.y); cx.fillStyle = p.c;
    if (p.kind === "conf") { cx.rotate(p.rot); cx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); }
    else { cx.shadowColor = p.c; cx.shadowBlur = 12; cx.beginPath(); cx.arc(0, 0, p.r * p.life + .5, 0, 6.283); cx.fill(); }
    cx.restore();
  }
  requestAnimationFrame(frame);
}
frame();

/* ---------- floating balloons (click to pop) ---------- */
const sky = $("sky");
function spawnBalloon() {
  const b = document.createElement("div"), w = rnd(46, 90);
  b.className = "bl";
  b.style.cssText = `left:${rnd(0, 94)}%;--w:${w}px;--c:${PAL[(Math.random() * 6) | 0]};--t:${rnd(9, 16)}s;--dx:${rnd(-80, 80)}px`;
  b.onpointerdown = () => { const r = b.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 24); pop(); b.remove(); };
  b.onanimationend = e => { if (e.animationName === "rise") b.remove(); };
  sky.appendChild(b);
}
let skyTimer = setInterval(() => { if (sky.childElementCount < 14) spawnBalloon(); }, 900);
for (let i = 0; i < 6; i++) setTimeout(spawnBalloon, i * 250);
function balloonStorm(n = 30) { for (let i = 0; i < n; i++) setTimeout(spawnBalloon, i * 90); }

/* ---------- level navigation ---------- */
function go(n) {
  for (let i = 1; i <= 7; i++) $("s" + i).classList.toggle("hidden", i !== n);
  document.querySelectorAll("#levels i").forEach((d, i) => { d.className = i + 1 < n ? "on" : i + 1 === n ? "cur" : ""; });
  chime();
  if (n === 3) startVirus();
  if (n === 4) buildGems();
  if (n === 5) startStadium();
  if (n === 6) { buildPops(); roseRain(25); }
}
go(1);

/* ===== LEVEL 1: hold to turn the dial ===== */
let prog = 0, holding = false, unlocked = false, lastTick = 0;
const door = $("door"), dial = $("dial"), hb = $("holdBtn");
const hints = ["Keep turning...", "Something clicks inside...", "Almost there...", "The tumblers are moving!"];
const press = e => { startMusic(); e && e.preventDefault(); if (!unlocked) { holding = true; door.classList.add("shake"); } };
const release = () => { holding = false; door.classList.remove("shake"); };
hb.addEventListener("pointerdown", press);
["pointerup", "pointerleave", "pointercancel"].forEach(ev => hb.addEventListener(ev, release));
hb.addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter") press(e); });
hb.addEventListener("keyup", release);
function tick(now) {
  if (!unlocked) {
    prog = Math.max(0, Math.min(1, prog + (holding ? .006 : -.004)));
    dial.style.setProperty("--rot", prog * 1080 + "deg");
    $("meterFill").style.width = prog * 100 + "%";
    if (holding) {
      $("hint").textContent = hints[Math.min(3, (prog * 4) | 0)];
      if (now - lastTick > 140) { tone(180 + prog * 500, .05, "square", .03); lastTick = now; }
    }
    if (prog >= 1) unlock();
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
function unlock() {
  unlocked = true; release(); hb.disabled = true; $("hint").textContent = "Unlocked!";
  chime(); door.classList.add("open"); document.querySelector(".vault-wrap").classList.add("lit");
  const r = door.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 90);
  balloonStorm(14);
  setTimeout(() => go(2), 2200);
}

/* ===== LEVEL 2: runaway button prank ===== */
let dodges = 0;
const run = $("runBtn"), zone = $("zone");
const taunts = ["Too slow! 😜", "Nope, not today!", "Are you even Murali?", "Catch me if you can!", "Almost... not really!", "Okay one more try...", "Fine. You win. Press it."];
function dodge(e) {
  if (dodges >= 6) return;
  e && e.preventDefault();
  dodges++;
  const zr = zone.getBoundingClientRect(), br = run.getBoundingClientRect();
  run.style.left = rnd(br.width / 2, zr.width - br.width / 2) + "px";
  run.style.top = rnd(br.height / 2, zr.height - br.height / 2) + "px";
  $("taunt").textContent = taunts[dodges - 1]; squeak();
  if (dodges >= 6) { run.textContent = "Okay, you win 😂"; run.style.left = "50%"; run.style.top = "50%"; }
}
run.addEventListener("pointerenter", dodge);
run.addEventListener("pointerdown", dodge);
run.addEventListener("click", () => { if (dodges >= 6) go(3); });

/* ===== LEVEL 3: fake virus prank ===== */
let vInt, sInt;
const vmsg = ["Deleting your youth...", "Uploading your old photos to the group chat...", "Telling everyone your real age...", "Sending the cake bill to you...", "Hacking your free time..."];
function startVirus() {
  let p = 0; $("alertBox").classList.remove("hidden"); $("vrev").classList.add("hidden");
  sInt = setInterval(siren, 500);
  vInt = setInterval(() => {
    p += rnd(1, 4); if (p > 99) p = 99;
    $("vfill").style.width = p + "%"; $("vpct").textContent = Math.floor(p) + "%";
    $("vtext").textContent = vmsg[Math.min(4, Math.floor(p / 20))];
    if (p >= 99) endVirus();
  }, 120);
}
function endVirus() {
  clearInterval(vInt); clearInterval(sInt);
  $("alertBox").classList.add("hidden"); $("vrev").classList.remove("hidden");
  fanfare(); confetti(80);
}
$("stopBtn").onclick = endVirus;
$("v2Next").onclick = () => go(4);

/* ===== LEVEL 4: jewels ===== */
let opened = new Set(), typer, built = false;
function buildGems() {
  if (built) return; built = true;
  CONFIG.gems.forEach((g, i) => {
    const b = document.createElement("button");
    b.className = "gem"; b.style.setProperty("--c", g.color); b.style.setProperty("--i", i);
    b.textContent = g.icon; b.setAttribute("aria-label", g.title);
    b.onclick = () => {
      document.querySelectorAll(".gem").forEach(x => x.classList.remove("active"));
      b.classList.add("active", "done");
      tone(400 + i * 150, .4, "sine", .08); tone(800 + i * 150, .5, "sine", .05, .08);
      const r = b.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 40);
      $("scTitle").textContent = g.title; clearInterval(typer);
      let k = 0; const el = $("scText"); el.textContent = "";
      typer = setInterval(() => { el.textContent = g.text.slice(0, ++k); if (k >= g.text.length) clearInterval(typer); }, 26);
      opened.add(i);
      if (opened.size === CONFIG.gems.length) $("gemNext").classList.remove("hidden");
    };
    $("gems").appendChild(b);
  });
  $("scTitle").textContent = "Tap a jewel";
  $("scText").textContent = "Each one holds a message just for you.";
}
$("gemNext").onclick = () => go(5);

/* ===== LEVEL 5: balloon pop game ===== */
let popped = 0, pbuilt = false;
function buildPops() {
  if (pbuilt) return; pbuilt = true;
  CONFIG.wishes.forEach((w, i) => {
    const b = document.createElement("button");
    b.className = "pb"; b.style.setProperty("--c", PAL[i % 6]); b.style.setProperty("--i", i);
    b.setAttribute("aria-label", "balloon " + (i + 1));
    b.onclick = () => {
      const r = b.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 40);
      w.startsWith("TRAP") ? squeak() : pop();
      b.classList.add("gone"); $("wish").textContent = w;
      popped++; $("popCount").textContent = popped + " of " + CONFIG.wishes.length + " popped";
      if (popped === CONFIG.wishes.length) setTimeout(() => go(7), 1800);
    };
    $("pops").appendChild(b);
  });
}

/* ===== FINALE ===== */
$("blowBtn").onclick = () => {
  $("blowBtn").classList.add("hidden"); $("candles").classList.add("out"); playHB(); roseRain(40);
  const big = $("big"); big.classList.remove("hidden"); big.innerHTML = "";
  [..."Happy Birthday " + CONFIG.name + "!"].forEach((ch, i) => {
    const s = document.createElement("span"); s.style.setProperty("--d", i);
    s.innerHTML = ch === " " ? "&nbsp;" : ch; big.appendChild(s);
  });
  $("signed").textContent = CONFIG.finalNote + "\n\n- " + CONFIG.from;
  $("signed").classList.remove("hidden"); $("again").classList.remove("hidden");
  confetti(240); balloonStorm(45);
  let n = 0;
  const fw = setInterval(() => {
    burst(rnd(W * .15, W * .85), rnd(H * .1, H * .5), 80); tone(rnd(200, 500), .25, "sawtooth", .03);
    if (++n > 16) clearInterval(fw);
  }, 420);
};
$("again").onclick = () => location.reload();


/* ===== MUSIC (put your song in the folder as music.mp3; otherwise a built-in tune plays) ===== */
const bgm = $("bgm"); let musicOn = true, started = false, synthTimer = null, step = 0;
const ARP = [261.6, 329.6, 392, 523.3, 392, 329.6, 220, 261.6, 329.6, 440, 349.2, 440, 392, 493.9, 587.3, 493.9];
function startSynth() { if (synthTimer || !musicOn) return; synthTimer = setInterval(() => { tone(ARP[step++ % ARP.length], .5, "sine", .03); }, 380); }
function stopSynth() { clearInterval(synthTimer); synthTimer = null; }
function startMusic() {
  if (started) return; started = true; bgm.volume = .55;
  bgm.onerror = startSynth;
  bgm.play().catch(startSynth);
}
$("musicBtn").onclick = () => {
  startMusic(); musicOn = !musicOn; $("musicBtn").classList.toggle("off", !musicOn);
  if (musicOn) { bgm.play().catch(startSynth); if (bgm.error) startSynth(); } else { bgm.pause(); stopSynth(); }
};
function playHB() {
  const N = { C: 261.6, D: 293.7, E: 329.6, F: 349.2, G: 392, A: 440, B: 466.2, c: 523.3 };
  const m = [["C", .75], ["C", .25], ["D", 1], ["C", 1], ["F", 1], ["E", 2], ["C", .75], ["C", .25], ["D", 1], ["C", 1], ["G", 1], ["F", 2],
    ["C", .75], ["C", .25], ["c", 1], ["A", 1], ["F", 1], ["E", 1], ["D", 2], ["B", .75], ["B", .25], ["A", 1], ["F", 1], ["G", 1], ["F", 2]];
  let t = 0; m.forEach(([n, d]) => { tone(N[n], d * .42, "triangle", .09, t); tone(N[n] * 2, d * .42, "sine", .03, t); t += d * .45; });
  confetti(100);
}

/* ===== ROSES ===== */
function roseRain(n = 30) {
  for (let i = 0; i < n; i++) setTimeout(() => {
    const r = document.createElement("span");
    r.className = "rose"; r.textContent = Math.random() < .8 ? "🌹" : "🌸";
    r.style.cssText = `left:${rnd(0, 96)}%;font-size:${rnd(22, 46)}px;--t:${rnd(6, 11)}s;--dx:${rnd(-70, 70)}px`;
    r.onanimationend = () => r.remove(); $("roses").appendChild(r);
  }, i * 140);
}

/* ===== LEVEL 5: STADIUM (junior Rohit Sharma) ===== */
let swings = 0;
function startStadium() {
  $("jName").textContent = CONFIG.jerseyName; $("jNo").textContent = CONFIG.jerseyNo;
}
$("swingBtn").onclick = () => {
  const ball = $("ball"), btn = $("swingBtn"), title = $("stTitle");
  btn.disabled = true; ball.className = "ball"; void ball.offsetWidth; ball.className = "ball bowl";
  tone(300, .3, "sawtooth", .05, 0, 120); swings++;
  if (swings === 1) {
    setTimeout(() => { title.textContent = "BOWLED!! 😱"; squeak(); }, 1000);
    setTimeout(() => { title.textContent = "NO BALL! 😜 Take it again!"; chime(); btn.disabled = false; btn.textContent = "🏏 Swing again!"; ball.className = "ball"; }, 2400);
  } else {
    setTimeout(() => {
      ball.className = "ball hit"; tone(1200, .08, "square", .12); tone(200, .4, "sawtooth", .08, .05, 60);
      $("six").classList.remove("hidden"); title.textContent = "THAT'S A MASSIVE SIX!";
      burst(innerWidth / 2, innerHeight / 2, 120); confetti(80); roseRain(20); balloonStorm(10);
    }, 650);
    setTimeout(() => {
      btn.classList.add("hidden"); $("pitch").classList.add("hidden"); title.classList.add("hidden");
      $("jr").classList.remove("hidden"); playHB(); roseRain(40); confetti(120);
    }, 2600);
  }
};
$("jrNext").onclick = () => go(6);