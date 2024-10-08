"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db'
import { MockInterview } from '../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Webcam from 'react-webcam'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'

//params contains interview id to get dynamic interview id
function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails();
  }, [params.interviewId]);

  // Getting interview details by mockId 
  const GetInterviewDetails = async () => { 
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]); 
    setLoading(false); // Set loading to false once data is fetched
  }

  return (
    <div className='my-10'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        <div className='flex flex-col my-5 gap-5'>
          {/* Render loading state or interview data */}

            <div className='flex flex-col p-5 rounded-lg border gap-5'>
              <h2><strong>Job Role/Position:</strong> {interviewData?.jobPosition}</h2>
              <h2><strong>Job Description/Tech Stack:</strong> {interviewData?.jobDesc}</h2>
              <h2><strong>Years of Experience:</strong> {interviewData?.jobExperience}</h2>
            </div>
            <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
             <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /> <strong>Information</strong></h2> 
              <h2 className='mt-3 text-yellow-600'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
          
        </div>
        <div>
          {webcamEnabled ? (
            <Webcam 
              mirrored={true} // Mirror view in camera
              style={{
                height: 300,
                width: 300
              }} 
            />
          ) : (
            <>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
              <Button  className="w-full" onClick={() => setWebcamEnabled(true)}>
               Click Here To Enable Web cam and Microphone
              </Button>
            </>
          )}
        </div>
        
      </div>
      <div className='flex justify-start items-end'>
        {/*Link to start interview */}
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button >Start Interview</Button>
        </Link>
       
      </div>
    </div>
  )
}

export default Interview;
