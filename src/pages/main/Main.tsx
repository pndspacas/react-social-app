import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import Post from "./Post";

export interface Post {
  id: string;
  title: string;
  description: string;
  userId: string;
  username: string;
}
const Main = () => {
  const [postsList, setPostsLists] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsLists(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="allPosts">
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Main;
