import React from 'react'
import { Outlet, useOutlet } from 'react-router-dom'
import { useSermonsData } from './useSermonsData'
import AudioCard from './SermonCard'
import styled from 'styled-components'


const Container = styled.div`
margin: 45px 0;
display: flex;
flex-wrap: wrap;
justify-content: center;
width: 100%;
`
export default function Sermon() {
    const {sermonData} = useSermonsData()
    const outlet = useOutlet()
  return (
    <Container>
        {!outlet && (
          <> {sermonData.map(audio => (
            <AudioCard
              id={audio.$id}
              title={audio.title}
              thumbnail={audio.thumbnail}
              createdAt={audio.$createdAt}
              rabbi={audio.rabbi}
              category={audio.category}
              subcategory={audio.subcategory}
              played={audio.played}
            />
          ))}
        </>
         
        )}
    <Outlet/>
    </Container>
  )
}
