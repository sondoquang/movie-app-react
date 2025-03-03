import ImageComponent from "@component/ImageComponent";
import RelatedMediaList from "@component/MediaDetails/RelatedMediaList";
import { GENDER_MAPPING } from "@libs/Constants";
import { useLoaderData } from "react-router-dom";

const PeoplePage = () => {
  const peopleInfo = useLoaderData();

  return (
    <div className="bg-black text-[1.2vw] text-white">
      <div className="container">
        <div className="flex gap-6">
          <div className="flex-1">
            <ImageComponent
              src={
                peopleInfo.profile_path &&
                `https://image.tmdb.org/t/p/original${peopleInfo.profile_path}`
              }
              width={600}
              height={900}
              className="mb-6"
            />
            <div>
              <p className="mb-6 text-[1.3vw] font-bold">
                Personal Information
              </p>
              <div className="space-y-1">
                <div>
                  <p className="font-bold">Know For</p>
                  <p>{peopleInfo.known_for_department}</p>
                </div>
                <div>
                  <p className="font-bold">Gender</p>
                  <p>{GENDER_MAPPING[peopleInfo.gender]}</p>
                </div>
                <div>
                  <p className="font-bold">Place of Birth</p>
                  <p>{peopleInfo.place_of_birth}</p>
                </div>
                <div>
                  <p className="font-bold">Birthday</p>
                  <p>{peopleInfo.birthday}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-2">
            <p className="mb-6 text-[1.5vw] font-bold">{peopleInfo.name}</p>
            <div className="mb-6">
              <p className="mb-4 text-[1.4vw] font-bold">Biography</p>
              <p className="whitespace-pre-line">{peopleInfo.biography}</p>
            </div>
            <div>
              <RelatedMediaList
                title={"Known For"}
                relatedList={peopleInfo.combined_credits.cast || []}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PeoplePage;
