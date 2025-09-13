// Import data from separate files
import { homeData } from './home.js';
import { aboutData } from './about-section.js';
import { serviceData } from './service-section.js';
import { portfolioData } from './portfolio-section.js';

// Create Vue app
const app = Vue.createApp({
  data() {
    return {
      home: homeData,
      about: aboutData,
      services: serviceData,
      portfolio: portfolioData
    };
  }
});

// Mount the app
app.mount('#app');
