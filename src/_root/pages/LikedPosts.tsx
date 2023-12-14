import {useGetCurrentUser} from "@/lib/react-query/queriesAndMutations.ts";
import {Loader2} from "lucide-react";
import GridPostList from "@/components/shared/GridPostList.tsx";


const LikedPosts = () => {
    const { data: currentUser } = useGetCurrentUser();

    if (!currentUser)
        return (
            <div className="flex-center w-full h-full">
                <Loader2 className="animate-spin" />
            </div>
        );

    return (
        <>
            {currentUser.liked.length === 0 && (
                <p className="text-light-4">No liked posts</p>
            )}

            <GridPostList posts={currentUser.liked} showStats={false} />
        </>
    );
};

export default LikedPosts;