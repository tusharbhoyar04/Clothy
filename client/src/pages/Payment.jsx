import React, { useState } from 'react'
import "../style/Payment.css"
import { useLocation } from 'react-router-dom';
import chip from "../assets/chip.png"
import visa from "../assets/visa.png"

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardType, setCardType] = useState('credit card');

    const location = useLocation()
    // const { state } = useLocation();
    const total = location.state?.total;
    console.log(total);

    const handleCardNumberInput = (event) => {
        let numericValue = event.target.value.replace(/\D/g, '');
        setCardNumber(numericValue);
    };

    const handleCardHolderInput = (event) => {
        let alphabeticValue = event.target.value.replace(/[^a-zA-Z\s]/g, '');
        setCardHolder(alphabeticValue);
    };

    const handleMonthInput = (event) => {
        setExpiryMonth(event.target.value);
    };

    const handleYearInput = (event) => {
        setExpiryYear(event.target.value);
    };

    const handleCvvInput = (event) => {
        let numericValue = event.target.value.replace(/\D/g, '');
        setCvv(numericValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted with data:', {
            cardNumber,
            cardHolder,
            expiryMonth,
            expiryYear,
            cvv,
            cardType,
        });

    };

    return (
        <div className="payment-body">
            <div className="container-new">
                <div className="card-container-new">
                    <div className="front-new">
                        <div className="image-new">
                            <img src={chip} />
                            <img src={visa} />
                        </div>
                        <div className="card-number-box-new">{cardNumber}</div>
                        <div className="flexbox-new">
                            <div className="box-new">
                                <span className='front-span'>card holder</span>
                                <div className="card-holder-name-new">{cardHolder}</div>
                            </div>
                            <div className="box-new">
                                <span className='front-span'>expires</span>
                                <div className="expiration-new">
                                    <span className='front-span'>{expiryMonth}</span>
                                    <span className='front-span'>/</span>
                                    <span className='front-span'>{expiryYear}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="back-new">
                        <div className="stripe-new"></div>
                        <div className="box-new">
                            <span>cvv</span>
                            <div className="cvv-box-new"></div>
                            <img src="image/visa.png" alt="" />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputBox-new">
                        <label>Total Amount</label>
                        <input
                            type="text"
                            value={total ? `$${total.toFixed(2)}` : 'N/A'}
                            readOnly />
                    </div>

                    <div className="inputBox-new">
                        <span>card number</span>
                        <input
                            type="text"
                            maxLength="16"
                            className="card-number-input-new"
                            value={cardNumber}
                            onChange={handleCardNumberInput}
                        />
                    </div>
                    <div className="inputBox-new">
                        <span >card holder</span>
                        <input
                            type="text"
                            maxLength="28"
                            className="card-holder-input-new"
                            value={cardHolder}
                            onChange={handleCardHolderInput}
                        />
                    </div>
                    <div className="flexbox-new">
                        <div className="inputBox-new">
                            <span>expiration mm</span>
                            <select
                                name=""
                                id=""
                                className="month-input-new"
                                value={expiryMonth}
                                onChange={handleMonthInput}
                            >
                                <option value="month" selected disabled>month</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>

                            </select>
                        </div>
                        <div className="inputBox-new">
                            <span>expiration yy</span>
                            <select
                                name=""
                                id=""
                                className="year-input-new"
                                value={expiryYear}
                                onChange={handleYearInput}
                            >
                                <option value="year" selected disabled>year</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>

                            </select>
                        </div>

                        <div className="inputBox-new">
                            <span>cvv</span>
                            <input
                                type="text"
                                maxLength="3"
                                className="cvv-input-new"
                                value={cvv}
                                onChange={handleCvvInput}
                            />
                        </div>
                    </div>
                    <div className="inputBox-new">
                        <span>Card Type</span>
                        <select
                            name=""
                            id=""
                            className="card-type-new"
                            value={cardType}
                            onChange={(e) => setCardType(e.target.value)}
                        >
                            <option value="select-card" disabled>
                                Select card type
                            </option>
                            <option value="credit card">credit card</option>
                            <option value="debit card">debit card</option>
                        </select>
                    </div>
                    <input type="submit" value="submit" className="submit-btn-new" id="submit" />
                </form>
            </div>
        </div>
    );
}

export default Payment
