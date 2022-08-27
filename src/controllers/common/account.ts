import bybit from "../../lib/bybit";
import { Request, Response, NextFunction } from "express";
import HttpError from "http-errors";


const fetchAccountBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.symbol) {
      const balance = await bybit.fetch_balance();
      const symbol = req.params.symbol.toUpperCase();
      if (!balance) throw HttpError(503, "Impossible to receive data");
      if (!balance[symbol]) throw HttpError(404, `Token ${symbol} not found!`);
      res.json(balance[symbol]);
    } else {
      const balance = await bybit.fetch_balance();
      if (!balance) throw HttpError(503, "Impossible to receive data");
      res.json(balance.total);
    }
  }
  catch (error: any) {
    next(error);
  }
};

const fetchAccountPNL = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const balance = await bybit.fetch_balance();
    if (!balance) throw HttpError(503, "Impossible to receive data");

    res.json({
      currency: "USDT",
      realised_pnl: balance.info.result.USDT["realised_pnl"],
      unrealised_pnl: balance.info.result.USDT["unrealised_pnl"],
      cum_realised_pnl: balance.info.result.USDT["cum_realised_pnl"]
    });
  } catch (error: any) {
    next(error);
  }
};

const fetchAccountOrdersUSDT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.symbol) {
      const orders = await bybit.fetchOrders(`${req.params.symbol.toUpperCase()}`);
      if (!orders || orders.length == 0) throw HttpError(503, "Impossible to receive data");
      res.json(orders);
    }
  } catch (error: any) {
    next(error);
  }
};

export default {
  fetchAccountBalance,
  fetchAccountPNL,
  fetchAccountOrdersUSDT
};
