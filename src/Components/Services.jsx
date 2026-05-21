import React from 'react'
import Content from './Content'
import { Helmet } from 'react-helmet-async'

export default function services() {
  
  return (
    <>
            <Helmet>
              <title>Services Page</title>
              <meta
                name="description"
                content="Web site SERVICES description"
              />
              <style type='text/css'>
              {`

              
                .content-home {
                color: #fff ;
                background-color: #931515;
                }
                 .content-home h1{
                color: #fff ;
                background-color: #574949;
                },
                

              `}</style>
            </Helmet>
      <Content title="Our Services" description="Explore our wide range of services!"  />
    </>
  )
  
}
