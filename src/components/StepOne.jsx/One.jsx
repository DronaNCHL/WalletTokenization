import React from 'react'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import { linkTo } from '@storybook/addon-links';
import {
	Container,
	createTheme,
	MenuItem,
	Paper,
	ThemeProvider,
} from "@mui/material";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import {Step1FormSchema} from "../../schemas/index.jsx";
// import Tokenization from './Tokenization'
// import OTP from './OTP';
import PropTypes from 'prop-types';
import {useFormik} from 'formik'

const initialValues = {
    fullName : "",
    email: "",
    mobileNumber : "",
    bank : "",
    bankk : "",
    branch : "",
    accountId: "",
    nickName : ""
}

const Auth = ({isFilled, fieldsDisabled, FullNameValue, EmailValue, MobNoValue, birthDateValue, ...props }) => {
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema : Step1FormSchema,
        // Formik OnSubmit
        onSubmit : (values, action) =>{
            console.log(values, "Formik Values")
            action.resetForm();
        }
    })
    console.log(errors, "Formik error Console")
    const [tokenDetails, setTokenDetails] = React.useState('')

    // const Tokenization = (props) => {
        // const navigate = useNavigate();
        
        // defining constant
   
        const [message, setMessage] = useState("");
    
        const [bank, setBank] = useState([]);
        const [bankId, setBankId] = useState("");
        const [branch, setBranch] = useState([]);
        const [branchId, setBranchId] = useState("");
        const [formFIlled, setFormFIlled] = useState("");

        // Information  form handle
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
                            // fullName: fullName,
                            // emailId: emailId,
                            // mobileNo: mobileNo,
                            // birthDate: birthDate,
                            // bankId: bankId,
                            // branchId: branchId,
                            // accountId: accountId,
                            // accountNickName: accountNickName,
                            fullName: values.fullName,
                            emailId: values.email,
                            mobileNo: values.mobileNumber,
                            birthDate: values.DOB,
                            bankId: values.bank,
                            branchId: values.branch,
                            accountId: values.accountId,
                            accountNickName: values.nickName,
                        }),
                    }
                );
                const resJson = await res.json();
                console.log(resJson, 'resJson')
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
                    console.log(tokenData.secretKey, "secretKey Success");
                    // setTokenDetails(tokenData)
                } else {
                    setMessage(resJson.message);
                    console.log(resJson.responseCode);
                    console.log(resJson, "response");
                }
            } catch (err) {
                console.log(err);
            }
        };
    
        useEffect(() => {
            const getbank = async () => {
                const req = await fetch(
                    "http://10.250.3.21:8090/api/v1/tokenization/banks"
                );
                const getres = await req.json();
                // console.log(getres);
                setBank(await getres);
            };
            getbank();
        }, []);
    
        console.log(bank);
    
        // const handleSubmit = async (e) => {
        // 	const resJson = await res.json();
        // 	if (resJson.responseCode === "000") {
        // 		setFullName("");
        // 		setEmailId("");
        // 		setMobileNo("");
        // 		setBirthDate("");
        // 		setBankId("");
        // 		setBranchId("");
        // 		setAccountId("");
        // 		setAccountNickName("");
        // 		setMessage("User created successfully");
        // 	}
        // };
    
        const handlebank = (event) => {
            const getBankId = event.target.value;
            setBankId(getBankId);
            // alert(bankId)
            console.log(event.target, "getBankId check")
            event.preventDefault();
        };
    
        const handlebranch = (event) => {
            const getBranchId = event.target.value;
            setBranchId(getBranchId);
            event.preventDefault();
        };
    
        useEffect(() => {
            // alert(bankId)
            const getbranch = async () => {
                const resbranch = await fetch(
                    `http://10.250.3.21:8090/api/v1/tokenization/banks/${bankId}`
                );
                const getst = resbranch.json();
                console.log(getst, "getst")
                setBranch(await getst);
            };
            getbranch();
            // setFormFIlled("complete");
        }, [bankId]);
    
        const theme = createTheme();
    const isFieldDisabled = isFilled && fieldsDisabled
        return (
            <>
                {/* <ThemeProvider theme={theme}></ThemeProvider> */}
    
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
                            Tokenization Form
                        </Typography>
    
                        <form onSubmit={handleSubmit}>
                         {/* onSubmit={handleInformation}> */}
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                    disabled={isFieldDisabled ? true : false}
                                        required
                                        fullWidth
                                        // value={isFilled ? FullNameValue : '' || fullName}
                                        // onChange={(e) => setFullName(e.target.value)}
                                        name='fullName'
                                        value = {values.fullName}
                                        onChange = {handleChange}
                                        label='Full Name'
                                        autoFocus
                                        onBlur = {handleBlur}
                                    />
                                     {errors.fullName && touched.fullName && !isFilled ? <Typography sx = {{color : 'red'}} classes = ''>{errors.fullName}</Typography> : null}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    disabled={isFieldDisabled? true : false}
                                        required
                                        fullWidth
                                        // value={isFilled ? EmailValue: emailId}
                                        value = {isFilled ? EmailValue : values.email}
                                        // onChange={(e) => setEmailId(e.target.value)}
                                        onChange = {handleChange}
                                        label='Email Address'
                                        name='email'
                                        autoComplete='email'
                                        onBlur = {handleBlur}
                                    />
                                    {errors.email && touched.email && !isFilled ? <Typography sx = {{color : 'red'}} classes = ''>{errors.email}</Typography> : null}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    disabled={isFieldDisabled? true : false}
                                        required
                                        fullWidth
                                        // value={isFilled ? MobNoValue : mobileNo}
                                        value = {isFilled ? MobNoValue:values.mobileNumber}
                                        onChange = {handleChange}
                                        // onChange={(e) => setMobileNo(e.target.value)}
                                        label='Mobile Number'
                                        name='mobileNumber'
                                        autoComplete='family-name'
                                        onBlur = {handleBlur}
                                    />
                                    {errors.mobileNumber && touched.mobileNumber && !isFilled ? <Typography sx = {{color : 'red'}} classes = ''>{errors.mobileNumber}</Typography> : null}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    disabled={isFieldDisabled? true : false}
                                        required
                                        fullWidth
                                        // value={isFilled ? birthDateValue : birthDate}
                                        value = {values.DOB}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        // onChange={(e) => setBirthDate(e.target.value)}
                                        onChange = {handleChange}
                                        label='Date Of Birth'
                                        name='DOB'
                                        type='date'
                                        helperText='Date of Birth in AD'
                                        onBlur = {handleBlur}
                                    />
                                   
                                </Grid>
                                {/* // bank info  */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        // value={bankId}
                                        value = {values.bank}
                                        name='bank'
                                        // onChange={(e) => handlebank(e)}
                                        onChange = {e => {handleChange(e); handlebank(e)}}
                                        id='outlined-select-currency'
                                        select
                                        label='Select Your Bank'
                                        onBlur = {handleBlur}
                                        >
                                        {console.log(JSON.stringify(bank, "BANK"))}
                                        {bank.sort((a, b) => a.bankName.localeCompare(b.bankName)).map((item) => {
                                            // newUsers.sort((a, b) => a.name.localeCompare(b.name));
                                            // console.log(item, "BANK ITEMS")
                                            return (
                                                <MenuItem xs={12} key={item.bankId} value={item.bankId}>
                                                    {" "}
                                                    {item.bankName}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                    <Autocomplete
                                    required
                                    // value="abc"
                                    name='bankk'
                                    select
                                    onChange={e => {handlebank(e); handleChange(e);}}
                                        id="highlights-demo"
                                        sx={{ width: 1 }}
                                        options={bank}
                                        getOptionLabel={(option) => option.bankName}
                                        renderInput={(params) => (
                                            <TextField {...params} 
                                            // value={bankId}
                                            value = {values.bankk}
                                            label="Bank" margin="normal" 
                                            onChange={e => {handlebank(e)}}
                                            // onChange = {e => {handleChange(e); }}
                                            // onBlur =  {handleBlur}
                                            />
                                            )}
                                        renderOption={(props, option, { inputValue }) => {
                                            const matches = match(option.bankName, inputValue);
                                            const parts = parse(option.bankName, matches);
                                            console.log(JSON.stringify(parts), "Banks from parts")
                                            return (
                                            <li {...props} value={bankId}>
                                                <div>
                                                {parts.map((part, index) => (
                                                    <span 
                                                    key={index}
                                                    value={values.bankk}
                                                    style={{
                                                        fontWeight: part.highlight ? 700 : 400,
                                                    }}
                                                    >
                                                    {part.text}
                                                    </span>
                                                ))}
                                                </div>
                                            </li>
                                            );
                                        }}
                                        />

                                    {/* <Autocomplete
                                        value={bankId}
                                        onChange={(event, newValue) => {
                                        setBankId(event.target.value);
                                        }}
                                        inputValue={inputValue} 
                                        onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                        }}
                                        id="controllable-states-demo"
                                        options={options}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Controllable" />}
                                    /> */}                        

{/* <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={bank().map((option) => option.bankName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      /> */}
                                </Grid>
    
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        // required
                                        // value={branchId}
                                        value = {values.branch}
                                        // onChange={(e) => handlebranch(e)}
                                        onChange={handleChange}
                                        id='outlined-select-currency'
                                        select
                                        label='Select Your Branch'
                                        name = "branch"
                                    >
                                        {/* {branch.map((st, index) => { */}
                                        {console.log(branch, "values.branch")}
                                            {branch.map((st, index) => {
                                            return (
                                                <MenuItem xs={12} key={index} value={st.branchId}>
                                                    {/* {st.index} */}
                                                    {st.branchName}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Grid>
    
                                <Grid item xs={12}>
                                    <TextField
                                        type='text'
                                        name='accountId'
                                        required
                                        fullWidth
                                        // value={accountId}
                                        value = {values.accountId}
                                        // onChange={(e) => setAccountId(e.target.value)}
                                        onChange = {handleChange}
                                        label='Account Number'
                                        onBlur = {handleBlur}
                                    />
                                </Grid>
    
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='nickName'
                                        fullWidth
                                        // value={accountNickName}
                                        value={values.nickName}
                                        // onChange={(e) => setAccountNickName(e.target.value)}
                                        label='Nick Name'
                                        onChange = {handleChange}
                                        onBlur = {handleBlur}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                            onClick={linkTo('Button', 'first')}
                                type='submit'
                                variant='contained'
                                // onClick={() => navigate("/otp")}
    
                                // onClick={(e) => {
                                // 	if (FormFIlled === "complete") {
                                // 		console.log("e.target.message");
                                // 		navigate("/otp");
                                // 	}
                                // }}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Submit
                            </Button>
                            {message && <Alert severity='error'>
                                  
                                    <p>
                                        {message}

                                    </p>
                                
                            </Alert>}
                            {/* <Alert severity='error'>
                                {message ? (
                                    <p>
                                        {message}
                                        {}
                                    </p>
                                ) : null}
                            </Alert> */}
                        </form>
                    </Paper>
                </Container>
            </>
        );
    // }





//   return (
//     <Router>
//         <Routes>
//             <Route path = '/' element = {<Tokenization />}/>
//             {/* <Route path='/otp' element={<OTP tokenDetails = {tokenDetails}/>} /> */}
//         </Routes>
//     </Router>
//   )
}

export default Auth

Auth.propTypes = {
    /**
     * Is this the principal call to action on the page?
     */
     fieldsDisabled: PropTypes.bool,
     isFilled: PropTypes.bool,
    /**
     * What background color to use
     */
    // backgroundColor: PropTypes.string,
    /**
     * How large should the button be?
     */
    // size: PropTypes.oneOf(['small', 'medium', 'large', 'xl']),
    /**
     * Button contents
     */
     FullNameValue: PropTypes.string.isRequired,
    /**
     * Optional click handler
     */
    onClick: PropTypes.func,
  };
//   isFilled, fieldsDisabled, FullNameValue, EmailValue, MobNoValue, birthDateValue
  Auth.defaultProps = {
    FullNameValue: "",
    // backgroundColor: null,
    // size: 'medium',
    onClick: undefined,
    fieldsDisabled: false,
  };
  