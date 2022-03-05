import logger from '../lib/logger.js'

function handleErrors(err, req, res, next) {
    const { httpStatusCode = cfg.HTTP_SERVER_ERROR } = err
    logger.trace(err.stack);
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