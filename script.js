document.addEventListener("DOMContentLoaded",()=>{
    function progressBar() {
        //progress bar
        const TotalHeight = document.body.scrollHeight
        const windowHeight = window.innerHeight
        const realHeight = TotalHeight - windowHeight
        let percentage;
        document.addEventListener("scroll",()=>{
            const heightScrolled = window.scrollY
            percentage = heightScrolled/realHeight
            document.querySelector(".scroller").style.width = `${percentage*100}%`
        })
    }
    //hamburger
    const hamburger = document.querySelector(".hamburgerWrapper");
    let active = false
    hamburger.addEventListener("click",()=>{
        const bar1 = document.querySelector(".bar1").style
        const bar2 = document.querySelector(".bar2").style
        const bar3 = document.querySelector(".bar3").style
        if (!active) {
            bar2.width = "0"
            bar1.transform = "translateY(.9em) rotate(45deg)"
            bar3.transform = "translateY(-.9em) rotate(-45deg)"
            active = true
        } else {
            bar2.width = "70%"
            bar1.transform = ""
            bar3.transform = ""
            active = false
        }
    })
    //SCROLL TO
    document.querySelectorAll("header a").forEach(link=>{
        link.addEventListener("click",function(e){
            e.preventDefault()
            const targetId= this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId)
            const headerHeight = document.querySelector(".header").offsetHeight
            const scrollbarHeight = document.querySelector(".scrollerContainer").offsetHeight
            const targetPosition = targetSection.getBoundingClientRect().top +  window.scrollY 
            const offsetPosition = targetPosition - (headerHeight + scrollbarHeight)    
            window.scrollTo({
                behavior:"smooth",
                top:offsetPosition
            })     
        })
    })

    
    //nav Slider 
    const slider = document.querySelector(".bgSlider")
    const items = document.querySelectorAll(".headerNav ul li .button")
    let sliderPos = 0;
    let rects = [];
    items.forEach(elt =>{ //listing all items 
        rects.push(elt) //add elt to the list
        elt.addEventListener("click",()=>{ //when click on header element
            sliderPos = rects.indexOf(elt)
            slide(sliderPos)
        })
    })
    //apply position depending on sliderPos
    function slide(sliderPosition) {
        let containerRect = document.querySelector(".headerNav ul").getBoundingClientRect(); //parent container size
        let elt = rects[sliderPosition] //target element
        const rect = elt.parentElement.getBoundingClientRect() //taking the box size of the "li", parent of .button ("a")
        slider.style.width = `${rect.width}px`
        slider.style.height = `${rect.height}px`
        slider.style.left = `${rect.left - containerRect.left + 2}px`
        slider.style.top = `0.2em`
        rects.forEach((elt,index)=>{
            const icon = elt.querySelector("span")
            if(index == sliderPosition) {
                elt.style.color = "var(--color2)"
                icon.classList.add("filled")
            } else {
                elt.style.color = "var(--color1)"
                icon.classList.remove("filled")
            }
        })
    }
    //init
    slide(sliderPos) // set intial position of slider
    progressBar()
    //Observer 
    const observer = new IntersectionObserver((divs)=>{
        divs.forEach(div=>{
            if(div.isIntersecting){
                sliderPos = sections.indexOf(div.target)
                slide(sliderPos) // when section is in view, put the correct slider position
            }
        })
    //75% visible
    },{threshold:0.5})

    const sections = Array.from(document.querySelectorAll("section"))
    sections.forEach(section=>{
        observer.observe(section)
    });

    //resize fix for responsive 
    let timeout;
    window.addEventListener("resize",()=>{
        clearTimeout(timeout)
        progressBar()
        timeout = setTimeout(slide(sliderPos),100)
    })


    //about section

    const containers = document.querySelectorAll(".aboutArticle > div")
    containers.forEach(container=>{
        container.addEventListener("mousemove",(e)=>{
            const rect = container.getBoundingClientRect()
            const offsetX = e.clientX - rect.left //position of the pointer on the box
            const offsetY = e.clientY - rect.top
            const percentX = offsetX / rect.width //percentage 
            const percentY = offsetY / rect.height
            const moveX = (percentX-0.5)*0.5// 5px of liberty
            const moveY = (percentY-0.5)*0.5
            container.style.transition = "background-color 0.2s ease-in-out,border 0.2s ease-in-out,box-shadow 0.2s ease-in-out"
            container.style.transform = `translate(${moveX}em,${moveY}em) scale(1.01)`
        })
        container.addEventListener("mouseleave",()=>{
            container.style.transition = "all 0.2s ease-in-out"
            container.style.transform = "none"
        })
    })

    function wait(ms=100) {
        return new Promise(resolve => setTimeout(resolve,ms)) //crée une promesse 
    }
    let lastPromise = Promise.resolve() //regarde si la promesse est finie

    const observer2 = new IntersectionObserver((entries)=>{
        entries.forEach(item=>{
            if (item.isIntersecting) { //si un item est visible
                lastPromise = lastPromise.then(async ()=>{  //on attend que la promesse valide
                    await wait(200); //on actualise la promesse
                    item.target.classList.add("visible") //et on execute
                })
            }
        })
    },{threshold:0.2})
    const aboutArticleDiv = document.querySelectorAll(".aboutArticle > div")
    aboutArticleDiv.forEach(div=>{
        observer2.observe(div)
    })

    //div8Dots
    const div8Wrapper = document.querySelector(".div8Wrapper")
    const dotContainer = document.querySelector(".div8Dots")
    const itemOfDiv8 = document.querySelectorAll(".div8Wrapper figure")
    itemOfDiv8.forEach((_,index)=>{
        const dot = document.createElement("span")
        if (index===0) dot.classList.add("active");
        dotContainer.appendChild(dot)
    })
    const dots = dotContainer.querySelectorAll("span")
    div8Wrapper.addEventListener("scroll",()=>{
        const index = Math.round(div8Wrapper.scrollLeft/div8Wrapper.offsetWidth)
        dots.forEach((dot,i)=>{dot.classList.toggle("active",i === index)})
    })

    //tilt div8
    VanillaTilt.init(document.querySelectorAll(".div8Wrapper > figure > span"),{
        max:15,
        speed:400,
        glare:true,
        "max-glare":0.5
    })
})

