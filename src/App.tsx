import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from '@src/store/GlobalProvider';
import { CustomProvider } from '@src/store/CustomProvider';
import LayoutDefault from '@src/layout';

function App() {
  return (
    <BrowserRouter>
      {/* 使用了路由懒加载，所以需要使用<Suspense>包起来 */}
      <Suspense fallback={<div></div>}>
        <GlobalProvider>
          <CustomProvider>
            <LayoutDefault />
          </CustomProvider>
        </GlobalProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
