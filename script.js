const timespanButtons = Array.from(document.querySelector(".timespan-buttons").children);
const hourLabels = Array.from(document.querySelectorAll(".content"));
const cells = Array.from(document.querySelectorAll(".cell:not(.profile)"));
const previousTimespanLabels = {
    "daily" : "Yasterday",
    "weekly" : "Last week",
    "monthly" : "Last month",
};

let data;
// updates the values in the hour labels
const handleToggle = (timespan) =>{
    hourLabels.forEach(section =>{ // it will loop through the label div which had the .content class
        data.forEach(timeData =>{
            if (timeData.title.toLowerCase().replace(" ", "-") === section.id){ // checks if the current pack of data is matching the current section
                section.querySelector(".current").textContent = timeData.timeframes[timespan].current + "hrs";  
                section.querySelector(".previous").textContent = `${previousTimespanLabels[timespan]} - ${timeData.timeframes[timespan].previous}hrs`;  
            }
        })
    })
}

// puts the data in the "data" variable
fetch("data.json").then((response) =>{
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

// fade animation so the unloaded text wont appear :)
window.addEventListener('load', () => {
    cells.forEach(cell =>{
        cell.classList.add("show");
    })
});
