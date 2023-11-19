import SignOutButton from "@/components/nav/SignOutButton";
import ChassisTable from "@/components/table/ChassisTable";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <>
      <SignOutButton />
      <ChassisTable />
    </>
  );
}
export default withAuthenticator(Home);
