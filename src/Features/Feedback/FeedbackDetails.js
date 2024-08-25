import React from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '../User/Avatar'
import { useFeedbackData } from './useFeedbackData'

export default function FeedbackDetails() {
    const {id} = useParams()
  const {feedbackData} = useFeedbackData()
  const feed = feedbackData.find((feed) => feed.$id === id);
  return (
    <div>
        <Avatar src={feed.useAvatarUrl}/>
        <p>{feed.userName}</p>
        <p>{feed.feedback}</p>
    </div>
  )
}
