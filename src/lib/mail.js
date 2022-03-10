import { createTransport } from 'nodemailer'
import cfg from '../config.js'

const transporter = createTransport({
    service: cfg.MAIL_SERVICE,
    host: cfg.MAIL_HOST,
    port: cfg.MAIL_PORT,
    auth: {
        user: cfg.MAIL_USER,
        pass: cfg.MAIL_PASSWORD
    }
})

export async function sendMail(destination, subject, html){

    const mailOptions = {
        from: cfg.MAIL_APPSENDER,
        to: destination,
        subject: subject,
        html: html
    }
    
    return transporter.sendMail(mailOptions)
}