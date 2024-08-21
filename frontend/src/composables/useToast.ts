import { useToast as usePrimeToast } from 'primevue/usetoast';

export function useToast() {
  const toast = usePrimeToast();

  const success = (message?: string) => {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message || 'Success',
      life: 3000,
    });
  };

  const warning = (message?: string) => {
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message || 'Warning',
      life: 3000,
    });
  };

  const error = (message?: string) => {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message || 'Something went wrong',
      life: 15000,
    });
  };

  return {
    success,
    error,
    warning,
    add: toast.add,
  };
}
