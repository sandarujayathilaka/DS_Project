


require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const sendSMS = async(body) => {
    let msgOptions = {
        from: process.env.PHONE_NUMBER,
        to :process.env.SEND_NUMBER,
        body,
    };
    try{
        const message = await client.messages.create(msgOptions);
        console.log("send succesfully");
        console.log(message);
    }catch(err){
        console.log(err);
    }
};

sendSMS("You are enrolled");


