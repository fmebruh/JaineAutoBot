
````markdown
# CHAIN SCRIPTERS - Multi-Account Swap Bot

A professional, high-performance automation bot for the 0G Labs Galileo Testnet, developed by **CHAIN SCRIPTERS**. This tool is designed for advanced users who need to automate swap cycles across multiple accounts with enhanced reliability and Sybil resistance.

---

### **Community & Support**

Join our community for updates, support, and discussions about our tools.

- **Telegram:** [**t.me/ChainScripters**](https://t.me/ChainScripters)

---

### **Key Features**

This bot has been revamped from the ground up to be a robust and intelligent automation tool.

- **Multi-Account Support:** Run an unlimited number of accounts by simply adding their private keys to a text file.
- **Proxy Rotation:** Automatically assigns a different proxy from your list to each account to reduce the risk of IP-based tracking.
- **Intelligent Run Modes:** Choose to run the bot once for all accounts or set it to run on a continuous, automated schedule every 24-26 hours.
- **Graceful Error Handling:** A failure on one account (e.g., invalid private key, insufficient funds) will not crash the bot. It logs the error and automatically moves on to the next account.
- **User-Friendly Interface:** A clean, simple command-line interface with colored logs makes it easy to track the bot's progress.

---

### **Setup Instructions**

Follow these steps to get the bot up and running.

**1. Prerequisites:**
   - Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed.

**2. Clone the Repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
````

**3. Install Dependencies:**
Run the following command in your terminal to install the necessary libraries:

```bash
npm install
```

**4. Create Configuration Files:**
You need to create three configuration files in the main folder:

  - **`.env`**: This file stores your RPC URL and contract addresses.

    ```env
    RPC_URL=[https://evmrpc-testnet.0g.ai/](https://evmrpc-testnet.0g.ai/)
    USDT_ADDRESS=0x3eC8A8705bE1D5ca90066b37ba62c4183B024ebf
    ETH_ADDRESS=0x0fE9B43625fA7EdD663aDcEC0728DD635e4AbF7c
    BTC_ADDRESS=0x36f6414FF1df609214dDAbA71c84f18bcf00F67d
    ROUTER_ADDRESS=0xb95B5953FF8ee5D5d9818CdbEfE363ff2191318c
    NETWORK_NAME=0G LABS GALILEO TESTNET
    ```

  - **`accounts.txt`**: Add one private key per line.

    ```text
    0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    ```

  - **`proxies.txt`**: Add one proxy per line. If you don't want to use proxies, you can leave this file empty.
    *Format: `ip:port` or `user:pass@ip:port`*

    ```text
    user1:pass1@192.1.1.1:8080
    192.1.1.2:8888
    ```

-----

### **Usage**

To run the bot, simply execute the following command in your terminal:

```bash
npm start
```

The bot will start, display the **CHAIN SCRIPTERS** banner, and then ask you for your preferred run mode and the number of swap cycles to perform.

-----

### **ASCII Art**

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

-----

### **Disclaimer**

This bot is intended for educational and testing purposes only. Automating interactions with blockchain networks carries inherent risks. The creators (**CHAIN SCRIPTERS**) are not responsible for any financial losses. Always use burner wallets and never share your main private keys.

```
```
