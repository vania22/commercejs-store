import React, { useState, useEffect } from 'react';
import { Paper, Typography, Stepper, Step, StepLabel } from '@material-ui/core';

import { commerce } from '../../lib/commerce';
import useStyles from './styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, handleCheckout, order, errorMessage }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    const procceedToPaymentForm = (data) => {
        setShippingData(data);
        nextStep();
    };

    const nextStep = () => {
        setActiveStep((prevState) => prevState + 1);
    };

    const previousStep = () => {
        setActiveStep((prevState) => prevState - 1);
    };

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: 'cart',
                });
                setCheckoutToken(token);
            } catch (error) {}
        };

        generateToken();
    }, [cart]);

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm
                checkoutToken={checkoutToken}
                procceedToPaymentForm={procceedToPaymentForm}
                nextStep={nextStep}
            />
        ) : (
            <PaymentForm
                previousStep={previousStep}
                checkoutToken={checkoutToken}
                shippingData={shippingData}
                handleCheckout={handleCheckout}
                nextStep={nextStep}
            />
        );

    const Confirmation = () => <div>Confirmation</div>;

    return (
        <div>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Confirmation />
                    ) : (
                        checkoutToken && <Form />
                    )}
                </Paper>
            </main>
        </div>
    );
};

export default Checkout;
