// utils/errorHandler.ts
export function formatAxiosError(error: any) {
  if (!error) return 'Unknown error';
  if (error.response && error.response.data) {
    return (
      error.response.data.message ||
      JSON.stringify(error.response.data) ||
      'Server error'
    );
  }
  return error.message || String(error);
}
