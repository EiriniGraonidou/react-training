const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {

    constructor({subject, recipients}, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridWebKey);
        this.from_email = new helper.Email('egraonidou@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
       // this.addClickTracking();
        this.addRecipients();
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
       // const clickTracking = new helper.ClickTracking(false, false);
        //trackingSettings.setClickTracking(clickTracking);
        this.addClickTracking(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        debugger;

        
        const response = await this.sgApi.API(request);
        return response;
    }

}

module.exports = Mailer;