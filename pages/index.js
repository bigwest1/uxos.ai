// pages/index.js
import App from '../pages/App';

export async function getServerSideProps() {
  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()

  try {
    // Run your Prisma queries here; example: fetch users
    const users = await prisma.user.findMany()

    return {
      props: {
        users: JSON.parse(JSON.stringify(users)), // serialize for React
      },
    }
  } finally {
    await prisma.$disconnect()
  }
}

export default function Home() {
  return <App />;
}