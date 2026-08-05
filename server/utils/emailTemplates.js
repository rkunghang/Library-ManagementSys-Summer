export function generateVerificationOtpEmailTemplate(otpCode) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="text-align: center; color: #4a90e2;">Library Management System</h2>
      <p style="font-size: 16px; color: #333;">Dear User,</p>
      <p style="font-size: 16px; color: #333;">
        Use the following One-Time Password (OTP) to verify your email address. This code is valid for <strong>5 minutes</strong>.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #4a90e2;">${otpCode}</span>
      </div>
      <p style="font-size: 14px; color: #777;">
        If you did not request this code, please ignore this email.
      </p>
      <p style="font-size: 14px; color: #777;">Thank you,<br/>Library Management Team</p>
    </div>
  `;
}