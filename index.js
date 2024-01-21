const Alert = (name) => {
    alert(`Informed to ${name} `)
}

const check = () => {
    const inputElement = document.getElementById('videoInput');
    const file = inputElement.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('video', file);
    
        fetch('http://localhost:5000/analyze', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(name => {
            if (document.querySelector('input').value===0 ) {
                alert("Kindly choose the file!");
            }
            else if (name.prediction===1) {
                document.getElementById('report').innerHTML = "Violent";
                document.getElementById("report").classList.add("alert-danger")
                document.getElementById('Ambulance').style.display = "block";
                document.getElementById('Fire').style.display = "block";
                document.getElementById('Police').style.display = "block";
              
            }
            else if (name.prediction===0) {
                document.getElementById("report").classList.remove("alert-danger");
                document.getElementById("report").classList.add("alert-success")
                document.getElementById('report').innerHTML = "Non-Violent";
                document.getElementById('Ambulance').style.display = "none";
                document.getElementById('Fire').style.display = "none";
                document.getElementById('Police').style.display = "none";
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
const Show = () => {
    document.getElementById("stats").style.display = "block";
    document.getElementsByClassName("card")[0].style.display = "none";
    document.getElementById("stats1").style.backgroundColor = "#343444";
    document.getElementById("report1").style.backgroundColor = "#13131f";
}

const Hide = () => {
    document.getElementById("stats").style.display = "none";
    document.getElementsByClassName("card")[0].style.display = "block";
    document.getElementById("stats1").style.backgroundColor = "#13131f";
    document.getElementById("report1").style.backgroundColor = "#343444";
    document.getElementById("report1").style.color = "white";

}

var trace1 = 
{
    x: ["M","T","W","TH","F","Sa","Su"],
    y: [5, 1, 3, 7, 8, 9,15],
    type: 'scatter',
    name : "last week"
};
var trace2 = 
{
    // x: [0, 1, 2, 3, 4, 5],
    x: ["M","T","W","TH","F","Sa","Su"],
    y: [1, 5, 7, 2, 3, 4,6],
    type: 'bar',
    name : "this week"
};

var layout = 
{
    height: 500,
    width: 450,
}
var data = [trace1, trace2];
Plotly.newPlot('myDiv', data,layout);

var data = [{
    type: "pie",
    values: [2, 3, 4, 4],
    labels: ["Robbery", "Murder", "Riot", "Harassment"],
    textinfo: "label+percent",
    textposition: "outside",
    automargin: true
}]

var layout = {
    height: 500,
    width: 450,
    margin: { "t": 0, "b": 0, "l": 0, "r": 0 },
    showlegend: false
}

Plotly.newPlot('myDiv2', data, layout)