var state = {
  idx:0,
  places:
    [ 'hotels', 'restaurants', 'activities'],
  days: []
}


//populates the drop-downs and wires the add events buttons
function generateList(){

  state.places.forEach(function(place){
    var container = $(`#${place}`);
    var dataArray = getArray(place);
    var lis = dataArray.map(function(place){
      return `<option>${place.name}</option>`
    })
    container.append(`<select id='${place}'>${lis}</select>`);
  })

  $('#options-panel').on('click', 'button', function(){
    var btn = $(this)
    var div = btn.parents('div');
    var category = div.attr('id')
    var placeName = $(`select#${category}`).val();
    var dataArray = getArray(category);
    var placeId = dataArray.filter( place => place.name === placeName)[0].id;
    var idx = ($('.day-buttons .current-day').html())*1 - 1;
    console.log(idx)
    dayView(idx,category,placeId)
  });
}

//sets the Day heading
function headDay(dayNumber){
  var container = $('#day-title');
  container.empty();

  var dayButton = $(`<span>Day ${dayNumber}</span><button class="btn btn-xs btn-danger remove btn-circle" data-dayNumber=${dayNumber}>x</button>`)

  $(dayButton).on('click', function(){
    var dayNumber = $(this).attr('data-dayNumber')
    onRemoveDay(dayNumber)
  })

  container.append(dayButton);
}


//sets the individual days panel
function dayPicker(dayNumber){
  var container = $('.day-buttons');
  var current = ($('.day-buttons .current-day')).html();
  container.empty();
  if(!current) current = 1;
  var dayButtons = [];

  for(var i = 1; i <= dayNumber; i++){

    if(i === current*1){
      var dayButton = $(`<button class="btn btn-circle day-btn current-day">${i}</button>`);
    }else{
      var dayButton = $(`<button class="btn btn-circle day-btn">${i}</button>`);
    }

    $(dayButton).on('click', function(){
      $('.day-buttons .current-day').removeClass("current-day")

      onSelectDay($(this));
    })
    dayButtons.push(dayButton)
  }

  var addDay = $('<button class="btn btn-circle day-btn" id="day-add">+</button>');

  $(addDay).on('click', function(){
    dayPicker(dayNumber+1)
  })
  container.append(dayButtons,addDay)
}

// seeds the state with data
function dayView(idx,category,placeId){

  //idx = --idx;
  if(!state.days[idx]) state.days[idx] ={};

  if(placeId){
    if(!state.days[idx][category]){
      state.days[idx][category] = [placeId]
    }
    if (category !== 'hotels'){
      if(state.days[idx][category].indexOf(placeId) === -1){
      state.days[idx][category].push(placeId)
      }
    }else if(state.days[idx][category].length === 0){
      state.days[idx][category].push(placeId)
    }
  }

  if(category){
    var placesToAdd = state.days[idx][category];
    //console.log('idx, category, state.days[cat]', idx, category, state.days[idx][category])
  }else{
    placesToAdd = state.days[idx]
  }
  addToDay(idx,`.itinerary-item.${category}`, placesToAdd, category);

}


// show the events for the day by categories
function addToDay(idx, containerId, placesToAdd, category){

  var container = $(containerId);
  container.empty();
  var categoryArray =  getArray(category);
  var placeName=[];
  var lis ='';

  if (!Array.isArray(placesToAdd)){
    state.places.forEach( category => {
      $(`.itinerary-item.${category}`).empty();
    })

    if(!Object.keys(placesToAdd).length){
      placesToAdd = [];
    }else{
      Object.keys(placesToAdd).forEach( key => {
        placesToAdd[key].forEach( id => {
          categoryArray =  getArray(key);
          var selected = categoryArray.filter( cat => cat.id === id)
          placeName.push({name: selected[0].name, id:selected[0].id, category: key})
        })
      })
    }
  }else{
    placesToAdd.forEach(place=>{
      var selected = categoryArray.filter( cat => cat.id === place)
      placeName.push({name: selected[0].name, id:selected[0].id})
    })
  }

  placeName.forEach(place => {
    if(!category){
      category = place.category;
      container = $(`.itinerary-item.${category}`)
    }
    lis = $(`<div data-id='${place.id}' style="width:100%">${place.name}<button class="btn btn-xs btn-danger remove btn-circle" style="float:right">x</button></div><br>`);

    $(lis).on('click', 'button',function(){
      var placeId = $(this).parents('div').attr('data-id');
     // console.log('onremove', idx,placeId, category)
      onRemovePlace(idx,placeId,category)
    })
    container.append(lis);
  })

}


function onRemovePlace(idx,placeId,category){
  state.days[idx][category] = state.days[idx][category].filter(id => id !== placeId*1);
  //console.log(idx,category)
  dayView(idx,category)
}


function onRemoveDay(dayNumber){

  if(state.days.length > 1){

    state.days.splice(dayNumber-1,1);
  }
}

// function onAddDay(dayNumber){
//   container = $('.day-buttons');
//   container.empty();
//   dayButton = $('<button class="btn btn-circle day-btn current-day onClick=onSelectDay()">1</button>');
//   container.append(dayButton);
// }

function onSelectDay(btn){

  $(btn).addClass("current-day");
  var dayNumber = $(btn).html();
  headDay(dayNumber);
  dayView(dayNumber - 1);
}

function getArray(category){
   switch (category){
      case 'hotels':
        arr = hotels; break;
      case 'restaurants':
        arr = restaurants; break;
      case 'activities' :
        arr = activities; break;
    }
    return arr;
}


function init(){
  generateList();
  headDay(1);
  dayPicker(1);
}

init();



