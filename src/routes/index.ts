import { Router } from "express";
import account from "../controllers/common/account";


const router = Router();

/** Account routes */
router.get("/account/balance", account.fetchAccountBalance);
router.get("/account/balance/:symbol", account.fetchAccountBalance);
router.get("/account/pnl", account.fetchAccountPNL);
router.get("/account/orders/:symbol", account.fetchAccountOrdersUSDT);


export = router;
