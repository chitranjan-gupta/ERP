import path from "path"
import { Express, Request, Response } from "express"
import { createExpressServer } from 'routing-controllers'
import bodyParser from "body-parser"
import cors from "cors"
import Stripe from "stripe"
import dotenv from "dotenv"
import logger from "./utils/logger"
dotenv.config({ path: ".env.local" })
const port: number = Number(process.env.PORT)
const app: Express = createExpressServer({
    controllers: [path.join(__dirname + `/controller/*.${process.env.NODE_ENV == "development" ? "ts" : "js"}`)],
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
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
    const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
        apiVersion: '2023-08-16',
    })
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: String(process.env.STRIPE_SUCCESS_URL),
        cancel_url: String(process.env.STRIPE_CANCEL_URL)
    })
    res.json({ sessionid: session.id })
})
app.listen(port, () => {
    logger.info(`App is running at http://localhost:${port}`)
})