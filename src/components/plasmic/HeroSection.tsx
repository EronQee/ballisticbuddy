import React from 'react'

export interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  imageUrl?: string
  href?: string
  className?: string
}

/**
 * 品牌宣传 Hero 区块
 * 适用于首页或落地页，突出行动号召
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  title = 'work with our team of experts',
  subtitle = 'GET YOUR BRAND TO THE NEXT LEVEL',
  description = 'Begin your creative exploration with us! Reach out today to initiate a conversation. Our team is dedicated to transforming your concepts into vibrant artistic realities.',
  buttonText = 'Start Working with Our Team',
  imageUrl = 'https://framerusercontent.com/images/l41Eir5TqzCXE1HR5V47L0i6RM.jpeg',
  href = '#',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-[800px] rounded-2xl overflow-hidden flex flex-col justify-end items-end gap-[72px] p-6 md:p-12 ${className}`}
      style={{ scrollMarginTop: '72px' }}
    >
      {/* 背景图片 */}
      <img
        src={imageUrl}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 渐变遮罩（从透明到黑色） */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(114.4% 240.8% at 8.4% 55.2%, rgba(3,3,3,0) 0%, rgb(3,3,3) 41.56%)',
        }}
      />

      {/* 点状纹理（半透明重复图案） */}
      <div
        className="absolute inset-0 z-1 opacity-10"
        style={{
          backgroundImage:
            'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")',
          backgroundSize: '128px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* 文本内容 */}
      <div className="relative z-2 flex flex-col gap-3 w-1/2 text-white">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">{title}</h2>
        <p className="text-lg md:text-xl font-semibold uppercase tracking-wider">{subtitle}</p>
        <p className="text-base md:text-lg opacity-90 leading-relaxed">{description}</p>
      </div>

      {/* 行动按钮 */}
      <div className="relative z-2">
        <a
          href={href}
          className="flex items-center gap-3 pr-6 h-[45px] relative group transition-transform hover:scale-105"
        >
          {/* 橙色圆形背景 */}
          <div className="absolute left-0 top-0 bottom-0 w-[45px] rounded-full bg-[#f2673d]" />

          {/* 箭头图标容器 */}
          <div className="relative w-[45px] h-[45px] flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white transform rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>

          {/* 按钮文字 */}
          <span className="text-white font-medium whitespace-nowrap">{buttonText}</span>
        </a>
      </div>
    </div>
  )
}

export default HeroSection
