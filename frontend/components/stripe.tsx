"use client";
import React, { useState, useEffect } from "react"
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const handleSubmit = async (event: any) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        setIsProcessing(true);
        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(String(error.message));
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsProcessing(false);
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isProcessing ? "Processing ... " : "Pay now"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}

export function Stripepayment() {
    const [stripePromise, setStripePromise] = useState<Stripe | PromiseLike<Stripe | null> | null>(null)
    const [clientSecret, setClientSecret] = useState<string>()

    useEffect(() => {
        fetch("https://8080-chitranjangupta-erp-bcpl0k4n7cr.ws-us105.gitpod.io/config").then(async (res) => {
            const { publishableKey } = await res.json();
            setStripePromise(loadStripe(publishableKey));
        })
        fetch("https://8080-chitranjangupta-erp-bcpl0k4n7cr.ws-us105.gitpod.io/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        }).then(async (res) => {
            const json = await res.json()
            setClientSecret(String(json.clientsecret))
        })
    }, [])

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
        </Elements>
    )
}