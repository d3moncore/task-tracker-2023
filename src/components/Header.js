import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({title, onAdd, showAdd}) => {
    return (
    <header className='header'>
        <h1>
            {title}
        </h1>
        {!showAdd && <Button color="magenta" text="Add" onClick={onAdd}/>}
        {showAdd && <Button color="red" text="Close" onClick={onAdd}/>}
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