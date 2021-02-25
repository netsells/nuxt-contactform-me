import { resolve } from 'path';

/**
 * Register the module.
 *
 * @param {object} moduleOptions
 */
export default function ContactFormMeModule(moduleOptions = {}) {
    const options = {
        form_identifier: 'contact_form',
        ...moduleOptions,
        ...(this.options.contactformMe || {}),
    };

    const { dst } = this.addTemplate({
        src: resolve(__dirname, './plugin.js'),
        fileName: './contactform-me.js',
        options,
    });

    this.options.plugins.push(resolve(this.options.buildDir, dst));
};
