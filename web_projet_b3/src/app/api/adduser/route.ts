import { createClient } from '@vercel/postgres';

export async function getUsers() {
  const client = createClient();
  await client.connect();

  try {
    const data = await client.sql`SELECT * FROM "User"`;
    const array = data.rows
    console.log(array)
    return array
  } finally {
    await client.end();
  }
}
