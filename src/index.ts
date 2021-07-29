import Footer from './components/Footer';
import NavigationPanel from './components/NavigationPanel';
import Garage from './services/Garage';
import WinnersService from './services/WinnersService';

const garage = new Garage();
const winners = new WinnersService();
new NavigationPanel(winners, winners.init).init();
(async () => {
  try {
    await garage.init();
    await winners.init();
    new Footer().init();
  } catch (e) {
    throw new Error('error during initialization');
  }
})();
