import SignOutButton from "@/components/nav/SignOutButton";
import ChassisTable from "@/components/table/ChassisTable";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <div className="fixed w-full h-full bg-gradient-to-r from-cyan-200/50 to-blue-400/80 overflow-scroll ">
      <SignOutButton />
      <ChassisTable />
    </div>
  );
}
export default withAuthenticator(Home);
