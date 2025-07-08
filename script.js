const timespanButtons = Array.from(document.querySelector(".timespan-buttons").children);
const hourLabels = Array.from(document.querySelectorAll(".content"));
const previousTimespanLabels = {
    "daily" : "Yasterday",
    "weekly" : "Last week",
    "monthly" : "Last month",
};

let data;

const handleToggle = (timespan) =>{
    hourLabels.forEach(section =>{
        data.forEach(timeData =>{
            if (timeData.title.toLowerCase().replace(" ", "-") === section.id){
                section.querySelector(".current").textContent = timeData.timeframes[timespan].current + "hrs";  
                section.querySelector(".previous").textContent = `${previousTimespanLabels[timespan]} - ${timeData.timeframes[timespan].previous}hrs`;  
            }
        })
    })
}

fetch("/10.Time_tracking_dashboard/data.json").then((response) =>{
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
}).then(theData =>{
    data = theData;
    handleToggle("daily");
}).catch(error =>{
    console.error("Could not fetch JSON data:", error); 
})

timespanButtons.forEach(button => {
    button.addEventListener("click", e =>{
        document.querySelector(".active").classList.remove("active");
        e.target.classList.add("active"); 
        handleToggle(e.target.id);  
    })
});