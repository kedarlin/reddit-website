import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import PageContent from "../components/Layout/PageContent";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import usePosts from "../hooks/usePosts";
import { Post, PostVote } from "../atoms/postsAtoms";
import PostLoader from "../components/Posts/PostLoader";
import { Stack } from "@chakra-ui/react";
import CreatePostLink from "../hooks/CreatePostLink";
import PostItem from "../components/Posts/PostItem";
import useCommunityData from "../hooks/useCommunityData";
import Recommendations from "../components/Community/Recommendations";
import PersonalHome from "../components/Community/PersonalHome";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const { communityStateValue } = useCommunityData();

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      const myCommunityIds = communityStateValue.mySnippets.map(
        (snippet) => snippet.communityId
      );
  
      const userCommunitiesPostQuery = query(
        collection(firestore, "posts"),
        where("communityId", "in", myCommunityIds),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const userCommunitiesPostDocs = await getDocs(userCommunitiesPostQuery);
      const userCommunitiesPosts = userCommunitiesPostDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const otherCommunitiesPostQuery = query(
        collection(firestore, "posts"),
        where("communityId", "not-in", myCommunityIds),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const otherCommunitiesPostDocs = await getDocs(otherCommunitiesPostQuery);
      const otherCommunitiesPosts = otherCommunitiesPostDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const combinedPosts = [...userCommunitiesPosts, ...otherCommunitiesPosts];

      setPostStateValue((prev) => ({
        ...prev,
        posts: combinedPosts as Post[],
      }));
    } catch (error) {
      console.log("getUserHomeFeed error", error);
    }
    setLoading(false);
  };

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("buildNoUserHomeFeed error", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);
      const postVoreQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );
      const postVotesDocs = await getDocs(postVoreQuery);
      const postVotes = postVotesDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    } catch (error) {
      console.log("getUSerPostVotes error", error);
    }
  };

  useEffect(() => {
    if (communityStateValue.snippetsFetched) buildUserHomeFeed();
  }, [communityStateValue.snippetsFetched]);
  
  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);
  
  useEffect(() => {
    if (user && postStateValue.posts.length) getUserPostVotes();
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [user, postStateValue.posts]);
  
  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onDeletePost={onDeletePost}
                onVote={onVote}
                onSelectPost={onSelectPost}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <>
        <Recommendations />
        <PersonalHome />
      </>
    </PageContent>
  );
};
export default Home;
