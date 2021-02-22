const sgMail = require('@sendgrid/mail')

const from = process.env.EMAIL_SENDER

sgMail.setApiKey(process.env.SENDGRIP_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email, 
        from, 
        subject: 'Thanks for joining in!', 
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}
const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email, 
        from, 
        subject: 'Sorry to see you go!',
        text: `We hope you had a great time ${name}, see you soon!`
    })
}

module.exports = {
    sendWelcomeEmail, 
    sendCancelationEmail
}