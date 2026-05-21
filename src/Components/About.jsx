import React from 'react'
import Content from './Content'
import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Page</title>
        <meta
      name="description"
      content="Web site ABOUT description"
    />
      </Helmet>
      <Content title="About Us" description="Learn more about our company and values!"  />
    </>
  )
}
