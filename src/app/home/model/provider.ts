import { AuthProvider } from '@firebase/auth-types';

export interface Provider {
  id: string;
  name: string;
  disabled: boolean;
  authProvider: AuthProvider;
}
