import React, { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, Radio } from '@material-ui/core'
import Faces from '../../fixtures/faces';
import CurrencyFormat from '../../utils/currency_formatter'
import {fetchApi, preemptiveFetchItems} from '../../api/fetchProducts'
import { renderAds } from '../../utils/render_ads'
import dateFormatter from '../../utils/date_formatter'
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

const SalesSection = () => {
  const [products, setProducts] = useState([]) // primary items
  const [idleItems, setIdleItems] = useState([])
  const [renderItems, setRenderItems] = useState(20) //default items render
  const [loading, setLoading] = useState(false)
  const [sortId, setSortId] = useState(false)
  const [dots, setDots] = useState(1)
  const [sort, setSort] = useState("")
  const [size, setSize] = useState(16)

  //scroll listener
  useEffect(() => {
    window.addEventListener('scroll', _onScroll, false)
    return () => {
      document.removeEventListener('scroll', _onScroll, false);
    }
  })

  //fetch on mount
  useEffect(() => {
    _fetch() // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const _fetch = async () => {
    setLoading(true)
    console.log('fetch')
    await fetchApi(products.length, renderItems)
      .then((res) => {
        setLoading(false)
        setProducts(res)
        setRenderItems(renderItems + 20)
        return res
      }).catch((err) => console.log(err))
  }

  // pre-fetch data while idle
  useEffect(() => {
    _preFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idleItems])

  useEffect(() => {
    _handleSortId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const _handleSize = (value) => {
    setSize(value);
  }

  const _preFetch = () => {
    preemptiveFetchItems(renderItems - 20, renderItems).then((res) => {
      setRenderItems(renderItems + 20) //insert ads every 20th items
      setIdleItems(prevItems => {
        if(prevItems.length === 0) {
          return res
        }
        return [
          ...prevItems, {ads: true, element: <img className="flex w-full p-5" src={renderAds()}/>}, 
          ...res
        ] // insert ads
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  const _onScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
      setProducts(idleItems)
      document.removeEventListener('scroll', _onScroll, false);
    }
  }

  const _handleSortId = () => {
    setSortId(!sortId)
    if(sortId) {
      console.log('high')
      products.sort((a,b) => (b.id - a.id))
    } else {
      products.sort((a,b) => (a.id - b.id))
    }
  }

  const IsLoading = () => {
    setInterval(() => {
      setDots(dots === 3 ? 0 : dots + 1)
    }, 1000)
    let text = dots === 0 ? '' : '.'.repeat(dots);
    return (
      <div className="e-commerce__loading-container">
        <div className="e-commerce__loading">
          Loading{text}
        </div>
      </div>
    )
  }


  return(
    <div className="e-commerce__sales-container" id="sales">
      <section className="e-commerce__sales-displays">
        <div className="e-commerce__sort-container">
          <ul className="e-commerce__sort-terms">
            <li className="flex- flex justify-between">
              <label htmlFor="" id="id">ID</label>
                <button className="flex items-center" onClick={_handleSortId}>
                  <p className="text-sm text-gray-500 font-semibold">{sortId ? 'Ascending' : 'Descending'}</p>
                  {sortId ? <ExpandLessOutlinedIcon/> : <ExpandMoreOutlinedIcon/> }
                </button>
            </li>
            <li className="flex-col flex justify-start">
              <label htmlFor="price" id="price">Price</label>
              <div className="flex items-center" >
                <Checkbox
                  checked={sort === 'high' && true}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  id="high"
                  onClick={() => {
                    if(sort !== 'high') {
                      setSort('high')
                      products.sort((a, b) => (b.price - a.price))
                    }
                    return null;
                  }}

                />
                <p htmlFor="" className="text-gray-500 font-semibold" id="high">Highest</p>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={sort === 'low' && true}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  id="low"
                  onClick={() => {
                    if(sort !== 'low') {
                      setSort('low')
                      products.sort((a, b) => (a.price - b.price))
                    }
                    return null

                  }}
                />
                <p htmlFor="" className="text-gray-500 font-semibold" id="low">Lowest</p>
              </div>
            </li>
            <li>
              <label htmlFor="size" id="size">Size</label><br/>
              <FormControlLabel checked={size === 12 && true} onClick={() => _handleSize(12)} value="12" control={<Radio />} label="12px" />
              <FormControlLabel checked={size === 16 && true} onClick={() => _handleSize(16)} value="16" control={<Radio />} label="16px" />
              <FormControlLabel checked={size === 22 && true} onClick={() => _handleSize(22)} value="22" control={<Radio />} label="22px" />
              <FormControlLabel checked={size === 26 && true} onClick={() => _handleSize(26)} value="26" control={<Radio />} label="26px" />
              <FormControlLabel checked={size === 32 && true} onClick={() => _handleSize(32)} value="32" control={<Radio />} label="32px" />
            </li>
          </ul>
        </div>
        {
          !loading ? <div className="e-commerce__items-container">
          {
            products.length > 0 && products.map((product, i) => {
              let index = i + 1;
              let insertedAdsCount = (Faces.length / 20 - 2) // insert ads every 20th rendered items
              if(index <= Faces.length + insertedAdsCount) {
                  return !product.ads ? ( 
                   <div key={i} className="e-commerce__card-item">
                     <div className="e-commerce__card-body" style={{fontSize: size}}>
                       {product.face}
                     </div>
                     <div className="e-commerce__card-description">
                       <span className="bg-green-500 text-sm rounded-full text-white font-bold w-4/12 text-center">${CurrencyFormat(product.price)}</span>
                       <span className="text-gray-500 text-lg font-semibold">ID: {product.id}</span>
                       <span className="text-gray-500 text-sm font-semibold">size: {size}</span>
                       <span className="text-gray-500 text-sm font-semibold">{dateFormatter(product.created_at)}</span>
                     </div>
                   </div>
                 ) : <div key={i} className="flex w-full p-6">
                   {product.element}
                 </div>
               } else {
                 return <div key={i} className="flex items-center justify-center w-full text-gray-500 font-bold p-6">~End of catalogue~</div>
              }
            })
          }
        </div> : IsLoading()
        }
      </section>
    </div>
  )
}

export default SalesSection