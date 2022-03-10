import twilio from 'twilio'
import cfg from '../config.js'
import logger from './logger.js'

const client = twilio(cfg.TWILIO_ACCOUNTSID, cfg.TWILIO_AUTHTOKEN)


export async function sendMessage(toNumber, body, mediaUrl = null){
   if (cfg.TWILIO_ENABLED) {
      const options = {
         body: body,   
         from: cfg.TWILIO_NUMBER,
         to: toNumber,
      }

      if (mediaUrl) {
         options.mediaUrl= mediaUrl
      }
      
      return client.messages.create(options)
   } else {
       logger.debug(`Mock Message [toNumber: ${toNumber}][body: ${body}]`)
   }
}