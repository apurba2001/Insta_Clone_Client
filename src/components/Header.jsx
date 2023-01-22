import insta from './icons/insta.png'
import camere from './icons/camera.png'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='doc-head'>
            <div className='logo'>
                <span>
                    <img className='insta-pic' alt='icon' src={insta} />
                </span>
                <span>
                    <h2 className='insta-text'>Instaclone</h2>
                </span>
            </div>
            <div>
                <span>
                    <Link to="/create-post">
                        <img className='camera-pic' alt='icon' src={camere} />
                    </Link>
                </span>
            </div>
        </div>
    )
}
export default Header