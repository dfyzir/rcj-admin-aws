import ChassisTable from "@/components/chassisTable/ChassisTable";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function ChassisList() {
  return (
    <>
      <ChassisTable />
    </>
  );
}
export default withAuthenticator(ChassisList);
