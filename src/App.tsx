import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from '@src/store/GlobalProvider';
import { Redirect, Route, Switch } from 'react-router-dom';
import menuData from '@src/router/router';

function App() {
  return (
    <BrowserRouter>
      {/* 使用了路由懒加载，所以需要使用<Suspense>包起来 */}
      <Suspense fallback={<div></div>}>
        <GlobalProvider>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/index" />} />
            {menuData.map((item: any) => (
              <Route
                key={item.path}
                path={item.path}
                exact={true}
                render={(props) => {
                  return <item.component {...props} />;
                }}
              />
            ))}
          </Switch>
        </GlobalProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
