 // An array to save contacts
 var store = [];

// Save new contact into an array
function saveNewContact(contact){
    store.push(contact);
}

// get contacts from array
function getContact(store){
    var html ='';
    html += '<table>';
    html += '<caption>Contacts Saved</caption>';
    html += '<tr><th class="center">#</th><th>View Contact Information</th><th class="center">Edit Contact</th><th class="center">Delete Contact</th></tr>';

    for (let index = 0; index < store.length; index++) {
        var content ='<tr><td class="center">' + (index + 1) + '</td><td><a href="#" class="viewContactInfo" id="' + index + '">' + store[index].firstname + ' ' + store[index].surname + '</a></td><td class="center"><a href="#" class="editContactInfo btn btn-info" id="' + index + '"><span class="glyphicon glyphicon-edit"></span></a></td><td class="center"><a href="#" class="removeContact btn btn-danger" id="' + index + '"><span class="glyphicon glyphicon-trash"></span></a></td></tr>';
        html += content;
    }
    html += '</table>';

    return html;
}

// View all contacts from array
function viewAllContact(store){
    var z, html;
    html = '';
    html += '<table class="table">';
    html += '<caption>All Contacts Saved</caption>';
    html += '<tr><th class="center">#</th><th class="center">Firstname</th><th class="center">Surname</th><th class="center">Phone Number</th><th class="center">Email</th><th class="center">Residential Address</th><th class="center">Age</th><th class="center">Gender</th></tr>';

    for (let index = 0; index < store.length; index++) {
        var content ='<tr><td class="center">' + (index + 1) + '</td><td>' + store[index].firstname + '</td><td>' + store[index].surname + '</td><td>' + store[index].phoneNumber + '</td><td>' + store[index].email + '</td><td>' + store[index].houseAddress + '</td><td class="center">' + store[index].age + '</td><td class="center">' + store[index].gender + '</td></tr>';
        html += content;
    }
    html += '</table>';

    return html;
}

// Get contact info
function contactInfo(store, id){
    var html = '';
    html += '<table>';
    html += '<caption>Contact Detailed Information</caption>';
    html += '<tr><td>Firstname</td><td>' + store[id].firstname + '</td></tr>';
    html += '<tr><td>Surname</td><td>' + store[id].surname + '</td></tr>';
    html += '<tr><td>Phone Number</td><td>' + store[id].phoneNumber + '</td></tr>';
    html += '<tr><td>Email</td><td>' + store[id].email + '</td></tr>';
    html += '<tr><td>Residential Address</td><td>' + store[id].houseAddress + '</td></tr>';
    html += '<tr><td>Age</td><td>' + store[id].age + '</td></tr>';
    html += '<tr><td>Sex</td><td>' + store[id].gender + '</td></tr>';
    html += '</table>';
    return html;
}
// Update contact information
function editForm(store, id){
    // check gender
    var male= '';
    var female= '';
    if(store[id].gender === 'Male'){
        male = 'checked'
    } else{
        female = 'checked';
    }
    
    var html = '';
        html += '<form class="form-horizontal" id="edit_form">'
        html += '<input type="hidden" id="index" value="' + id + '" />'
        html += '<div class="form-group row"><label for="firstname_update" class="col-sm-2 control-label">Firstname</label><div class="col-sm-10"><input type="text" class="form-control" id="firstname_update" value="' + store[id].firstname + '" required /></div></div>'
        html += '<div class="form-group row"><label for="surname_update" class="col-sm-2 control-label">Surname</label><div class="col-sm-10"><input type="text" class="form-control" id="surname_update" value="' + store[id].surname + '" required /></div></div>'
        html += '<div class="form-group row"><label for="phoneNumber_update" class="col-sm-2 control-label">Phone Number</label><div class="col-sm-10"><input type="tel" class="form-control" id="phoneNumber_update" value="' + store[id].phoneNumber + '" required /></div></div>'
        html += '<div class="form-group row"><label for="email_update" class="col-sm-2 control-label">Email</label><div class="col-sm-10"><input type="text" class="form-control" id="email_update" value="' + store[id].email+'" required /></div></div>'
        html += '<div class="form-group row"><label for="houseAddress_update" class="col-sm-2 control-label">Residential Address</label><div class="col-sm-10"><input type="text" class="form-control" id="houseAddress_update" value="' + store[id].houseAddress + '" required /></div></div>'
        html += '<div class="form-group row"><label for="age_update" class="col-sm-2 control-label">Age</label><div class="col-sm-10"><input type="number" class="form-control" id="age_update" value="' + store[id].age + '" required /></div></div>'
        html += '<div class="form-group row"><label class="col-sm-2 control-label">Gender</label><div class="row"><div class="col-sm-3"><label for="male_update"><input type="radio" name="gender" id="male_update" ' + male +' required /> &nbsp; Male</label></div><div class="col-sm-3"><label for="female_update"><input type="radio" name="gender" id="female_update" ' + female +' required /> &nbsp; Female</label></div></div></div>'
        html += '<div class="form-group row"><div class="col-sm-offset-8 col-sm-2"><button type="submit" class="btn btn-success">Update</button></div></div>'
        html += '</form>'
    return html
}

$(function(){
       
    $("#contactForm").submit(function(e){
        // prevent submit default action
        e.preventDefault();
        // Get input values from the form
        var firstname = $("#firstname").val().trim();
        var surname = $("#surname").val().trim();
        var phoneNumber = $("#phoneNumber").val().trim();
        var email = $("#email").val().trim();
        var houseAddress = $("#houseAddress").val().trim();
        var age = $("#age").val();
        
        // Determine the gender selected
        if($("#male").prop('checked')) {
            var gender = "Male";
        }
        else {
            var gender = "Female";
        }
        // Create contact object
        var contact = {firstname: firstname, surname: surname, phoneNumber: phoneNumber, email: email, houseAddress: houseAddress, age: age, gender: gender};
       
        // store new contact in array
        saveNewContact(contact);
        
        // Empty form fields
        $("#contactForm")[0].reset()
        
        $(".alert-feedback").html('<div class="alert alert-success">New Contact Added!</div>');
        setTimeout(function(){$(".alert-feedback .alert").remove()}, 3000);
    })
    
    // Check for new contacts
    
    setInterval(function(){
        if(store.length <= 0){ 
            $(".counter").html('');
            $(".contacts-view").html('<h2>No contact saved at the moment.</h2>');  
            $("#viewAllContacts").html('<h2>No contact to display at the moment.</h2>');
        }
        else{
            $(".counter").html('<sup><span class="badge">' + store.length + '</span></sup>');
            $(".contacts-view").html(getContact(store));
            $("#viewAllContacts").html(viewAllContact(store));
        }
    }, 1000);

    // Show contact details when the contact name is clicked
    $(document).on("click", ".viewContactInfo", function(){
        var id = $(this).get(0).id;
        // trigger modal pop up
        $("#modal_click").click();
        $(".contact-info").html(contactInfo(store, id));
    })
    
    //  Show update form on click of edit button
    $(document).on("click", ".editContactInfo", function(){
        var id = $(this).get(0).id;
        // trigger modal pop up
        $("#modal_click").click();
        $(".contact-info").html(editForm(store, id));
    })
    
    // Update contact information if any change(s) are made
    $(document).on("submit", "#edit_form", function(e){
        var index = $("#index").val();
        var gender_update;
        
        // prevent submit default action
        e.preventDefault();
        
        // Get form values from edit_form
        var firstname_update = $("#firstname_update").val();
        var surname_update = $("#surname_update").val();
        var phoneNumber_update = $("#phoneNumber_update").val();
        var email_update = $("#email_update").val();
        var houseAddress_update = $("#houseAddress_update").val();
        var age_update = $("#age_update").val();
        
        // gender
        if($("#male_update").prop("checked")){
            var gender_update = "Male";
        }
        else {
            var gender_update = "Female";
        }
        store[index].firstname = firstname_update;
        store[index].surname = surname_update;
        store[index].phoneNumber = phoneNumber_update;
        store[index].email = email_update;
        store[index].houseAddress = houseAddress_update;
        store[index].age = age_update;
        store[index].gender = gender_update;
        
        $(".alert-feedback-update").html('<div class="alert alert-success">Contact Information Updated!</div>');
        setTimeout(function(){$(".alert-feedback-update .alert").remove()},3000);
    })
    
     // Delete contact on click of Del Button
    $(document).on("click", ".removeContact", function(){
        var id = $(this).get(0).id;
        var contactDeleted = store[id].firstname + ' ' + store[id].surname;
        store.splice(id, 1)
        $(".alert-feedback-remove").html('<div class="alert alert-danger">' + contactDeleted + ' contact details deleted!</div>');
        setTimeout(function(){$(".alert-feedback-remove .alert").remove()},3000);
    })
})