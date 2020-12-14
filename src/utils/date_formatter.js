function dateFormatter (isDate) {

  //created at date
  let a = new Date(isDate * 1000);
  let oneDay = 24 * 60 * 60 * 1000;
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let time = date + ' ' + month + ' ' + year;

  //current date
  const currentDate = new Date(Date.now())

  const firstDate = new Date(year, a.getMonth(), date);
  const secondDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  if(diffDays === 0) {
    return 'Posted moments ago'
  } else if(diffDays <= 1) {
    return `${diffDays} day ago`
  } else if(diffDays >= 7) {
    return time;
  } else {
    return `${diffDays} days ago`
  }
}

export default dateFormatter

