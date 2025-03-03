import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import { Suspense } from "react";
import Loading from "@component/Loading";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default RootLayout;
