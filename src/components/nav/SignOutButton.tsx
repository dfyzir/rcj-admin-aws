import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@nextui-org/react";

import { useState } from "react";
import ReactDOM from "react-dom";

//SignOutButton Component:

//This component provides a Sign Out button and user information display.
//It utilizes the `useAuthenticator` hook from "@aws-amplify/ui-react" for authentication-related functionality.

const SignOutButton = () => {
  // Retrieve user information and signOut function from the useAuthenticator hook
  const { user, signOut } = useAuthenticator();
  const [visible, setVisible] = useState(false);
  const openModal = () => setTimeout(() => setVisible(true), 0);
  const closeModal = () => setVisible(false);

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
      ) : (
        <div>
          <button
            className="group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover ml-auto"
            onClick={() => openModal()}>
            Sign In
          </button>

          {visible && (
            <>
              {ReactDOM.createPortal(
                <div className="fixed inset-0  flex items-center justify-center z-50">
                  {/* Overlay background that closes the modal on click */}
                  <div
                    className="absolute inset-0 bg-black opacity-50"
                    onClick={closeModal}></div>
                  {/* Modal container */}

                  <Authenticator
                    hideSignUp
                    className="[&>div>div>div]:dark:!bg-gray-800 z-[100]"
                  />
                </div>,
                document.body
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SignOutButton;
