import { Background } from "@/components/background";
import CaseStudies from "@/components/blocks/case-studies";
import { getAllCaseStudies } from "@/lib/case-studies-utils";

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <Background>
      <div className="py-28 lg:py-32 lg:pt-44">
        <CaseStudies caseStudies={caseStudies} />
      </div>
    </Background>
  );
}
