// import config from '../../../config/env';

export const sendPassword = (firstName, password) => {
  const email = {
    body: {
      name: firstName,
      greeting: 'Hi',
      signature: false,
      intro:
        'You have been invited to the uptima tms management dashboard as an admin.',
      action: {
        instructions: `Your password is <b>${password}</b>`,
        button: {
          color: '#22BC66',
          text: 'Click here to login',
          link: 'https://uptima.netlify.app'
        }
      },
      outro:
        'This is a no-reply email. Do not reply to this email as we cannot respond to queries sent to this email address. For assistance please email us directly'
    }
  };

  return email;
};

export const contactUsMsgsTemplate = (
  name,
  email,
  phoneNumber,
  companyName,
  facilityType,
  numberOfTanks,
  message
) => {
  const contactUs = {
    body: {
      name: 'Operator',
      greeting: 'Hi',
      signature: false,
      table: [
        { title: 'Personal info',
          data: [{ name,
            email,
            phoneNumber }]
        },
        { title: 'Company info',
          data: [{ companyName,
            facilityType,
            numberOfTanks }]
        },
        { title: 'Message', data: [{ message }] }
      ]
    }
  };
  return contactUs;
};

export const resetPassword = (firstName, token) => {
  const email = {
    body: {
      name: firstName,
      signature: false,
      intro:
        'You have received this email because a password reset request for your account was received.',
      action: {
        instructions: 'Click the button below to reset your password:',
        button: {
          color: '#DC4D2F',
          text: 'Reset your password',
          link: `https://uptima.netlify.app/forgot-password/${token}`
        }
      },
      outro:
        'If you did not request a password reset, no further action is required on your part.'
    }
  };

  return email;
};

export const alertMinLevel = (firstName, volumeLeft, min_level, volumeUsed) => {
  const email = {
    body: {
      name: firstName,
      signature: false,
      intro:
        'You have received this email because the current fluid level has dropped below your set minimum volume.',
      table: [
        { title: 'Current tank info',
          data: [
            {
              current_volume: volumeLeft,
              volume_used_last_hour: volumeUsed,
              minimum_volume_set: min_level
            }
          ]
        }
      ],
      outro:
        'This is a no-reply email. Do not reply to this email as we cannot respond to queries sent to this email address.'
    }
  };

  return email;
};

export const alertOutsideBizHours = (firstName, volumeLeft, volumeUsed) => {
  const email = {
    body: {
      name: firstName,
      signature: false,
      intro:
        'You have received this email because there has been a decrease in fluid level after business close.',
      table: [
        { title: 'Current tank info',
          data: [
            {
              current_volume: volumeLeft,
              volume_used_last_hour: volumeUsed,
              time: new Date()
            }
          ]
        }
      ],
      outro:
        'This is a no-reply email. Do not reply to this email as we cannot respond to queries sent to this email address.'
    }
  };

  return email;
};
