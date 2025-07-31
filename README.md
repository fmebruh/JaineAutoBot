Here’s your GitHub `README.md` content with **copy-ready markdown code blocks** for commands and configuration sections, using triple backticks (\`\`\`) for one-click copy buttons on GitHub:

---

````markdown
# 🔁 CHAIN SCRIPTERS - Multi-Account Swap Bot

A **professional, high-performance automation bot** for the **0G Labs Galileo Testnet**, developed by **CHAIN SCRIPTERS**.  
Designed for advanced users who need to automate swap cycles across multiple accounts with enhanced reliability and **Sybil resistance**.

---

## 🌐 Community & Support

- **Telegram**: [t.me/ChainScripters](https://t.me/ChainScripters)  
- **GitHub Repository**: [JaineAutoBot](https://github.com/fmebruh/JaineAutoBot)

---

## ✨ Key Features

- 🔁 **Multi-Account Support**  
  Run unlimited accounts by simply adding their private keys to a `accounts.txt` file.

- 🌍 **Proxy Rotation**  
  Optional use of rotating proxies to reduce IP-based tracking.

- 🕒 **Intelligent Run Modes**  
  Run once or on a continuous schedule every 24–26 hours.

- ⚠️ **Graceful Error Handling**  
  Errors in individual accounts won’t crash the bot. Logs errors and continues.

- 🖥️ **User-Friendly Interface**  
  Clean CLI with colored logs for easy tracking.

---

## ⚙️ Setup Instructions

### 1. Prerequisites
Ensure you have **Node.js (v18 or higher)** installed.  
Download it from [nodejs.org](https://nodejs.org/)

### 2. Clone the Repository
```bash
git clone https://github.com/fmebruh/JaineAutoBot.git
cd JaineAutoBot
````

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Configuration Files

#### `.env`

Create a `.env` file in the root directory with the following content:

```env
RPC_URL=https://evmrpc-testnet.0g.ai/
USDT_ADDRESS=0x3eC8A8705bE1D5ca90066b37ba62c4183B024ebf
ETH_ADDRESS=0x0fE9B43625fA7EdD663aDcEC0728DD635e4AbF7c
BTC_ADDRESS=0x36f6414FF1df609214dDAbA71c84f18bcf00F67d
ROUTER_ADDRESS=0xb95B5953FF8ee5D5d9818CdbEfE363ff2191318c
NETWORK_NAME=0G LABS GALILEO TESTNET
```

#### `accounts.txt`

Add one private key per line:

```text
0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
```

#### `proxies.txt`

Add one proxy per line. Leave blank if not using proxies.
Formats supported:

```text
user:pass@192.168.1.1:8080
192.168.1.2:8888
```

---

## 🚀 Usage

Run the bot with:

```bash
npm start
```

The bot will display a banner and prompt you for:

* Run mode (single or auto)
* Number of swap cycles

---

## 🎨 ASCII Art Banner

```
██████╗██╗  ██╗ █████╗ ██╗███╗   ██╗                               
██╔════╝██║  ██║██╔══██╗██║████╗  ██║                               
██║     ███████║███████║██║██╔██╗ ██║                               
██║     ██╔══██║██╔══██║██║██║╚██╗██║                               
╚██████╗██║  ██║██║  ██║██║██║ ╚████║                               
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝                               

███████╗ ██████╗██████╗ ██╗██████╗ ████████╗███████╗██████╗ ███████╗
██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔════╝
███████╗██║     ██████╔╝██║██████╔╝   ██║   █████╗  ██████╔╝███████╗
╚════██║██║     ██╔══██╗██║██╔═══╝    ██║   ██╔══╝  ██╔══██╗╚════██║
███████║╚██████╗██║  ██║██║██║        ██║   ███████╗██║  ██║███████║
╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝
```

---

## ⚠️ Disclaimer

This bot is intended for **educational and testing** purposes only.
Automating interactions with blockchain networks carries inherent risks.
The creators (**CHAIN SCRIPTERS**) are **not responsible** for any financial losses.

> 🔒 Always use **burner wallets**. Never use your main private keys.

---

```

---

✅ Paste this entire markdown into your repository's `README.md` for proper rendering with **one-click copy** buttons on GitHub.  
Let me know if you want a downloadable version!
```
