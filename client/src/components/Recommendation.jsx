import { useGetRecommendationsQuery } from "../app/api/authApi";
import SearchResultItem from "./SearchResultItem";

const Recommendation = () => {
  const { data, isError, isLoading, error } = useGetRecommendationsQuery();
  let content = (
    <SearchResultItem
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  );

  return content;
};

export default Recommendation;
