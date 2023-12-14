import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations.ts";
import UserCard from "@/components/shared/UserCard.tsx";

const AllUsers = () => {
    const { toast } = useToast();
    const { data: creators, isLoading, isError: isErrorCreators, error: creatorsError } = useGetUsers();

    if (isErrorCreators) {
        toast({ title: `Error fetching users: ${creatorsError.message}` });
        return null;
    }

    return (
        <div className="common-container">
            <div className="user-container">
                <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
                {isLoading && !creators ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <ul className="user-grid">
                        {creators?.documents.map((creator) => (
                            <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                                <UserCard user={creator} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
