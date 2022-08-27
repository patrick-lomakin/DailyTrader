import dotenv from "dotenv"
import ccxt from "ccxt";

dotenv.config();

const bybit = new ccxt.bybit({
    'apiKey': process.env.BYBIT_API_KEY,
    'secret': process.env.BYBIT_API_SECRET,
    //'options': {'defaultType': 'future' }
});

export = bybit;