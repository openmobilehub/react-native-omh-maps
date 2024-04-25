import { useContext } from 'react';

import { SnackbarContext } from '../components/snackbar/SnackbarProvider';

export default function useSnackbar() {
  return useContext(SnackbarContext);
}
