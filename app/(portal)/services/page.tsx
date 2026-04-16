import { getServices } from "@/lib/api";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { brandTokens } from "@/lib/brand-tokens";
import ServicesClient from "./ServicesClient";

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader
        title="Services"
        description="Request-based workflows designed to help you move deals faster."
      />
      <ServicesClient services={services} />
      <Card className="text-center py-8">
        <div className="text-lg font-bold text-voro-jet mb-2">Need something not listed?</div>
        <p className="text-sm text-voro-text-muted mb-5 max-w-md mx-auto">
          Our operations team handles custom requests.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`tel:${brandTokens.contact.phone}`} className="btn-primary text-sm">
            Call {brandTokens.contact.phone}
          </a>
          <a href={`mailto:${brandTokens.contact.email}`} className="btn-secondary text-sm">
            Email {brandTokens.contact.email}
          </a>
        </div>
      </Card>
    </>
  );
}
