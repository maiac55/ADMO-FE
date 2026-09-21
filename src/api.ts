import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:3000/api';

async function getToken(): Promise<string | null> {
  return await AsyncStorage.getItem('token');
}

async function request(path: string, options: RequestInit = {}) {
  const token = await getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

// ── Auth ────────────────────────────────────────────────────────────────────

export async function register(name: string, email: string, password: string, dateOfBirth: string) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, date_of_birth: dateOfBirth }),
  });
  await AsyncStorage.setItem('token', data.token);
  await AsyncStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

export async function login(email: string, password: string) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  await AsyncStorage.setItem('token', data.token);
  await AsyncStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

export async function forgotPassword(email: string) {
  return request('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token: string, newPassword: string) {
  return request('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  });
}

export async function logout() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
}

// ── Boxes ───────────────────────────────────────────────────────────────────

export async function connectBox(device_code: string) {
  return request('/boxes', {
    method: 'POST',
    body: JSON.stringify({ device_code }),
  });
}

export async function setPersonInfo(boxId: string, person_name: string, person_age: string, note: string) {
  return request(`/boxes/${boxId}/person`, {
    method: 'PUT',
    body: JSON.stringify({ person_name, person_age, note }),
  });
}

export async function getAllBoxes() {
  return request('/boxes');
}

export async function getBox(boxId: string) {
  return request(`/boxes/${boxId}`);
}

export async function deleteBox(boxId: string) {
  return request(`/boxes/${boxId}`, { method: 'DELETE' });
}
