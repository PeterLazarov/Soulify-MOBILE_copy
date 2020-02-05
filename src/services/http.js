import logger from './logger';

export default {
    async request(url, verb = 'GET', body = null) {
        verb = verb || 'GET';
        body = body || null;

        logger.log(`fetching ${url} via ${verb}`);
        if (body) {
            logger.logObject(body);
        }

        let response = {};
        try {
            response = await fetch(url, {
                method: verb,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : null
            });
            logger.logObject(response);
        } catch (error) {
            logger.log(error);
        }

        let json = {};
        try {
            json = await response.json();
            logger.logObject(json);
        } catch (error) {
            logger.log(error);
        }

        return {
            isNotValid: response.status === 400,
            isNotFound: response.status === 404,
            isError: response.status === 500,
            isForbidden: response.status === 403,
            isCreated: response.status === 201,
            isOkay: response.ok,
            status: response.status,
            data: json
        };
    }
}