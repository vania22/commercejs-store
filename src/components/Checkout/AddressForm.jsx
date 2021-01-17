import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    Select,
    Typography,
    InputLabel,
    MenuItem,
    Button,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import { commerce } from '../../lib/commerce';
import FormInput from './FormInput';

const AddressForm = ({ checkoutToken, next }) => {
    const methods = useForm();

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');

    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');

    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {
            countries,
        } = await commerce.services.localeListShippingCountries(
            checkoutTokenId,
        );

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchShippingSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
            countryCode,
        );

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, region) => {
        const options = await commerce.checkout.getShippingOptions(
            checkoutTokenId,
            { country, region },
        );

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) {
            fetchShippingSubdivisions(shippingCountry);
        }
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) {
            fetchShippingOptions(
                checkoutToken.id,
                shippingCountry,
                shippingSubdivision,
            );
        }
    }, [shippingSubdivision]);

    return (
        <>
            <Typography varian="h6" gutterBottom>
                Shipping address
            </Typography>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit((data) =>
                        next({
                            ...data,
                            shippingCountry,
                            shippingSubdivision,
                            shippingOption,
                        }),
                    )}
                >
                    <Grid container spacing={3}>
                        <FormInput
                            required
                            name="firstname"
                            label="First Name"
                        />
                        <FormInput required name="lastname" label="Last Name" />
                        <FormInput required name="address1" label="Address" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput
                            required
                            name="zip"
                            label="ZIP / Post Code"
                        />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select
                                value={shippingCountry}
                                fullWidth
                                onChange={(e) =>
                                    setShippingCountry(e.target.value)
                                }
                            >
                                {Object.entries(shippingCountries).map(
                                    (country) => (
                                        <MenuItem
                                            key={country[0]}
                                            value={country[0]}
                                        >
                                            {country[1]}
                                        </MenuItem>
                                    ),
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select
                                value={shippingSubdivision}
                                fullWidth
                                onChange={(e) =>
                                    setShippingSubdivision(e.target.value)
                                }
                            >
                                {Object.entries(shippingSubdivisions).map(
                                    (subdivision) => (
                                        <MenuItem
                                            key={subdivision[0]}
                                            value={subdivision[0]}
                                        >
                                            {subdivision[1]}
                                        </MenuItem>
                                    ),
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select
                                value={shippingOption}
                                fullWidth
                                onChange={(e) =>
                                    setShippingOption(e.target.value)
                                }
                            >
                                {shippingOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {`${option.description} ${option.price.formatted_with_symbol}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button variant="outlined" component={Link} to="/cart">
                            Back to Cart
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
