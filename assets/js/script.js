var tasks = [];
// display current day and time in header
const currentDate = moment().format("dddd, MMMM Do YYYY");
const currentTime = moment().format("h:mm A");
$("#currentDate").append(currentDate);
$("#currentTime").append(currentTime);

// set start hour of workday
let taskHour = 7
// create time blocks for work day
const createTimes = function() {
    // get number of hours in the workday
    const startTime = moment("07:00 AM", "HH:mm A");
    const endTime = moment("04:00 PM", "HH:mm A");
    var workHours = moment.duration(endTime.diff(startTime, 'hours'));
    console.log("Today, I will work " + workHours + " hours.");

    // create a div for each work hour
    for (let i = 0; i < workHours+1; i++) {
        taskTime = moment({hour: taskHour}).format("h A");
        hourBlock = $("<div>").addClass(" hourBlock input-group");
        hourForm = $("<form>").addClass("input-group").attr("id", taskTime);
        hourDisplay = $("<span>").addClass("input-group-text col-2 col-2-auto text-center").attr("id", moment({hour: taskHour}).format("H")).text(taskTime);
        taskArea = $("<textarea>").addClass("form-control col").attr("id", moment({hour: taskHour}).format("H")).attr("type", "text");
        saveBtn = $("<button>").addClass("save-btn  col-1 btn justify-content-center btn-outline-secondary").attr("type", "button").attr("id", "button-addon2").append($("<p class='oi oi-lock-locked'>"));
        displayForm = hourForm.append(hourDisplay, taskArea, saveBtn);
        $("#test-div").append(hourBlock.append(displayForm));
        taskHour++;
    }
};

const loadTasks = function() {
    if (!tasks) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        let i = 0;
        $(tasks).each(function() {
            console.log(tasks[i].text, tasks[i].id);
            $("textarea[id=" + JSON.stringify(tasks[i].id) + "]").append(tasks[i].text);
            i++; 
        })
    }
};

$(".form-control").on("blur", "textarea", function() {
    let taskEl = $(this).val();
    let taskId = $(this).attr("id");
    ;

} );

const saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

// save textarea input
$("#test-div").on("click", "button" , function() {
    let taskEl = $(this).siblings("textarea");
    let taskText = $(taskEl).val();
    let textId = $(taskEl).attr("id");
    tasks.push({id: textId, text: taskText});
    saveTasks();
    console.log("Task Saved! " + taskText + " " + textId)
});

// $( "body" ).click(function( event ) {
//     console.log( "clicked: " + event.target.nodeName );
// });
// color of div shows past, present, or future
timeAudit = function() {
    const currentHour = parseInt(moment().hours());;
    // parseInt(moment().hours());

    $("span").each(function() {
        let currentBlockTime = parseInt($(this).attr("id"));
        console.log( currentHour, currentBlockTime);
        $(this).removeClass("disabled bg-secondary bg-success bg-danger");
        if (currentHour > currentBlockTime) {
            $(this).addClass("bg-secondary");
        } else if (currentHour < currentBlockTime) {
            $(this).addClass("bg-success");
        } else {
            $(this).addClass("bg-info");
        }
    });
};

setInterval(function() {
    $("span").each(function() {
      timeAudit($(this));
    });
  }, (1000*15) *15);


$("#clear-all").on("click", function() {
tasks = [];
saveTasks();
loadTasks();
$(".form-control").text(" ");
});

  createTimes();
  loadTasks();
timeAudit();