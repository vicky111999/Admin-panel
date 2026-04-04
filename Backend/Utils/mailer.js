const nodemailer = require('nodemailer')

const sendmail=async(email,maildata)=>{
        console.log(maildata.text)
    const transporter = nodemailer.createTransport({
       host:process.env.MAIL_HOST,
       port:process.env.MAIL_PORT,
       secure:false,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })
    await transporter.sendMail({
        from:process.env.MAIL_USER,
        to:email,
        subject:maildata.subject,
        text:maildata.text
    })
}

module.exports = {sendmail}