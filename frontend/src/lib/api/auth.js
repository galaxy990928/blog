import client from './client';

export const login = (formData) => client.post(
    '/blog/login.php',
    formData,
)

export const register = (formData) => client.post(
    '/blog/register.php',
    formData,
)

export const logout = () => client.post(
    '/blog/logout.php'
)

export const check = (formData) => client.post(
    '/blog/check.php',
    formData
)