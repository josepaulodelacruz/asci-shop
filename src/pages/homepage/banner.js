import Hero from '../../assets/hero.png'

const Banner = () => {
  return(
    <header className="e-commerce__banner">
      <div className="e-commerce__container">
        <h1 className="e-commerce__banner-title">
          Your Online <br/> Face Shop
        </h1>
        <img className="e-commerce__image-banner" src={Hero} alt=""/>
      </div>
    </header>
  )
}

export default Banner