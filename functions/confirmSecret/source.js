exports = async function(phoneNumber, sekrit){
    console.log('checking', phoneNumber, sekrit)
    var collection = context.services.get("atlas").db("alerts").collection("2fa");
    var usersCollection = context.services.get("atlas").db("alerts").collection("users");
    
    return await collection.findOne(
      { "phoneNumber": phoneNumber }).then(async result=>{
        if (result===null){ 
          console.error("I can't find a matching user");
          return {status: "error", message: "That phone number is not yet in our system; send a new code first!"};
        }
        console.log('I found the user');
        if (result.current2fa.code == sekrit) {
          console.log('code matches');
          return {status: "success", message: "Your number has been confirmed."};
        } else {
          return {status: "error", message: "The code you entered didn't match the one we sent."};
        }
      }).catch(err=>{
        console.error(err);
        return {status: "error", message: "That phone number is not yet in our system; send a new code first!"};
      });
};