/*
import {Models} from "appwrite";
import {Loader2} from "lucide-react";
import GridPostList from "@/components/shared/GridPostList.tsx";


type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[]
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {

    if(isSearchFetching) return <Loader2 className="animate-spin"/>

    if(searchedPosts && searchedPosts.documents.length > 0) {
        return (
            <GridPostList posts={searchedPosts.documents} />
        )
    }

    return (
        <p className="text-light-4 mt-10 text-center w-full">No results found.</p>
    );
};

export default SearchResults;*/
