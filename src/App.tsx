import { render } from "preact";
import { Route, Router } from "preact-router";
import { Blog } from "~/Blog";
import { Home } from "~/Home";
import { NotFound } from "~/NotFound";

import "~/theme/global.css";
import "~/theme/variables.css";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/blog/:id" component={Blog} />
      <Route default component={NotFound} />
    </Router>
  );
};

const root = document.getElementById("app");

if (root) render(<App />, root);
