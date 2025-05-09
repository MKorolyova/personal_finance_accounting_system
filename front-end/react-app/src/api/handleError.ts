import axios from 'axios';
import { toast } from 'react-toastify';



export function handleError(error: unknown, contextMessage = 'Operation failed') {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data?.message as string) || `${contextMessage}: Unknown server error.`;
    if(error.response?.status === 401){


      window.location.href = '/';
      toast.error('Please log in to access this page.');

    }
    toast.error(`${contextMessage}: ${message}`);
  } else {
    toast.error(`${contextMessage}: Unexpected error occurred.`);
  }
}
