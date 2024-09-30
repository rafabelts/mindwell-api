import { ne } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";

type RateLimitEntry = {
    requests: number;
    startTime: number;
}

const requestsCounts = new Map<string, RateLimitEntry>();

export function rateLimit(maxRequests: number, windowMs:number) {
    return (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip;

        if(!ip) throw new Error('No IP found')

        const currentTime = Date.now();
        const entry = requestsCounts.get(ip);

        if(!entry) {
            requestsCounts.set(ip, { requests: 1, startTime:currentTime })
            next();
            return;
        }
        const elapsedTime = currentTime - entry.startTime;

        if(elapsedTime > windowMs) {
            entry.requests = 1;
            entry.startTime = currentTime;
            requestsCounts.set(ip, entry);
            next();
            return;
        }

        if(entry.requests < maxRequests) {
            entry.requests += 1;
            requestsCounts.set(ip, entry);
            next();
        } else {
            res.status(409).json({ message: 'Too many requests, try again later' })
        }
    }

}
