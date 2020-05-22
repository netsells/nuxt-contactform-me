# Nuxt Contactform.me

> Nuxt integration for Contactform.me

This module provides functionality to submit your form data to the [contactform.me](contactform.me) service.

## Installation

```sh
$ yarn add @netsells/nuxt-contactform-me
```

Add the module to your nuxt config:

```js
modules: [
    // Other modules
    '@netsells/nuxt-contactform-me',
],
```

Define the module options: 

```js
contactformMe: {
    // Options (see below)
},
```

## Options

There are two options available to configure in your application:

### `form_identifier`
> The identifier of the form submitting the request
- Default: 'contact_form',
- Type: `string`

### `submit_endpoint`
> The endpoint to submit the data to
- Default: `${ process.env.APP_URL }/api/contact-form`,
- Type: `string`

You will want to change this if you're not using the adonis integration (see below) or your form api is hosted off site.

## Usage

Once the module is installed it will register a global `$cfme` object. This object has a single method `submit`. When called will return an axios promise.

This method accepts the following arguments:

`$cfme.submit(data, formIdentifer?)`

### `data`
> The data to submit to contactform.me
- Default: `undefined`
- Type: `object`
- `required`

### `formIdentifier`
> An override of the default `form_identifier` value set in your config
- Default: `contact_form`
- Type: `string`

```js
methods: {
    async handleSubmit() {
        await this.$cfme.submit({
            email: this.formData.email,
            name: this.formData.name,
        });
        // Handle success
    },
},
```


If your application has multiple forms you can provide the second `formIdentifier` argument:

```js
methods: {
    async handleSubmit() {
        await this.$cfme.submit({
            email: this.formData.email,
            name: this.formData.name,
        }, 'application_form');
        // Handle success
    },
},
```

## Submit endpoint

Due to CORS on the Contactform.me service, requests must be proxied on the server side. To there are current two ways to accomplish this.

### PHP

See the [PHP wrapper](https://github.com/netsells/contactformme-php).

### Adonis

If using adonis as your Nuxt applications backend you can use the service provider included within this package.

#### Usage

Add the module to your applications service providers in `start/app.js`:

```js
const providers = [
    // Other providers
    '@netsells/nuxt-contactform-me/adonis/providers/ContactFormMeProvider',
];
```

Ensure the provided api endpoint is in your CSRF exclusions in `config/shield.js`:

```js
csrf: {
    filterUris: [
        '/api/contact-form',
    ],
},
```

Set the key for your Contactform.me form in your applications `.env` file:

```dotenv
CONTACTFORM_ME_KEY=<KEY HERE>
```
