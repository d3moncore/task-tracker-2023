import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({title}) => {
    const onClick = () => {
        console.log('clicked');
    }
    return (
    <header className='header'>
        <h1>
            {title}
        </h1>
        <Button color="magenta" text="Add" onClick={onClick}/>
    </header>
  );
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// const headerStyle = {
//     color: "steelblue", backgroundColor: "chartreuse"
// }
export default Header