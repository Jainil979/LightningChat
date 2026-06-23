// src/services/authService.js

import {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  AuthStatusResponse,
  UserResponse,
  VerifyResponse,
} from '../lib/proto/auth.js';

import { authFetch } from '../utils/authFetch.js';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'; // 'http://10.191.183.33:3000'

export async function signup(userData) {
  const url = `${API_BASE}/api/auth/signup`;
  const requestBody = SignupRequest.encode({
    firstName: userData.firstName,
    lastName:  userData.lastName,
    email:     userData.email,
    password:  userData.password,
  }).finish();

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/protobuf' },
    body: requestBody,
  });
  const buffer = await res.arrayBuffer();
  const decoded = SignupResponse.decode(new Uint8Array(buffer));

  if (!res.ok) {
    throw new Error(decoded.message || 'Signup failed');
  }
  return decoded;
}

export async function login(userData) {
  const url = `${API_BASE}/api/auth/login`;
  const requestBody = LoginRequest.encode({
    email:    userData.email,
    password: userData.password,
  }).finish();

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/protobuf' },
    body: requestBody,
    credentials: 'include',
  });
  const buffer = await res.arrayBuffer();
  const decoded = AuthStatusResponse.decode(new Uint8Array(buffer));

  if (!res.ok) {
    throw new Error(decoded.message || 'Login failed');
  }
  return decoded;
}

export async function getMe() {
  const res = await authFetch(`${API_BASE}/api/auth/me`, {
    method: 'GET',
    headers: { 'Accept': 'application/protobuf' },
  });
  if (res === null) return null;   // signal for forced logout
  const buffer = await res.arrayBuffer();
  return UserResponse.decode(new Uint8Array(buffer));
}

export async function logout() {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Accept': 'application/protobuf' },
  });
  // Ignore response body – we just want the cookies cleared
  // But we can decode if needed:
  const buffer = await res.arrayBuffer();
  return AuthStatusResponse.decode(new Uint8Array(buffer));
}


export async function verifyToken() {
  const res = await fetch(`${API_BASE}/api/auth/verify`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Accept': 'application/protobuf' },
  });
  const buffer = await res.arrayBuffer();
  const decoded = VerifyResponse.decode(new Uint8Array(buffer));
  return decoded.valid;   // true or false
}


export async function getWsTicket() {
  const url = `${API_BASE}/api/ws/ticket`;
  const res = await authFetch(url, { method: 'POST' });
  if (res === null) throw new Error('Session expired');
  const data = await res.json();      // { ticket: '...' }
  return data.ticket;
}