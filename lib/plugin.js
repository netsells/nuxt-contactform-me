import Vue from 'vue';

/**
 * Setup the plugin.
 *
 * @param {object} context
 * @param {object} context.app
 * @param {object} context.$config
 *
 * @returns {Promise<void>}
 */
export default async function({ app, $config = {} }) {
    Vue.prototype.$cfme = {
        submit(data, formIdentifier = '<%- options.form_identifier %>') {
            const appUrl = $config?.APP_URL
                || process.env.APP_URL;
            const identifier = $config?.contactformMe?.form_identifier
                || formIdentifier;
            const endpoint = $config?.contactformMe?.submit_endpoint
                || `${ appUrl }/api/contact-form`;

            return app.$axios.post(endpoint, {
                cf_form_identifier: identifier,
                ...data,
            });
        },
    };
};
