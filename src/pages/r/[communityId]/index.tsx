import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { firestore } from "../../../firebase/clientApp";
import { Community } from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Community/NotFound";
import Header from "@/src/components/Community/Header";
import PageContent from "@/src/components/Layout/PageContent";
import CreatePostLink from "@/src/hooks/CreatePostLink";
import Posts from "@/src/components/Posts/Posts";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if(!communityData) {
    return <NotFound />;
  }
  
  return(
    <>
        <Header communityData={communityData} />
        <PageContent>
            <>
              <CreatePostLink />
              <Posts communityData={communityData} />
            </>
            <><div>RHS</div></>
        </PageContent>
    </>
  )
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
        communityData:communityDoc.exists() ? JSON.parse(
          safeJsonStringify( { id: communityDoc.id, ...communityDoc.data() })
        ) : "",
      },
    };
  } catch (error) {
    console.log("getServerSide", error);
  }
}

export default CommunityPage;
