import 'dotenv/config';
import { ethers, FetchRequest } from 'ethers';
import chalk from 'chalk';
import readline from 'readline/promises';
import fs from 'fs';
import HttpsProxyAgent from 'https-proxy-agent';

// --- Configuration ---
const {
    RPC_URL, ROUTER_ADDRESS, USDT_ADDRESS,
    ETH_ADDRESS, BTC_ADDRESS, NETWORK_NAME
} = process.env;

const TOKEN_ABI = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"stateMutability":"view","type":"function"}];
const ROUTER_ABI = [{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMinimum","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct ISwapRouter.ExactInputSingleParams","name":"params","type":"tuple"}],"name":"exactInputSingle","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"}];

// --- Helper Functions ---
const log = {
    info: (msg) => console.log(chalk.cyan(`[INFO] ${msg}`)),
    success: (msg) => console.log(chalk.green(`[SUCCESS] ${msg}`)),
    warning: (msg) => console.log(chalk.yellow(`[WARNING] ${msg}`)),
    error: (msg) => console.log(chalk.red(`[ERROR] ${msg}`)),
    account: (msg) => console.log(chalk.magenta.bold(`\n${"=".repeat(50)}\n[ACCOUNT] ${msg}\n${"=".repeat(50)}`)),
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const displayHeader = () => {
    const art = `
██████╗ ██╗  ██╗ █████╗ ██╗███╗   ██╗     ██████╗ ██████╗ ██╗██╗██████╗ ████████╗███████╗██████╗ 
██╔════╝ ██║  ██║██╔══██╗██║████╗  ██║    ██╔════╝██╔════╝ ██║██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗
██║  ███╗███████║███████║██║██╔██╗ ██║    ██║     ███████╗ ██║██║██████╔╝   ██║   █████╗  ██████╔╝
██║   ██║██╔══██║██╔══██║██║██║╚██╗██║    ██║     ██╔══██╗ ██║██║██╔═══╝    ██║   ██╔══╝  ██╔══██╗
╚██████╔╝██║  ██║██║  ██║██║██║ ╚████║    ╚██████╗╚██████╔╝ ██║██║██║        ██║   ███████╗██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝     ╚═════╝ ╚═════╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚══════╝╚═╝  ╚═╝
    `;
    console.log(chalk.cyan.bold(art));
    console.log(chalk.yellow.bold("--- Multi-Account Swap Bot ---"));
};

// --- Core Application Logic ---
function getProvider(proxy) {
    if (!proxy) {
        return new ethers.JsonRpcProvider(RPC_URL);
    }
    log.info(`Using proxy: ${proxy}`);
    const fetchRequest = new FetchRequest(RPC_URL);
    // Ensure proxy URL starts with http://
    const proxyUrl = proxy.startsWith('http') ? proxy : `http://${proxy}`;
    fetchRequest.agent = new HttpsProxyAgent(proxyUrl);
    return new ethers.JsonRpcProvider(fetchRequest);
}

async function approveToken(wallet, tokenAddress, amount) {
    try {
        const tokenContract = new ethers.Contract(tokenAddress, TOKEN_ABI, wallet);
        const allowance = await tokenContract.allowance(wallet.address, ROUTER_ADDRESS);
        if (allowance >= amount) {
            log.info(`Approval for token ${tokenAddress.slice(0,6)}... already sufficient.`);
            return true;
        }
        log.info(`Approving ${ethers.formatEther(amount)} tokens for ${tokenAddress.slice(0,6)}...`);
        const tx = await tokenContract.approve(ROUTER_ADDRESS, amount);
        await tx.wait();
        log.success(`Approval successful: ${tx.hash}`);
        return true;
    } catch (error) {
        log.error(`Approval failed for ${tokenAddress.slice(0,6)}...: ${error.message}`);
        return false;
    }
}

async function executeSwap(wallet, tokenIn, tokenOut, amountIn, pairName) {
    try {
        if (!(await approveToken(wallet, tokenIn, amountIn))) return;

        const swapContract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, wallet);
        const deadline = Math.floor(Date.now() / 1000) + 120;
        const params = {
            tokenIn, tokenOut, fee: 3000, recipient: wallet.address, deadline,
            amountIn, amountOutMinimum: 0, sqrtPriceLimitX96: 0n,
        };

        log.info(`Executing swap: ${pairName} for ${ethers.formatEther(amountIn)} tokens...`);
        const tx = await swapContract.exactInputSingle(params);
        await tx.wait();
        log.success(`Swap successful: ${tx.hash}`);
    } catch (error) {
        log.error(`Swap failed for ${pairName}: ${error.message}`);
    }
}

async function runSwapCycleForAccount(privateKey, proxy, totalSwaps) {
    try {
        const provider = getProvider(proxy);
        const wallet = new ethers.Wallet(privateKey, provider);
        log.account(`Processing Wallet: ${wallet.address}`);
        
        for (let i = 0; i < totalSwaps; i++) {
            log.info(`--- Starting Swap Cycle #${i + 1} of ${totalSwaps} for ${wallet.address} ---`);
            
            const usdtContract = new ethers.Contract(USDT_ADDRESS, TOKEN_ABI, wallet);
            const ethContract = new ethers.Contract(ETH_ADDRESS, TOKEN_ABI, wallet);
            const btcContract = new ethers.Contract(BTC_ADDRESS, TOKEN_ABI, wallet);

            let usdtBalance = await usdtContract.balanceOf(wallet.address);
            if (usdtBalance > 0) await executeSwap(wallet, USDT_ADDRESS, ETH_ADDRESS, usdtBalance, "USDT -> ETH");
            await delay(random.randint(2000, 5000));

            let ethBalance = await ethContract.balanceOf(wallet.address);
            if (ethBalance > 0) await executeSwap(wallet, ETH_ADDRESS, BTC_ADDRESS, ethBalance, "ETH -> BTC");
            await delay(random.randint(2000, 5000));

            let btcBalance = await btcContract.balanceOf(wallet.address);
            if (btcBalance > 0) await executeSwap(wallet, BTC_ADDRESS, USDT_ADDRESS, btcBalance, "BTC -> USDT");

            log.success(`Swap Cycle #${i + 1} complete for ${wallet.address}.`);
            if (i < totalSwaps - 1) {
                const waitTime = random.randint(10, 20);
                log.info(`Waiting for ${waitTime} seconds before next cycle...`);
                await delay(waitTime * 1000);
            }
        }
    } catch (error) {
        log.error(`A critical error occurred for wallet ${privateKey.slice(0,10)}...: ${error.message}`);
    }
}

// --- Main Application Flow ---
async function main() {
    displayHeader();
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const ask = async (question) => rl.question(chalk.magenta(question));

    const privateKeys = fs.readFileSync('accounts.txt', 'utf8').split('\n').filter(Boolean);
    let proxies = [];
    try {
        proxies = fs.readFileSync('proxies.txt', 'utf8').split('\n').filter(Boolean);
    } catch (e) {
        log.warning("proxies.txt not found, continuing without proxies.");
    }
    
    if (privateKeys.length === 0) {
        log.error("accounts.txt is empty. Please add private keys.");
        rl.close();
        return;
    }

    log.info(`Loaded ${privateKeys.length} accounts.`);
    log.info(`Loaded ${proxies.length} proxies.`);

    const useProxyAnswer = proxies.length > 0 ? await ask("Do you want to use proxies? [y/n]: ") : 'n';
    const useProxies = useProxyAnswer.toLowerCase() === 'y';

    const runMode = await ask("Choose run mode:\n1. Run Once\n2. Run on a 24-26 hour schedule\nEnter your choice [1/2]: ");
    const swapCountStr = await ask("How many swap cycles do you want to run for each account? ");
    const totalSwaps = parseInt(swapCountStr);

    rl.close();

    if (isNaN(totalSwaps) || totalSwaps <= 0) {
        log.error("Invalid number of swaps. Exiting.");
        return;
    }
    
    const runAllAccounts = async () => {
        for (let i = 0; i < privateKeys.length; i++) {
            const pk = privateKeys[i];
            const proxy = useProxies && proxies.length > 0 ? proxies[i % proxies.length] : null;
            await runSwapCycleForAccount(pk, proxy, totalSwaps);
        }
    };

    if (runMode === '2') {
        log.info(`Scheduled mode activated. The bot will run every 24-26 hours.`);
        while (true) {
            await runAllAccounts();
            const sleepDuration = Math.floor(Math.random() * (26 - 24 + 1) + 24) * 3600;
            const sleepHours = (sleepDuration / 3600).toFixed(1);
            log.info(`All accounts processed. Sleeping for approximately ${sleepHours} hours.`);
            await delay(sleepDuration * 1000);
        }
    } else {
        await runAllAccounts();
    }
}

main().catch(err => {
    log.error(`An unhandled error occurred: ${err.message}`);
    process.exit(1);
});
