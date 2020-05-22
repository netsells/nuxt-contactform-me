'use strict';

const { ServiceProvider } = use('@adonisjs/fold');

class ContactFormMeProvider extends ServiceProvider {
    /**
     * Register the provider.
     */
    register() {
        this.app.bind('ContactFormMe/ContactFormMeController', () => {
            const ContactFormMeController = require('../Http/Controllers/ContactFormMeController');

            return new ContactFormMeController();
        });
    }

    /**
     * Run commands on boot.
     */
    boot() {
        const Route = use('Adonis/Src/Route');

        Route.post('/api/contact-form', '@provider:ContactFormMe/ContactFormMeController.submit');
    }
}

module.exports = ContactFormMeProvider;
