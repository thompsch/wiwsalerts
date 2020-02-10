exports = async function(user){
  console.log(user, user._id)
  const usersCollection = context.services.get("atlas").db("alerts").collection("users");
  const deletedUsersCollection = context.services.get("atlas").db("alerts").collection("deleted_users");
  
   return await usersCollection.findOne({"_id":user._id}).then(async u=>{
     console.log('found user', u)
     return await deletedUsersCollection.insertOne(u).then(async response=>{
       if (response && response.insertedId){
         return await usersCollection.deleteOne({"_id":u._id}).then(r=>{
           return (r.deletedCount===1);
         });
       }
     })
   })
};