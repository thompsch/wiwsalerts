exports = function(input) {
  console.log('fromAdmin Web hook fired!', JSON.stringify(input));
  /*\"AccountSid\":\"AC0861a05609d60e8fd02d84bc95a3620c\",\"ApiVersion\":\"2010-04-01\",
  \"Body\":\"Test2\",
  \"From\":\"+1425417xxxx\",
  \"FromCity\":\"BELLEVUE\",
  \"FromCountry\":\"US\",
  \"FromState\":\"WA\",
  \"FromZip\":\"98008\",
  \"MessageSid\":\"SM6a22c29bab5e8f6479b8ffff"*/
  const twilio = context.services.get("Send");
  var usersCollection = context.services.get("atlas").db("alerts").collection("users");
  
  /*if (input.Body.toLowerCase().includes("help")) {
      twilio.send({
       to: input.From,
       from: context.values.get("TwilioSendNumber").toString(),
       body:  `Reply with 'stop' to stop receiving all texts from WIWS.` +
              `Or reply with the categories, in [ ], for which you no longer want messages. Your options for categories are:\n` + 
              `'all', 'general', 'class', 'emergencies', and 'closures'\n` + 
              `for example, reply with '[general class closures]' to be removed from those 3 lists.\n` + 
              `Or log on to ` + context.values.get("URL") + ` to change you settings.`
      });
  } else */
  if (Array.isArray(input.body)){
     usersCollection.findOne({phone:input.From}).then(user=>{
      console.log('current settings', JSON.stringify(user.alerts));
      input.body.forEach(cat=>{
        switch (cat){
          case 'all':{
             user.alerts[0].subscribed = false;
              user.alerts[1].subscribed = false;
               user.alerts[2].subscribed = false;
                user.alerts[3].subscribed = false;
            break;
          }
          case 'general':{
            user.alerts[0].subscribed = false;
            break;
          }
          case 'class':{
            user.alerts[1].subscribed = false;
            break;
          }
          case 'emergencies':{
            user.alerts[2].subscribed = false;
            break;
          }
          case 'closures':{
            user.alerts[3].subscribed = false;
            break;
          }
        }
         console.log('new settings', JSON.stringify(user.alerts));
         
         usersCollection.findOneAndUpdate({'_id': BSON.ObjectId(user._id)},{ $set:{'alerts': user.alerts}})
          .then(r=>{
              console.log("updated user", user.phone, JSON.stringify(user.alerts));
            twilio.send({
               to: input.From,
               from: context.values.get("TwilioSendNumber").toString(),
               body: `Please reply again with the categories, in [ ], that you want to no longer receive messages for. Your options for categories are:\n` + 
                `'all', 'general', 'class', 'emergencies', and 'closures'\n` + 
                `for example, reply with '[general class closures]' to be removed from those 3 lists.`
              });
            })
            .catch(e=>{
              console.error(e);
            });
        });
    })
    .catch(e => {
      console.error(e);
    });
  }
};