import React, { useEffect, useState } from "react";
import axios from 'axios';


const UserDetails = (props) => {
    const [balSheetMessage, setBalSheetMessage] = useState(null);
    const [isBalSheetAvailable, setIsBalSheetAvailable] = useState(false)
    const [isValid, setValid] = useState(false);

    useEffect(() => {
        setValid(isBalSheetAvailable);

    }, [isBalSheetAvailable]);

    const getBalanceSheet = () => {
        // calling Backend API to fetch Balance Sheet
        axios.get('http://localhost:8082/api/v1/loan/loan-applications/1')
            .then((res) => (res.data))
            .then(json => {
                console.log(JSON.stringify(json));

                setIsBalSheetAvailable(true);
                setBalSheetMessage("Balance Sheet fetched successfully!")

            }).catch(err => console.log(err))  // Handle error

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            getBalanceSheet();

        } catch (err) {
            console.log(err.message)
        }
    }

    const submitApplication = (e) => {
        //Calling Backend API to Submit Loan Application to Decison Engine using simulated Data
        e.preventDefault();
        const inputArr = {
            "businessDetails": {
                "businessName": "ABC Corporation",
                "email": "abc@corporation.com",
                "loanAmount": 10000000,
                "yearEstablished": 2010,
                "accountingProvider": "Quickbooks"
            },
            "monthlySummaries": [
                {
                    "year": 2022,
                    "month": 1,
                    "profitOrLoss": 25000,
                    "assetsValue": 100000
                },
                {
                    "year": 2022,
                    "month": 2,
                    "profitOrLoss": 15000,
                    "assetsValue": 120000
                },
                {
                    "year": 2022,
                    "month": 3,
                    "profitOrLoss": 25000,
                    "assetsValue": 150000
                }
            ]
        }
        axios.post('http://localhost:8082/api/v1/loan/loan-applications/submit', inputArr)
            .then(response => {
                console.log(response.data)
                setBalSheetMessage(response.data.loanResult)
            });


    }


    return (
        <div>
            <h4 className="form-subtitle"> Welcome {props.user.username} 👋 </h4>
            <h1 className="userDetail-title">Loan Application </h1>

            <div className="form-card">

                <form>

                    <label className="form-subtitle" >Name:
                        <input className="auth-input" type="text" />
                    </label>
                    <label className="form-subtitle">Age:
                        <input className="auth-input"
                            type="number"
                            name="age"
                        />
                    </label>
                    <label className="form-subtitle">Email:
                        <input className="auth-input"
                            type="text"
                            name="age"
                        />
                    </label>
                    <label className="form-subtitle">Phone Number:
                        <input className="auth-input" type="text" name="phone" />
                    </label>
                    <label className="form-subtitle">Purpose of Loan:</label>
                    <textarea className="auth-input" type="text" name="loan_purpose" />

                    <label className="form-subtitle">Year Established:
                        <input className="auth-input" type="text" name="year" />
                    </label>
                    <label className="form-subtitle">Account Provider </label>
                    <select className="auth-input"
                        name="acct_provider" >
                        <option>MYOB</option>
                        <option>XERO</option>
                    </select>

                    <button value={isBalSheetAvailable} className="auth-big-button" type="submit" onClick={handleSubmit}>Fetch Balance Sheet</button>

                    <button disabled={!isValid} className="auth-big-button" onClick={submitApplication}>Submit</button>



                </form>

            </div>
            <div className="form-subtitle">{balSheetMessage != null ? balSheetMessage : ''}</div>
        </div>
    )
}

export default UserDetails;