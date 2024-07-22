import React from 'react'
import FeedBack from '@/components/shared/feedback/FeedBack'
import { auth } from '@/auth'

export default async function FeedBackPage() {
  const session = await auth();
  const userName = session?.user?.name;
  return (
    <>
      <div className='my-16 md:my-24 mx-[5%] md:mx-[15%]'>
        <FeedBack userName={userName} />
      </div>
    </>
  )
}
