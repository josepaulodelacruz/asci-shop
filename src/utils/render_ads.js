import { Images } from '../images'
function renderAds() {
    let i = 15
    while(i--) {
        let value = Math.floor(Math.random() * (i+2))
        return Images[`ads${value}`]
    }
}

export {
    renderAds
}