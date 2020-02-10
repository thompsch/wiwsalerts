exports = async function(args) {
  const message = args.msg;
  
  const collection = context.services.get("atlas").db("alerts").collection("appSettings");
  const twilio = context.services.get("Send");
  
  return await collection.findOne({}).then(settings =>{
    const recipients = settings.phone_numbers;
    console.log(recipients.count);
     recipients.forEach(r=>{
       console.log('Sending SMS to', r);
       twilio.send({
           to: r,
           from: context.values.get("TwilioSendNumber").toString(),
           body: `[WIWS Annoucement]\n` + message
         }).catch(e=>{
           console.error("Twilio returned error: ", e);
         });
     });
  }).then(m=>{return m;}).catch(e=>{
    console.error(e);
    return e});
}
