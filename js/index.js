/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        var request = new XMLHttpRequest();

        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', 'https://qr-challenge.herokuapp.com/api/v1/users', true);

        request.onload = function() {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);
            var search_params = window.location.search.substring(3);
            console.log(search_params=="");
            if (search_params != "") {
                var filtered = data.users.filter(function(value, index, users){
                    return value.name.includes(search_params) || value.job_title.includes(search_params) || value.email.includes(search_params);
                });
                data.users = filtered;
            }
            console.log(data);

            var users = document.getElementById("listUsers");
            var row = users.insertRow(-1);
            row.classList.add("header");
            var cellName = row.insertCell(0);
            cellName.innerHTML = "Name"
            var cellJobTitle = row.insertCell(1);
            cellJobTitle.innerHTML = "Job Title"
            var cellDate = row.insertCell(2);
            cellDate.innerHTML = "Admission date"
            var cellEmail = row.insertCell(3);
            cellEmail.innerHTML = "Email"

            data.users.forEach(function(user, index){
                row = users.insertRow(-1);
                if(index % 2 == 0){
                    row.classList.add("par");
                } else {
                    row.classList.add("impar");
                }

                cellName = row.insertCell(0);
                cellName.innerHTML = user.name;
                cellJobTitle = row.insertCell(1);
                cellJobTitle.innerHTML = user.job_title;
                cellDate = row.insertCell(2);
                cellDate.innerHTML = user.admission_date;
                cellEmail = row.insertCell(3);
                cellEmail.innerHTML = user.email;

            })
            
        }
        
        // Send request
        request.send();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('btnSearch').addEventListener('click',this.onClickSearch);
        document.getElementById('btnNewUser').addEventListener('click',this.onClickNewUser);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    onClickSearch: function() {
        console.log("onClickSearch");
        url = window.location
        var query_string = url.search;
        var search_params = new URLSearchParams(query_string); 
        search_params.set('s', document.getElementById('txtSearch').value);
        url.search = search_params.toString();
        var new_url = url.toString();
    },
    onClickNewUser: function() {
        console.log("onClickNewUser");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
