import PropTypes from 'prop-types';

export const accountFormPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired
});

export const apiKeyPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  lastUsed: PropTypes.string.isRequired
});

export const notificationSettingsPropTypes = PropTypes.shape({
  emailNotifications: PropTypes.bool.isRequired,
  newFeatures: PropTypes.bool.isRequired,
  securityAlerts: PropTypes.bool.isRequired,
  marketingEmails: PropTypes.bool.isRequired,
  usageReports: PropTypes.bool.isRequired
});

export const securitySettingsPropTypes = PropTypes.shape({
  twoFactorAuth: PropTypes.bool.isRequired,
  sessionTimeout: PropTypes.string.isRequired,
  lastPasswordChange: PropTypes.string.isRequired
});

export const appearanceSettingsPropTypes = PropTypes.shape({
  theme: PropTypes.oneOf(['light', 'dark', 'system']).isRequired,
  fontSize: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  compactMode: PropTypes.bool.isRequired
});

export const languageSettingsPropTypes = PropTypes.shape({
  language: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired
}); 