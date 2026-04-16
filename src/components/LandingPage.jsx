import React from 'react';
import DestinationCarousel from './DestinationCarousel';
import SeasonalRecommendations from './SeasonalRecommendations';
import PopularTravelPlans from './PopularTravelPlans';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <DestinationCarousel />
      <SeasonalRecommendations />
      <PopularTravelPlans />
    </div>
  );
};

export default LandingPage;
