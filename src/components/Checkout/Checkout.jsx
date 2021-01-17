import React, { useState, useEffect } from 'react';
import { Paper, Typography, Stepper, Step, StepLabel } from '@material-ui/core';

import { commerce } from '../../lib/commerce';
import useStyles from './styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    const next = (data) => {
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
                next={next}
                nextStep={nextStep}
            />
        ) : (
            <PaymentForm
                previousStep={previousStep}
                checkoutToken={checkoutToken}
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
