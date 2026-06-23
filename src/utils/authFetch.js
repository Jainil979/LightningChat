
// src/utils/authFetch.js
import { AuthStatusResponse } from '../lib/proto/auth.js';
import { API_BASE } from '../services/authService.js';

let isRefreshing = false;
let refreshPromise = null;

// Export this function for use in ProtectedRoute
export async function refreshAccessToken() {
  const res = await fetch(`${API_BASE}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Accept': 'application/protobuf' },
  });
  const buffer = await res.arrayBuffer();
  const decoded = AuthStatusResponse.decode(new Uint8Array(buffer));
  if (!decoded.success) {
    throw new Error(decoded.message || 'Refresh failed', { cause: decoded.code });
  }
}

export async function authFetch(url, options = {}) {
  const performFetch = () => fetch(url, { credentials: 'include', ...options });

  let res = await performFetch();

  if (res.status === 401) {
    try {
      const buffer = await res.clone().arrayBuffer();
      const decoded = AuthStatusResponse.decode(new Uint8Array(buffer));
      if (decoded.code === 1) {
        // Access token expired → refresh
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken().finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
        }
        try {
          await (refreshPromise || Promise.resolve());
        } catch {
          return null;   // refresh failed → force logout
        }
        // Retry original request
        res = await performFetch();
      }
    } catch {
      // Not a protobuf response – ignore
    }
  }

  return res;
}