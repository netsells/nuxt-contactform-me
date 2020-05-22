import { resolve } from 'path';

/**
 * Register the module.
 *
 * @param {object} moduleOptions
 */
export default function ContactFormMeModule(moduleOptions = {}) {
    const options = {
        form_identifier: 'contact_form',
        submit_endpoint: `${ process.env.APP_URL }/api/contact-form`,
        ...moduleOptions,
        ...(this.options.contactformme || {}),
    };

    const plugin = this.addTemplate({
        src: resolve(__dirname, './plugin.js'),
        fileName: './contactform-me.js',
        options,
    });

    this.options.plugins.push(resolve(this.options.buildDir, plugin.dst));
}
