const transporter = require('../config/mailConfig');

function getCategoryName(category) {
  const categories = {
    school: 'School Education',
    nios: 'NIOS Program',
    ignou: 'IGNOU Program',
    internship: 'Internship Program',
    it_services: 'IT Services'
  };
  return categories[category] || category;
}

async function sendAdminNotification({ name, email, phone, category, message, additionalInfo }) {
  try {
    const adminMailOptions = {
      from: `"Ziya Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVING_EMAIL,
      subject: `New Enquiry: ${getCategoryName(category)} - ${name}`,
      html: generateAdminEmailHtml({ name, email, phone, category, message, additionalInfo })
    };

    console.log('Sending admin notification...');
    await transporter.sendMail(adminMailOptions);
    console.log('Admin notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
}

async function sendUserConfirmation({ name, email }) {
  try {
    const userMailOptions = {
      from: `"Ziya Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for your enquiry - Ziya Academy`,
      html: generateUserConfirmationHtml(name)
    };

    console.log('Sending user confirmation...');
    await transporter.sendMail(userMailOptions);
    console.log('User confirmation sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending user confirmation:', error);
    throw error;
  }
}

function generateAdminEmailHtml(data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body { font-family: 'Poppins', sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; }
          .header { background: #00aeef; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .info-item { margin-bottom: 10px; }
          .label { font-weight: bold; }
          .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h2>New Enquiry Received</h2>
              <p>Ziya Academy</p>
          </div>
          <div class="content">
              <div class="info-item"><span class="label">Category:</span> ${getCategoryName(data.category)}</div>
              <div class="info-item"><span class="label">Name:</span> ${data.name}</div>
              <div class="info-item"><span class="label">Email:</span> ${data.email}</div>
              <div class="info-item"><span class="label">Phone:</span> ${data.phone}</div>
              ${data.additionalInfo ? `<div class="info-item"><span class="label">Additional Info:</span> ${data.additionalInfo}</div>` : ''}
              <div class="info-item"><span class="label">Message:</span> ${data.message || 'No message provided'}</div>
          </div>
          <div class="footer">
              <p>This is an automated notification. Please respond within 24 hours.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

function generateUserConfirmationHtml(name) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body { font-family: 'Poppins', sans-serif; }
          .container { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; }
          .header { background: #00aeef; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h2>Thank You for Contacting Us</h2>
              <p>Ziya Academy</p>
          </div>
          <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for your enquiry. We've received your message and our team will get back to you shortly.</p>
              <p>We appreciate your interest in our services.</p>
          </div>
          <div class="footer">
              <p>© ${new Date().getFullYear()} Ziya Academy. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
  getCategoryName
};