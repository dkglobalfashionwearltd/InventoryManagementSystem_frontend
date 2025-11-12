import React, { useEffect } from "react";
import type { Route } from "./+types/home";
import ThemeToggler from "~/components/dark-mode/mode-toggler";
import { SectionCards } from "~/components/section-cards";
import { ChartAreaInteractive } from "~/components/chart-area-interactive";
import CardVisitorsSkeleton from "~/components/chart-skeleton";
import { Button } from "~/components/ui/button";
import { useAppDispatch } from "~/redux/hook";
import { refreshToken } from "~/redux/features/auth/authSliceNew";

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
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 ">
          <SectionCards />
          <div className="">
            {loading ? <CardVisitorsSkeleton /> : <ChartAreaInteractive />}
          </div>
        </div>
        <Button
          onClick={() =>
            dispatch(refreshToken({ baseUrl: "https://localhost:7189" }))
          }
        >
          Refresh Token
        </Button>
      </div>
    </div>
  );
};

export default Home;
