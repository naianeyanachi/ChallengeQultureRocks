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
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('btnNewUser').addEventListener('click',this.onClickNewUser);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    onClickNewUser: function() {
        console.log("onClickNewUser");
        var request = new XMLHttpRequest();

        // Open a new connection, using the POST request on the URL endpoint
        request.open('POST', 'https://qr-challenge.herokuapp.com/api/v1/users', true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        var send = {
            "user": {
                "name": document.getElementById('txtName').value,
                "email": document.getElementById('txtEmail').value,
                "job_title": document.getElementById('txtJobTitle').value,
                "admission_date": document.getElementById('txtAdmissionDate').value,
                "photo_url": document.getElementById('txtPhotoURL').value
            }
        }
        
        send = {
            "user": {
                "name": "potato",
                "email": "pot@to.com",
                "job_title": 'potato',
                "admission_date": 'asas',
                "photo_url": 'https://i.pinimg.com/originals/31/2e/f9/312ef942c7d5fca10732b71a710d9c51.jpg'
            }
        }
        console.log(send);
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                console.log("User created with success");
            } else if (this.readyState == 4){
                console.log(this.status);
                console.log("Unprocessable Entity");
            }
        };
        // Send request
        request.send(JSON.stringify(send));
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
