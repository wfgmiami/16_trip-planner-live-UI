var state = {
  idx:0,
  days: [
    { },
    { },
    { }
  ]
}

function generateList(containerId, places){
  var container = $(containerId);
  var lis = places.map(function(place){
    return `<option>${place.name}</option>`
  })
  var place = containerId.slice(1);
  container.append(`<select id='${place}-selector'>${lis}</select>`);
}

function addItemToState(idx,category,objId){
  if(!state.days[idx][category]){
    state.days[idx][category] = [objId]
  }
  if(state.days[idx][category].indexOf(objId) === -1){
    state.days[idx][category].push(objId)
  }
  //console.log(idx,state.days[idx][category])
}


generateList('#hotels', hotels)
generateList('#restaurants', restaurants)
generateList('#activities', activities)
PlacePickers()

function generateDayView(idx, category,catCol){
  var place = catCol.filter( item => item.id === idx)
  //console.log();
  console.log(catCol[0].name)
  //console.log(catCol.name)
  //<span class="title">Andaz Wall Street</span>
}

function PlacePickers(containerId){
  $('button').on('click', function(){

    var name =  $($(this).attr('data-selector')).val()
    var categoryCollection = window[$(this).attr('data-type')]
    var category = $(this).attr('data-type');
    var selectedItem = categoryCollection.filter( item => item.name === name)[0]
    var idx = ($('.day-buttons button').html());

    addItemToState(idx,category,selectedItem.id)
    generateDayView(idx,category,categoryCollection);
    // var div = $(this).parents('div');

    // var index = div.index();
    // if (index===2){
    //   console.log($('#activities option:selected').val())
    // }else if(index === 1){
    //   console.log($('#restaurants option:selected').val())
    // }else if(index === 0){
    //   console.log($('#hotels option:selected').val())
    // }
  });
}










