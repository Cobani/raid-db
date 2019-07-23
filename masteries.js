var btnStatusTree1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var btnStatusTree2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var btnStatusTree3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var flexContainer = document.getElementById("loadScreen");
var loadBuilds  = document.getElementById("loadBuilds");

function btnClick(elem) {

    var opac = getComputedStyle(elem).getPropertyValue('opacity').toString();

    //got icon number
    elemId = Number(elem.id.substring(4));
    //got tree name
    elemTree = elem.parentNode.classList.item(1);

    var statusTree;

    switch(elemTree){
        case "tree1":
            statusTree = btnStatusTree1;
            break;
        case "tree2":
            statusTree = btnStatusTree2;
            break;
        case "tree3":
            statusTree = btnStatusTree3;
            break;
    }

    if( statusTree[elemId] == 1 ){
        elem.classList.remove("show");
        statusTree[elemId] = 0;
    }
    else{
        elem.classList.add("show");
        statusTree[elemId] = 1;
    }
}

//------------------------------------- Set-Get-Erase Cookies ------------------------
function saveBuild(){
  //listede var mı kontrol et
  //yoksa listeye ekle
  //sonra profili localStorage olarak sakla

  // Get input name
  var newBuild = document.getElementById("championname").value;

  if(newBuild){
    // add to build list
    addBuildList(newBuild);
    
    // store build
    var tree1 = btnStatusTree1.toString();
    var tree2 = btnStatusTree2.toString();
    var tree3 = btnStatusTree3.toString();

    localStorage.setItem( newBuild + '1', tree1 );
    localStorage.setItem( newBuild + '2', tree2 );
    localStorage.setItem( newBuild + '3', tree3 );

    // Profil eklendi mesajı eklenecek  
  }else{
    alert('Champion name field is empty!');
  }

}

function addBuildList(buildname){
  // check if there is already saved profiles before
  // If there is then add new profile to the list and check if entered value is already in the list
  // else create profile list

 if(localStorage.getItem("raidSavedMasteries") === null){
    //store new build
    localStorage.setItem("raidSavedMasteries", buildname);
    alert(buildname + ' isimli profil saklandı');
  }else{
    // get all build list as an array
    var allBuilds = localStorage.getItem("raidSavedMasteries").split(',');

    for(i=0; i < allBuilds.length; i++){
      // exit if there is already a build with same name
      if( buildname === allBuilds[i]){break;}
      // add new build to the build list
      if(allBuilds.length -1 === i ){
        allBuilds.push(buildname);
      }
    }
    // store all builds list
    localStorage.setItem("raidSavedMasteries", allBuilds);
  }
}

function loadBuild(){

  //todo load ekranını aç - done
  //TODO eski listeyi temizle - done
  //todo kayıtlı build listesini al - done
  //todo kayıtlı build listesini tablo/liste olarak göster - done
  //todo listeye bir css stili ekle
  //todo seçimi algıla
  //todo seçimi uygula

  // Open build selection screen
  document.getElementById("loadScreen").classList.add("show");

  // Clearing old list elements
  for(i = 0; i < loadBuilds.children.length ; i++){
    if(loadBuilds.children[i].tagName === "UL"){
      loadBuilds.removeChild(loadBuilds.children[i]);
    }
  }


//Creating list element
  if(localStorage.getItem("raidSavedMasteries") !== null){
    // Get all builds list as an array
    var allBuilds = localStorage.getItem("raidSavedMasteries").split(',');

    // Create list item of allBuilds and add to the html
    document.getElementById("loadBuilds").appendChild(makeUL(allBuilds));
  }
}

function makeUL(array) {
  // Create the list element:
  var list = document.createElement('ul');

  for (var i = 0; i < array.length; i++) {
      // Create the list item:
      var item = document.createElement('li');

      // Set its contents:
      item.appendChild(document.createTextNode(array[i]));

      // Add it to the list:
      list.appendChild(item);
  }
  // Finally, return the constructed list:
  return list;
}

function clearBuild(){
  //tıklanan buildi bul
  //tıklanan buildi sil
  
}

function clearAllBuilds(){
  localStorage.clear();
  var list = document.getElementById("loadBuilds");

  while (list.hasChildNodes()) {  
    list.removeChild(list.firstChild);
  }
}

function closeLoadBuilds(){
  document.getElementById("loadScreen").classList.remove("show");
}

//Close load modal
flexContainer.onclick = function(){
  if(event.target === flexContainer){flexContainer.classList.remove("show");}
}


//------------------------------------- Set-Get-Erase Cookies End------------------------

function showDesc(elem, event){

    // get tooltip element
    var tt =  document.getElementById("toolTip");
    // get tooltip width
    var toolTipWidth = Number(document.getElementById("toolTip").offsetWidth);
    var toolTipHeight = Number(document.getElementById("toolTip").offsetHeight);

    // get coordinates
    var xcoor = Number(event.clientX + 10);
    if(xcoor + toolTipWidth > document.documentElement.clientWidth){
        xcoor = xcoor - toolTipWidth -15;
    }
    var ycoor = Number(event.clientY + 10);
    if(ycoor + toolTipHeight > document.documentElement.clientHeight){
        ycoor = ycoor - toolTipHeight -15;
    }

    // set tooltips x and y coordinates
    tt.style.top = ycoor + "px";
    tt.style.left = xcoor + "px";

    //got icon number
    var elemId = Number(elem.id.substring(4));
    //got tree name
    var elemTree = Number(elem.parentNode.classList.item(1).substring(4));
    // got object number in mastery variable
    var masteryId = (elemTree-1)*22 + elemId;
    
    var iconName = "images/t" + elemTree + "-" + elemId + ".png";
    var scrollName = "images/scroll" + scrollType(mastery[masteryId].tier) + ".png";

    document.getElementById("masteryName").innerHTML = mastery[masteryId].name.toString();
    document.getElementById("smallIcon").src = iconName;
    document.getElementById("rankText").innerHTML = "Required Rank: " + mastery[masteryId].tier.toString() + " <i id='star'>★</i>";
    document.getElementById("masteryDef").innerHTML = mastery[masteryId].desc.toString();
    document.getElementById("unlock").innerHTML = mastery[masteryId].scroll.toString() + 
        " <img id = 'scroll' src='" + scrollName +"' alt='"+scrollName+"' style={vertical-align:middle;}> Unlock";

    // got buff elements
    var buffElem = document.getElementsByClassName("buff");

    // add show classes
    tt.classList.add("show"); // container
    document.getElementById("star").classList.add("show"); // star
    document.getElementById("scroll").classList.add("show"); // scroll
    for(var i = 0; i < buffElem.length; i++){ // buffs
        buffElem[i].classList.add("show");
    }

    for (var i = 0; i < tt.children.length; i++) { // container children
        tt.children[i].classList.add("show");
    }
}

function hideDesc(event){
    var tt =  document.getElementById("toolTip");

    // got buff elements
    var buffElem = document.getElementsByClassName("buff");

    // remove show classes
    document.getElementById("star").classList.remove("show");
    document.getElementById("scroll").classList.remove("show"); // scroll
    for(var i = 0; i < buffElem.length; i++){
        buffElem[i].classList.remove("show");
    }

     tt.classList.remove("show");
     for (var i = 0; i < tt.children.length; i++) {
         tt.children[i].classList.remove("show");
     }
}
