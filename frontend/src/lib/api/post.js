import client from './client';

export const write = (formData) => client.post(
    '/blog/write.php',
    formData,
)

export const list = (formData) => client.post(
    '/blog/list.php',
    formData
)