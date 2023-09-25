import { loadStripe } from '@stripe/stripe-js';

export async function makePayment(): Promise<void> {
    const stripe = await loadStripe(String(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY));
    const res = await fetch(String(process.env.NEXT_PUBLIC_STRIPE_CHECKOUT), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
    const json = await res.json()
    const result = await stripe?.redirectToCheckout({
        sessionId: json.sessionid
    })
    if (result?.error) {
        console.log(result.error)
    }
}