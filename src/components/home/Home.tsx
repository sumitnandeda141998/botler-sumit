import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Checkbox, Input, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import "./Home.css";
import { strings } from "../../constants/strings";
import { POST_NEWS_LETTER } from "../../constants/server";
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";


const Home = (props: any) => {

    const [email, setEmail] = useState<string>('');
    const [emailErr, setEmailErr] = useState<boolean>(true)
    const [emailErrMessage, setEmailErrMessage] = useState<string>('')
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');


    const onSubmit = async (e: any) => {
        //Check email is not empty
        const testEmail = regex.test(email)
        console.log(testEmail)
        if(email === ''  ){
            setEmailErr(true)
            setEmailErrMessage("Please enter email")
        }else{
            if(testEmail){
            e.preventDefault()
        const post = { 
            email :  email,
            declassified : true
        }
        try {
        // API Calling using Axios and using try catch for handle response
          const res = await axios.post(POST_NEWS_LETTER, post)
          console.log(res.data)
          toast.success("Subscribe Successfully !", {
            position: toast.POSITION.TOP_RIGHT
          });
          setEmail('')
        } catch (e) {
            toast.error("Error Notification !", {
                position: toast.POSITION.TOP_RIGHT
              });
        }
        }
        else{
            setEmailErrMessage("Please enter valid email")
        }
    }
      }

      // Handel input value form this function

      const handelChange = (e: any ) =>{
        setEmail(e.target.value)
        if(email === ''){
            setEmailErr(true)
            setEmailErrMessage("Please enter email")
        }
        else{
            setEmailErr(false)
        }
      }

  return (
    <div className="home">
        <ToastContainer />
      <Container>
        <Box sx={{ bgcolor: "#ECF0F4", height: "40vh", padding: "4em" }}>
          <Box>
            <Typography
              component="h2"
              sx={{ color: "#0D4772", margin: 0, fontWeight: 600 }}
            >
              {strings.subscribe_text}
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: "4em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="text-field">
              <Input
                sx={{ width: "100%", padding: "0.8em", color: "#63738E" }}
                type="email"
                placeholder={strings.email}
                value={email}
                onChange={handelChange}
              />
            </div>
            <div className="button">
              <Button
                sx={{
                  padding: "1.1em",
                  color: "#fff",
                  backgroundColor: "#0D4772",
                  fontWeight: '600',
                }}
                variant="contained"
                onClick={onSubmit}
              >
                {strings.subscribe}
              </Button>
            </div>
          </Box>
          {emailErr && 
          <Typography
            sx={{
              lineHeight: "1.5",
              fontSize: "16px",
              fontFamily: "Open Sans sans-serif",
              fontWeight: 400,
              color: "red",
              marginRight:'228px'
            }}
          >
            {" "}
            {emailErrMessage}
          </Typography>
            }
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1em",
            }}
          >
            <Checkbox
              defaultChecked
              sx={{
                "&.Mui-checked": {
                  color: "#0D4772",
                },
              }}
            />
            <Typography
              component="div"
              sx={{
                lineHeight: "1.8571428571428572",
                fontSize: "16px",
                fontFamily: "Open Sans sans-serif",
                fontWeight: 400,
                color: "#0D4772",
              }}
            >
              {" "}
              {strings.checkbox_message} {" "}
              <a href="/" target="_blank" style={{ color: "#0d4772" }}>
                {strings.terms_and_condition}
              </a>
              {", "}
              <a href="/" target="_blank" style={{ color: "#0d4772" }}>
                {strings.privacy_policy}
              </a>
              {", and "}
              <a href="/" target="_blank" style={{ color: "#0d4772" }}>
                {strings.cookies_policy}
              </a>
            </Typography>
          </Box>
          <Typography
            sx={{
                marginTop: '3em',
              lineHeight: "1.5",
              fontSize: "18px",
              fontFamily: "Open Sans sans-serif",
              fontWeight: 400,
              color: "#0D4772",
            }}
          >
            {" "}
            {strings.description}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

Home.propTypes = {};

export default Home;
