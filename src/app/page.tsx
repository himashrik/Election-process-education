import { MainDashboard } from "@/components/MainDashboard";
import usData from "@/data/us.json";
import indiaData from "@/data/india.json";
import { CountryData } from "@/types/election";

export default function Home() {
  const countriesData: Record<string, CountryData> = {
    us: usData as CountryData,
    india: indiaData as CountryData,
  };

  return <MainDashboard countriesData={countriesData} />;
}
