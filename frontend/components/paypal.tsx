"use client";
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const PaymentButton = () => {
  const createOrder = async (data: any, actions: any) => {
    // Order is created on the server and the order id is returned
    return fetch(String(process.env.NEXT_PUBLIC_PAYPAL_CREATE_ORDER_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        product: {
          description: "Semester IV Fees",
          cost: "15000",
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = async (data: any, actions: any) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch(String(process.env.NEXT_PUBLIC_PAYPAL_CAPTURE_ORDER_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };

  return (
    <PayPalButtons
      style={{ layout: "horizontal" }}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export function Paypalpayment() {
  const [clientId, setClientId] = useState("");
  useEffect(() => {
    fetch(String(process.env.NEXT_PUBLIC_PAYPAL_CONFIG_URL)).then(
      async (res) => {
        const { clientID } = await res.json();
        setClientId(clientID);
      }
    );
  }, []);
  return (
    <>
      {clientId.length > 1 ? (
        <>
          <PayPalScriptProvider
            options={{ clientId: clientId, currency: "USD", intent: "capture" }}
          >
            <PaymentButton />
          </PayPalScriptProvider>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
