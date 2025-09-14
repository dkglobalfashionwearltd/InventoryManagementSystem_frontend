import { Outlet } from "react-router";
import DashboardComponent from "~/components/DashboardComponent";

const Dashboard = () => {
  return (
    <DashboardComponent>
      <Outlet />
    </DashboardComponent>
  );
};

export default Dashboard;
