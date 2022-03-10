import logger from '../lib/logger.js'
import { sendMail } from '../lib/mail.js'
import { sendMessage } from '../lib/message.js'
import fs from 'fs'
import ejs from 'ejs'
import cfg from '../config.js'

const CODIFICATION = 'utf-8'
const TEMPLATES_PATH = './src/templates'

const templateNewUserMailNotif = await fs.promises.readFile(TEMPLATES_PATH + '/mail/newUserMailNotif.ejs', CODIFICATION)
const templateNewUserMailNotifSubject = await fs.promises.readFile(TEMPLATES_PATH + '/mail/newUserMailNotifSubject.ejs', CODIFICATION)
const templateNewUserMsgNotif = await fs.promises.readFile(TEMPLATES_PATH + '/message/newUserMailMsgNotif.ejs', CODIFICATION)

class NotificationApi {

    static async notificateNewUser(user){
        try {
            const htmlSubject = ejs.render(templateNewUserMailNotifSubject)
            const htmlBody = ejs.render(templateNewUserMailNotif, { usuario: user })
            const msgBody = ejs.render(templateNewUserMsgNotif, { usuario: user })
            await sendMail(cfg.ADMIN_MAIL, htmlSubject, htmlBody)
            await sendMessage(cfg.ADMIN_NUMBER, msgBody, [ user.imageurl ])
        } catch (error) {
            logger.error(error.message)
            logger.debug(error.stack)
        }
    }

}

export default NotificationApi;


