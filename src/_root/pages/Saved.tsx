import { Models } from "appwrite";
import GridPostList from "@/components/shared/GridPostList.tsx";
import {Bookmark, Loader2} from "lucide-react";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations.ts";

const Saved = () => {
    const { data: currentUser, isLoading } = useGetCurrentUser();

    const savePosts = currentUser?.save
        .map((savePost: Models.Document) => ({
            ...savePost.post,
            creator: {
                imageUrl: currentUser.imageUrl,
            },
        }))
        .reverse();

    return (
        <div className="saved-container">
            <div className="flex gap-2 w-full max-w-5xl">
                <Bookmark width={36} height={36}/>
                <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="animate-spin" />
                </div>
            ) : (
                <ul className="w-full flex justify-center max-w-5xl gap-9">
                    {savePosts.length === 0 ? (
                        <p className="text-light-4">No available posts</p>
                    ) : (
                        <GridPostList posts={savePosts} showStats={false} />
                    )}
                </ul>
            )}
        </div>
    );
};

export default Saved;
