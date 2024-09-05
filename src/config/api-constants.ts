export const URI_AUTH_REGISTER = '/auth/register/';
export const URI_AUTH_COMPLETE_SETUP = '/auth/complete_setup/';
export const URI_AUTH_ME = '/auth/me/';
export const URI_AUTH_ME_SETTINGS = '/auth/me/settings/';
export const URI_AUTH_LOGOUT = '/auth/logout/';
export const URI_AUTH_TOKEN = '/auth/token/';
export const URI_AUTH_TOKEN_REFRESH = '/auth/token/refresh/';
export const URI_AUTH_TOKEN_VERIFY = '/auth/token/verify/';
export const URI_AUTH_PASSWORD_RESET = '/auth/password-reset/';
export const URI_AUTH_PASSWORD_RESET_CONFIRM = '/auth/password-reset-confirm/';
export const URI_AUTH_VALIDATE_RESET_TOKEN = '/auth/validate-reset-token/';
export const URI_AUTH_OTP_ACTIVATE_ACCOUNT = '/auth/otp/activate-account/';
export const URI_AUTH_OTP_LOGIN = '/auth/otp/login/';
export const URI_AUTH_OTP_VERIFY = '/auth/otp/verify/';
export const URI_AUTH_RESEND_OTP = '/auth/resend-otp/';
export const URI_AUTH_VERIFY_ACCOUNT_BY_TOKEN =
  '/auth/verify-account/{{token}}/';
export const URI_AUTH_RESEND_VERIFICATION_LINK =
  '/auth/resend-verification-link/';
export const URI_CATEGORIES = '/categories/';
export const URI_CATEGORIES_BY_SLUG = '/categories/{{slug}}/';
export const URI_STORIES = '/stories/';
export const URI_STORIES_CATEGORY_BY_CATEGORY_SLUG =
  '/stories/category/{{category_slug}}/';
export const URI_USER_FEED = '/user-feed/';
export const URI_USER_INVERSE_FEED = '/user-inverse-feed/';
export const URI_TRENDING_STORIES = '/trending-stories/';
export const URI_STORIES_HASHTAG_BY_HASHTAG_NAME =
  '/stories/hashtag/{{hashtag_name}}/';
export const URI_STORIES_TRENDING = '/stories/trending/';
export const URI_STORIES_SEARCH = '/stories/search/';
export const URI_STORIES_SEARCH_AUTOCOMPLETE = '/stories/search/autocomplete/';
export const URI_STORIES_SEARCH_RECENT = '/stories/search/recent/';
export const URI_STORIES_SEARCH_HISTORY = '/stories/search/history/';
export const URI_STORYLINES_BY_STORYLINE_ID_HASHTAGS =
  '/storylines/{{storyline_id}}/hashtags/';
export const URI_STORIES_BY_STORY_SLUG = '/stories/{{story_slug}}/';
export const URI_STORIES_BY_STORY_ID_LIKE = '/stories/{{story_id}}/like/';
export const URI_STORIES_BY_STORY_ID_DISLIKE = '/stories/{{story_id}}/dislike/';
export const URI_STORIES_BY_STORY_ID_UNLIKE = '/stories/{{story_id}}/unlike/';
export const URI_STORIES_BY_STORY_ID_UNDISLIKE =
  '/stories/{{story_id}}/undislike/';
export const URI_STORIES_BY_SLUG_STORYLINES = '/stories/{{slug}}/storylines/';
export const URI_STORYLINES = '/storylines/';
export const URI_STORYLINES_BY_STORYLINE_ID = '/storylines/{{storyline_id}}/';
export const URI_STORYLINES_BY_STORYLINE_ID_STORIES =
  '/storylines/{{storyline_id}}/stories/';
export const URI_BOOKMARKS = '/bookmarks/';
export const URI_BOOKMARKS_BY_BOOKMARK_ID = '/bookmarks/{{bookmark_id}}/';
export const URI_BOOKMARKS_STORY_BY_STORY_ID = '/bookmarks/story/{{story_id}}/';
export const URI_USERS = '/users/';
export const URI_USERS_BY_PK = '/users/{{pk}}/';
export const URI_USERS_UNFOLLOWED = '/users/unfollowed/';
export const URI_USERS_SETTINGS = '/users/settings/';
export const URI_USERS_UPDATE_FEED_POSITION = '/users/update-feed-position/';
export const URI_USERS_UPDATE_PASSWORD = '/users/update-password/';
export const URI_USERS_UPDATE_USER = '/users/update-user/';
export const URI_USERS_FOLLOW_BY_USER_ID = '/users/follow/{{user_id}}/';
export const URI_USERS_FOLLOW_BY_USERNAME = '/users/follow/{{username}}/';
export const URI_USERS_UNFOLLOW_BY_USER_ID = '/users/unfollow/{{user_id}}/';
export const URI_USERS_UNFOLLOW_BY_USERNAME = '/users/unfollow/{{username}}/';
export const URI_USERS_BY_USER_ID_FOLLOWERS = '/users/{{user_id}}/followers/';
export const URI_ANALYTICS_INTERACTIONS = '/analytics/interactions/';
export const URI_ANALYTICS_INTERACTIONS_BY_PK =
  '/analytics/interactions/{{pk}}/';
export const URI_ANALYTICS_INTERACTIONS_BATCH =
  '/analytics/interactions/batch/';
export const URI_ANALYTICS_SESSIONS = '/analytics/sessions/';
export const URI_ANALYTICS_SESSIONS_BY_PK = '/analytics/sessions/{{pk}}/';
export const URI_ANALYTICS_NOT_INTERESTED = '/analytics/not-interested/';
export const URI_ANALYTICS_NOT_INTERESTED_BY_PK =
  '/analytics/not-interested/{{pk}}/';
export const URI_ANALYTICS_ACCESSIBILITY_TOOLS =
  '/analytics/accessibility-tools/';
export const URI_ANALYTICS_ACCESSIBILITY_TOOLS_BY_PK =
  '/analytics/accessibility-tools/{{pk}}/';
export const URI_FEEDBACKS_REPORT = '/feedbacks/report/';
export const URI_SUPPORT_TICKETS = '/support/tickets/';
export const URI_SUPPORT_TICKETS_BY_PK = '/support/tickets/{{pk}}/';
export const URI_SUPPORT_TICKET_RESPONSES = '/support/ticket-responses/';
export const URI_SUPPORT_TICKET_RESPONSES_BY_PK =
  '/support/ticket-responses/{{pk}}/';
export const URI_SUPPORT_APP_VERSIONS = '/support/app-versions/';
export const URI_SUPPORT_APP_VERSIONS_BY_PK = '/support/app-versions/{{pk}}/';
export const URI_SUPPORT_CATEGORIES = '/support/categories/';
export const URI_SUPPORT_CATEGORIES_BY_SLUG = '/support/categories/{{slug}}/';
export const URI_SUPPORT_TAGS = '/support/tags/';
export const URI_SUPPORT_TAGS_BY_PK = '/support/tags/{{pk}}/';
export const URI_SUPPORT_BY_VERSION_ARTICLES = '/support/{{version}}/articles/';
export const URI_SUPPORT_BY_VERSION_ARTICLES_CATEGORY_BY_CATEGORY_SLUG =
  '/support/{{version}}/articles/category/{{category_slug}}/';
export const URI_SUPPORT_BY_VERSION_ARTICLES_BY_PK =
  '/support/{{version}}/articles/{{pk}}/';
export const URI_SUPPORT_BY_VERSION_ARTICLES_BY_SLUG =
  '/support/{{version}}/articles/{{slug}}/';
export const URI_SUPPORT_BY_VERSION_FAQS = '/support/{{version}}/faqs/';
export const URI_SUPPORT_BY_VERSION_FAQS_BY_PK =
  '/support/{{version}}/faqs/{{pk}}/';
export const URI_SUPPORT_BY_VERSION_PRIVACY_POLICIES =
  '/support/{{version}}/privacy-policies/';
export const URI_SUPPORT_BY_VERSION_TERMS_AND_CONDITIONS =
  '/support/{{version}}/terms-and-conditions/';
