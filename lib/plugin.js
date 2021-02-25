import Vue from 'vue';

/**
 * Setup the plugin.
 *
 * @param {object} context
 * @param {object} context.app
 *
 * @returns {Promise<void>}
 */
export default async function({ app }) {
    Vue.prototype.$cfme = {
        submit(data, formIdentifier = '<%- options.form_identifier %>') {
            const appUrl = this.$config?.APP_URL
                || process.env.APP_URL;
            const identifier = this.$config?.contactformMe?.form_identifier
                || formIdentifier;
            const endpoint = this.$config?.contactformMe?.submit_endpoint
                || `${ appUrl }/api/contact-form`;

            return app.$axios.post(endpoint, {
                cf_form_identifier: identifier,
                ...data,
            });
        },
    };
};
