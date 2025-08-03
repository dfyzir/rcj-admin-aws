import ApplicationsTable from "@/components/driversApplications/ApplicationsTable";
import { adminEmails } from "@/components/nav/Navbar";
import { useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function ApplicationsList() {
  const { user, toSignIn } = useAuthenticator();
  const router = useRouter();

  useEffect(() => {
    // 1) not logged in? send to login
    if (!user) {
      toSignIn();
      return;
    }
    // 2) logged in but not in adminEmails? send to home
    const email = user.signInDetails?.loginId?.toLowerCase() ?? "";
    if (!adminEmails.includes(email)) {
      router.replace("/");
    }
  }, [user, router, toSignIn]);

  return (
    <div className="h-full w-full">
      <ApplicationsTable />
    </div>
  );
}
export default withAuthenticator(ApplicationsList);
