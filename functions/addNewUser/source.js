exports = async function(args){
   var collection = context.services.get("atlas").db("alerts").collection("users");
   return await collection.insertOne(
     {oauth_id: args.user.id, 
      name: args.user.data.name, 
      email: args.user.data.email,
      phone: '(xxx)yyy-zzzz',
      children:[],
      alerts: []
     }).then(d=>{
     return d;
   });

};