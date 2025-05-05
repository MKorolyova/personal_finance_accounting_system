import axios from 'axios';
import { toast } from 'react-toastify';

export function handleError(error: unknown, contextMessage = 'Operation failed') {
  if (axios.isAxiosError(error)) {
    const message =
      (error.response?.data?.message as string) ||
      `${contextMessage}: Unknown server error.`;
    toast.error(`${contextMessage}: ${message}`);
  } else {
    toast.error(`${contextMessage}: Unexpected error occurred.`);
  }
}
