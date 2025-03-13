import ReactDOM from 'react-dom/client';
import App from './App';
import { nanoid } from 'nanoid';

const notes = [
  {
    id: nanoid(),
    content: 'HTML is easy',
    important: true,
  },
  {
    id: nanoid(),
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: nanoid(),
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
);
