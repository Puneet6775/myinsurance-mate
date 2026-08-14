const API = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const detail = data.detail
    const message = Array.isArray(detail)
      ? detail.map((d) => d.msg).join(', ')
      : detail || 'Something went wrong. Please try again.'
    throw new Error(message)
  }
  return data
}

export const api = {
  contact: (body) => request('/api/contact', { method: 'POST', body: JSON.stringify(body) }),
  quote: (body) => request('/api/quote', { method: 'POST', body: JSON.stringify(body) }),
  newsletter: (email) =>
    request('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) }),
}
