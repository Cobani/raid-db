var btnStatusTree1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var btnStatusTree2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var btnStatusTree3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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

  if(localStorage.getItem("raidSavedMasteries")){
    var allProfiles = localStorage.getItem("raidSavedMasteries").split(',');
  }else{
    continue;
  }
  
  var newProfile = document.getElementById("championname").innerText;
  alert(newProfile + ' isimli profil saklandı');

  var tree1 = btnStatusTree1.toString();
  var tree2 = btnStatusTree2.toString();
  var tree3 = btnStatusTree3.toString();

  localStorage.setItem( newProfile + '1', tree1 );
  localStorage.setItem( newProfile + '2', tree2 );
  localStorage.setItem( newProfile + '3', tree3 );
}

function loadBuild(){
  var tree1 = localStorage.getItem("tree1").split(',');
  
  btnStatusTree1 = tree1;
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

function scrollType(i){
    return Math.ceil(i/2);
}

var mastery = [
    {
        name: "Blade Disciple",
        tier: 1,
        desc: "+75 Attack",
        tree: 1,
        iconNo: 0,
        scrollType: scrollType(this.tier),
        scroll: 5
      },
      {
        name: "Deadly Precision",
        tier: 1,
        desc: "+5% Critical Rate.",
        tree: 1,
        iconNo: 1,
        scrollType: scrollType(this.tier),
        scroll: 5
      },
      {
        name: "Heart of Glory",
        tier: 2,
        desc: "+5% damage when attacking with full health.",
        tree: 1,
        iconNo: 2,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Keen Strike",
        tier: 2,
        desc: "+10% critical damage.",
        tree: 1,
        iconNo: 3,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Shield Breaker",
        tier: 2,
        desc: "+25% damage to targets with a <i class='buff'>[Shield]</i> buff.",
        tree: 1,
        iconNo: 4,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Grim Resolve",
        tier: 2,
        desc: "+5% damage when attacking with 50% hp or less.",
        tree: 1,
        iconNo: 5,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Single Out",
        tier: 3,
        desc: "Increases damage inflicted to targets with less than 40% hp by 8%.",
        tree: 1,
        iconNo: 6,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Life Drinker",
        tier: 3,
        desc: "Heals by 5% of damage inflicted when attacking with 50% HP or less.",
        tree: 1,
        iconNo: 7,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Whirlwind of Death",
        tier: 3,
        desc: "Increases speed by 6 for each enemy you have killed, stacks across rounds in a battle, to a maximum of 18 speed.",
        tree: 1,
        iconNo: 8,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Ruthless Ambush",
        tier: 3,
        desc: "Increases damage inflicted by 8% for the first hit on each enemy.",
        tree: 1,
        iconNo: 9,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Bring It Down",
        tier: 4,
        desc: "Increases damage inflicted by 6% when attacking targets with higher max hp.",
        tree: 1,
        iconNo: 10,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Wrath of the Slain",
        tier: 4,
        desc: "increases damage by 5% for each dead ally, up to 10%.",
        tree: 1,
        iconNo: 11,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Cycle of Violence",
        tier: 4,
        desc:
          "Has a 30% chance of decreasing the cooldown of a random skill by 1 turn if the damage inflicted by a skill exceeds 30% of the target's max HP. Occurs once per turn.",
        tree: 1,
        iconNo: 12,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Opportunist",
        tier: 4,
        desc:"Increases damage inflicted to targets with <i class='buff'>[Stun]</i>, <i class='buff'>[Sleep]</i>, or <i class='buff'>[Freeze]</i> debuffs by 12%.",
        tree: 1,
        iconNo: 13,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Methodical",
        tier: 5,
        desc:
          "Increases the damage inflicted by this Champion's default Skill by 2% each time it is used during battle. Stacks across each round in a battle, up to 10%. ",
        tree: 1,
        iconNo: 14,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Kill Streak",
        tier: 5,
        desc:
          "Increases damage inflicted by 6% in arena and 3% in all other locations for each enemy killed by this Champion in Battle. Stacks across each round, up to 12%.",
        tree: 1,
        iconNo: 15,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Blood Shield",
        tier: 5,
        desc:
          "Places a <i class='buff'>[Shield]</i> buff on this Champion for 1 turn when this Champion kills an enemy. The value of the <i class='buff'>[Shield]</i> is equal to 15% of this Champion's MAX HP. Occurs once per turn.",
        tree: 1,
        iconNo: 16,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Stoked to Fury",
        tier: 5,
        desc: "Increases damage inflicted by 4% for each debuff on this Champion. Stacks up to 12%. ",
        tree: 1,
        iconNo: 17,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Warmaster",
        tier: 6,
        desc: "Has a 60% chance of inflicting bonus damage when attacking. Bonus damage is equal to 10% of the target Champion's MAX HP or 4% of the target's MAX HP when attacking Bosses. Bonus damage can only occur once per Skill and does not count as an extra hit.Damage based on: <i class='buff'>[Enemy MAX HP]</i>.",
        tree: 1,
        iconNo: 18,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Helmsmasher",
        tier: 6,
        desc:
          "Has a 50% chance to ignore 25% of your targets DEF. For skills that ignore DEF, this 15% is in addition to the amount ignored by the Skill. ",
        tree: 1,
        iconNo: 19,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Giant Slayer",
        tier: 6,
        desc:
          "Has a 30% chance of inflicting bonus damage when attacking. Bonus Damage is equal to 5% of the target's MAX HP or 2% of the Boss' MAX HP. Bonus damage can occur on each hit of a Skill, but does not counter as an extra hit. Damage based on: <i class='buff'>[Enemy Max HP]</i>. ",
        tree: 1,
        iconNo: 20,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Flawless Execution",
        tier: 6,
        desc: "Critical Damage +20%.",
        tree: 1,
        iconNo: 21,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Tough Skin",
        tier: 1,
        desc: "Defense + 75.",
        tree: 2,
        iconNo: 0,
        scrollType: scrollType(this.tier),
        scroll: 5
      },
      {
        name: "Defiant",
        tier: 1,
        desc: "Resistance + 10.",
        tree: 2,
        iconNo: 1,
        scrollType: scrollType(this.tier),
        scroll: 5
      },
      {
        name: "Blastproof",
        tier: 2,
        desc: "Decreases damage from AoE attacks by 5%.",
        tree: 2,
        iconNo: 2,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Rejuvenation",
        tier: 2,
        desc: "Increases the amount of healing and the value of <i class='buff'>[Shield]</i> buffs this Champion receives by 5%.",
        tree: 2,
        iconNo: 3,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Mighty Endurance",
        tier: 2,
        desc:
          "Decreases the damage received by 10% if this Champion has <i class='buff'>[Stun]</i>, <i class='buff'>[Sleep]</i>, or <i class='buff'>[Freeze]</i> debuffs.",
        tree: 2,
        iconNo: 4,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Improved Parry",
        tier: 2,
        desc: "Decreases damage received by this Champion by 8% when this Champion is hit with a critical hit.",
        tree: 2,
        iconNo: 5,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Shadow Heal",
        tier: 3,
        desc:
          "Heals this Champion by 6% of their MAX HP each time an enemy is healed. Occurs once per turn.",
        tree: 2,
        iconNo: 6,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Resurgent",
        tier: 3,
        desc:
          "Has a 50% chance to remove 1 random debuff from this Champion when they lose 25% of their MAX HP or more from a single enemy skill.",
        tree: 2,
        iconNo: 7,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Bloodthirst",
        tier: 3,
        desc:
          "Heals this Champion by 10% of their max HP when they kill an enemy target. Cooldown: 1 turn.",
        tree: 2,
        iconNo: 8,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Wisdom of Battle",
        tier: 3,
        desc:
          "Has a 30% chance of placing a [Block Debuffs] buff on this Champion for 1 turn when <i class='buff'>[Stun]</i>, <i class='buff'>[Sleep]</i> or <i class='buff'>[Freeze]</i> debuffs expire on this Champion. ",
        tree: 2,
        iconNo: 9,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Solidarity",
        tier: 4,
        desc: "Increases Ally Resist by 5 for each buff placed on them by this Champion.",
        tree: 2,
        iconNo: 10,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Delay Death",
        tier: 4,
        desc:
          "Reduces the damage this Champion receives from a specific enemy by 0.75% with each hit taken from that enemy, Damage reduction stacks up to 6% for each enemy.",
        tree: 2,
        iconNo: 11,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Harvest Despair",
        tier: 4,
        desc:"Has a 60% chance of placing a <i class='buff'>[Leech]</i> debuff for 1 turn when placing <i class='buff'>[Stun]</i>, <i class='buff'>[Sleep]</i>, or <i class='buff'>[Freeze]</i> debuffs.",
        tree: 2,
        iconNo: 12,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Stubbornness",
        tier: 4,
        desc: "Increases RESIST by 10 for each debuff on this champion, Stacks up to 30.",
        tree: 2,
        iconNo: 13,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Selfless Defender",
        tier: 5,
        desc: "Decreases the damage an ally received from the first enemy hit in each round by 20%. This Champion will receive that damage instead.",
        tree: 2,
        iconNo: 14,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Cycle of Revenge",
        tier: 5,
        desc:
          "Has a 50% chance of increasing the Turn Meter by 15% when an ally is attacked with a critical hit. Will only increase the Turn Meter once if an ally receives multiple critical hits from a single skill.",
        tree: 2,
        iconNo: 15,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Retribution",
        tier: 5,
        desc: "Has a 50% chance to counterattack when this Champion loses 25% of their MAX HP or more from a single enemy skill.",
        tree: 2,
        iconNo: 16,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Deterrence",
        tier: 5,
        desc:"Has a 20% chance to counterattack an enemy when they apply a [Stun], [Sleep], or [Freeze] debuff on an ally.",
        tree: 2,
        iconNo: 17,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Iron Skin",
        tier: 6,
        desc: "Def +200.",
        tree: 2,
        iconNo: 18,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Bulwark",
        tier: 6,
        desc: "Decreases the damage all allies receive by 5%. This Champion will receive that damage instead.",
        tree: 2,
        iconNo: 19,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Fearsome Presence",
        tier: 6,
        desc:
          "Increases the chance of placing a <i class='buff'>[Stun]</i>, <i class='buff'>[Sleep]</i>, <i class='buff'>[Freeze]</i> or <i class='buff'>[Provoke]</i> debuff from Skills or Artifacts by 5%.",
        tree: 2,
        iconNo: 20,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Unshakeable",
        tier: 6,
        desc: "Resist +50.",
        tree: 2,
        iconNo: 21,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Steadfast",
        tier: 1,
        desc: "Max HP +810.",
        tree: 3,
        iconNo: 0,
        scrollType: scrollType(this.tier),
        scroll: 5
      },
      {
        name: "Pinpoint Accuracy",
        tier: 1,
        desc: "Acc + 10.",
        tree: 3,
        iconNo: 1,
        scrollType: scrollType(this.tier),
        scroll: 5
      },
      {
        name: "Lay on Hands",
        tier: 2,
        desc: "Increases the value of heals this Champion casts by 5%.",
        tree: 3,
        iconNo: 2,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Shieldbearer",
        tier: 2,
        desc: "Increases the value of [Shield] buffs this Champion casts by 5%.",
        tree: 3,
        iconNo: 3,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Exalt in Death",
        tier: 2,
        desc: "Heals this Champion by 10% of their Max HP the first time an enemy is killed in each round.",
        tree: 3,
        iconNo: 4,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Charged Focus",
        tier: 2,
        desc: "Increases ACC by 20 when this Champion has no skills on Cooldown.",
        tree: 3,
        iconNo: 5,
        scrollType: scrollType(this.tier),
        scroll: 30
      },
      {
        name: "Healing Savior",
        tier: 3,
        desc:
          "Increases the amount of healing and the value of <i class='buff'>[Shield]</i> buffs placed by this Champion by 10% if the target ally has 40% HP or less. ",
        tree: 3,
        iconNo: 6,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Rapid Response",
        tier: 3,
        desc: "Has a 30% chance of increasing the Turn Meter by 10% when a buff cast by this Champion is removed or expires. ",
        tree: 3,
        iconNo: 7,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Swarm Smiter",
        tier: 3,
        desc: "Increases Acc by 4 for each enemy alive. Stacks up to 16.",
        tree: 3,
        iconNo: 8,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Arcane Celerity",
        tier: 3,
        desc: "Has a 30% chance of increasing the Turn Meter by 10% when a debuff cast by this Champion is removed or expires. ",
        tree: 3,
        iconNo: 9,
        scrollType: scrollType(this.tier),
        scroll: 80
      },
      {
        name: "Merciful Aid",
        tier: 4,
        desc:
          "Increases the amount of healing and the value of [Shield] buffs placed by this Champion by 15% if the target ally has [Stun], [Sleep], or [Freeze] debuffs.",
        tree: 3,
        iconNo: 10,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Cycle of Magic",
        tier: 4,
        desc: "Has a 5% chance of decreasing the cooldown of a random skill by 1 turn at the start of every turn.",
        tree: 3,
        iconNo: 11,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Lore of Steel",
        tier: 4,
        desc: "Increases the Set Bonuses of Basic Artifact Sets by 15%. This increase is multiplicative, not additive.",
        tree: 3,
        iconNo: 12,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Evil Eye: ",
        tier: 4,
        desc:
          "Decreases the target's Turn Meter when this Champion hits target for the first time with the default skill. Decreases the Turn Meter by 20% with single-target Skills and by 5% with AoE Skills.",
        tree: 3,
        iconNo: 13,
        scrollType: scrollType(this.tier),
        scroll: 120
      },
      {
        name: "Lasting Gifts",
        tier: 5,
        desc:
          "has a 30% chance to extend the duration of any buff cast by this Champion by 1 turn. It will not extend <i class='buff'>[Block Damage]</i>, <i class='buff'>[Unkillable]</i> or <i class='buff'>[Revive on Death]</i> buffs.",
        tree: 3,
        iconNo: 14,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Spirit Haste",
        tier: 5,
        desc: "Increases SPD by 8 for each dead ally. Stacks up to 24.",
        tree: 3,
        iconNo: 15,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Sniper",
        tier: 5,
        desc:
          "Increases the chances of placing any debuff from Skills or Artifacts by 5%. It will not increase the chances of placing <i class='buff'>[Stun]</i>, <i class='buff'>[Sleep]</i>, <i class='buff'>[Freeze]</i> or <i class='buff'>[Provoke]</i> debuffs. ",
        tree: 3,
        iconNo: 16,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Master Hexer",
        tier: 5,
        desc:
          "Has a 30% chance to extend the duration of any debuff cast by this Champion by 1 turn. It will not extend [Stun], [Sleep], [Freeze] or [Provoke] debuffs.",
        tree: 3,
        iconNo: 17,
        scrollType: scrollType(this.tier),
        scroll: 200
      },
      {
        name: "Elixir of Life",
        tier: 6,
        desc: "Max HP + 3000.",
        tree: 3,
        iconNo: 18,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Timely Intervention",
        tier: 6,
        desc: "Increases this Champions' Turn Meter by 20% whenever an ally hero drops below 25% HP.",
        tree: 3,
        iconNo: 19,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Oppressor",
        tier: 6,
        desc:
          "Increases the Turn Meter fill rate by 2.5% for each active debuff cast by the Champion. Stacks up to 10%.",
        tree: 3,
        iconNo: 20,
        scrollType: scrollType(this.tier),
        scroll: 350
      },
      {
        name: "Eagle Eye",
        tier: 6,
        desc: "Acc + 50.",
        tree: 3,
        iconNo: 21,
        scrollType: scrollType(this.tier),
        scroll: 350
      }
];
