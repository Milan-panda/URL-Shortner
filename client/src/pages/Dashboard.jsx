import React from "react";
import CreateLink from "../components/CreateLink";
import GetAllURLs from "../components/GetAllURLs";
import { LinkProvider } from "../context/LinkContext";

const Dashboard = () => {
  return (
    <LinkProvider>
      <div className="pt-10">
        <div className="flex justify-center mb-3">
          <CreateLink />
        </div>
        <div className="flex justify-center">
          <GetAllURLs />
        </div>
      </div>
    </LinkProvider>
  );
};

export default Dashboard;
