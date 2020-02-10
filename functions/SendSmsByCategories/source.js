exports = async function(args) {
  const message = args.msg;
  const categories = args.to;
  
  console.log('categories', categories);
  const collection = context.services.get("atlas").db("alerts").collection("users");
  const twilio = context.services.get("Send");
  
  const getUsersSubscribedTo = [
  {
    '$match': {
      'alerts': {
        '$elemMatch': {
          '$and': [
            {
              'subscribed': true
            }, {
              '$or': [{"type":{'$in':categories}}
              ]
            }
          ]
        }
      }
    }
  }, {
    '$match': {
      'confirmed': true
    }
  }, {
    '$project': {
      '_id': 0, 
      'phone': {
        '$ifNull': [
          '$phone', ''
        ]
      }
    }
  }
];

  return await collection.aggregate(getUsersSubscribedTo).toArray().then(recipients=>{
    console.log('gonna send to...', JSON.stringify(recipients));
     //todo: twilio requires a foreach for each number...
     recipients.forEach(r=>{
       twilio.send({
           to: r.phone,
           from: context.values.get("TwilioSendNumber").toString(),
           body: `WIWS Annoucement:\n` + message
         });
     });
  }).then(m=>{return m;}).catch(e=>{
    console.error(e);
    return e});

};
