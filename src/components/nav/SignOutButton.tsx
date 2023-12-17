import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@nextui-org/react";
import { RCJIcon } from "../icons/RCJIcon";

//SignOutButton Component:

//This component provides a Sign Out button and user information display.
//It utilizes the `useAuthenticator` hook from "@aws-amplify/ui-react" for authentication-related functionality.

const SignOutButton = () => {
  // Retrieve user information and signOut function from the useAuthenticator hook
  const { user, signOut } = useAuthenticator();

  return (
    <div>
      {user ? (
        <div>
          <Button
            variant="ghost"
            color="danger"
            size="md"
            onPress={signOut}
            className="ml-auto">
            Sign Out
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default SignOutButton;
