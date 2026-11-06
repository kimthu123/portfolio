import { AiOpsMockup } from './AiOpsMockup'
import { CloudMockup } from './CloudMockup'
import { RagMockup } from './RagMockup'
import { ObservatoryMockup } from './ObservatoryMockup'
import { HousingMockup } from './HousingMockup'
import { MobileMockup } from './MobileMockup'

const mockups = {
  aiops: AiOpsMockup,
  cloud: CloudMockup,
  rag: RagMockup,
  observatory: ObservatoryMockup,
  housing: HousingMockup,
  mobile: MobileMockup,
}

export type MockupKey = keyof typeof mockups

// Shows a real screenshot when a project has one, otherwise its coded mockup.
export function ProjectPreview({ mockup, image, alt }: { mockup?: MockupKey; image?: string; alt: string }) {
  if (image) {
    return <img src={image} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
  }
  const Mockup = mockup ? mockups[mockup] : null
  return Mockup ? <Mockup /> : <div className="h-full w-full bg-raised" />
}
