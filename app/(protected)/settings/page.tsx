import { auth } from "@/auth"

export default async function page() {
  const session = await auth();
  return (
    <div className='text-gray-300'>
      {JSON.stringify(session)}
    </div>
  )
}
