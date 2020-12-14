import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core'

const NavBar = ({isShow}) => {
  return(
    <AppBar className="e-commerce__navbar-container" position='fixed' elevation={isShow ? 5 : 0} color={isShow ? 'default' : 'transparent'}>
      <Toolbar>
        <h2 className="e-commerce__navbar-title" style={{color: isShow ? '#111' :'#fff'}}>Face Shop</h2>
      </Toolbar>
    </AppBar>
  )
}


export default NavBar