import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Container, Paper, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

const OTP = (tokenDetails) => {
	// const navigate = useNavigate();
	const [otp, setOtp] = useState([]);
	const [tokDetails, setTokDetails] = useState(tokenDetails)
	
	const secretKey = tokDetails.tokenDetails.secretKey;
	const validationId = tokDetails.tokenDetails.validationId;
	// useEffect(() => {
	// 	const getOtp = async () => {
	// 		const req = await fetch(
	// 			"http://localhost:8090/api/v1/tokenization/account-verification/otp-verification"
	// 		);
	// 		const getres = await req.json();
	// 		console.log(getres);
	// 		setOtp(await getres);
	// 	};
	// 	getOtp();
	// }, []);
	// console.log(otp);

	//Information  form handle
	const handleInformation = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				"http://192.168.110.95:8090/api/v1/tokenization/link-account",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },

					body: JSON.stringify({
						virtualPrivateAddress: "ali.rajim12",
						otpCode: otp,
						// secretKey: "",
						// validationId: "",
						// otpValidationId: "",
						// refId: "",

						// fullName: fullName,
						// emailId: emailId,
						// mobileNo: mobileNo,
						// birthDate: birthDate,
						// bankId: bankId,
						// branchId: branchId,
						// accountId: accountId,
						// accountNickName: accountNickName,
					}),
				}
			);
			const resJson = await res.json();
			if (resJson.responseCode === "000") {
				// navigate("/otp");

				// setFullName("");
				// setEmailId("");
				// setMobileNo("");
				// setBirthDate("");
				// setBankId("");
				// setBranchId("");
				// setAccountId("");
				// setAccountNickName("");

				// setMessage("User created successfully");
				console.log(resJson.data, "Success");

				const tokenData = resJson.data;
				console.log(tokenData.secretKey, "Success");
			} else {
				// setMessage(resJson.message);
				console.log(resJson.responseCode);
				console.log(resJson, "response");
			}
		} catch (err) {
			console.log(err);
		}
	};
	console.log(tokenDetails, 'Details on OTP Page from prev page')

	return (
		<>
		{/* {secretKey} */}
			<Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
				<Paper
					variant='outlined'
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
				>
					<Typography
						variant='h6'
						style={{ textAlign: "center", marginBottom: "40px" }}
					>
						{" "}
						OTP Authentication
						<br/>
						secretKey is {secretKey} <br/>
						validationId is {validationId}

					</Typography>

					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<TextField
								required
								id='cvv'
								label='OTP'
								helperText='Check your phone message'
								fullWidth
								autoComplete='cc-csc'
								variant='standard'
								onChange={(e) => setOtp(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						variant='contained'
						sx={{ mt: 3, ml: 1 }}
						onClick={(e) => {
							// navigate("/micropayment");
						}}
					>
						Submit
					</Button>
					<p>{otp}</p>
				</Paper>
			</Container>
		</>
	);
};

export default OTP;
