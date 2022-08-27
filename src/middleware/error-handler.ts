import express, { ErrorRequestHandler, Request, Response, NextFunction } from "express";

/** Error handling */
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500)

    res.json({
        status: err.status,
        name: err.name,
        message: err.message,
        stack: err.stack
    })
}

export default errorHandler;