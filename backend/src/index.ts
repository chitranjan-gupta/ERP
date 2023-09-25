import path from "path"
import { Express, Request, Response } from "express"
import { createExpressServer } from 'routing-controllers'
import Stripe from "stripe"
import cors from "cors"
import config from "config"
import logger from "./utils/logger"
const port: number = config.get<number>("port")
const app: Express = createExpressServer({
    controllers: [path.join(__dirname + '/controller/*.ts')],
});

app.use(cors({
    origin:"*",
    methods:["GET","HEAD","PUT","PATCH","POST","DELETE"]
}))
app.get("/", (req: Request, res: Response) => {
    res.json("hello");
})
app.get("/ping", (req: Request, res: Response) => {
    res.send("pong");
})
app.post("/api/checkout", async (req: Request, res: Response) => {
    const lineItems = [{
        price_data: {
            currency: "inr",
            product_data: {
                name: "Cup"
            },
            unit_amount: 100
        },
        quantity: 1
    }]
    const stripe = new Stripe(config.get<string>("STRIPE_SECRET_KEY"), {
        apiVersion: '2023-08-16',
    })
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: "https://3000-chitranjangupta-erp-bcpl0k4n7cr.ws-us104.gitpod.io/success",
        cancel_url: "https://3000-chitranjangupta-erp-bcpl0k4n7cr.ws-us104.gitpod.io/cancel"
    })
    res.json({ sessionid: session.id })
})
app.listen(port, () => {
    logger.info(`App is running at http://localhost:${port}`)
})