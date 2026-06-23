// src/services/contactsService.js
import { AddContactRequest, AddContactResponse } from '../lib/proto/auth.js';
import { authFetch } from '../utils/authFetch.js';
import { API_BASE } from './authService.js';

/**
 * Look up a user by email and return their profile data.
 * Uses authFetch for automatic token refresh.
 *
 * @param {string} email
 * @returns {Promise<{ userId: number, firstName: string, lastName: string }>}
 */
export async function addContact(email) {
  const url = `${API_BASE}/api/contacts/add`;

  const requestBody = AddContactRequest.encode({ email }).finish();

  const res = await authFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/protobuf' },
    body: requestBody,
  });

  // authFetch may return null if refresh failed → force logout
  if (res === null) {
    throw new Error('Session expired. Please log in again.');
  }

  const buffer = await res.arrayBuffer();
  const decoded = AddContactResponse.decode(new Uint8Array(buffer));

  if (!decoded.success) {
    throw new Error(decoded.message || 'Contact not found.');
  }

  return {
    userId: Number(decoded.userId),
    firstName: decoded.firstName,
    lastName: decoded.lastName,
  };
}