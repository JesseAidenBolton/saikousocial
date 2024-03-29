import {ListFilter, Loader2, Search} from "lucide-react";
import {Input} from "@/components/ui";
import {useState, useEffect} from "react";
import GridPostList from "@/components/shared/GridPostList.tsx";
import {useGetPosts, useSearchPosts} from "@/lib/react-query/queriesAndMutations.ts";
import useDebounce from "@/hooks/useDebounce.ts";
import { useInView} from "react-intersection-observer";


export type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: any;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
    if (isSearchFetching) {
        return <Loader2 className="animate-spin"/>;
    } else if (searchedPosts && searchedPosts.documents.length > 0) {
        return <GridPostList posts={searchedPosts.documents} />;
    } else {
        return (
            <p className="text-light-4 mt-10 text-center w-full">No results found</p>
        );
    }
};


const Explore = () => {

    const { ref, inView } = useInView();

    const { data: posts, fetchNextPage, hasNextPage} = useGetPosts();

    const [searchValue, setSearchValue] = useState('')

    const debouncedValue = useDebounce(searchValue, 500);

    const { data: searchedPosts, isFetching: isSearchFetching} =
        useSearchPosts(debouncedValue);


    useEffect(() => {
        if(inView && !searchValue) fetchNextPage();
    }, [inView, searchValue]);

    if(!posts) {
        return(
            <div className="flex-center w-full h-full">
                <Loader2 className="animate-spin"/>
            </div>
        )
    }

    const shouldShowSearchResults = searchValue !== '';
    const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item?.documents.length === 0);

    return (
        <div className="explore-container">
            <div className="explore-inner_container">
                <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
                <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
                    <Search width={24} height={45}/>
                    <Input
                        type="text"
                        placeholder="Search"
                        className="explore-search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-between w-full max-w-5xl mt-16 mb-7">
                <h3 className="body-bold md:h3-bold">Popular Today</h3>
                <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
                    <p className="small-medium md:base-medium text-light-2">All</p>
                    <ListFilter width={20} height={20}/>
                </div>
            </div>

            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
                {shouldShowSearchResults ? (
                    searchedPosts ? (
                        <SearchResults
                            isSearchFetching={isSearchFetching}
                            searchedPosts={searchedPosts}
                        />
                    ) : (
                        <p className="text-light-4 mt-10 text-center w-full">No search results</p>
                    )
                ) : shouldShowPosts ? (
                    <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
                ) : (
                    posts.pages.map((item, index) => (
                        // Add a check for undefined
                        item && (
                            <GridPostList key={`page-${index}`} posts={item.documents}/>
                        )
                    ))
                )}
            </div>
            {hasNextPage && !searchValue && (
                <div ref={ref} className="mt-10">
                    <Loader2 className="animate-spin"/>
                </div>
            )}
        </div>
    );
};

export default Explore;