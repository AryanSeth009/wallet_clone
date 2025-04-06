import { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

type NextApiHandlerWithAuth = (
    req: NextApiRequest & { user?: { userId: string; email: string } },
    res: NextApiResponse
) => Promise<void> | void;

export function withAuth(handler: NextApiHandlerWithAuth) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getTokenFromHeader(req);
            
            if (!token) {
                return res.status(401).json({ error: 'Authentication required' });
            }

            const decoded = verifyToken(token);
            (req as any).user = decoded;

            return handler(req as any, res);
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
}
