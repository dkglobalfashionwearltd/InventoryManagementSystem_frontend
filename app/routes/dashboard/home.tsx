import React from "react";
import type { Route } from "./+types/home";
import { SectionCards } from "~/components/section-cards";
import { ChartAreaInteractive } from "~/components/chart-area-interactive";
import CardVisitorsSkeleton from "~/components/chart-skeleton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DK Global | Inventory Management System" },
    {
      name: "description",
      content: "Welcome to Tanvirul's digital world!",
    },
  ];
}

const Home = () => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 ">
          <SectionCards />
          <div className="">
            {loading ? <CardVisitorsSkeleton /> : <ChartAreaInteractive />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
