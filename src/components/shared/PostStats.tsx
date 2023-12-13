import {Models} from "appwrite";
import {Bookmark, Heart, Loader2} from "lucide-react";
import {
    useDeleteSavedPost,
    useGetCurrentUser,
    useLikePost,
    useSavePost
} from "@/lib/react-query/queriesAndMutations.ts";
import {useEffect, useState} from "react";
import {checkIsLiked} from "@/lib/utils.ts";

type PostStatsProps ={
    post: Models.Document;
    userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {

    const likesList = post.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState(likesList)
    const [isSaved, setIsSaved] = useState(false)

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSavingPost } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser()

    const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post.$id);

    useEffect(() => {
        setIsSaved(!!savedPostRecord)
    }, [currentUser])

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        let newLikes = [...likes];

        const hasLiked = newLikes.includes(userId)

        if(hasLiked){
            newLikes = newLikes.filter((id) => id !== userId);
        } else {
            newLikes.push(userId);
        }

        setLikes(newLikes);
        likePost({ postId: post.$id, likesArray: newLikes})

    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        if(savedPostRecord){
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id)
        } else {
            savePost({ postId: post.$id, userId});
            setIsSaved(true);
        }



    }

    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                <Heart width={20} height={20} onClick={handleLikePost} className={checkIsLiked(likes, userId) ? "cursor-pointer text-red fill-red" : "cursor-pointer"}/>
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                {isSavingPost || isDeletingSaved ? <Loader2 className="animate-spin" /> : <Bookmark width={20} height={20} onClick={handleSavePost} className={isSaved ? "cursor-pointer text-green-600 fill-green-600" : "cursor-pointer"}/>}
            </div>

        </div>
    );
};

export default PostStats;