import Nodemailer from 'nodemailer';
import { email, starters, mains, getRsvpEnd } from '../config';
import { handleError } from '../core/rollbar';

const transporter = Nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email.senderAddress,
    pass: email.password,
  },
});

// Debounce sending the email to avoid spamming
const emailTimers = {};

function getEmailText(person) {
  return `Dear ${person.firstname}.\n\n
Thanks for your RSVP, ${person.attending ? 'we\'re delighted to hear you will be attending' : 'we\'re sorry to hear you will not be attending'}.\n
${person.attending ? `Your meal choices are ${starters[person.starter]} and ${mains[person.main]}.\n` : ''}
${person.attending && person.dietary.length > 0 ? `Your dietary requirements are: ${person.dietary}.\n` : ''}
You can modify your RSVP up until ${getRsvpEnd()} here: https://danielandhana.com/${person.password}.\n
${person.attending ? 'See you at our wedding,' : 'See you soon,'}\n
Daniel and Hana
`;
}

function getEmailHTML(person) {
  return `<p>Dear ${person.firstname}.</p>
<p>Thanks for your RSVP, ${person.attending ? 'we\'re delighted to hear you will be attending' : 'we\'re sorry to hear you will not be attending'}.</p>
${person.attending ? `<p>Your meal choices are <b>${starters[person.starter]}</b> and <b>${mains[person.main]}</b>.</p>` : ''}
${person.attending && person.dietary.length > 0 ? `<p>Your dietary requirements are: <b>${person.dietary}</b>.</p>` : ''}
<p>You can modify your RSVP up until <b>${getRsvpEnd()}</b> <a href="https://danielandhana.com/${person.password}">here</a>.</p>
<p>${person.attending ? 'See you at our wedding,' : 'See you soon,'}</p>
<p>Daniel and Hana</p>
`;
}

export const sendRSVPEmail = function sendRSVPEmail(person) {
  const mailOptions = {
    from: `"${email.senderName}" <${email.senderAddress}>`,
    to: person.email,
    subject: 'Thank you for your RSVP',
    text: getEmailText(person),
    html: getEmailHTML(person),
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      handleError(error);
    }
  });
};

export const sendRSVPEmailWithDebounce = function sendRSVPEmailWithDebounce(person) {
  if (person.key) {
    // Stop previous email
    clearTimeout(emailTimers[person.key]);
    emailTimers[person.key] = setTimeout(() => {
      sendRSVPEmail(person);
    }, 10000);
  }
};
