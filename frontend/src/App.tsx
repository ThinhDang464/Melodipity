import { Button } from "./components/ui/button";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
function App() {
  return (
    <>
      <header>
        {/*If user signed out show sign in button */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        {/*User signed in show Userbutton */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  );
}

export default App;
