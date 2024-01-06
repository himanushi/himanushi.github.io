import { render } from "preact";
import { Route, Router } from "preact-router";
import { Blog } from "~/Blog";
import { Home } from "~/Home";
import { NotFound } from "~/NotFound";
import { useInitializer } from "~/hooks/useInitializer";

import "~/theme/global.css";
import "~/theme/variables.css";

const App = () => {
  useInitializer();

  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/blogs/:id" component={Blog} />
      <Route default component={NotFound} />
    </Router>
  );
};

const root = document.getElementById("app");

if (root) render(<App />, root);
