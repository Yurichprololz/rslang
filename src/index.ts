import './scss/main.scss';
import 'bootstrap';
import renderBasicLayout from './scripts/bacis-layout';
import {getStatistics, setStatistics} from './scripts/api/statisticsF';

renderBasicLayout();

// getStatistics();

// setStatistics('audio-call', 123 ,['1998','1', '9'], ['2', '4'], 3);
getStatistics().then((el) => console.log(el));
