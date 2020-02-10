exports = async function(user){
    var usersCollection = context.services.get("atlas").db("alerts").collection("users");
     const twilio = context.services.get("Send");
    
    return await usersCollection.findOneAndUpdate({_id: user._id}, user, {upsert:true, returnNewDocument:true})
      .then(result=>{
        console.log('updated user results', result);
        
        var cats = user.alerts.map(a=> '[' + (a.subscribed === true ? 'X' : ' ') + '] ' + a.type).join('\n');
        console.log(cats);
        twilio.send({
           to: user.phone,
           from: context.values.get("TwilioSendNumber").toString(),
           body: `Your WIWS alert settings have updated! This phone will receive the following text messages:\n` + cats.toString()
        });
      });
}