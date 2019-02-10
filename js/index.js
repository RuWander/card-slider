$(document).ready(function () {

  let wanderItems = $(".wander-slider-item")

  let middleItem = 0;
  let panSensitivity = 10;
  let panTriggered = 0;
  let autoRotate = false;
  let rotateInterval = 3000;
  var cardRotator;
  let sliderCount = 0;
  let hiddenItemsArray = []
  let returnval = wanderItems.length - 5;
  // console.log("THIS IS RETURN VALUE" + returnval)

  if (autoRotate) {
    cardRotator = setInterval(panCardsLeft, rotateInterval);
  }


  $("#leftBtn").click(function () {
    panCardsLeft()
    clearInterval(cardRotator)
  });

  $("#rightBtn").click(function () {
    panCardsRight()
    clearInterval(cardRotator)
  });


  // initial card setup
  wanderItems.each(function (index) {

    if (wanderItems.length == 2) {
      wanderItems.eq(0).addClass("centerItem");
      wanderItems.eq(1).addClass("firstRightItem");
      return false;
    }

    if (wanderItems.length < 5 && wanderItems.length > 2) {
      if (index == middleItem) {
        $(this).addClass("centerItem")
        $(this).attr("converted", false)
      }

      if (index == middleItem + 1) {
        $(this).addClass("firstLeftItem")
        $(this).attr("converted", false)
      }

      if (index >= middleItem + 2 && index < (wanderItems.length - 1)) {
        $(this).addClass("hideCardItem")
        hiddenItemsArray.push($(this))
        $(this).attr("converted", false)

      }

      if (index == wanderItems.length - 1) {
        $(this).addClass("firstRightItem")
        $(this).removeClass("hideCardItem")
        $(this).attr("converted", false)
      }
    }

    if (wanderItems.length >= 5) {
      if (index == middleItem) {
        $(this).addClass("centerItem")
        $(this).attr("converted", false)
      }

      if (index == middleItem + 1) {
        $(this).addClass("firstLeftItem")
        $(this).attr("converted", false)
      }

      if (index == middleItem + 2) {
        $(this).addClass("secondLeftItem")
        $(this).attr("converted", false)
      }

      if (index >= middleItem + 3 && index < (wanderItems.length - 2)) {
        $(this).addClass("hideCardItem")
        hiddenItemsArray.push($(this))
        $(this).attr("converted", false)

      }

      if (index == wanderItems.length - 1) {
        $(this).addClass("firstRightItem")
        $(this).removeClass("hideCardItem")
        $(this).attr("converted", false)
      }
      if (index == wanderItems.length - 2) {
        $(this).addClass("secondRightItem")
        $(this).removeClass("hideCardItem")
        $(this).attr("converted", false)
      }
    }



  })

  // console.log(hiddenItemsArray)
  var wanderSlider = document.getElementById('wander-slider-wrapper');

  $('.wander-slider-item').each(function (index) {
    var $this = $(this);
    var mc = new Hammer(this);
    mc.on("tap", function () {
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

  mc.on("panleft panright", function (ev) {
    clearInterval(cardRotator)
    if (ev.type == "panleft") {
      panTriggered++;

      if (panTriggered == panSensitivity) {
        panCardsLeft()
        panTriggered = 0;
      }

    }
    if (ev.type == "panright") {
      panTriggered++;
      if (panTriggered == panSensitivity) {
        panCardsRight()
        panTriggered = 0;
      }

    }
  });


  function panCardsLeft() {
    let checkElementClass = $(".wander-slider-item")
    let hiddenItems = $(".hideCardItem");
    sliderCount++;

    // console.log("PASS " + sliderCount + " ---------------------------------------")

    checkElementClass.each(function (index) {
      if (wanderItems.length == 2) {
        wanderItems.eq(0).removeClass("centerItem");
        wanderItems.eq(0).addClass("firstLeftItem");

        wanderItems.eq(1).removeClass("firstRightItem");
        wanderItems.eq(1).addClass("centerItem");
        return false;
      }

      if (wanderItems.length < 5) {
        if ($(this).hasClass("firstLeftItem")){
          $(this).removeClass("firstLeftItem")
          if (wanderItems.length < 5) {
            //SECOND LEFT --> HIDE
            // console.log("HIDE")
            $(this).addClass("hideCardItem")
            // console.log("adding this item to hidden array")
            hiddenItemsArray.unshift($(this))
          } else {
            // SECOND LEFT --> SECOND RIGHT
            // Move item to the right side to give continuous effect
            // console.log("2 LEFT --> 2 RIGHT")
            $(this).addClass("firstRightItem")
            $(this).attr("class-skip", true)
          }
        }
      } else {
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
          } else {
            // SECOND LEFT --> SECOND RIGHT
            // Move item to the right side to give continuous effect
            // console.log("2 LEFT --> 2 RIGHT")
            $(this).addClass("secondRightItem")
            $(this).attr("class-skip", true)
          }

        }

      }

      if (wanderItems.length < 5) {
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
      } else {
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
      }




      // SKIP to not override
      if ($(this).attr("class-skip") == "true") {
        // console.log("SKIP TRUE")
        $(this).attr("class-skip", "false");

      } else {
        // console.log("SKIP NOT TRUE")
        if (wanderItems.length < 5) {
          if ($(this).hasClass("firstRightItem")) {
            // console.log("5. 2 RIGHT -> 1 RIGHT")
            $(this).removeClass("firstRightItem");
            $(this).addClass("centerItem");

          }
        } else {
          if ($(this).hasClass("secondRightItem")) {
            // console.log("5. 2 RIGHT -> 1 RIGHT")
            $(this).removeClass("secondRightItem");
            $(this).addClass("firstRightItem");

          }
        }

      }

    })
    // console.log("PASS " + sliderCount + " ---------------------------------------")
    // console.log(hiddenItemsArray)
    if (wanderItems.length > 2) {
      backtoFrontRight()
    }
    


  }


  function backtoFrontRight() {
    if (wanderItems.length < 5) {
      // console.log("ARRAY SMALLER THAN 5")
      // console.log("6. HIDDEN -> 2 RIGHT")
      hiddenItemsArray[hiddenItemsArray.length - 1].removeClass("hideCardItem");
      hiddenItemsArray[hiddenItemsArray.length - 1].addClass("firstRightItem");
      hiddenItemsArray.pop()
    } else if (wanderItems.length == 5) {
      // console.log("ARRAY == 5")
      // console.log("already handled with skip in loop")
    } else {
      // console.log("ARRAY GREATER THAN 5")
      // console.log("6. HIDDEN -> 2 RIGHT")
      hiddenItemsArray[hiddenItemsArray.length - 1].removeClass("hideCardItem");
      hiddenItemsArray[hiddenItemsArray.length - 1].addClass("secondRightItem");
      hiddenItemsArray.pop()
    }

  }

  function panCardsRight() {
    let checkElementClass = $(".wander-slider-item");
    let hiddenItems = $(".hideCardItem");

    checkElementClass.each(function (index) {
      if (wanderItems.length == 2) {
        wanderItems.eq(0).removeClass("firstLeftItem");
        wanderItems.eq(0).addClass("centerItem");

        wanderItems.eq(1).removeClass("centerItem");
        wanderItems.eq(1).addClass("firstRightItem");
        return false;
      }

      if (wanderItems.length < 5) {
        if ($(this).hasClass("firstRightItem")){
          $(this).removeClass("firstRightItem")
          if (wanderItems.length < 5) {
            //SECOND LEFT --> HIDE
            // console.log("HIDE")
            $(this).addClass("hideCardItem")
            // console.log("adding this item to hidden array")
            hiddenItemsArray.push($(this))
          } else {
            // SECOND LEFT --> SECOND RIGHT
            // Move item to the right side to give continuous effect
            // console.log("2 LEFT --> 2 RIGHT")
            $(this).addClass("firstLeftItem")
            $(this).attr("class-skip", true)
          }
        }
      } else {
        // SECOND LEFT --> SECOND RIGHT || SECOND LEFT --> HIDE
        if ($(this).hasClass("secondRightItem")) {
          // console.log("1. 2 LEFT --> 2 RIGHT || 2 LEFT --> HIDE")
          $(this).removeClass("secondRightItem")

          if (wanderItems.length > 5) {
            //SECOND LEFT --> HIDE
            // console.log("HIDE")
            $(this).addClass("hideCardItem")
            // console.log("adding this item to hidden array")
            hiddenItemsArray.push($(this))
          } else {
            // SECOND LEFT --> SECOND RIGHT
            // Move item to the right side to give continuous effect
            // console.log("2 LEFT --> 2 RIGHT")
            $(this).addClass("secondLeftItem")
            $(this).attr("class-skip", true)
          }

        }

      }



      if (wanderItems.length < 5) {
        // CENTER --> FIRST LEFT
        if ($(this).hasClass("centerItem")) {
          // console.log("3. CENTER -> 1 LEFT")
          $(this).removeClass("centerItem");
          $(this).addClass("firstRightItem");
        }

        // FIRST RIGHT --> CENTER
        if ($(this).hasClass("firstLeftItem")) {
          // console.log("4. 1 RIGHT -> CENTER")
          $(this).removeClass("firstLeftItem");
          $(this).addClass("centerItem");
        }
      } else {
        // FIRST LEFT --> SECOND LEFT
        if ($(this).hasClass("firstRightItem")) {
          // console.log("2. 1 LEFT -> 2 LEFT")
          $(this).removeClass("firstRightItem")
          $(this).addClass("secondRightItem")
        }

        // CENTER --> FIRST LEFT
        if ($(this).hasClass("centerItem")) {
          // console.log("3. CENTER -> 1 LEFT")
          $(this).removeClass("centerItem");
          $(this).addClass("firstRightItem");
        }

        // FIRST RIGHT --> CENTER
        if ($(this).hasClass("firstLeftItem")) {
          // console.log("4. 1 RIGHT -> CENTER")
          $(this).removeClass("firstLeftItem");
          $(this).addClass("centerItem");
        }
      }


      // SKIP to not override
      if ($(this).attr("class-skip") == "true") {
        // console.log("SKIP TRUE")
        $(this).attr("class-skip", "false");

      } else {
        // console.log("SKIP NOT TRUE")
        if (wanderItems.length < 5) {
          if ($(this).hasClass("firstLeftItem")) {
            // console.log("5. 2 RIGHT -> 1 RIGHT")
            $(this).removeClass("firstLeftItem");
            $(this).addClass("centerItem");

          }
        } else {
          if ($(this).hasClass("secondLeftItem")) {
            // console.log("5. 2 RIGHT -> 1 RIGHT")
            $(this).removeClass("secondLeftItem");
            $(this).addClass("firstLeftItem");

          }
        }

      }

    })
    if (wanderItems.length > 2) {
      frontToBackLeft()
    }
    
  }

  function frontToBackLeft() {
    if (wanderItems.length < 5) {
      // console.log("ARRAY SMALLER THAN 5")
      // console.log(hiddenItemsArray[0])
      hiddenItemsArray[0].removeClass("hideCardItem");
      hiddenItemsArray[0].addClass("firstLeftItem");
      hiddenItemsArray.shift()
    } else if (wanderItems.length == 5) {
      // console.log("ARRAY == 5")
      // console.log("already handled with skip in loop")
    } else {
      // console.log("ARRAY GREATER THAN 5")
      hiddenItemsArray[0].removeClass("hideCardItem");
      hiddenItemsArray[0].addClass("secondLeftItem");
      hiddenItemsArray.shift()
    }

  }

})