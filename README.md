

# 🔁 CHAIN SCRIPTERS - Multi-Account Swap Bot

A **professional, high-performance automation bot** for the **0G Labs Galileo Testnet**, developed by **CHAIN SCRIPTERS**.
Automate swap cycles across multiple accounts with Sybil resistance and reliability.

---

## 🌐 Community & Support

* [Telegram Channel](https://t.me/ChainScripters)
* [GitHub Repository](https://github.com/fmebruh/JaineAutoBot)

---

## ✨ Features

* **Multi-Account Support**
  Unlimited accounts via `accounts.txt`.

* **Proxy Rotation** *(optional)*
  Rotate proxies to avoid IP bans.

* **Run Modes**
  Run once or auto-loop every 24–26 hours.

* **Error Handling**
  Logs invalid keys or insufficient balances and continues.

* **User-Friendly CLI**
  Colored terminal logs and simple prompts.

---

## ⚙️ Requirements

* Node.js v18 or higher
* Burner wallets only (never use main private keys)

---

## 🛠️ Setup

### 1. Clone the Repository

```bash
git clone https://github.com/fmebruh/JaineAutoBot.git
cd JaineAutoBot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Config Files

#### 📄 `.env`

```env
RPC_URL=https://evmrpc-testnet.0g.ai/
USDT_ADDRESS=0x3eC8A8705bE1D5ca90066b37ba62c4183B024ebf
ETH_ADDRESS=0x0fE9B43625fA7EdD663aDcEC0728DD635e4AbF7c
BTC_ADDRESS=0x36f6414FF1df609214dDAbA71c84f18bcf00F67d
ROUTER_ADDRESS=0xb95B5953FF8ee5D5d9818CdbEfE363ff2191318c
NETWORK_NAME=0G LABS GALILEO TESTNET
```

#### 📄 `accounts.txt`

```txt
0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
```

#### 📄 `proxies.txt` *(optional)*

```txt
user1:pass1@192.168.1.1:8080
192.168.1.2:8888
```

Leave empty if not using proxies.

---

## 🚀 Run the Bot

```bash
npm start
```

You’ll be prompted to choose a run mode and number of swap cycles.

---

## 🖼️ Banner

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

> This bot is intended for **educational and testing purposes only**.
> Use **burner wallets**. Do **not** use your main account.
> CHAIN SCRIPTERS is **not responsible for any financial loss**.

---

Would you like this as a downloadable `.md` file now?
