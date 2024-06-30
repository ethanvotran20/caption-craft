import DemoSection from "@/components/DemoSection";
import PageHeaders from "@/components/PageHeaders";
import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <>
      <PageHeaders 
      h1Text={'Craft your captions!'}
      h2Text={'Just upload your videos and we will do the rest'}
      />
      <div className="text-center">
        <UploadForm />
      </div>
      <DemoSection />
    </>
  )
}
