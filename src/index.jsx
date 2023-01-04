import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
//-- components
import App from './components/App';
//-- style
import './styles/index.scss';


const container = document.getElementById('root');
//-- create a root
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

//-- in old way
// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );