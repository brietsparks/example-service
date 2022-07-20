import { Handler, Request, Response, NextFunction } from 'express';

export interface ErrorWithId extends Error {
  id: string;
}

export function withErrorHandling(handler: Handler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      (error as any).id = `${Date.now().toString()}.${Math.random().toString(36).slice(-5)}`;
      next(error);
    }
  };
}

export function makeErrorHandlingMiddleware(onError: (error: ErrorWithId) => void) {
  return (error: ErrorWithId, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    onError(error);
    res.status(500).json({ errorId: error.id });
  };
}
