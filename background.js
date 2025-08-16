const DEFAULTS = { limit: 100, intervalSec: 30, enabled: true, purgeCount: 0 };
let cfg = DEFAULTS;
let timerId;

function setBadge(enabled) {
  chrome.action.setBadgeText({ text: enabled ? "ON" : "OFF" });
  chrome.action.setBadgeBackgroundColor({
    color: enabled ? "#34a853" : "#ea4335",
  });
}

function start() {
  if (timerId) clearInterval(timerId);
  setBadge(cfg.enabled);
  if (!cfg.enabled) return;

  timerId = setInterval(async () => {
    const items = await chrome.history.search({
      text: "",
      maxResults: cfg.limit + 1,
      startTime: 0,
    });
    if (items.length > cfg.limit) {
      await chrome.history.deleteAll();
      cfg.purgeCount += 1;
      chrome.storage.sync.set({ purgeCount: cfg.purgeCount });
    }
  }, cfg.intervalSec * 1000);
}

chrome.storage.sync.get(DEFAULTS, (data) => {
  cfg = data;
  start();
});

chrome.storage.onChanged.addListener((changes) => {
  for (const [k, v] of Object.entries(changes)) cfg[k] = v.newValue;
  start();
});
