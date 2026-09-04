import React from 'react'

import HomeAbout from '@/components/home/HomeAbout'
import HomeHero from '@/components/home/HomeHero'
import HomeInvite from '@/components/home/HomeInvite'
import HomeMetrics from '@/components/home/HomeMetrics'
import HomeRoad from '@/components/home/HomeRoad'
import HomeServices from '@/components/home/HomeServices'
import HomeTestimonials from '@/components/home/HomeTestimonials'

export default function HomeLanding() {
  return (
    <>
      <HomeHero />
      <HomeMetrics />
      <HomeAbout />
      <HomeServices />
      <HomeRoad />
      <HomeTestimonials />
      <HomeInvite />
    </>
  )
}