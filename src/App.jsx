import { ColorModeToggle, Routing } from "./components";
import UserContext from "./contexts/user_context";

const App = () => {
  return (
    <UserContext>
      <ColorModeToggle />
      <Routing />
    </UserContext>
  );
};

export default App;
