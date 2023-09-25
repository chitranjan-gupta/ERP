import { loadStripe } from '@stripe/stripe-js';

export async function makePayment() {
    const stripe = await loadStripe('pk_test_51Nu8YnSF5BZ9FQQIFpEWdoAmVzbNbzglNSBQA2xyvdcM0L8b59kelkisQqOfVMohldrQMed0cXsBkpL6lYtc8SDR00K6v5tEAy');
    const res = await fetch("https://8080-chitranjangupta-erp-bcpl0k4n7cr.ws-us104.gitpod.io/api/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify("")
    })
    const session = await res.json()
    const result = await stripe?.redirectToCheckout({
        sessionId: session.sessionid
    })
    if (result?.error) {
        console.log(result.error)
    }
}