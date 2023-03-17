import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import '../App.css';
import Textarea from '@mui/joy/Textarea';
import { useNavigate } from 'react-router-dom';
import GooglePayButton from '@google-pay/button-react';


const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

}));
export default function Order1() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const userEmail = localStorage.getItem("userEmail");
    const [count, setCount] = useState(1);
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState('');
    const [errorValues, setErrorValues] = useState({
        address: "",
        payment: ""
    })
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8080/cartList/getCartList/${userEmail}`).then((response) => {
            setCartItems(response.data);
            console.log("CartItems are....")
            console.log(cartItems);
        });
        setPayment("selectmethod")
    }, [errorValues]);

    const styleTable = {
        width: 900
    }

    const calculatePrice = () => {
        let total: number = 0;
        cartItems.map((item) => {

            total = total + item.itemPrice;

        })
        return total;
    }

    const totalPrice = calculatePrice();

    const orderDetails = {
        cartItems: cartItems,
        total: calculatePrice(),
        address: address,
        payment: payment,
        userEmail: userEmail

    }

    const handleAddress = (e: any) => {
        setAddress(e.target.value)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setPayment(event.target.value as string);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const data = new FormData();
        data.append("address", address);
        data.append("payment", payment);


        setErrorValues(validate(address, payment));
        if (Object.keys(errorValues).length === 0) {
            axios
                .post("http://localhost:8080/order/placeOrder/shubham@gmail.com", data)
                .then((res: { data: any }) => {
                    console.log(res.data)
                    localStorage.removeItem("shopping-cart");

                });

            console.log("Order details are....................")
            console.log(orderDetails)

        }
        navigate('/orderNext');

    }

    const validate = (address: any, payment: any) => {
        const errors: any = {};
        if (address === undefined)
            errors.address = "Enter address"
        if (payment === "selectmethod")
            errors.payment = "Select Payment Method!!!!"
        return errors;

    }

    return (
        <div className="mainContainer4">
            <div className='tableContainerOrder'>
                <h1>Order Details</h1>
                <TableContainer component={Paper} style={styleTable} >
                    <Table aria-label="customized table" className='userTable'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Item Type</StyledTableCell>
                                <StyledTableCell>Item Name</StyledTableCell>
                                <StyledTableCell>Item Price</StyledTableCell>
                                <StyledTableCell>Quantity</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => (
                                <StyledTableRow>
                                    <StyledTableCell>{item.categoryName}</StyledTableCell>
                                    <StyledTableCell>{item.itemName}</StyledTableCell>
                                    <StyledTableCell>{item.itemPrice}</StyledTableCell>
                                    <StyledTableCell>1</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h3>Total: ${calculatePrice()} </h3>
                <h2 >Address:    </h2>
                <Textarea minRows={5} className="textareaClass" variant="outlined" value={address} onChange={handleAddress} />
                <p className="ErrorClass">{errorValues.address}</p>
                <h2>Payment Method</h2>
                <FormControl className="paymentSelect" >
           
                    <Select
                        defaultValue="selectmethod"
                        onChange={handleChange}
                        value={payment}
                    >
                        <MenuItem value="selectmethod" className='selectMainBtn'>-Select Method-</MenuItem>
                        <MenuItem value="pod" sx={{ backgroundColor:'#3f4042' }}> <Button className="selectBtn">Pay on Delivery</Button></MenuItem>
                        <MenuItem value="paytm" sx={{ backgroundColor:'#3f4042' }}><Button className="selectBtn"> Buy With Paytm</Button></MenuItem>
                        <MenuItem value="gpay" sx={{ backgroundColor:'#3f4042' }} >
                            <GooglePayButton
                                buttonColor='white'
                                environment="TEST"
                                paymentRequest={{
                                    apiVersion: 2,
                                    apiVersionMinor: 0,
                                    allowedPaymentMethods: [
                                        {
                                            type: 'CARD',
                                            parameters: {
                                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                            },
                                            tokenizationSpecification: {
                                                type: 'PAYMENT_GATEWAY',
                                                parameters: {
                                                    gateway: 'example',
                                                    gatewayMerchantId: 'exampleGatewayMerchantId',
                                                },
                                            },
                                        },
                                    ],
                                    merchantInfo: {
                                        merchantId: '12345678901234567890',
                                        merchantName: 'Demo Merchant',
                                    },
                                    transactionInfo: {
                                        totalPriceStatus: 'FINAL',
                                        totalPriceLabel: 'Total',
                                        totalPrice: '1000',
                                        currencyCode: 'USD',
                                        countryCode: 'US',
                                    },
                                    shippingAddressRequired: true,
                                    callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                }}
                                onLoadPaymentData={(paymentRequest: any) => {
                                    console.log('load payment data', paymentRequest);
                                }}
                                onPaymentAuthorized={paymentData => {
                                    console.log('Payment Authorised Success', paymentData)
                                    return { transactionState: 'SUCCESS' }
                                }
                                }
                                onPaymentDataChanged={paymentData => {
                                    console.log('On Payment Data Changed', paymentData)
                                    return {}
                                }
                                }
                                existingPaymentMethodRequired={false}

                                buttonType='buy'
                            /></MenuItem>
                        <MenuItem value="phonepay" sx={{ backgroundColor:'#3f4042' }} > <Button className="selectBtn">Buy with PhonePay</Button></MenuItem>
                        <MenuItem value="other" sx={{ backgroundColor:'#3f4042' }}><Button className="selectBtn">Other UPI</Button></MenuItem>
                    </Select>
                </FormControl>
                <p className="ErrorClass">{errorValues.payment}</p>

                <div>
                    <Button onClick={handleSubmit} variant="contained" color="warning">Place Order</Button><br /><br />
                    <Button href="/cart" variant="contained" color="success" className="backButton" >Back</Button>
                </div>
            </div>
        </div>
    );
} 