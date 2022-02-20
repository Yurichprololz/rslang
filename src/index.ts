import './scss/main.scss';
import 'bootstrap';
import renderBasicLayout from './scripts/bacis-layout';
import { getWords } from './scripts/api/wordsF';

renderBasicLayout();
document.addEventListener('DOMContentLoaded', async () => {
  await getWords(0);
});
