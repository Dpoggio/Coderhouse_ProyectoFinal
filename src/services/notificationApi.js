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
const templateNewUserMsgNotif = await fs.promises.readFile(TEMPLATES_PATH + '/message/newUserMsgNotif.ejs', CODIFICATION)

const templateNewOrderMailNotif = await fs.promises.readFile(TEMPLATES_PATH + '/mail/newOrderMailNotif.ejs', CODIFICATION)
const templateNewOrderMailNotifSubject = await fs.promises.readFile(TEMPLATES_PATH + '/mail/newOrderMailNotifSubject.ejs', CODIFICATION)
const templateNewOrderMsgNotif = await fs.promises.readFile(TEMPLATES_PATH + '/message/newOrderMsgNotif.ejs', CODIFICATION)
const templateNewOrderUserMsgNotif = await fs.promises.readFile(TEMPLATES_PATH + '/message/newOrderUserMsgNotif.ejs', CODIFICATION)


class NotificationApi {

    static async notificateNewUser(user){
        try {
            const htmlSubject = ejs.render(templateNewUserMailNotifSubject, { usuario: user })
            const htmlBody = ejs.render(templateNewUserMailNotif, { usuario: user })
            const msgBody = ejs.render(templateNewUserMsgNotif, { usuario: user })
            await sendMail(cfg.ADMIN_MAIL, htmlSubject, htmlBody)
            // await sendMessage(cfg.ADMIN_NUMBER, msgBody, [ user.imageurl ])
        } catch (error) {
            logger.error(error.message)
            logger.debug(error.stack)
        }
    }

    static async notificateNewOrder(order, user){
        try {
            const htmlSubject = ejs.render(templateNewOrderMailNotifSubject, { orden: order, usuario: user })
            const htmlBody = ejs.render(templateNewOrderMailNotif, { orden: order, usuario: user })
            const msgBody = ejs.render(templateNewOrderMsgNotif, { orden: order, usuario: user })
            await sendMail(cfg.ADMIN_MAIL, htmlSubject, htmlBody)
            await sendMessage(cfg.ADMIN_NUMBER, msgBody)
        } catch (error) {
            logger.error(error.message)
            logger.debug(error.stack)
        }
    }

    static async notificateNewOrderToUser(order, user){
        try {
            const msgBody = ejs.render(templateNewOrderUserMsgNotif, { orden: order, usuario: user })
            await sendMessage(user.telefono, msgBody)
        } catch (error) {
            logger.error(error.message)
            logger.debug(error.stack)
        }
    }

}

export default NotificationApi;


