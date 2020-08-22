var client = require('twilio')(process.env.twilioAccountSid, process.env.twilioAccessToken, { 
    lazyLoading: true 
});


module.exports.sendPositionText = async(Contact,position) =>{
    client.messages.create({
        body: position,
        to: Contact,  // Text this number
        from: process.env.twilioFromNumber // From a valid Twilio number
    })
    .then((message) => console.log("Contact message send",message.sid));
}

