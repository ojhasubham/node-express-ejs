const sgMail = require('@sendgrid/mail');
var handlebars = require('handlebars');
var fs = require('fs');
const dirname = process.cwd();
const url_link = `${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}`;

handlebars.registerHelper('getObjectKey', function () {
  let data = this.toString().split(',');
  return data[0] || '';
})

handlebars.registerHelper('getObjectValue', function () {
  let data = this.toString().split(',');
  return data[1] || '';
})

module.exports.readHTMLFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        reject(err);
      }
      resolve(html);
    });
  });
};

module.exports.sendEmail = (email,html,replacements,subject) => {
  return new Promise((resolve, reject) => {
    let template = handlebars.compile(html);
    let htmlToSend = template(replacements);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'contact@witklat.com',
      subject:subject,
      html:htmlToSend,
    };
    sgMail.send(msg).then((success) => {
      console.log('Email sent')
      resolve(success);
    }).catch((error) => {
      console.log(error)
    });
  });
};

module.exports.sentMailToUser = async (email, position,url) => {
  const html = await this.readHTMLFile(
    dirname + '/server/services/template/userVerify.html'
  );
  return await this.sendEmail(email,html, {position,url,url_link} ,"Email For Successfully Register");
};

module.exports.sentMailToOldUser = async (email, positionData) => {
  const html = await this.readHTMLFile(
    dirname + '/server/services/template/userReverify.html'
  );
  return await this.sendEmail(email,html,{ positionData,url_link},"Your New Position Is Set" );
};