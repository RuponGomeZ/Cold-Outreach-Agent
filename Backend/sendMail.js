const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.emailUser,
        pass: process.env.emailPass
    }
})

async function sendMail(to, sub, msg) {
    await transporter.sendMail({
        to: to,
        subject: sub,
        html: `
  <div style="max-width:600px; margin:0 auto; font-family:Arial, sans-serif;">
    <div style="padding:24px; font-size:15px; line-height:1.7; color:#222;">
      <p style="margin:0 0 1rem;">${msg}</p>
      <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid #e5e5e5; font-size:14px; color:#555; line-height:1.8;">
        <p style="margin:0; font-weight:600; color:#222;">Best,</p>
        <p style="margin:0;">Rupon Gomes</p>
        <p style="margin:0;">Binox</p>
        <a href="mailto:rupongomez@gmail.com" style="color:#0066cc; text-decoration:none;">rupongomez@gmail.com</a>
      </div>
    </div>
  </div>
  `
    })
}

module.exports = sendMail

// sendMail("rupongomez@gmail.com", "test message2", "this is a test msg2")