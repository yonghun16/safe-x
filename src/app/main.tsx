import { StrictMode } from 'react'

// React 애플리케이션을 브라우저에 렌더링하는 함수
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import App from './App.tsx'

// public/index.html의 <div id="root"></div>를 찾아 React 애플리케이션을 연결(Mount)한다.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 화면의 시작점인 최상위 컴포넌트 */}
    <App />
  </StrictMode>,
)
