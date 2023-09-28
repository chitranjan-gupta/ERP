import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { useExpressServer } from "routing-controllers";
import bodyParser from "body-parser";
import cors from "cors";
import Stripe from "stripe";
import logger from "./utils/logger";
import { env } from "./utils/config";
import { createOrder, captureOrder } from "./service/paypal.service";
const port: number = Number(env.PORT);
const app: Express = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
useExpressServer(app, {
  controllers: [
    __dirname + "/controller/**/*.ts",
    __dirname + "/controller/**/*.js",
  ],
});
app.get("/", (req: Request, res: Response) => {
  res.json("Hello from the server");
});
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});
app.get("/config", async (req: Request, res: Response) => {
  res.json({ publishableKey: env.STRIPE_PUBLISHABLE_KEY });
});
app.post("/api/checkout", async (req: Request, res: Response) => {
  try {
    const lineItems = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Cup",
          },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ];
    const stripe = new Stripe(String(env.STRIPE_SECRET_KEY), {
      apiVersion: "2023-08-16",
    });
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: String(env.STRIPE_SUCCESS_URL),
      cancel_url: String(env.STRIPE_CANCEL_URL),
    });
    res.json({ sessionid: session.id });
  } catch (e: any) {
    logger.error(`Failed to create session:${e.message}`);
    return res.status(500).json({
      error: {
        message: `Failed to create session : ${e.message}`,
      },
    });
  }
});
app.post("/create-payment-intent", async (req: Request, res: Response) => {
  try {
    const stripe = new Stripe(String(env.STRIPE_SECRET_KEY), {
      apiVersion: "2023-08-16",
    });
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "inr",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientsecret: paymentIntent.client_secret });
  } catch (e: any) {
    logger.error(`Failed to create payment intent:${e.message}`);
    return res.status(500).json({
      error: {
        message: `Failed to create payment intent : ${e.message}`,
      },
    });
  }
});
app.get("/api/config", async (req: Request, res: Response) => {
  res.json({ clientID: env.PAYPAL_CLIENT_ID });
});
app.post("/api/create-paypal-order", async (req, res) => {
  try {
    const { product } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(product);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (e: any) {
    logger.error(`Failed to create order:${e.message}`);
    return res
      .status(500)
      .json({ error: { message: `Failed to create order : ${e.message}` } });
  }
});

app.post("/api/capture-paypal-order", async (req, res) => {
  try {
    const { orderID } = req.body;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (e: any) {
    logger.error(`Failed to capture order:${e.message}`);
    return res
      .status(500)
      .json({ error: { message: `Failed to capture order : ${e.message}` } });
  }
});
app.listen(port, () => {
  logger.info(`App is running at http://localhost:${port}`);
});
