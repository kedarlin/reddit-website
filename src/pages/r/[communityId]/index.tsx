import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import { firestore } from "../../../firebase/clientApp";
import { Community, communityState } from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Community/NotFound";
import Header from "@/src/components/Community/Header";
import PageContent from "@/src/components/Layout/PageContent";
import CreatePostLink from "@/src/hooks/CreatePostLink";
import Posts from "@/src/components/Posts/Posts";
import { useSetRecoilState } from "recoil";
import About from "@/src/components/Community/About";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  const setCommunityStateValue = useSetRecoilState(communityState);

  if (!communityData) {
    return <NotFound />;
  }

  useEffect(() => {
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: communityData,
      }));
  }, [communityData]);


  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : null, // Use null instead of an empty string
      },
    };
  } catch (error) {
    console.log("getServerSide", error);
    return {
      props: {
        communityData: null,
      },
    };
  }
}

export default CommunityPage;