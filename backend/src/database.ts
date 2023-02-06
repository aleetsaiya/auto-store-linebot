import admin from './firebase';

export function add(path: string, key: string, value: string | number): void {
  const db = admin.database();
  const ref = db.ref(path);
  ref.update({
    [key]: value,
  });
}
