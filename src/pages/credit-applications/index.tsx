import ApplicationsTable from "@/components/creditApplications/ApplicationsTable";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function ApplicationsList() {
  return (
    <div className="h-full w-full">
      <ApplicationsTable />
    </div>
  );
}
export default withAuthenticator(ApplicationsList);
