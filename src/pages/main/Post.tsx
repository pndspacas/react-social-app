import { Post as IPost } from "./Main";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  post: IPost;
}

interface Like {
  userId: string;
  likeId: string;
}

interface Delete {
  deleteId: string;
}

const Post = (props: Props) => {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const { post } = props;
  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes");

  const [deletePost, setDeletePost] = useState<Delete[] | null>();
  const deleteRef = collection(db, "posts");

  const getDelete = async () => {
    const data = await getDocs(deleteRef);
    setDeletePost(
      data.docs.map((doc) => ({
        ...doc.data(),
        deleteId: doc.id,
      })) as Delete[]
    );
  };
  const handleDeletePost = async () => {
    const deleteToDeleteQuery = query(
      deleteRef,
      where("userId", "==", user?.uid)
    );
    const deleteToDeleteData = await getDocs(deleteToDeleteQuery);
    const deleteId = deleteToDeleteData.docs[0].id;
    const deletePost = doc(db, "posts", deleteId);
    await deleteDoc(deletePost);
  };

  //
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
        likeId: doc.id,
      })) as Like[]
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
    getDelete();
  }, []);

  return (
    <div>
      <div className="postsList">
        <div className="post">
          <div className="postContainer">
            <div className="delete">
              <button className="delete-btn" onClick={handleDeletePost}>
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="title">
              <h3>
                <i className="fa-solid fa-bolt-lightning"></i>
                {post.title}
              </h3>
            </div>
            <div className="body">
              <p>
                <i className="fa-solid fa-comment"></i>
                {post.description}
              </p>
            </div>
            <div className="footer">
              <p>
                <i className="fa-solid fa-user"></i>
                {post.username}
              </p>
              <button
                className="likesContainer"
                onClick={userLiked ? removeLike : addLike}
              >
                <p>
                  {userLiked ? (
                    <i className="fa-solid fa-thumbs-down"></i>
                  ) : (
                    <i className="fa-solid fa-thumbs-up"></i>
                  )}
                </p>
                {likes && <p>{likes.length}</p>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
