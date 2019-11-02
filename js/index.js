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
        this.listUsers();
    },
    getUrlVars: function() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    },
    populateTable: function (params, data){
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

        });
    },
    getPage: function (params, data){
        var page = params["page"];
        if (params["page"]==null) {
            page = 1;
        }
        data.users = data.users.slice(((page - 1)*10),(page*10));
        
        return data;
    },
    listUsers: function (){
        var params = this.getUrlVars();
        
        var request = new XMLHttpRequest();
        request.open('GET', 'https://qr-challenge.herokuapp.com/api/v1/users', true);
        request.onload = function() {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);
            data = app.filterUsers(params, data);
            data = this.getPage(params, data);
            app.populateTable(params, data);
            
        }
        request.send();
    },
    filterUsers: function(params, data) {
        var search_params = params["s"];
        if (search_params != null) {
            var filtered = data.users.filter(function(value, index, users){
                return value.name.includes(search_params) || value.job_title.includes(search_params) || value.email.includes(search_params);
            });
            data.users = filtered;
        }
        return data;
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('btnSearch').addEventListener('click',this.onClickSearch);
        document.getElementById('btnNewUser').addEventListener('click',this.onClickNewUser);
    },
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
        window.location.href = "addUser.html";
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
