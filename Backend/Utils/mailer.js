const nodemailer = require('nodemailer')

const sendmail=async(email,subject,text)=>{

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })

    await transporter.sendMail({
        from:process.env.MAIL_USER,
        to:email,
        subject,
        text
    })
}

module.exports = {sendmail}