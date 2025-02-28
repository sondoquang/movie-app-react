import FeatureMovie from "../component/FeatureMovies";
import { TOP_RATED_TABS, TRENDING_TABS } from "../libs/Constants";
import MediaList from "../component/MediaList/MediaList";

function HomePage() {
  return (
    <div>
      <FeatureMovie />
      <MediaList title="Trending" tabs={TRENDING_TABS} />
      <MediaList title="Top Rated" tabs={TOP_RATED_TABS} />
    </div>
  );
}

export default HomePage;
