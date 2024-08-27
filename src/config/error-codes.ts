// errorCodes.ts

export enum ErrorCode {
  AuthenticationFailed = 'authentication_failed',
  TokenBlacklisted = 'token_blacklisted',
  TokenNotProvided = 'token_not_provided',
  AuthCredentialNotProvided = 'auth_credential_not_provided',
  InvalidRefreshToken = 'invalid_refresh_token',
  EmailNotFound = 'email_not_found',
  InvalidOrExpiredToken = 'invalid_or_expired_token',
  InvalidOtp = 'invalid_otp',
  InvalidEmail = 'invalid_email',
  InvalidData = 'invalid_data',
  OtpAlreadySent = 'otp_already_sent',
  InvalidVerificationLink = 'invalid_verification_link',
  PasswordUpdateFailed = 'password_update_failed',
  UserUpdateFailed = 'user_update_failed',
  UserRegistrationFailed = 'user_registration_failed',
  LogoutFailed = 'logout_failed',
  InvalidOrExpiredResetToken = 'invalid_or_expired_reset_token',
  RecentOtpStillValid = 'recent_otp_still_valid',
  InvalidAccessToken = 'invalid_access_token',
  BlacklistedRefreshToken = 'blacklisted_refresh_token',
  // Add more as needed
}
