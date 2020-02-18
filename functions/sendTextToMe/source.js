exports = async function(arg){
  
  const users = context.services.get("atlas").db("alerts").collection("users");
  
  return await users.findOne({oauth_id: context.user.id}).then(me=>{
    console.log(me.phone);
    if (me.phone !== undefined){
      const twilio = context.services.get("Send");
      twilio.send({
         to: me.phone,
         from: context.values.get("TwilioSendNumber").toString(),
         body: `[TEST Annoucement]\n` + arg + `\nTest message sent ` + new Date()
      }).catch(e=>{
         console.error("Twilio returned error: ", e);
      });
    } //end if
  }).catch(e=>{
    console.error(e);
    return e;
  })
}