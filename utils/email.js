// const nodemailer = require("nodemailer");
// const pug = require("pug");
// const htmlToText = require("html-to-text");
// module.exports = class Email {
//   constructor(user) {
//     this.to = "Sandesh sharma <sharma12@gmail.com>";
//     this.firstName = user.firstname;
//     this.from = user.email;
//   }
//   newTransport() {
//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORTT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }
//   async send(template, subject) {
//     const html = pug.renderFile(
//       `${__dirname}/../views/emails/${template}.pug`,
//       {
//         firstName: this.firstName,
//         url: this.url,
//         subject,
//       }
//     );
//     const mailOption = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html,
//       text: htmlToText.convert(html),
//     };

//     await this.newTransport().sendMail(mailOption);
//   }
//   async sendWelcome() {
//     await this.send("welcome", "Welcome to somethign");
//   }
// };
