# Simple History Purge

A lightweight Chrome extension that automatically clears your browsing history when it grows beyond a user-defined limit.  
Helps keep your history clean and private without manual effort.

## ✨ Features
- ✅ Set a **maximum number of history entries** (default: 100)  
- ✅ Define a **check interval** in seconds (default: 30s)  
- ✅ **Automatic purge** when the limit is exceeded  
- ✅ **On/Off toggle** from the popup  
- ✅ Shows the **number of purges performed**  
- ✅ Simple UI with start/stop and settings  

## ⚙️ How It Works
1. The background script periodically checks the size of your browsing history.  
2. If the number of items exceeds the configured limit, **all history is purged**.  
3. Status is displayed in the popup and badge (`ON`/`OFF`).   

## 🔑 Permissions
- **History** → Required to read and delete browsing history.  
- **Storage** → Used to save settings (limit, interval, status). 
