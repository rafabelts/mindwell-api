import { Request, Response } from 'express';
const stripe = require('stripe');

export class StripeController {

    async payment(req: Request, res: Response) {
        const {body} = req;
        try{
            const paymentIntent = await stripe.paymentIntents.create({
                amount: body.amount,
                currency: body.currency,
            });
            if(paymentIntent?.status === 'completed'){
                return res.status(200).json({
                    message: 'Payment successful',
                    client_secret: paymentIntent?.client_secret
                });
            }
        }catch(error){
            res.status(400).json({message: error});
        }
    }
}
