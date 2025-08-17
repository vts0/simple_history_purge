const DEFAULTS = { limit: 100, intervalSec: 30, enabled: true, purgeCount: 0 };

function setBadge(enabled) {
  chrome.action.setBadgeText({ text: enabled ? "ON" : "OFF" });
  chrome.action.setBadgeBackgroundColor({
    color: enabled ? "#34a853" : "#ea4335",
  });
}

async function cleanIfNeeded() {
  const cfg = await chrome.storage.sync.get(DEFAULTS);
  if (!cfg.enabled) return;

  const items = await chrome.history.search({
    text: "",
    maxResults: cfg.limit + 1,
    startTime: 0,
  });
  if (items.length > cfg.limit) {
    await chrome.history.deleteAll();
    chrome.storage.sync.set({ purgeCount: cfg.purgeCount + 1 });
  }
}

chrome.storage.onChanged.addListener(async () => {
  const cfg = await chrome.storage.sync.get(DEFAULTS);
  await chrome.alarms.clearAll();
  if (cfg.enabled) {
    chrome.alarms.create("purge", { periodInMinutes: cfg.intervalSec / 60 });
  }
  setBadge(cfg.enabled);
});

chrome.runtime.onStartup.addListener(async () => {
  const cfg = await chrome.storage.sync.get(DEFAULTS);
  setBadge(cfg.enabled);
  if (cfg.enabled) {
    chrome.alarms.create("purge", { periodInMinutes: cfg.intervalSec / 60 });
  }
});

chrome.alarms.onAlarm.addListener(cleanIfNeeded);
