exports = async function(phoneNumber) {
  const twilio = context.services.get("Send");
  const code = generateDeviceCode();

  // Store the code in MongoDB then send it to the user in a text message
  await linkCodeWithPhoneNumber(code, phoneNumber)
  .then(() => twilio.send({
     to: phoneNumber,
     from: context.values.get("TwilioSendNumber").toString(),
     body: `Your WIWS code is: ${code}. Please enter this on the web page.`
   }));
}

function generateDeviceCode() {
  // Generate a 6-digit 2fa code
    const genCodePart = () => {
      const part = Math.floor(Math.random() * 1000);
      return part.toString().padStart(3, 0);
    };
    const code = genCodePart(3) + genCodePart(3);
    return code;
  }

  function linkCodeWithPhoneNumber(code, phoneNumber) {
  // Update or insert the document for the submitted phone number.
  // The document has information on the most recent 2fa code for a
  // phone number, including when the code was generated.
  
    //const collection;
    var collection = context.services.get("atlas").db("alerts").collection("2fa");
    
    return collection.updateOne(
      { "phoneNumber": phoneNumber },
      { $set: { current2fa: { "code": code, "time": Date.now() } } },
      { "upsert": true }
    );
  };
  if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength,padString) {
      targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
      padString = String((typeof padString !== 'undefined' ? padString : ' '));
      if (this.length > targetLength) {
          return String(this);
      }
      else {
          targetLength = targetLength-this.length;
          if (targetLength > padString.length) {
              padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
          }
          return padString.slice(0,targetLength) + String(this);
      }
  };
}