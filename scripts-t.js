
const zeroPad = (num, places) => String(num).padStart(places, '0')
var theme = "light"
timerState="notrunning"
var expiry = 60
var rem = 60
var temp = 0
var x

function changeTheme(theme) {
    var r = document.querySelector(':root');
    if (theme==="light"){
        // Set the value of variable --blue to another value (in this case "lightblue")
        r.style.setProperty("--bgcolor", "rgb(201, 201, 201)");
        r.style.setProperty("--primary", "rgb(0, 0, 0)");
        r.style.setProperty("--bgi", "none");
        setCookie("bgc","rgb(201, 201, 201)");
        setCookie("prim","rgb(0, 0, 0)");
        setCookie("bgi","none");
        }
    if (theme==="dark"){
        // Set the value of variable --blue to another value (in this case "lightblue")
        r.style.setProperty("--bgcolor", "rgb(10, 10, 10)");
        r.style.setProperty("--primary", "rgb(255, 255, 255)");
        r.style.setProperty("--bgi", "none");
        setCookie("bgc","rgb(10, 10, 10)");
        setCookie("prim","rgb(255, 255, 255)");
        setCookie("bgi","none");
    }
    
    if (theme==="ambient-blue"){
        // Set the value of variable --blue to another value (in this case "lightblue")
        r.style.setProperty("--bgcolor", "none");
        r.style.setProperty("--primary", "rgb(178, 176, 255)");
        r.style.setProperty("--bgi", "url('https://cdn.shopify.com/s/files/1/0011/6005/2795/files/169_753a7e43-dbc4-49af-b996-0c7daf166d00.png?v=1631394642')");
        setCookie('bgc',"none");
        setCookie('prim',"rgb(178, 176, 255)");
        setCookie('bgi',"url('https://cdn.shopify.com/s/files/1/0011/6005/2795/files/169_753a7e43-dbc4-49af-b996-0c7daf166d00.png?v=1631394642')");
    }

    

}

function changeFS(fs) {
    document.getElementById("time").style.setProperty("font-size",fs)
    setCookie('fontsize',fs)
}

function changeD(d) {
    expiry=d*60
    setTimer(expiry)
    setCookie('exp',expiry);
}

function resetTimer(expiry) {
    clearInterval(x)
    timerState="notrunning"
    temp=0
    rem=expiry
    setTimer(expiry)
    console.log(rem)
    console.log(expiry)
    console.log(x)
    document.getElementById("togglebtn").innerHTML="start"
}

function toggleClock() {
    r=document.querySelector(':root')
    rs=getComputedStyle(r)

    if (rs.getPropertyValue('--op')==="0.55") {
        r.style.setProperty('--op',0)
    }
    else {
        r.style.setProperty("--op",0.55)
    }
    setCookie("clkop",rs.getPropertyValue('--op'))
}

function init() {
    var r = document.querySelector(':root');

    if (getCookie('bgc')!=="") {
        r.style.setProperty("--bgcolor", getCookie('bgc'));
    }
    if (getCookie('prim')!=="") {
        r.style.setProperty("--primary", getCookie('prim'));
    }
    if (getCookie('bgi')!=="") {
        r.style.setProperty("--bgi", getCookie('bgi'));
    }
    if (getCookie('fontsize')!=="") {
        document.getElementById("time").style.setProperty("font-size",getCookie('fontsize'))
    }
    if (getCookie('exp')!=="") {
        expiry=getCookie('exp')
    }

    if (getCookie('clkop')!=="") {
        r.style.setProperty('--op',getCookie('clkop'))
    }

    rem=expiry
  
    h= Math.floor(rem/3600)
    console.log(h)
    m= Math.floor((rem%3600)/60)
    console.log(m)
    s= Math.floor(rem%60)
    console.log(s)
    document.getElementById("h").innerHTML=zeroPad(h,2)+":"
    document.getElementById("m").innerHTML=zeroPad(m,2)+":"
    document.getElementById("s").innerHTML=zeroPad(s,2)
}
function setTimer(expiry) {
    rem=expiry
  
    h= Math.floor(rem/3600)
    console.log(h)
    m= Math.floor((rem%3600)/60)
    console.log(m)
    s= Math.floor(rem%60)
    console.log(s)
    document.getElementById("h").innerHTML=zeroPad(h,2)+":"
    document.getElementById("m").innerHTML=zeroPad(m,2)+":"
    document.getElementById("s").innerHTML=zeroPad(s,2)
 
}

function startTimer(expiry) {
    
    rem=expiry
    
    x = setInterval(() => {
        document.getElementById("pie").style.setProperty("--p",(rem/expiry)*100)
        if (rem===0) {
            clearInterval(x)
            document.getElementById("togglebtn").innerHTML="start"
        }
        h= Math.floor(rem/3600)
        m= Math.floor((rem%3600)/60)
        s= Math.floor(rem%60)
        document.getElementById("h").innerHTML=zeroPad(h,2)+":"
        document.getElementById("m").innerHTML=zeroPad(m,2)+":"
        document.getElementById("s").innerHTML=zeroPad(s,2)
        rem=rem-1
    }, 1000)
}

function toggleTimer(expiry) {
    if (timerState==="notrunning") {
        startTimer(expiry)
        timerState="running"
        document.getElementById("togglebtn").innerHTML="pause"
    }

    else if (timerState==="paused") {
        startTimer(temp)
        timerState="running"
        document.getElementById("togglebtn").innerHTML="pause"
    }

    else if (timerState==="running") {
        clearInterval(x)
        temp=rem
        timerState="paused"
        document.getElementById("togglebtn").innerHTML="resume"
    }   

    console.log(timerState)
}

function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (1000*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


//   document.addEventListener("load",function() {
//     if (getCookie('bgc')!=="") {
//         r.style.setProperty("--bgcolor", getCookie('bgc'));
//     }
//     if (getCookie('prim')!=="") {
//         r.style.setProperty("--primary", getCookie('prim'));
//     }
//     if (getCookie('bgi')!=="") {
//         r.style.setProperty("--bgi", getCookie('bgi'));
//     }
//     if (getCookie('fontsize')!=="") {
//         document.getElementById("time").style.setProperty("font-size",getCookie('fontsize'))
//     }
//     if (getCookie('exp')!=="") {
//         expiry=getCookie('exp')
//     }
//   },false);
