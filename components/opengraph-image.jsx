import { ImageResponse } from 'next/og'
import LogoIconTemp from './icons/temp-logo'

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div tw='flex h-full w-full flex-col items-center justify-center bg-black'>
        <div tw='flex items-center justify-center border border-neutral-600 h-[160px] w-[160px] rounded-3xl'>
          <LogoIconTemp width='64' height='58' fill='white' />
        </div>
        <p tw='mt-12 text-6xl font-bold text-white'>Ashmeet Store</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            new URL('../fonts/Inter-Bold.ttf', import.meta.url)
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
