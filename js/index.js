$(document).ready(function(){

  let wanderItems = $(".wander-slider-item")
  
  let middleItem = 0;
  let panSensitivity = 10;
  let panTriggered = 0;
  let autoRotate = false;
  let rotateInterval = 3000;
  var cardRotator;
  let sliderCount = 0;
//            let hiddenItemCount = 1;
  let hiddenItemsArray = []
  let returnval = wanderItems.length - 5;
  console.log("THIS IS RETURN VALUE" + returnval)
  
  if(autoRotate) {
      cardRotator = setInterval(panCardsLeft, rotateInterval);
  } 
  
  
  $("#leftBtn").click(function(){
      panCardsLeft()
      clearInterval(cardRotator)
  });
  
  $("#rightBtn").click(function(){
      panCardsRight()
      clearInterval(cardRotator)
  });
  
  
  // initial card setup
  wanderItems.each(function(index) {
      if(index == middleItem){
          $(this).addClass("centerItem")
          $(this).attr("converted", false)
      }
      
      if(index == middleItem + 1) {
          $(this).addClass("firstLeftItem")
          $(this).attr("converted", false)
      }
      
      if(index == middleItem + 2) {
          $(this).addClass("secondLeftItem")
          $(this).attr("converted", false)
      }
      
      if(index >= middleItem + 3 && index < (wanderItems.length - 2)) {
          $(this).addClass("hideCardItem")
          hiddenItemsArray.push($(this))
          $(this).attr("converted", false)
          
      }
      
      if(index == wanderItems.length - 1) {
          $(this).addClass("firstRightItem")
          $(this).removeClass("hideCardItem")
          $(this).attr("converted", false)
      }
      if(index == wanderItems.length - 2) {
          $(this).addClass("secondRightItem")
          $(this).removeClass("hideCardItem")
          $(this).attr("converted", false)
      }

  })
  
  console.log(hiddenItemsArray)
  var wanderSlider = document.getElementById('wander-slider-wrapper');
  
  $('.wander-slider-item').each(function(index){
      var $this = $(this);
      var mc = new Hammer(this);
      mc.on("tap", function() {
          console.log('Slide ' + index + ' was tapped!');
          return false;
      });
  });

  // create a simple instance
  // by default, it only adds horizontal recognizers
  var mc = new Hammer(wanderSlider);
  
  // let the pan gesture support all directions.
  // this will block the vertical scrolling on a touch-device while on the element
  mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 10 });

  // listen to events...
  
  mc.on("panleft panright", function(ev) {
      clearInterval(cardRotator)
      if(ev.type == "panleft") {
          panTriggered ++;
//                    console.log(panTriggered)
//                    console.log(wanderItems)
          
          if(panTriggered == panSensitivity) {
              panCardsLeft()
              panTriggered = 0;
          }
          
      }
      if(ev.type == "panright") {
          panTriggered ++;
          if(panTriggered == panSensitivity) {
              panCardsRight()
              panTriggered = 0;
          }
          
      }
  });
  

  function panCardsLeft() {
    let checkElementClass = $(".wander-slider-item")
    let hiddenItems = $(".hideCardItem");
    sliderCount++;

    console.log("PASS " + sliderCount + " ---------------------------------------")



    checkElementClass.each(function (index) {
      // console.log($(this))
      // console.log(index)

      // SECOND LEFT --> SECOND RIGHT || SECOND LEFT --> HIDE
      if ($(this).hasClass("secondLeftItem")) {
        // console.log("1. 2 LEFT --> 2 RIGHT || 2 LEFT --> HIDE")
        $(this).removeClass("secondLeftItem")

        if (wanderItems.length > 5) {
          //SECOND LEFT --> HIDE
          // console.log("HIDE")
          $(this).addClass("hideCardItem")
          // console.log("adding this item to hidden array")
          hiddenItemsArray.unshift($(this))
          // backtoFrontRight()
        } else {
          // SECOND LEFT --> SECOND RIGHT
          // Move item to the right side to give continuous effect
          // console.log("2 LEFT --> 2 RIGHT")
          // console.log("This should not happen with more than 5")
          $(this).addClass("secondRightItem")
          $(this).attr("class-skip", true)
        }

      }

      // FIRST LEFT --> SECOND LEFT

      if ($(this).hasClass("firstLeftItem")) {
        // console.log("2. 1 LEFT -> 2 LEFT")
        $(this).removeClass("firstLeftItem")
        $(this).addClass("secondLeftItem")
      }

      // CENTER --> FIRST LEFT

      if ($(this).hasClass("centerItem")) {
        // console.log("3. CENTER -> 1 LEFT")
        $(this).removeClass("centerItem");
        $(this).addClass("firstLeftItem");
      }

      // FIRST RIGHT --> CENTER

      if ($(this).hasClass("firstRightItem")) {
        // console.log("4. 1 RIGHT -> CENTER")
        $(this).removeClass("firstRightItem");
        $(this).addClass("centerItem");
      }


      // SKIP to not override
      if ($(this).attr("class-skip") == "true") {
        // console.log("SKIP TRUE")
        $(this).attr("class-skip", "false");

      } else {
        console.log("SKIP NOT TRUE")
        if ($(this).hasClass("secondRightItem")) {
          // console.log("5. 2 RIGHT -> 1 RIGHT")
          $(this).removeClass("secondRightItem");
          $(this).addClass("firstRightItem");
          
          
          // backtoFrontRight()
          // console.log("THIS IS THE INDEX " + (index -1))
          // if(index - 1){
          //   checkElementClass.eq(index - 1).removeClass("hideCardItem")
          //   checkElementClass.eq(index - 1).addClass("secondRightItem")
          // } else {
          //   console.log("there was no element")
          //   console.log(checkElementClass.eq(checkElementClass.length - 1))
          //   checkElementClass.eq(checkElementClass.length - 1).removeClass("hideCardItem")
          //   checkElementClass.eq(checkElementClass.length - 1).addClass("secondRightItem")
          //   // checkElementClass.eq(checkElementClass.length - 1).attr("converted", true)
          // }
        }
      }



    })
    console.log("PASS " + sliderCount + " ---------------------------------------")
    console.log(hiddenItemsArray)
    backtoFrontRight()
    

  }


  function backtoFrontRight() {
    console.log("6. HIDDEN -> 2 RIGHT")
    hiddenItemsArray[hiddenItemsArray.length - 1].removeClass("hideCardItem");
    hiddenItemsArray[hiddenItemsArray.length - 1].addClass("secondRightItem");
    console.log(hiddenItemsArray.pop())
  }
  
  function panCardsRight(){
      let checkElementClass = $(".wander-slider-item");
      let hiddenItems = $(".hideCardItem");
      
      checkElementClass.each(function(index){
          
          if($(this).hasClass("secondRightItem")) {
              $(this).removeClass("secondRightItem");
              if(wanderItems.length > 5){
                  $(this).addClass("hideCardItem")
              } else {
                  $(this).addClass("secondLeftItem")
                  $(this).data("class-skip","true")
              }
          }
          
          if($(this).hasClass("firstRightItem")) {
              $(this).removeClass("firstRightItem");
              $(this).addClass("secondRightItem");
          }
                             
          if($(this).hasClass("centerItem")) {
              $(this).removeClass("centerItem");
              $(this).addClass("firstRightItem");
              
          }
          
          if($(this).hasClass("firstLeftItem")) {
              $(this).removeClass("firstLeftItem")
              $(this).addClass("centerItem")
          }
          
          if($(this).data("class-skip") == "true") {
              $(this).data("class-skip","false")
          } else {
              if($(this).hasClass("secondLeftItem")) {
                  
                  $(this).removeClass("secondLeftItem");
                  $(this).addClass("firstLeftItem");
                  
                  if(wanderItems.length > 5){
                     hiddenItems.last().removeClass("hideCardItem");
                     hiddenItems.last().addClass("secondLeftItem");
                  }
                  
              }
          }
          
      })
      
  }
  
  
})