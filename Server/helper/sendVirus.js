const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Define the email templates for each company
const templates = {
  "1": {
    "name": "LinkedIn Support",
    "email": "support@linkedin.com",
    "subject": "Verify Your LinkedIn Account",
    "body": `
    <p><strong>From:</strong> LinkedIn Support &lt;support@linkedin.com&gt;</p>
    <p><strong>To:</strong> {recipient_email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>Hi {recipient_name},</p>
    <p>We’ve detected unusual activity on your LinkedIn account that requires your attention. To ensure the security of your profile and prevent unauthorized access, please verify your account information by following the link below:</p>
    <p><a href="{malicious_link}">Verify Your Account Information</a></p>
    <p>Your immediate action is required to maintain the security of your LinkedIn profile. If you do not verify your account within 24 hours, there may be temporary restrictions placed on your access.</p>
    <p>Thank you for your prompt attention to this matter.</p>
    <p>Best regards,<br>LinkedIn Security Team</p>
    `
  },
  "2": {
    "name": "Azure Team",
    "email": "noreply@azure.com",
    "subject": "Verify Your Azure Account",
    "body": `
    <p><strong>From:</strong> Azure Team &lt;noreply@azure.com&gt;</p>
    <p><strong>To:</strong> {recipient_email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>Hi {recipient_name},</p>
    <p>We have detected some unusual activity on your Azure account. To secure your account, please verify your details by clicking the link below:</p>
    <p><a href="{malicious_link}">Verify Your Azure Account</a></p>
    <p>Complete this verification within 24 hours to avoid any disruptions to your services.</p>
    <p>Thank you for your attention.</p>
    <p>Best regards,<br>Azure Security Team</p>
    `
  },
  "3": {
    "name": "Google Account Security",
    "email": "security@google.com",
    "subject": "Secure Your Google Account",
    "body": `
    <p><strong>From:</strong> Google Account Security &lt;security@google.com&gt;</p>
    <p><strong>To:</strong> {recipient_email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>Hi {recipient_name},</p>
    <p>We noticed a sign-in attempt on your Google account that seems unusual. Please secure your account by following the link below:</p>
    <p><a href="{malicious_link}">Secure Your Account</a></p>
    <p>Verify within 24 hours to prevent any unauthorized access.</p>
    <p>Thank you for your cooperation.</p>
    <p>Best regards,<br>Google Security Team</p>
    `
  },
  "4": {
    "name": "Facebook Support",
    "email": "support@facebook.com",
    "subject": "Confirm Your Facebook Account",
    "body": `
    <p><strong>From:</strong> Facebook Support &lt;support@facebook.com&gt;</p>
    <p><strong>To:</strong> {recipient_email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>Hi {recipient_name},</p>
    <p>We’ve detected suspicious activity on your Facebook account. To secure your account, please confirm your information by clicking the link below:</p>
    <p><a href="{malicious_link}">Confirm Your Facebook Account</a></p>
    <p>Complete this verification within 24 hours to maintain access to your account.</p>
    <p>Best regards,<br>Facebook Security Team</p>
    `
  },
  "5": {
    "name": "Amazon AWS",
    "email": "no-reply@amazonaws.com",
    "subject": "Verify Your AWS Account",
    "body": `
    <p><strong>From:</strong> Amazon AWS &lt;no-reply@amazonaws.com&gt;</p>
    <p><strong>To:</strong> {recipient_email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>Hi {recipient_name},</p>
    <p>We’ve noticed unusual activity in your AWS account. To ensure its security, please verify your details by following the link below:</p>
    <p><a href="{malicious_link}">Verify Your AWS Account</a></p>
    <p>Verify within 24 hours to prevent service disruptions.</p>
    <p>Thank you for your attention.</p>
    <p>Best regards,<br>AWS Security Team</p>
    <p><img src="https://example.com/aws-image.png" alt="AWS Image" /></p>
    `
  },
  "6": {
    "name": "PayPal Security Team",
    "email": "security@paypal.com",
    "subject": "Action Required: Confirm Your PayPal Account",
    "body": `
    <p><strong>From:</strong> PayPal Security Team &lt;security@paypal.com&gt;</p>
    <p><strong>To:</strong> {recipient_email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>Hi {recipient_name},</p>
    <p>We’ve detected suspicious activity on your PayPal account. To ensure the security of your account and prevent unauthorized transactions, please confirm your account information by following the link below:</p>
    <p><a href="{malicious_link}">Confirm Your PayPal Account</a></p>
    <p>Please complete this verification within 24 hours to avoid any disruptions to your account.</p>
    <p>Thank you for your cooperation.</p>
    <p>Best regards,<br>PayPal Security Team</p>
    `
  },
  "7": {
    "name": "Netflix Support",
    "email": "support@netflix.com",
    "subject": "Verify Your Netflix Account",
    "body": `
    <p><strong>From:</strong> Netflix Support &lt;support@netflix.com&gt;</p>
    <p><strong>To:</strong> {recipient_email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>Hi {recipient_name},</p>
    <p>We noticed unusual activity on your Netflix account. To prevent any potential issues with your account, please verify your account information by clicking the link below:</p>
    <p><a href="{malicious_link}">Verify Your Netflix Account</a></p>
    <p>Ensure you complete this verification within 24 hours to avoid any service interruptions.</p>
    <p>Thank you for your prompt action.</p>
    <p>Best regards,<br>Netflix Support Team</p>
    `
  },
  "8": {
    "name": "Dropbox Team",
    "email": "support@dropbox.com",
    "subject": "Secure Your Dropbox Account",
    "body": `
    <p><strong>From:</strong> Dropbox Team &lt;support@dropbox.com&gt;</p>
    <p><strong>To:</strong> {recipient_email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>Hi {recipient_name},</p>
    <p>We detected some unusual activity on your Dropbox account. To ensure the security of your files, please verify your account information by following the link below:</p>
    <p><a href="{malicious_link}">Secure Your Dropbox Account</a></p>
    <p>Complete this verification within 24 hours to avoid any disruptions.</p>
    <p>Thank you for your attention.</p>
    <p>Best regards,<br>Dropbox Security Team</p>
    `
  },
  "9": {
    "name": "Twitter Support",
    "email": "support@twitter.com",
    "subject": "Verify Your Twitter Account",
    "body": `
    <p><strong>From:</strong> Twitter Support &lt;support@twitter.com&gt;</p>
    <p><strong>To:</strong> {recipient_email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>Hi {recipient_name},</p>
    <p>We’ve noticed suspicious login attempts on your Twitter account. To secure your account, please verify your details by clicking the link below:</p>
    <p><a href="{malicious_link}">Verify Your Twitter Account</a></p>
    <p>Complete this verification within 24 hours to avoid any access issues.</p>
    <p>Thank you for your prompt attention.</p>
    <p>Best regards,<br>Twitter Support Team</p>
    `
  },
  "10": {
    "name": "Spotify Support",
    "email": "support@spotify.com",
    "subject": "Confirm Your Spotify Account",
    "body": `
    <p><strong>From:</strong> Spotify Support &lt;support@spotify.com&gt;</p>
    <p><strong>To:</strong> {recipient_email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>Hi {recipient_name},</p>
    <p>We’ve detected unusual activity on your Spotify account. To secure your account and prevent any unauthorized changes, please confirm your information by clicking the link below:</p>
    <p><a href="{malicious_link}">Confirm Your Spotify Account</a></p>
    <p>Verify within 24 hours to ensure uninterrupted access to your account.</p>
    <p>Thank you for your cooperation.</p>
    <p>Best regards,<br>Spotify Support Team</p>
    `
  }
}


function generateTrackingUrl(uniqueId) {
  return `http://localhost:5000/track/${uniqueId}`;
}

async function sendEmail(fromEmail, toEmail, smtpConfig, subject, templateData, recipientName, maliciousLink) {
  // Generate a unique tracking ID
  const trackingUrl = maliciousLink;

  // Get the template
  const template = templateData.body;

  // Format the email content
  const emailContent = template.replace(/{recipient_name}/g, recipientName)
                               .replace(/{recipient_email}/g, toEmail)
                               .replace(/{subject}/g, subject)
                               .replace(/{malicious_link}/g, trackingUrl);

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: false,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass
    }
  });

  // Define the email options
  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: subject,
    html: emailContent
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${toEmail}`);
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
  }
}

function main(args) {


  // Replace with your SMTP credentials and email details
  const smtpConfig = {
    host: 'smtp.yandex.com',
    port: 587,
    user: 'teset.tes@yandex.com',
    pass: 'jxmzmjqvgnkvdssh'
  };

  const fromEmail = 'teset.tes@yandex.com';
  const toEmail = args['to-email'];
  const subject = args.subject;
  const templateNumber = args.template;
  const recipientName = args['recipient-name'];
  const maliciousLink = args['malicious-link'];

  // Get the template data
  const templateData = templates[templateNumber] || { body: '<p>Template not found.</p>' };

  sendEmail(fromEmail, toEmail, smtpConfig, subject, templateData, recipientName, maliciousLink);
}

module.exports = main;