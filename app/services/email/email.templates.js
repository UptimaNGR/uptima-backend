// import config from '../../../config/env';
const u = 't';

export const layout = (firstName, message) => `<div>
              <span>Hello <b>${firstName}</b>,</span>
              <div>${message}</div>
              <h4>Best Regards</h4>
              <h4>The Uptima Team</h4>
              <a href="#">Uptima Solutions</a>
              <h6>This is a no-reply email. Do not reply to this email as we cannot respond to queries sent to this email address. For assistance please email us directly</h6>
          </div>`;

export const newPasswordTemplate = (password) => `<p>
         You have been invited to the uptima tms management dashboard as an admin.
      </p>
<p>Your password is <b>${password}</b></p>
<p>Kindly click the link below to login.</p>
      <a href="${u}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #0a56a3; border: solid 1px #0a56a3; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 10px 0; padding: 5px 25px; text-transform: capitalize; border-color: #0a56a3;">Login</a>
      <p>
          Alternatively, you can copy and paste the following link into browser's address window.
      <br>
      <p style="font-size:10px">${u}</p>
      </p >`;

export const contactUsMsgsTemplate = (
  name,
  email,
  phoneNumber,
  companyName,
  facilityType,
  numberOfTanks,
  message
) => `
    <p><b>from: ${name}, ${email}, ${phoneNumber}, ${companyName}</b></p>
    <h4>${facilityType}, ${numberOfTanks}</h4>
    <h2>${message}</h2>
`;
