import logger from '../lib/logger.js'
import cfg from '../config.js'

/**
 * @openapi
 * definitions:
 *  CustomError:
 *      type: object
 *      properties:
 *          error:
 *              type: number
 *          description:
 *              type: string
 */


function handleErrors(err, req, res, next) {
    const { httpStatusCode = cfg.HTTP_SERVER_ERROR } = err
    logger.debug(err.stack);
    if (httpStatusCode >= 400 && httpStatusCode < 500) {
        logger.warn(err.message);
    } else if (httpStatusCode >= 500) {
        logger.error(err.message);
    } else {
        logger.info(err.message);
    }
    res.status(httpStatusCode).json({
        error: err.code,
        description: err.message
    });
}

export { handleErrors } 