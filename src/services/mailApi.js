import logger from '../lib/logger.js'
import { sendMail } from '../lib/mail.js'
import fs from 'fs'
import ejs from 'ejs'
import cfg from '../config.js'

const CODIFICATION = 'utf-8'
const HTML_PATH = './src/templates/mail'

const templateNewUserNotif = await fs.promises.readFile(HTML_PATH + '/newUserNotif.ejs', CODIFICATION)
const templateNewUserNotifSubject = await fs.promises.readFile(HTML_PATH + '/newUserNotifSubject.ejs', CODIFICATION)

class MailApi {

    static async newUserMailNotif(user){
        try {
            await sendMail(
                cfg.MAIL_USER, 
                ejs.render(templateNewUserNotifSubject),
                ejs.render(templateNewUserNotif, { usuario: user })
            )
        } catch (error) {
            logger.error(error.message)
            logger.debug(error.stack)
        }
    }

}

export default MailApi;


