
async function sendMail(mailFrom, object, content) {
    return await fetch('http://localhost:10000/api/v1/mail',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: mailFrom,
            object: object,
            content: content
        })
    })
    .then(response => {
        console.log("response: ", response.status);
        const data = response.json();
        console.log("data: ", (data));
    });
    
  }

  export default {
    sendMail
  };