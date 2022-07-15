import { Event } from "./pages/Event";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
