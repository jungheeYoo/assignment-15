import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Detail from './routes/Detail';
import Characters from './routes/Characters';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:charactersId">
          <Detail />
        </Route>
        <Route path="/">
          <Characters />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
