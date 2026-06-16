export const getApiErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
   if (!error) {
      return fallback;
   }

   const rawMessage = error?.data?.message || error?.error || error?.message || '';
   const status = error?.status;
   const message = String(rawMessage);
   const lowerMessage = message.toLowerCase();

   if (
      status === 'FETCH_ERROR' ||
      lowerMessage.includes('failed to fetch') ||
      lowerMessage.includes('networkerror')
   ) {
      return 'We could not reach the ShopSphere server. Please try again in a moment.';
   }

   if (status === 401) {
      return 'Please sign in again to continue.';
   }

   if (status === 403) {
      return 'You do not have permission to perform this action.';
   }

   if (status === 404) {
      return 'We could not find what you were looking for.';
   }

   if (status >= 500) {
      return 'The server is having trouble right now. Please try again shortly.';
   }

   return message || fallback;
};
