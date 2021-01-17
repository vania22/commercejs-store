import React from 'react';
import {
    Elements,
    CardElement,
    ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const PaymentForm = ({ checkoutToken }) => {
    return (
        <>
            <Review checkoutToken={checkoutToken} />
        </>
    );
};

export default PaymentForm;
