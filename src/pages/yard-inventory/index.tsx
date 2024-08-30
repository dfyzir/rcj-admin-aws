import LocationTable from "@/components/locationsTable/LocationTable";
import { withAuthenticator } from "@aws-amplify/ui-react";

function Locations() {
  return (
    <>
      <LocationTable />
    </>
  );
}

export default withAuthenticator(Locations);
