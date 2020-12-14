import NavBar from '../../components/NavBar'
import Banner from './banner'
import SalesSection from './sale_section'


const HomePage = ({isShow}) => {
  return(
    <div style={{height: 2000}}>
      <NavBar isShow={isShow}/>
      <Banner />
      <SalesSection/>
    </div>
  )
}



export default HomePage