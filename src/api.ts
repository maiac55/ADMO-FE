import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://172.20.10.4:3000/api';

type NavigateToLogin = () => void;
let navigateToLogin: NavigateToLogin | null = null;

export function setNavigateToLogin(fn: NavigateToLogin) {
  navigateToLogin = fn;
}

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

  if (res.status === 401) {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigateToLogin?.();
    throw new Error('Session expired. Please log in again.');
  }

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
  await AsyncStorage.setItem('pw', password);
  return data;
}

export async function login(email: string, password: string) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  await AsyncStorage.setItem('token', data.token);
  await AsyncStorage.setItem('user', JSON.stringify(data.user));
  await AsyncStorage.setItem('pw', password);
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

// ── Medications ─────────────────────────────────────────────────────────────

export async function getMedications() {
  return request('/medications');
}

export async function getMedication(id: string) {
  return request(`/medications/${id}`);
}

export async function addMedication(data: {
  box_id?: string;
  name: string;
  dose: string;
  days?: string[];
  times?: { label: string; time: string; pills: number }[];
  active?: boolean;
}) {
  return request('/medications', { method: 'POST', body: JSON.stringify(data) });
}

export async function updateMedication(id: string, data: {
  name?: string;
  dose?: string;
  days?: string[];
  times?: { label: string; time: string; pills: number }[];
  active?: boolean;
}) {
  return request(`/medications/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function deleteMedication(id: string) {
  return request(`/medications/${id}`, { method: 'DELETE' });
}

// ── History ──────────────────────────────────────────────────────────────────

export async function getHistory(params?: { date?: string; status?: string }) {
  const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
  return request(`/history${qs}`);
}

export async function logHistory(data: {
  medication_id: string;
  status: 'Taken' | 'Missed' | 'Late';
  scheduled_time: string;
  taken_at?: string;
  date: string;
}) {
  return request('/history', { method: 'POST', body: JSON.stringify(data) });
}

// ── Notifications ────────────────────────────────────────────────────────────

export async function getNotificationSettings() {
  return request('/notifications');
}

export async function updateNotificationSettings(data: {
  reminders?: boolean;
  taken?: boolean;
  missed?: boolean;
  refill?: boolean;
  disconnected?: boolean;
  mechanical?: boolean;
  frequency?: string;
}) {
  return request('/notifications', { method: 'PUT', body: JSON.stringify(data) });
}

// ── Profile ──────────────────────────────────────────────────────────────────

export async function getProfile() {
  return request('/profile');
}

export async function updateProfile(data: { name?: string; date_of_birth?: string }) {
  return request('/profile', { method: 'PUT', body: JSON.stringify(data) });
}

export async function changePassword(current_password: string, new_password: string) {
  return request('/profile/change-password', {
    method: 'PUT',
    body: JSON.stringify({ current_password, new_password }),
  });
}

// ── Dispenser (demo) ─────────────────────────────────────────────────────────

export async function getDispenserSlots() {
  return request('/dispenser/slots');
}

export async function saveDispenserSlots(times: { morning: string; noon: string; evening: string }) {
  return request('/dispenser/slots', { method: 'PUT', body: JSON.stringify(times) });
}

export async function sendTestAlert() {
  return request('/dispenser/test-alert', { method: 'POST' });
}
