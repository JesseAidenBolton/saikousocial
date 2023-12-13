import {ImagePlus, Loader2} from "lucide-react";
import PostForm from "@/components/forms/PostForm.tsx";
import {useParams} from "react-router-dom";
import {useGetPostById} from "@/lib/react-query/queriesAndMutations.ts";

const EditPost = () => {

    const { id } = useParams();
    const { data: post, isPending } = useGetPostById(id || '');

    if(isPending) return <Loader2 className="animate-spin"/>


    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 justify-start w-full">
                    <ImagePlus />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
                </div>
                <PostForm action="Update" post={post}/>
            </div>
        </div>
    );
};

export default EditPost;