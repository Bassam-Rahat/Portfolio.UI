import { Capabilities } from "@/components/home/Capabilities";
import { ExperienceList } from "@/components/home/ExperienceList";
import { Ledger } from "@/components/home/Ledger";
import { Opener } from "@/components/home/Opener";
import { SelectedWork } from "@/components/home/SelectedWork";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Opener />
      <Ledger />
      <SelectedWork />
      <Capabilities />
      <ExperienceList />
    </>
  );
}
