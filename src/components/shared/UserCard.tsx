import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "../ui/button";

type UserCardProps = {
    user: Models.Document;
};

const UserCard = ({ user: { $id, name, username, imageUrl = "/assets/images/circle-user-round.svg" } }: UserCardProps) => {
    return (
        <Link to={`/profile/${$id}`} className="user-card">
            <img
                src={imageUrl}
                alt="creator"
                className="rounded-full w-14 h-14"
            />

            <div className="flex-center flex-col gap-1">
                <p className="base-medium text-light-1 text-center line-clamp-1">
                    {name}
                </p>
                <p className="small-regular text-emerald-200 text-center line-clamp-1">
                    @{username}
                </p>
            </div>

            <Button type="button" size="sm" className="shad-button_primary px-5">
                Follow
            </Button>
        </Link>
    );
};

UserCard.propTypes = {
    user: PropTypes.shape({
        $id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
    }).isRequired,
};

export default UserCard;
