import React, { useContext } from 'react';
import { PayPalButton } from "react-paypal-button";
import AppContext from "../context/AppContext";

import '../styles/components/Payment.css';

const Payment = ({ history }) => {
    const { state, addNewOrder } = useContext(AppContext);
    const { cart, buyer } = state;

    const paypalOptions = {
        clientId: 'Af_vdmmUWdIxXyjIMTLKCRySfGzWg2crkP2wIzotdk3f4lIvQ09_k6LGwLoribADIHYXPLMp2xpd15JK',
        intent: 'capture',
        currency: 'USD'
    };

    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect'
    };

    const handleSumTotal = () => {
        const reducer = (acumulator, currentValue) => acumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    };

    const handlePaymentSuccess = data => {
        if (data.status === 'COMPLETED') {
            const newOrder = {
                buyer,
                products: cart,
                payment: data
            };
            addNewOrder(newOrder);
            history.push('/checkout/success');
        }
    }

    return (
        <div className="Payment">
            <div className="Payment-content">
                <h3>Resumen del pedido:</h3>
                {cart.map(item =>
                    <div key={item.title} className="Payment-item">
                        <div className="Payment-element">
                            <h4>{item.title}</h4>
                            <span>$ {item.price}</span>
                        </div>
                    </div>
                )}
                <div className="Payment-button">
                    <PayPalButton
                        paypalOptions={paypalOptions}
                        buttonStyles={buttonStyles}
                        amount={handleSumTotal()}
                        onPaymentStart={() => console.log('Start Payment')}
                        onPaymentSuccess={data => handlePaymentSuccess(data)}
                        onPaymentError={err => console.log(err)}
                        onPaymentCancel={data => console.log(data)}
                    />
                </div>
            </div>
            <div />
        </div>
    );
}

export default Payment;
