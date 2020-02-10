exports = async function(phone){
  console.log('adding phone', phone)
  const appSettingsCollection = context.services.get("atlas").db("alerts").collection("appSettings");
  return await appSettingsCollection.findOneAndUpdate(
    {}, { $push: { 'phone_numbers': phone } }
  ).then(r=>{
    console.log('added phone', JSON.stringify(r.phone_numbers), phone);
    return true;
  }).catch(gollygee=>{
    console.error(gollygee);
    return false;
  });
}