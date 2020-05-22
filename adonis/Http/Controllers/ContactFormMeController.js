'use strict';

const axios = require('axios');
const qs = require('qs');

class ContactFormMeController {
    /**
     * Submit the request to Contactform.me.
     *
     * @param {object} context
     * @param {object} context.request
     * @param {object} context.response
     *
     * @returns {Promise<any>}
     */
    async submit({ request, response }) {
        const data = request.all();

        try {
            await axios.post(`https://contactform.me/post/${ process.env.CONTACTFORM_ME_KEY }`, qs.stringify(data));
        } catch (e) {
            console.dir(e, { depth: null });

            return response.status(500).json({
                message: 'An error occurred',
            });
        }

        return response.json({
            success: true,
        });
    }
}

module.exports = ContactFormMeController;
