import './index.scss'

const Avatar = ({user, id}) => {
    const baseURL = process.env.REACT_APP_BASE_URL

    const getPhoto = () => {
        const {photo} = user
        if (photo?.includes('blob')) {
            return photo
        }
        return baseURL + photo
    }

    return (
        <div className="avatar" id={id}>
            {user?.photo ? (
                <img className="profile-photo" src={getPhoto()} alt={user?.name}/>
            ) : (
                <span>{user?.name?.[0]}{user?.surname?.[0]}</span>
            )}
        </div>
    )
}

export default Avatar
