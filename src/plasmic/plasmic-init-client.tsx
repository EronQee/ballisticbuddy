'use client'

import { PlasmicRootProvider } from '@plasmicapp/loader-nextjs'
import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import HeroSection from '@/components/plasmic/HeroSection'
import { PLASMIC } from './plasmic-init'

PLASMIC.registerComponent(Button, {
  name: 'Button',
  props: {
    variant: {
      type: 'choice',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      defaultValue: 'default',
    },
    size: {
      type: 'choice',
      options: ['default', 'sm', 'lg', 'icon', 'clear'],
      defaultValue: 'default',
    },
    children: {
      type: 'slot',
      defaultValue: [] as never,
    },
  },
})

PLASMIC.registerComponent(HeroSection, {
  name: 'ZebraMagicHeroTest',
  displayName: 'ZEBRA TEST HERO (bb)',
  description: '品牌宣传区块，含背景图、渐变、文字和按钮',
  props: {
    title: {
      type: 'string',
      defaultValue: 'work with our team of experts',
    },
    subtitle: {
      type: 'string',
      defaultValue: 'GET YOUR BRAND TO THE NEXT LEVEL',
    },
    description: {
      type: 'string',
      defaultValue:
        'Begin your creative exploration with us! Reach out today to initiate a conversation. Our team is dedicated to transforming your concepts into vibrant artistic realities.',
    },
    buttonText: {
      type: 'string',
      defaultValue: 'Start Working with Our Team',
    },
    imageUrl: {
      type: 'string',
      defaultValue: 'https://framerusercontent.com/images/l41Eir5TqzCXE1HR5V47L0i6RM.jpeg',
    },
    href: {
      type: 'string',
      defaultValue: '#',
    },
    className: {
      type: 'string',
      displayName: '额外类名',
    },
  },
})

export function ClientPlasmicRootProvider(
  props: Omit<ComponentProps<typeof PlasmicRootProvider>, 'loader'>,
) {
  return <PlasmicRootProvider loader={PLASMIC} {...props} />
}
