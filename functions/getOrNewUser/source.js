exports = async function(stitch_id){
  var collection = context.services.get("atlas").db("alerts").collection("users");
  
  return await collection.findOne({_id:BSON.ObjectId(stitch_id)}).then(r=>{
    console.log('returning', JSON.stringify(r))
     return r;
  })

};