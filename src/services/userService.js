// src/services/userService.js
import { UpdateProfileRequest, UpdateProfileResponse } from '../lib/proto/auth.js';
import { authFetch } from '../utils/authFetch.js';
import { API_BASE } from './authService.js';

/**
 * Update the user's first and last name.
 * Returns the new first and last name from the server.
 */
export async function updateProfile({ firstName, lastName }) {
  const url = `${API_BASE}/api/user/profile`;

  const requestBody = UpdateProfileRequest.encode({ firstName, lastName }).finish();

  const res = await authFetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/protobuf' },
    body: requestBody,
  });

  if (res === null) {
    throw new Error('Session expired. Please log in again.');
  }

  const buffer = await res.arrayBuffer();
  const decoded = UpdateProfileResponse.decode(new Uint8Array(buffer));

  if (!decoded.success) {
    throw new Error(decoded.message || 'Profile update failed.');
  }

  return {
    firstName: decoded.firstName,
    lastName: decoded.lastName,
  };
}