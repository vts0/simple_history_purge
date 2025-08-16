const limitEl = document.getElementById("limit");
const limitVal = document.getElementById("limitVal");
const intervalEl = document.getElementById("interval");
const intervalVal = document.getElementById("intervalVal");
const purgeVal = document.getElementById("purgeVal");
const badge = document.getElementById("badge");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const saveBtn = document.getElementById("save");

const DEFAULTS = { limit: 100, intervalSec: 30, enabled: true, purgeCount: 0 };

function render({ limit, intervalSec, enabled, purgeCount = 0 }) {
  limitEl.value = limit;
  limitVal.textContent = `(current: ${limit})`;
  intervalEl.value = intervalSec;
  intervalVal.textContent = `(current: ${intervalSec}s)`;
  purgeVal.textContent = purgeCount;

  badge.className = enabled ? "on" : "off";
  badge.textContent = "";
  statusText.textContent = enabled ? "Running" : "Stopped";

  startBtn.disabled = enabled;
  stopBtn.disabled = !enabled;
}

chrome.storage.sync.get(DEFAULTS, render);

startBtn.addEventListener("click", () => {
  chrome.storage.sync.set({ enabled: true });
  chrome.storage.sync.get(DEFAULTS, render);
});

stopBtn.addEventListener("click", () => {
  chrome.storage.sync.set({ enabled: false });
  chrome.storage.sync.get(DEFAULTS, render);
});

saveBtn.addEventListener("click", () => {
  chrome.storage.sync.set({
    limit: Number(limitEl.value),
    intervalSec: Number(intervalEl.value),
  });
  window.close();
});
