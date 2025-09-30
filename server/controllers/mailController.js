const mailService = require('../services/mailService');

exports.sendEnquiry = async (req, res) => {
  try {
    const { name, email, phone, category, message, ...otherFields } = req.body;

    // Validation
    if (!name || !email || !phone || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be 10 digits'
      });
    }

    // Process additional fields
    let additionalInfo = '';
    switch (category) {
      case 'school':
        if (!otherFields.school_class) {
          return res.status(400).json({
            success: false,
            message: 'Please select your class/grade'
          });
        }
        additionalInfo = `Class/Grade: ${otherFields.school_class}`;
        break;

      case 'internship':
        if (!otherFields.internship) {
          return res.status(400).json({
            success: false,
            message: 'Please select an internship program'
          });
        }
        if (!otherFields.termsAccepted) {
          return res.status(400).json({
            success: false,
            message: 'You must accept the terms and conditions'
          });
        }
        additionalInfo = `Internship Program: ${otherFields.internship}`;
        break;

      case 'it_services':
        if (!otherFields.it_service) {
          return res.status(400).json({
            success: false,
            message: 'Please select an IT service'
          });
        }
        additionalInfo = `IT Service: ${otherFields.it_service}`;
        break;
    }

    // Send emails
    await mailService.sendAdminNotification({
      name,
      email,
      phone,
      category,
      message: message || 'No message provided',
      additionalInfo
    });

    await mailService.sendUserConfirmation({ name, email });

    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully! Please check your email for confirmation.'
    });

  } catch (error) {
    console.error('Enquiry submission error:', error);
    
    let errorMessage = 'An unexpected error occurred. Please try again later.';
    if (error.code === 'EAUTH' || error.code === 'EENVELOPE') {
      errorMessage = 'Email service configuration error. Please try again later.';
    }

    return res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};