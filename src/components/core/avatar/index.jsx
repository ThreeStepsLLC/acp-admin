import './index.scss'
import {getBaseUrl} from '../../config/api'

const Avatar = ({user, id}) => {
    const baseURL = getBaseUrl()

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
