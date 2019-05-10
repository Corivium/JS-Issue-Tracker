// Function to retrieve all issues from local storage
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';


    // Loop through all issues and display them to issuesList element
    for(var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>' +
                                '<h3>' + desc + '</h3>' +
                                '<p><span class="glyphicon glyphicon-time"></span>' + severity + 
                                '<span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
                                '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a>' +
                                '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Close</a>' +
                                '</div>';
    }


    // Save issue data to local storage after form submit
    document.getElementById('issueInputForm').addEventListener('submit', saveIssue);


    // Function to save all data submitted from the the form locally
    function saveIssue(e) {
        var issueId = chance.guid();
        var issueDesc = document.getElementById('issueDescInput').value;
        var issueSeverity = document.getElementById('issueSeverityInput').value;
        var issueAssignedTo = document.getElementById('issueAssingneToInput').value;
        var issueStatus = 'Open';

        // Create an issues object 
        var issue = {
            id: issueId,
            description: issueDesc,
            severity: issueSeverity,
            assignedTo: issueAssignedTo,
            status: issueStatus
        }

        if (localStorage.getItem('issues') === null) {
            var issues = []; // Create Blank Array
            issues.push(issue); // Push Object Items into array
            localStorage.setItem('issues', JSON.stringify(issues)); // Set value of local storage item and convert to JSON string
        } else {
            var issues = JSON.parse(localStorage.getItem('issues')); // Get local storage item
            issues.push(issue); // Push Object Items into array
            localStorage.setItem('issues', JSON.stringify(issues)); // Set value of local storage item and convert to JSON string
        }

        document.getElementById('issueInputForm').reset(); // Empty Form

        fetchIssues(); // Check to make sure the list output is re-generated and new item is visible

        e.preventDefault();  // Avoid default submission of form taking place

    }


    // Set status to close on button click
    function setStatusClosed(id) {
        var issues = JSON.parse(localStorage.getItem('issues'));

        for(var i = 0; i < issues.length; i++) {
            if (issues[i].id == id) {
                issues[id].status = "Closed";
            }
        }

        localStorage.setItem('issues', JSON.stringify(issues));

        fetchIssues();
    }


    // Delete issue on button click
    function deleteIssue(id) {
        var issues = JSON.parse(localStorage.getItem('issues'));

        for(var i =0; i < issues.length; i++) {
            if (issues[i].id == id) {
                issues.splice(i, 1);
            }
        }

        localStorage.setItem('issues', JSON.stringify(issues));

        fetchIssues();
    }


}