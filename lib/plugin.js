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
            return app.$axios.post('<%- options.submit_endpoint %>', {
                cf_form_identifier: formIdentifier,
                ...data,
            });
        },
    };
};
