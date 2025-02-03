const { check } = require('express-validator');

const validators = {
  threatValidation: [
    check('type').isIn(['malware', 'intrusion', 'ddos', 'data_leak', 'unauthorized_access']),
    check('severity').isIn(['critical', 'high', 'medium', 'low']),
    check('source.ip').optional().isIP(),
    check('description').optional().trim().escape()
  ],
  
  scanValidation: [
    check('type').isIn(['vulnerability', 'compliance', 'configuration']),
    check('target').notEmpty(),
    check('requestedBy').optional().isMongoId()
  ]
};

module.exports = validators;