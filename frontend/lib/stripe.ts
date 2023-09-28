import { loadStripe } from '@stripe/stripe-js';

export async function makePayment(): Promise<void> {
    const getKey = await fetch(String(process.env.NEXT_PUBLIC_STRIPE_CONFIG_URL))
    const { publishableKey } = await getKey.json();
    const stripe = await loadStripe(publishableKey);
    const res = await fetch(String(process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL), {
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