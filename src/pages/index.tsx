import ChassisTable from "@/components/chassisTable/ChassisTable";
import FindChassisTable from "@/components/findChassis/FindChassisTable";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <>
      <FindChassisTable />
    </>
  );
}
export default Home;
