import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from './keys/firebas-admin-key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: '',
});

export default admin;
